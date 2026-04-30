#!/usr/bin/env python3
"""
Analizar contenido ya descargado de nexosingenieria.com
Extraer información útil para el nuevo sitio.
"""

import json
import re
from pathlib import Path
from datetime import datetime

DATA_DIR = Path("data/scraped")
OUTPUT_DIR = Path("data/scraped/processed/content")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def extract_text_from_html(html_content):
    """Extraer texto legible de HTML."""
    # Eliminar scripts y estilos
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL)
    
    # Extraer texto entre tags
    text = re.sub(r'<[^>]+>', ' ', html_content)
    
    # Limpiar espacios
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def analyze_content():
    """Analizar el contenido descargado."""
    print("=" * 60)
    print("ANÁLISIS DE CONTENIDO EXTRAÍDO")
    print("=" * 60)
    
    results = {
        'analysis_date': datetime.now().isoformat(),
        'pages': [],
        'images': [],
        'brands_mentioned': [],
        'services_mentioned': [],
        'useful_content': {}
    }
    
    # Analizar páginas descargadas
    pages_dir = DATA_DIR / "raw/pages"
    if pages_dir.exists():
        html_files = list(pages_dir.glob("*.html"))
        print(f"\n📄 Páginas HTML encontradas: {len(html_files)}")
        
        for html_file in html_files:
            html_content = html_file.read_text(encoding='utf-8')
            text = extract_text_from_html(html_content)
            
            # Extraer título
            title_match = re.search(r'<title>(.*?)</title>', html_content)
            title = title_match.group(1) if title_match else "Sin título"
            
            # Detectar marcas
            brands = ['Hikvision', 'Dahua', 'Panduit', 'CommScope', 'Siemon', 
                     'Furukawa', 'Legrand', 'Control4', 'Crestron', 'KNX', 'Axis',
                     'Schneider', 'Hewlett Packard', 'HP', 'Cisco', 'Ubiquiti']
            
            found_brands = []
            for brand in brands:
                if brand.lower() in text.lower():
                    found_brands.append(brand)
            
            # Detectar servicios
            services = [
                ('Seguridad Electrónica', ['seguridad', 'cámara', 'cctv', 'vigilancia', 'alarma']),
                ('Cableado Estructurado', ['cableado', 'red', 'fibra óptica', 'datos']),
                ('Automatización', ['automatización', 'domótica', 'control', 'smart']),
                ('Eficiencia Energética', ['energía', 'eficiencia', 'led', 'ahorro'])
            ]
            
            found_services = []
            for service_name, keywords in services:
                if any(kw in text.lower() for kw in keywords):
                    found_services.append(service_name)
            
            page_info = {
                'file': str(html_file.name),
                'title': title,
                'text_length': len(text),
                'brands_found': found_brands,
                'services_found': found_services,
                'text_preview': text[:500] + "..." if len(text) > 500 else text
            }
            
            results['pages'].append(page_info)
            results['brands_mentioned'].extend(found_brands)
            results['services_mentioned'].extend(found_services)
            
            print(f"\n  📄 {html_file.name}")
            print(f"     Título: {title[:60]}")
            print(f"     Texto: {len(text)} caracteres")
            print(f"     Marcas: {', '.join(found_brands) if found_brands else 'Ninguna'}")
            print(f"     Servicios: {', '.join(found_services) if found_services else 'Ninguno'}")
    
    # Analizar imágenes descargadas
    assets_dir = DATA_DIR / "raw/assets"
    if assets_dir.exists():
        image_files = list(assets_dir.glob("*"))
        print(f"\n🖼️  Imágenes descargadas: {len(image_files)}")
        
        for img_file in image_files:
            if img_file.is_file():
                size_kb = img_file.stat().st_size / 1024
                results['images'].append({
                    'filename': img_file.name,
                    'size_kb': round(size_kb, 2),
                    'extension': img_file.suffix
                })
                print(f"  🖼️  {img_file.name} ({size_kb:.1f} KB)")
    
    # Contenido útil identificado
    results['brands_mentioned'] = list(set(results['brands_mentioned']))
    results['services_mentioned'] = list(set(results['services_mentioned']))
    
    # Extraer contenido de texto limpio
    print("\n" + "=" * 60)
    print("CONTENIDO ÚTIL IDENTIFICADO")
    print("=" * 60)
    
    print(f"\n🏷️  Marcas detectadas: {', '.join(results['brands_mentioned'])}")
    print(f"🔧 Servicios detectados: {', '.join(results['services_mentioned'])}")
    
    # Guardar análisis
    output_file = OUTPUT_DIR / "content_analysis.json"
    output_file.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding='utf-8')
    
    print(f"\n✅ Análisis guardado en: {output_file}")
    
    return results

def extract_key_content():
    """Extraer contenido clave para reutilización."""
    print("\n" + "=" * 60)
    print("EXTRAYENDO CONTENIDO CLAVE")
    print("=" * 60)
    
    key_content = {
        'company_info': {},
        'services': {},
        'contact': {},
        'logos': [],
        'images': []
    }
    
    # Revisar imágenes para identificar logos
    assets_dir = DATA_DIR / "raw/assets"
    if assets_dir.exists():
        for img_file in assets_dir.glob("*"):
            if img_file.is_file():
                # Identificar posibles logos por nombre o tamaño
                if img_file.suffix in ['.png', '.svg']:
                    key_content['logos'].append(str(img_file))
                else:
                    key_content['images'].append(str(img_file))
    
    print(f"\n🎯 Logos potenciales: {len(key_content['logos'])}")
    print(f"🖼️  Imágenes generales: {len(key_content['images'])}")
    
    # Guardar contenido clave
    key_file = OUTPUT_DIR / "key_content.json"
    key_file.write_text(json.dumps(key_content, indent=2), encoding='utf-8')
    
    print(f"\n✅ Contenido clave guardado en: {key_file}")
    
    return key_content

if __name__ == '__main__':
    analysis = analyze_content()
    key = extract_key_content()
    
    print("\n" + "=" * 60)
    print("RESUMEN FINAL")
    print("=" * 60)
    print(f"📊 Páginas analizadas: {len(analysis['pages'])}")
    print(f"🖼️  Imágenes descargadas: {len(analysis['images'])}")
    print(f"🏷️  Marcas identificadas: {len(analysis['brands_mentioned'])}")
    print(f"🔧 Servicios identificados: {len(analysis['services_mentioned'])}")
    print(f"\n✅ Proceso completo. Datos listos para uso en nuevo sitio.")
