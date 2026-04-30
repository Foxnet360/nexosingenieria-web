#!/usr/bin/env python3
"""
Extrae todo el contenido útil del HTML ya descargado
y genera archivos listos para usar en el nuevo sitio
"""

import re
import json
import csv
from pathlib import Path
from datetime import datetime

INPUT_DIR = Path("data/scraped/raw")
OUTPUT_DIR = Path("data/scraped/processed/content")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def extract_all_content():
    print("=" * 70)
    print("EXTRAYENDO CONTENIDO DEL HTML DESCARGADO")
    print("=" * 70)
    
    # Leer HTML
    html_file = INPUT_DIR / "pages/index.html"
    if not html_file.exists():
        print("❌ No se encontró el archivo HTML")
        return
    
    html = html_file.read_text(encoding='utf-8')
    
    # 1. EXTRAER INFORMACIÓN BÁSICA
    title = re.search(r'<title>(.*?)</title>', html)
    title = title.group(1) if title else ""
    
    meta = re.search(r'<meta[^\u003e]*name=[\"\']description[\"\'][^\u003e]*content=[\"\']([^\"\']*)', html)
    if not meta:
        meta = re.search(r'<meta[^\u003e]*content=[\"\']([^\"\']*)[^\u003e]*name=[\"\']description[\"\']', html)
    meta_description = meta.group(1) if meta else ""
    
    print(f"\n📄 Título: {title}")
    print(f"📝 Meta Description: {meta_description}")
    
    # 2. EXTRAER HEADINGS CON CONTENIDO COMPLETO
    headings = []
    for match in re.finditer(r'<h([1-6])[^>]*>(.*?)</h\1>', html, re.DOTALL):
        level = match.group(1)
        text = re.sub(r'<[^>]+>', '', match.group(2))
        text = re.sub(r'\s+', ' ', text).strip()
        if text and len(text) > 3:
            headings.append({
                'level': int(level),
                'text': text
            })
    
    print(f"\n📋 Headings encontrados: {len(headings)}")
    
    # 3. EXTRAER PÁRRAFOS CON TEXTO LIMPIO
    paragraphs = []
    for match in re.finditer(r'<p[^>]*>(.*?)</p>', html, re.DOTALL):
        text = re.sub(r'<[^>]+>', '', match.group(1))
        text = re.sub(r'\s+', ' ', text).strip()
        if text and len(text) > 30:  # Solo párrafos sustanciales
            paragraphs.append(text)
    
    print(f"📝 Párrafos sustanciales: {len(paragraphs)}")
    
    # 4. EXTRAER LISTAS
    lists = []
    for ul_match in re.finditer(r'<ul[^>]*>(.*?)</ul>', html, re.DOTALL):
        items = re.findall(r'<li[^>]*>(.*?)</li>', ul_match.group(1), re.DOTALL)
        clean_items = []
        for item in items:
            clean = re.sub(r'<[^>]+>', '', item)
            clean = re.sub(r'\s+', ' ', clean).strip()
            if clean and len(clean) > 5:
                clean_items.append(clean)
        if clean_items:
            lists.append(clean_items)
    
    print(f"📋 Listas encontradas: {len(lists)}")
    
    # 5. EXTRAER IMÁGENES CON ALT TEXT
    images = []
    for match in re.finditer(r'<img[^\u003e]*src=[\"\']([^\"\']*)[\"\'][^\u003e]*>', html):
        src = match.group(1)
        # Buscar alt
        alt_match = re.search(r'alt=[\"\']([^\"\']*)[\"\']', match.group(0))
        alt = alt_match.group(1) if alt_match else ""
        images.append({'src': src, 'alt': alt})
    
    print(f"🖼️  Imágenes en HTML: {len(images)}")
    
    # 6. DETECTAR MARCAS/PARTNERS
    known_brands = [
        'Hikvision', 'Dahua', 'Axis', 'Bosch', 'Honeywell',
        'Panduit', 'CommScope', 'Siemon', 'Furukawa', 'Legrand',
        'Control4', 'Crestron', 'KNX', 'Lutron', 'Schneider Electric',
        'Siemens', 'ABB', 'Philips', 'Samsung', 'LG', 'HPE', 'Cisco',
        'Ubiquiti', 'Grandstream', 'Yealink', 'Polycom'
    ]
    
    all_text = ' '.join(paragraphs).lower()
    found_brands = []
    for brand in known_brands:
        if brand.lower() in all_text:
            found_brands.append(brand)
    
    # También buscar en headings
    for heading in headings:
        for brand in known_brands:
            if brand.lower() in heading['text'].lower() and brand not in found_brands:
                found_brands.append(brand)
    
    print(f"🏷️  Marcas detectadas: {', '.join(found_brands) if found_brands else 'Ninguna específica'}")
    
    # 7. DETECTAR SERVICIOS
    services = []
    service_keywords = {
        'Seguridad Electrónica': ['seguridad electrónica', 'cctv', 'cámara', 'videovigilancia', 'alarma', 'control de acceso', 'biométrico', 'detección', 'circuito cerrado'],
        'Cableado Estructurado': ['cableado estructurado', 'redes', 'fibra óptica', 'datos', 'voz', 'infraestructura', 'networking'],
        'Automatización': ['automatización', 'domótica', 'control', 'smart', 'inteligente', 'hogar', 'eficiencia energética'],
        'Eficiencia Energética': ['eficiencia energética', 'ahorro energético', 'iluminación led', 'energía', 'sostenible']
    }
    
    for service_name, keywords in service_keywords.items():
        if any(kw in all_text for kw in keywords):
            services.append(service_name)
    
    print(f"🔧 Servicios detectados: {', '.join(services) if services else 'Ninguno específico'}")
    
    # 8. EXTRAER INFORMACIÓN DE CONTACTO
    contact_info = {
        'emails': [],
        'phones': [],
        'addresses': [],
        'social_media': []
    }
    
    # Buscar emails
    emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', html)
    contact_info['emails'] = list(set(emails))
    
    # Buscar teléfonos
    phones = re.findall(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', html)
    contact_info['phones'] = list(set(phones))
    
    # Buscar enlaces sociales
    social_patterns = [
        (r'facebook\.com/([^\"\'\s]+)', 'Facebook'),
        (r'instagram\.com/([^\"\'\s]+)', 'Instagram'),
        (r'twitter\.com/([^\"\'\s]+)', 'Twitter'),
        (r'linkedin\.com/([^\"\'\s]+)', 'LinkedIn'),
        (r'youtube\.com/([^\"\'\s]+)', 'YouTube'),
    ]
    
    for pattern, name in social_patterns:
        matches = re.findall(pattern, html)
        for match in matches:
            contact_info['social_media'].append({
                'platform': name,
                'url': f"https://{pattern.split('/')[0]}/{match}"
            })
    
    print(f"📧 Emails: {', '.join(contact_info['emails']) if contact_info['emails'] else 'Ninguno'}")
    print(f"📞 Teléfonos: {', '.join(contact_info['phones']) if contact_info['phones'] else 'Ninguno'}")
    print(f"🌐 Redes sociales: {len(contact_info['social_media'])}")
    
    # 9. ORGANIZAR CONTENIDO POR SECCIONES
    sections = []
    current_section = None
    
    for heading in headings:
        if heading['level'] <= 3:  # H1-H3 inician secciones
            if current_section:
                sections.append(current_section)
            current_section = {
                'title': heading['text'],
                'level': heading['level'],
                'content': []
            }
        elif current_section:
            current_section['content'].append({
                'type': 'heading',
                'level': heading['level'],
                'text': heading['text']
            })
    
    if current_section:
        sections.append(current_section)
    
    # Asignar párrafos a secciones
    for para in paragraphs:
        # Asignar al último párrafo de la sección anterior o crear sección general
        if sections:
            # Simple: asignar a la última sección
            sections[-1]['content'].append({
                'type': 'paragraph',
                'text': para
            })
    
    print(f"📑 Secciones identificadas: {len(sections)}")
    
    # 10. GUARDAR TODO EN JSON ESTRUCTURADO
    extracted_data = {
        'extraction_date': datetime.now().isoformat(),
        'source_url': 'https://nexosingenieria.com',
        'source_file': str(html_file),
        'basic_info': {
            'title': title,
            'meta_description': meta_description
        },
        'services': services,
        'brands': found_brands,
        'contact': contact_info,
        'content': {
            'headings': headings,
            'paragraphs': paragraphs,
            'lists': lists
        },
        'sections': sections,
        'images': images,
        'statistics': {
            'total_headings': len(headings),
            'total_paragraphs': len(paragraphs),
            'total_lists': len(lists),
            'total_images': len(images),
            'total_brands': len(found_brands),
            'total_services': len(services)
        }
    }
    
    json_path = OUTPUT_DIR / "extracted_content.json"
    json_path.write_text(json.dumps(extracted_data, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"\n✅ JSON estructurado guardado: {json_path}")
    
    # 11. GENERAR CSV DE CONTENIDO
    csv_path = OUTPUT_DIR / "content_export.csv"
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Tipo', 'Nivel', 'Contenido'])
        
        for heading in headings:
            writer.writerow(['Heading', f"H{heading['level']}", heading['text']])
        
        for i, para in enumerate(paragraphs):
            writer.writerow(['Paragraph', '', para[:200]])  # Limitar a 200 chars para CSV
    
    print(f"✅ CSV exportado: {csv_path}")
    
    # 12. GENERAR MARKDOWN PARA FACIL LECTURA
    md_path = OUTPUT_DIR / "content_summary.md"
    md_content = f"""# Contenido Extraído - Nexos Ingeniería

**Fecha:** {datetime.now().strftime('%Y-%m-%d %H:%M')}
**Fuente:** https://nexosingenieria.com

---

## Información Básica

**Título:** {title}

**Descripción:** {meta_description}

---

## Servicios Identificados

"""
    for service in services:
        md_content += f"- {service}\n"
    
    md_content += "\n## Marcas/Partners Detectados\n\n"
    for brand in found_brands:
        md_content += f"- {brand}\n"
    
    md_content += "\n## Información de Contacto\n\n"
    md_content += f"**Emails:** {', '.join(contact_info['emails']) if contact_info['emails'] else 'No encontrados'}\n\n"
    md_content += f"**Teléfonos:** {', '.join(contact_info['phones']) if contact_info['phones'] else 'No encontrados'}\n\n"
    md_content += f"**Redes Sociales:** {len(contact_info['social_media'])} encontradas\n\n"
    
    md_content += "\n## Contenido por Secciones\n\n"
    for section in sections[:10]:  # Primeras 10 secciones
        md_content += f"### {section['title']}\n\n"
        for item in section['content'][:5]:  # Primeros 5 items
            if item['type'] == 'paragraph':
                md_content += f"{item['text'][:300]}...\n\n"
    
    md_content += f"""
---

## Estadísticas

- **Headings:** {len(headings)}
- **Párrafos:** {len(paragraphs)}
- **Listas:** {len(lists)}
- **Imágenes:** {len(images)}
- **Marcas:** {len(found_brands)}
- **Servicios:** {len(services)}

---

*Este contenido fue extraído automáticamente del sitio web de Nexos Ingeniería para uso en el nuevo sitio.*
"""
    
    md_path.write_text(md_content, encoding='utf-8')
    print(f"✅ Markdown generado: {md_path}")
    
    # RESUMEN
    print("\n" + "=" * 70)
    print("RESUMEN DE EXTRACCIÓN")
    print("=" * 70)
    print(f"📊 Headings: {len(headings)}")
    print(f"📝 Párrafos: {len(paragraphs)}")
    print(f"📋 Listas: {len(lists)}")
    print(f"🖼️  Imágenes: {len(images)}")
    print(f"🏷️  Marcas: {len(found_brands)}")
    print(f"🔧 Servicios: {len(services)}")
    print(f"📧 Emails: {len(contact_info['emails'])}")
    print(f"📞 Teléfonos: {len(contact_info['phones'])}")
    print(f"📁 Archivos generados en: {OUTPUT_DIR}")
    
    return extracted_data


if __name__ == '__main__':
    data = extract_all_content()
