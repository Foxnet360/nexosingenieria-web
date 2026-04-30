## Why

Nexos Ingeniería SAS requiere extraer datos estratégicos de su sitio web actual (nexosingenieria.com) para alimentar la transformación digital del nuevo sitio. El sitio actual contiene información valiosa sobre servicios, proyectos, marcas/partners y contenido corporativo que debe ser migrado o utilizado como referencia para el nuevo diseño. Realizar este scraping de forma estructurada nos permitirá catalogar activos digitales existentes, identificar contenido reutilizable y documentar la arquitectura de información actual antes de la migración.

## What Changes

- **Extracción automatizada de contenido web**: Implementar un scraper que navegue nexosingenieria.com y extraiga texto, imágenes, metadatos y estructura de páginas
- **Catalogación de servicios y soluciones**: Capturar descripciones detalladas de las tres líneas de servicio (seguridad electrónica, cableado estructurado, automatización) y sus subservicios
- **Recopilación de información de partners/marcas**: Extraer logos, descripciones y relaciones con fabricantes (Hikvision, Dahua, Panduit, CommScope, Control4, etc.)
- **Documentación de proyectos**: Obtener información de case studies/proyectos realizados con fotografías y descripciones
- **Generación de dataset estructurado**: Exportar todos los datos extraídos en formato JSON/CSV para su uso por el equipo de diseño y contenido
- **Análisis SEO técnico básico**: Extraer meta tags, títulos y estructura de URLs para análisis de posicionamiento actual

## Capabilities

### New Capabilities
- `web-scraper`: Herramienta de extracción automatizada de contenido web con soporte para múltiples formatos de salida
- `content-catalog`: Sistema de catalogación y clasificación de activos digitales extraídos (texto, imágenes, metadatos)
- `data-exporter`: Exportación de datos estructurados en formatos estándar (JSON, CSV, Markdown) para consumo por otros sistemas
- `seo-analyzer`: Análisis básico de estructura SEO y metadatos del sitio actual

### Modified Capabilities
<!-- No existen capacidades previas que requieran modificación -->

## Impact

- **Código**: Nuevo módulo de scraping independiente, sin modificar el sitio web actual ni el nuevo proyecto web
- **Datos**: Generación de archivos de datos locales en `/data/scraped/` que alimentarán el proceso de diseño de contenido
- **Dependencias**: Requiere conectividad a internet y acceso a nexosingenieria.com; posible uso de librerías como BeautifulSoup, Scrapy o Playwright
- **Sistemas**: No afecta sistemas en producción; trabajo completamente offline una vez extraídos los datos
- **Seguridad**: Scraping respetuoso con rate limiting para no afectar el sitio en producción
