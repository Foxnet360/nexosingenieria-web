#!/usr/bin/env python3
"""
Scraper completo para nexosingenieria.com
Extrae: páginas, imágenes, texto, contacto, partners/marcas
Mantiene arquitectura del proyecto actual
"""

import urllib.request
import urllib.parse
import html.parser
import json
import re
import time
from pathlib import Path
from datetime import datetime

# Configuración
BASE_URL = "https://nexosingenieria.com"
DOMAIN = "nexosingenieria.com"
RATE_LIMIT = 1.5  # segundos entre requests
MAX_DEPTH = 3
OUTPUT_DIR = Path("data/scraped")

# URLs específicas a scrapear (además del crawling)
SPECIFIC_URLS = [
    "https://nexosingenieria.com",
    "https://nexosingenieria.com/la-empresa/",
    "https://nexosingenieria.com/servicios/",
    "https://nexosingenieria.com/proyectos/",
    "https://nexosingenieria.com/contacto/",
    "https://nexosingenieria.com/blog/",
]

# Partners/marcas conocidas del sector
KNOWN_BRANDS = [
    'Hikvision', 'Dahua', 'Axis', 'Bosch', 'Honeywell',
    'Panduit', 'CommScope', 'Siemon', 'Furukawa', 'Legrand',
    'Control4', 'Crestron', 'KNX', 'Lutron', 'Schneider Electric',
    'Siemens', 'ABB', 'Philips', 'Samsung', 'LG'
]

# Crear directorios
for subdir in ["raw/pages", "raw/assets", "processed/content", "exports/json", "exports/csv", "exports/markdown"]:
    (OUTPUT_DIR / subdir).mkdir(parents=True, exist_ok=True)

class ContentExtractor(html.parser.HTMLParser):
    """Extrae contenido estructurado de HTML."""
    
    def __init__(self):
        super().__init__()
        self.reset()
        self.in_script = False
        self.in_style = False
        self.current_tag = None
        self.links = []
        self.images = []
        self.headings = []
        self.paragraphs = []
        self.lists = []
        self.current_list = []
        self.current_data = []
        self.title = ""
        self.meta_description = ""
        self.contact_info = {
            'emails': [],
            'phones': [],
            'addresses': []
        }
        
    def reset(self):
        super().reset()
        self.in_script = False
        self.in_style = False
        self.current_tag = None
        self.links = []
        self.images = []
        self.headings = []
        self.paragraphs = []
        self.lists = []
        self.current_list = []
        self.current_data = []
        self.title = ""
        self.meta_description = ""
        self.contact_info = {
            'emails': [],
            'phones': [],
            'addresses': []
        }
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tag = tag
        
        if tag in ('script', 'style'):
            self.in_script = (tag == 'script')
            self.in_style = (tag == 'style')
        elif tag == 'a' and 'href' in attrs_dict:
            href = attrs_dict['href']
            self.links.append(href)
            
            # Detectar enlaces de contacto
            if 'mailto:' in href:
                email = href.replace('mailto:', '').split('?')[0]
                if email and email not in self.contact_info['emails']:
                    self.contact_info['emails'].append(email)
            elif 'tel:' in href:
                phone = href.replace('tel:', '')
                if phone and phone not in self.contact_info['phones']:
                    self.contact_info['phones'].append(phone)
                    
        elif tag == 'img' and 'src' in attrs_dict:
            self.images.append({
                'src': attrs_dict['src'],
                'alt': attrs_dict.get('alt', ''),
                'title': attrs_dict.get('title', '')
            })
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.current_data = []
        elif tag == 'p':
            self.current_data = []
        elif tag in ('ul', 'ol'):
            self.current_list = []
        elif tag == 'li':
            self.current_data = []
        elif tag == 'meta':
            if attrs_dict.get('name') == 'description':
                self.meta_description = attrs_dict.get('content', '')
            elif attrs_dict.get('property') == 'og:description':
                if not self.meta_description:
                    self.meta_description = attrs_dict.get('content', '')
        elif tag == 'title':
            self.current_data = []
    
    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script = False
            self.in_style = False
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            text = ' '.join(self.current_data).strip()
            if text:
                self.headings.append({
                    'level': int(tag[1]),
                    'text': text
                })
        elif tag == 'p':
            text = ' '.join(self.current_data).strip()
            if text and len(text) > 10:
                self.paragraphs.append(text)
                # Detectar direcciones en párrafos
                if any(keyword in text.lower() for keyword in ['calle', 'carrera', 'avenida', 'dirección', 'ubicación']):
                    if text not in self.contact_info['addresses']:
                        self.contact_info['addresses'].append(text)
        elif tag == 'li':
            text = ' '.join(self.current_data).strip()
            if text:
                self.current_list.append(text)
        elif tag in ('ul', 'ol'):
            if self.current_list:
                self.lists.append(self.current_list)
                self.current_list = []
        elif tag == 'title':
            self.title = ' '.join(self.current_data).strip()
        
        self.current_tag = None
    
    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            self.current_data.append(data)
    
    def get_clean_text(self):
        """Obtener texto limpio completo."""
        text = ' '.join(self.paragraphs)
        # Limpiar espacios múltiples
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    
    def detect_brands(self):
        """Detectar marcas mencionadas en el contenido."""
        text = self.get_clean_text().lower()
        found_brands = []
        
        for brand in KNOWN_BRANDS:
            if brand.lower() in text:
                found_brands.append(brand)
        
        # También buscar en headings
        for heading in self.headings:
            for brand in KNOWN_BRANDS:
                if brand.lower() in heading['text'].lower() and brand not in found_brands:
                    found_brands.append(brand)
        
        return found_brands
    
    def detect_services(self):
        """Detectar servicios mencionados."""
        text = self.get_clean_text().lower()
        services = []
        
        service_keywords = {
            'Seguridad Electrónica': ['seguridad electrónica', 'cctv', 'cámara', 'videovigilancia', 'alarma', 'control de acceso'],
            'Cableado Estructurado': ['cableado estructurado', 'redes', 'fibra óptica', 'datos', 'voz'],
            'Automatización': ['automatización', 'domótica', 'control', 'smart', 'inteligente'],
            'Eficiencia Energética': ['eficiencia energética', 'ahorro energético', 'iluminación led', 'energía']
        }
        
        for service, keywords in service_keywords.items():
            if any(kw in text for kw in keywords):
                services.append(service)
        
        return services


def fetch_url(url):
    """Descargar URL con headers apropiados."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"❌ Error descargando {url}: {e}")
        return None


def is_internal_link(url):
    """Verificar si es un enlace interno."""
    if url.startswith('#') or url.startswith('mailto:') or url.startswith('tel:'):
        return False
    if url.startswith('http'):
        return DOMAIN in url
    return True


def normalize_url(base, url):
    """Normalizar URL."""
    return urllib.parse.urljoin(base, url)


def save_page(url, html_content):
    """Guardar página HTML."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip('/') or 'index'
    filename = path.replace('/', '_') + '.html'
    filepath = OUTPUT_DIR / "raw/pages" / filename
    
    filepath.write_text(html_content, encoding='utf-8')
    return str(filepath)


def download_image(img_url, page_url):
    """Descargar imagen."""
    try:
        full_url = normalize_url(page_url, img_url)
        req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
        
        with urllib.request.urlopen(req, timeout=30) as response:
            content = response.read()
            
            # Determinar extensión
            parsed = urllib.parse.urlparse(full_url)
            ext = Path(parsed.path).suffix or '.jpg'
            if ext not in ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']:
                ext = '.jpg'
            
            # Nombre único basado en hash
            import hashlib
            filename = hashlib.md5(full_url.encode()).hexdigest()[:12] + ext
            filepath = OUTPUT_DIR / "raw/assets" / filename
            
            filepath.write_bytes(content)
            return {
                'original_url': full_url,
                'local_path': str(filepath),
                'filename': filename,
                'size': len(content)
            }
    except Exception as e:
        print(f"⚠️  Error descargando imagen {img_url}: {e}")
        return None


def scrape_site():
    """Scraper principal mejorado."""
    print("=" * 70)
    print("SCRAPING COMPLETO - NEXOSINGENIERIA.COM")
    print("=" * 70)
    
    visited = set()
    to_visit = [(url, 0) for url in SPECIFIC_URLS]
    pages_data = []
    all_images = []
    all_contact_info = {
        'emails': set(),
        'phones': set(),
        'addresses': set()
    }
    all_brands = set()
    all_services = set()
    
    while to_visit:
        url, depth = to_visit.pop(0)
        
        if url in visited or depth > MAX_DEPTH:
            continue
        
        visited.add(url)
        print(f"\n🔍 [{depth}] Scraping: {url}")
        
        # Descargar página
        html = fetch_url(url)
        if not html:
            continue
        
        # Guardar HTML
        filepath = save_page(url, html)
        print(f"   💾 Guardado: {filepath}")
        
        # Parsear contenido
        extractor = ContentExtractor()
        extractor.feed(html)
        
        # Extraer información
        clean_text = extractor.get_clean_text()
        brands = extractor.detect_brands()
        services = extractor.detect_services()
        
        # Actualizar sets globales
        all_brands.update(brands)
        all_services.update(services)
        all_contact_info['emails'].update(extractor.contact_info['emails'])
        all_contact_info['phones'].update(extractor.contact_info['phones'])
        all_contact_info['addresses'].update(extractor.contact_info['addresses'])
        
        # Guardar metadatos de página
        page_info = {
            'url': url,
            'depth': depth,
            'title': extractor.title,
            'meta_description': extractor.meta_description,
            'headings': extractor.headings,
            'paragraphs': extractor.paragraphs,
            'lists': extractor.lists,
            'full_text': clean_text[:5000],  # Limitar pero más completo
            'images_count': len(extractor.images),
            'links_count': len(extractor.links),
            'brands_detected': brands,
            'services_detected': services,
            'contact_info': extractor.contact_info
        }
        pages_data.append(page_info)
        
        print(f"   📄 Título: {extractor.title[:70] if extractor.title else 'Sin título'}")
        print(f"   📝 Texto: {len(clean_text)} caracteres")
        print(f"   🖼️  Imágenes: {len(extractor.images)}")
        print(f"   🔗 Enlaces: {len(extractor.links)}")
        if brands:
            print(f"   🏷️  Marcas: {', '.join(brands)}")
        if services:
            print(f"   🔧 Servicios: {', '.join(services)}")
        if extractor.contact_info['emails']:
            print(f"   📧 Emails: {', '.join(extractor.contact_info['emails'])}")
        if extractor.contact_info['phones']:
            print(f"   📞 Teléfonos: {', '.join(extractor.contact_info['phones'])}")
        
        # Descargar imágenes
        for img in extractor.images:
            img_data = download_image(img['src'], url)
            if img_data:
                img_data['alt'] = img['alt']
                img_data['title'] = img['title']
                img_data['source_page'] = url
                all_images.append(img_data)
        
        # Agregar enlaces internos para visitar
        if depth < MAX_DEPTH:
            for link in extractor.links:
                if is_internal_link(link):
                    full_url = normalize_url(url, link)
                    if full_url not in visited:
                        to_visit.append((full_url, depth + 1))
        
        # Rate limiting
        time.sleep(RATE_LIMIT)
    
    # Guardar datos estructurados
    print("\n" + "=" * 70)
    print("GUARDANDO RESULTADOS")
    print("=" * 70)
    
    # Preparar datos finales
    result_data = {
        'scrape_date': datetime.now().isoformat(),
        'base_url': BASE_URL,
        'total_pages': len(pages_data),
        'total_images': len(all_images),
        'all_brands': sorted(list(all_brands)),
        'all_services': sorted(list(all_services)),
        'contact_info': {
            'emails': sorted(list(all_contact_info['emails'])),
            'phones': sorted(list(all_contact_info['phones'])),
            'addresses': sorted(list(all_contact_info['addresses']))
        },
        'pages': pages_data,
        'images': all_images
    }
    
    # JSON completo
    json_path = OUTPUT_DIR / "exports/json/scraped_data_complete.json"
    json_path.write_text(json.dumps(result_data, indent=2, ensure_ascii=False, default=str), encoding='utf-8')
    print(f"✅ JSON completo: {json_path}")
    
    # CSV de páginas
    import csv
    csv_path = OUTPUT_DIR / "exports/csv/pages_complete.csv"
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['url', 'title', 'depth', 'images_count', 'links_count', 'brands', 'services'])
        writer.writeheader()
        for page in pages_data:
            writer.writerow({
                'url': page['url'],
                'title': page['title'],
                'depth': page['depth'],
                'images_count': page['images_count'],
                'links_count': page['links_count'],
                'brands': ', '.join(page['brands_detected']),
                'services': ', '.join(page['services_detected'])
            })
    print(f"✅ CSV páginas: {csv_path}")
    
    # CSV de contacto
    contact_csv_path = OUTPUT_DIR / "exports/csv/contact_info.csv"
    with open(contact_csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Tipo', 'Valor'])
        for email in all_contact_info['emails']:
            writer.writerow(['Email', email])
        for phone in all_contact_info['phones']:
            writer.writerow(['Teléfono', phone])
        for address in all_contact_info['addresses']:
            writer.writerow(['Dirección', address])
    print(f"✅ CSV contacto: {contact_csv_path}")
    
    # Resumen
    print("\n" + "=" * 70)
    print("RESUMEN FINAL")
    print("=" * 70)
    print(f"📊 Páginas scrapeadas: {len(pages_data)}")
    print(f"🖼️  Imágenes descargadas: {len(all_images)}")
    print(f"🏷️  Marcas identificadas: {len(all_brands)}")
    print(f"   {', '.join(sorted(list(all_brands))) if all_brands else 'Ninguna'}")
    print(f"🔧 Servicios identificados: {len(all_services)}")
    print(f"   {', '.join(sorted(list(all_services))) if all_services else 'Ninguno'}")
    print(f"📧 Emails encontrados: {len(all_contact_info['emails'])}")
    print(f"📞 Teléfonos encontrados: {len(all_contact_info['phones'])}")
    print(f"📍 Direcciones encontradas: {len(all_contact_info['addresses'])}")
    print(f"📁 Datos guardados en: {OUTPUT_DIR}")
    
    return result_data


if __name__ == '__main__':
    data = scrape_site()
