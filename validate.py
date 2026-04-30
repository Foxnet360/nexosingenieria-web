#!/usr/bin/env python3
"""Validation script for scraped data."""

import json
import sys
from pathlib import Path
import yaml


def validate_scraped_data(config_path='config.yaml'):
    """Validate completeness and integrity of scraped data."""
    
    with open(config_path) as f:
        config = yaml.safe_load(f)
    
    print("=" * 60)
    print("VALIDACIÓN DE DATOS EXTRAÍDOS")
    print("=" * 60)
    
    issues = []
    warnings = []
    
    # 1. Check raw pages
    print("\n1. Verificando páginas HTML descargadas...")
    raw_pages_dir = Path(config['paths']['raw_pages'])
    if raw_pages_dir.exists():
        html_files = list(raw_pages_dir.glob('*.html'))
        print(f"   ✓ Encontradas {len(html_files)} páginas HTML")
        if not html_files:
            issues.append("No se encontraron archivos HTML")
    else:
        issues.append("Directorio de páginas raw no existe")
    
    # 2. Check images
    print("\n2. Verificando imágenes descargadas...")
    assets_dir = Path(config['paths']['raw_assets'])
    if assets_dir.exists():
        image_files = list(assets_dir.rglob('*'))
        image_files = [f for f in image_files if f.is_file()]
        print(f"   ✓ Encontradas {len(image_files)} imágenes/assets")
    else:
        warnings.append("Directorio de assets no existe")
    
    # 3. Check metadata
    print("\n3. Verificando metadatos...")
    metadata_file = Path(config['paths']['processed_metadata']) / 'download_metadata.json'
    if metadata_file.exists():
        with open(metadata_file) as f:
            metadata = json.load(f)
        print(f"   ✓ Metadatos de descarga: {metadata.get('total_pages', 0)} páginas, {metadata.get('total_images', 0)} imágenes")
    else:
        issues.append("Archivo de metadatos no encontrado")
    
    # 4. Check parsed content
    print("\n4. Verificando contenido parseado...")
    content_file = Path(config['paths']['processed_content']) / 'classified_content.json'
    if content_file.exists():
        with open(content_file) as f:
            content = json.load(f)
        print(f"   ✓ Contenido clasificado: {len(content)} páginas")
        
        # Check categories
        categories = {}
        for page in content:
            for cat in page.get('categories', []):
                categories[cat] = categories.get(cat, 0) + 1
        print(f"   ✓ Categorías detectadas:")
        for cat, count in categories.items():
            print(f"     - {cat}: {count} páginas")
    else:
        issues.append("Archivo de contenido clasificado no encontrado")
    
    # 5. Check SEO analysis
    print("\n5. Verificando análisis SEO...")
    seo_file = Path(config['paths']['processed_metadata']) / 'seo_analysis.json'
    if seo_file.exists():
        with open(seo_file) as f:
            seo_data = json.load(f)
        summary = seo_data.get('report', {}).get('summary', {})
        print(f"   ✓ Análisis SEO disponible")
        print(f"     - Páginas totales: {summary.get('total_pages', 0)}")
        print(f"     - Páginas sin meta description: {summary.get('pages_missing_meta_description', 0)}")
        print(f"     - Páginas huérfanas: {summary.get('orphan_pages', 0)}")
    else:
        warnings.append("Archivo de análisis SEO no encontrado")
    
    # 6. Check exports
    print("\n6. Verificando exportaciones...")
    json_dir = Path(config['paths']['exports_json'])
    csv_dir = Path(config['paths']['exports_csv'])
    md_dir = Path(config['paths']['exports_markdown'])
    
    if json_dir.exists():
        json_files = list(json_dir.glob('*.json'))
        print(f"   ✓ Exportaciones JSON: {len(json_files)} archivos")
    else:
        warnings.append("Directorio de exportaciones JSON no existe")
    
    if csv_dir.exists():
        csv_files = list(csv_dir.glob('*.csv'))
        print(f"   ✓ Exportaciones CSV: {len(csv_files)} archivos")
    else:
        warnings.append("Directorio de exportaciones CSV no existe")
    
    if md_dir.exists():
        md_files = list(md_dir.glob('*.md'))
        print(f"   ✓ Exportaciones Markdown: {len(md_files)} archivos")
    else:
        warnings.append("Directorio de exportaciones Markdown no existe")
    
    # Summary
    print("\n" + "=" * 60)
    print("RESUMEN DE VALIDACIÓN")
    print("=" * 60)
    
    if issues:
        print(f"\n❌ Errores encontrados: {len(issues)}")
        for issue in issues:
            print(f"   - {issue}")
    
    if warnings:
        print(f"\n⚠️  Advertencias: {len(warnings)}")
        for warning in warnings:
            print(f"   - {warning}")
    
    if not issues and not warnings:
        print("\n✅ Todos los datos validados correctamente")
        return True
    elif not issues:
        print("\n✅ Datos válidos con advertencias menores")
        return True
    else:
        print("\n❌ Validación fallida - se requiere atención")
        return False


if __name__ == '__main__':
    success = validate_scraped_data()
    sys.exit(0 if success else 1)
