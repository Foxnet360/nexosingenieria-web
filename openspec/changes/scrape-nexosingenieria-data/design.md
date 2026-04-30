## Context

Nexos Ingeniería SAS requiere extraer y catalogar todo el contenido de su sitio web actual (nexosingenieria.com) como parte de la transformación digital del nuevo sitio. El sitio actual es un sitio estático con navegación de una sola página (single-page layout) que incluye secciones de La Empresa, Servicios, Proyectos, Partners, Blog y Contacto.

**Current State:**
- Sitio web estático con aproximadamente 6 secciones principales
- Contenido incluye: texto descriptivo de servicios, fotografías de proyectos, logos de partners, blog con entradas antiguas
- Arquitectura de información plana (single-page)
- No existe infraestructura de scraping previa

**Constraints:**
- El scraping debe ser respetuoso con el sitio en producción (rate limiting)
- Datos extraídos deben ser almacenados localmente para uso offline
- Sin dependencias de sistemas externos (autocontenido)

## Goals / Non-Goals

**Goals:**
- Extraer todo el contenido textual del sitio web
- Descargar y catalogar todas las imágenes (proyectos, logos, fotos)
- Generar datasets estructurados en JSON, CSV y Markdown
- Producir análisis SEO técnico del sitio actual
- Crear sistema modular y reutilizable

**Non-Goals:**
- No modificar el sitio web actual en producción
- No realizar scraping de sitios externos a nexosingenieria.com
- No implementar funcionalidades de monitoreo continuo (one-time extraction)
- No incluir procesamiento OCR de imágenes

## Decisions

### Decision: Python + BeautifulSoup4 + requests para scraping estático

**Rationale:** El sitio nexosingenieria.com es estático sin contenido dinámico generado por JavaScript. BeautifulSoup4 proporciona un parser HTML robusto y fácil de usar, mientras que requests ofrece HTTP simple. Esta combinación es ligera, bien documentada y suficiente para el alcance.

**Alternatives considered:**
- **Scrapy**: Más potente para crawling a gran escala, pero overkill para un sitio pequeño. Mayor curva de aprendizaje.
- **Playwright/Selenium**: Necesario para SPAs con JavaScript, pero innecesario para este sitio estático. Añade overhead de browser.
- **wget/curl + regex**: Muy básico, difícil de parsear estructuralmente el HTML.

### Decision: Estructura de directorios organizada por tipo de contenido

```
data/scraped/
├── raw/                    # HTML original descargado
│   ├── pages/             # Páginas HTML
│   └── assets/            # Imágenes, CSS, JS
├── processed/             # Contenido extraído y estructurado
│   ├── content/          # Texto en formato JSON
│   ├── images/           # Imágenes organizadas por categoría
│   └── metadata/         # Metadatos de extracción
└── exports/              # Archivos de salida generados
    ├── json/             # Exportación JSON completa
    ├── csv/              # Exportaciones CSV tabulares
    └── markdown/         # Contenido en Markdown
```

**Rationale:** Separar datos crudos de procesados permite re-procesar sin re-descargar. La organización por tipo facilita el consumo por diferentes equipos (diseño, contenido, SEO).

### Decision: Pipeline de procesamiento en 3 etapas

1. **Crawl & Download**: Descargar todas las páginas y assets
2. **Parse & Extract**: Extraer contenido estructurado de HTML
3. **Export & Transform**: Generar formatos de salida (JSON, CSV, Markdown)

**Rationale:** Arquitectura pipeline permite debugging incremental y re-ejecución de etapas individuales sin repetir todo el trabajo.

### Decision: Rate limiting configurable (default: 1 req/segundo)

**Rationale:** Prevenir sobrecarga del servidor en producción. Valor conservador que puede ajustarse según respuesta del servidor.

### Decision: Identificación de partners mediante keyword matching

**Rationale:** Los partners (Hikvision, Dahua, Panduit, etc.) se mencionan en el texto. Implementar detección por lista de keywords evita dependencia de estructura HTML específica que puede cambiar.

## Risks / Trade-offs

**[Risk] Cambios en estructura HTML del sitio actual** → Mitigation: El scraper usa selectores CSS flexibles y logging detallado para identificar fallos rápidamente.

**[Risk] Imágenes de baja resolución o protegidas** → Mitigation: Descargar todas las imágenes disponibles y documentar dimensiones. No hay control sobre calidad del origen.

**[Risk] Contenido duplicado entre secciones** → Mitigation: Implementar deduplicación basada en hash de contenido durante la etapa de procesamiento.

**[Risk] Sitio no disponible durante scraping** → Mitigation: Implementar reintentos con backoff exponencial y timeouts razonables.

**Trade-off:** Tiempo de ejecución vs. Respeto al servidor. Elegimos scraping más lento pero ético para no afectar el sitio en producción.

## Migration Plan

No aplica - este es un proyecto de extracción de datos independiente que no modifica sistemas existentes.

**Deployment:**
1. Ejecutar scraping en entorno de desarrollo local
2. Validar datasets generados con equipo de contenido
3. Entregar archivos exportados al equipo de diseño

**Rollback:** No requiere rollback. Los datos extraídos son copias de solo lectura.

## Open Questions

- ¿El sitio tiene protección anti-scraping (Cloudflare, captchas) que no hemos detectado inicialmente?
- ¿Existen recursos (PDFs, videos) que también deban ser extraídos?
- ¿Cuál es el volumen estimado de imágenes en el sitio?
