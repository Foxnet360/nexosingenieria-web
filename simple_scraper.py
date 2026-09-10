#!/usr/bin/env python3
"""
Scraper simplificado usando solo bibliotecas estándar de Python.
Extrae contenido de nexosingenieria.com para uso en nuevo sitio.
"""

import urllib.request
import urllib.parse
import html.parser
import json
import os
import time
from pathlib import Path
from datetime import datetime

# Configuración
BASE_URL = "https://nexosingenieria.com"
DOMAIN = "nexosingenieria.com"
RATE_LIMIT = 2  # segundos entre requests
MAX_DEPTH = 2
OUTPUT_DIR = Path("data/scraped")

# Crear directorios
for subdir in ["raw/pages", "raw/assets", "processed/content", "exports/json", "exports/csv", "exports/markdown"]:
    (OUTPUT_DIR / subdir).mkdir(parents=True, exist_ok=True)

class SimpleHTMLParser(html.parser.HTMLParser):
    """Parser HTML simple para extraer contenido."""
    
    def __init__(self):
        super().__init__()
        self.in_script = False
        self.in_style = False
        self.current_tag = None
        self.links = []
        self.images = []
        self.headings = []
        self.paragraphs = []
        self.current_data = []
        self.title = ""
        self.meta_description = ""
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tag = tag
        
        if tag in ('script', 'style'):
            self.in_script = (tag == 'script')
            self.in_style = (tag == 'style')
        elif tag == 'a' and 'href' in attrs_dict:
            self.links.append(attrs_dict['href'])
        elif tag == 'img' and 'src' in attrs_dict:
            self.images.append({
                'src': attrs_dict['src'],
                'alt': attrs_dict.get('alt', '')
            })
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.current_data = []
        elif tag == 'p':
            self.current_data = []
        elif tag == 'meta' and attrs_dict.get('name') == 'description':
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
            if text and len(text) > 10:  # Ignorar párrafos muy cortos
                self.paragraphs.append(text)
        elif tag == 'title':
            self.title = ' '.join(self.current_data).strip()
        
        self.current_tag = None
    
    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            self.current_data.append(data)


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


def save_page(url, html_content, depth):
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
            return str(filepath)
    except Exception as e:
        print(f"⚠️  Error descargando imagen {img_url}: {e}")
        return None


def scrape_site():
    """Scraper principal."""
    print("=" * 60)
    print("SCRAPING NEXOSINGENIERIA.COM")
    print("=" * 60)
    
    visited = set()
    to_visit = [(BASE_URL, 0)]
    pages_data = []
    all_images = []
    
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
        filepath = save_page(url, html, depth)
        print(f"   💾 Guardado: {filepath}")
        
        # Parsear contenido
        parser = SimpleHTMLParser()
        parser.feed(html)
        
        # Guardar metadatos de página
        page_info = {
            'url': url,
            'depth': depth,
            'title': parser.title,
            'meta_description': parser.meta_description,
            'headings': parser.headings,
            'paragraphs': parser.paragraphs[:20],  # Limitar párrafos
            'images_count': len(parser.images),
            'links_count': len(parser.links)
        }
        pages_data.append(page_info)
        
        print(f"   📄 Título: {parser.title[:60] if parser.title else 'Sin título'}")
        print(f"   🖼️  Imágenes: {len(parser.images)}")
        print(f"   🔗 Enlaces: {len(parser.links)}")
        
        # Descargar imágenes
        for img in parser.images:
            img_path = download_image(img['src'], url)
            if img_path:
                all_images.append({
                    'original_url': normalize_url(url, img['src']),
                    'local_path': img_path,
                    'alt': img['alt'],
                    'source_page': url
                })
        
        # Agregar enlaces internos para visitar
        if depth < MAX_DEPTH:
            for link in parser.links:
                if is_internal_link(link):
                    full_url = normalize_url(url, link)
                    if full_url not in visited:
                        to_visit.append((full_url, depth + 1))
        
        # Rate limiting
        time.sleep(RATE_LIMIT)
    
    # Guardar datos estructurados
    print("\n" + "=" * 60)
    print("GUARDANDO RESULTADOS")
    print("=" * 60)
    
    # JSON con toda la información
    result_data = {
        'scrape_date': datetime.now().isoformat(),
        'base_url': BASE_URL,
        'total_pages': len(pages_data),
        'total_images': len(all_images),
        'pages': pages_data,
        'images': all_images
    }
    
    json_path = OUTPUT_DIR / "exports/json/scraped_data.json"
    json_path.write_text(json.dumps(result_data, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"✅ JSON exportado: {json_path}")
    
    # CSV de páginas
    import csv
    csv_path = OUTPUT_DIR / "exports/csv/pages.csv"
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['url', 'title', 'depth', 'images_count', 'links_count'])
        writer.writeheader()
        for page in pages_data:
            writer.writerow({
                'url': page['url'],
                'title': page['title'],
                'depth': page['depth'],
                'images_count': page['images_count'],
                'links_count': page['links_count']
            })
    print(f"✅ CSV exportado: {csv_path}")
    
    # Resumen
    print("\n" + "=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"📊 Páginas scrapeadas: {len(pages_data)}")
    print(f"🖼️  Imágenes descargadas: {len(all_images)}")
    print(f"📁 Datos guardados en: {OUTPUT_DIR}")
    
    return result_data


if __name__ == '__main__':
    data = scrape_site()
