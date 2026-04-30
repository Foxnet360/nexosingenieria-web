## Why

Se requiere integrar los datos estratégicos extraídos del sitio web actual de Nexos Ingeniería (nexosingenieria.com) al nuevo sitio Next.js. Los datos scrapeados incluyen contenido textual, imágenes de proyectos, logo institucional y información de contacto que deben ser incorporados para mantener la identidad corporativa y enriquecer el nuevo sitio con contenido real y verificado de la empresa.

## What Changes

- **Integración de contenido textual scrapeado**: Incorporar textos descriptivos de servicios, historia de la empresa y propuesta de valor extraídos del sitio actual al nuevo sitio Next.js
- **Importación de activos visuales**: Integrar logo principal (a62620140bf6.png) y 7 fotografías de proyectos descargadas del sitio original
- **Optimización de assets**: Adaptar el logo al diseño del nuevo sitio y buscar versiones de mayor resolución de las fotografías de proyectos
- **Actualización de datos corporativos**: Corregir año de fundación a 2005 y actualizar información de contacto con datos reales (teléfono, dirección, redes sociales)
- **Creación de archivo de datos centralizado**: Implementar `src/data/scraped-content.ts` como fuente única de datos scrapeados para consumo por componentes
- **Mejora de contenido con reporte estratégico**: Complementar textos extraídos con información adicional del reporte estratégico (report.md) para enriquecer descripciones

## Capabilities

### New Capabilities
- `content-integration`: Sistema de integración de datos scrapeados al sitio Next.js mediante archivo centralizado de datos tipados
- `asset-optimization`: Proceso de optimización de imágenes descargadas incluyendo adaptación de logo y búsqueda de alta resolución
- `data-enrichment`: Enriquecimiento de contenido textual combinando datos scrapeados con insights del reporte estratégico

### Modified Capabilities
<!-- No existen capacidades previas que requieran modificación -->

## Impact

- **Páginas afectadas**: `/nosotros`, `/contacto`, `/soluciones/*`, `/proyectos`, página principal
- **Componentes modificados**: `ClientLogos`, `ProjectsSection`, `DifferentiatorsSection`, `PartnersSection`, `ContactoForm`
- **Nuevos archivos**: `src/data/scraped-content.ts`, activos en `public/images/`
- **Datos actualizados**: Metadata SEO, información de contacto, descripciones de servicios, año de fundación
- **Sin breaking changes**: Todas las modificaciones son adiciones o mejoras de contenido existente
