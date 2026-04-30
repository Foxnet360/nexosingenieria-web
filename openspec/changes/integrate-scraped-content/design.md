## Context

Se requiere integrar datos scrapeados del sitio web actual de Nexos Ingeniería (nexosingenieria.com) al nuevo sitio Next.js. Los datos incluyen: contenido textual, logo institucional, 7 fotografías de proyectos, e información de contacto. El sitio Next.js ya está desarrollado con páginas funcionales (/nosotros, /contacto, /soluciones/*, /proyectos) y componentes reutilizables. La integración debe ser no-invasiva y preservar la arquitectura existente.

## Goals / Non-Goals

**Goals:**
- Crear sistema centralizado de datos scrapeados (`src/data/scraped-content.ts`)
- Integrar logo y fotos al directorio público del proyecto
- Actualizar páginas existentes con contenido real scrapeado
- Enriquecer textos con insights del reporte estratégico (report.md)
- Corregir año de fundación a 2005
- Mantener consistencia de diseño y no romper componentes existentes

**Non-Goals:**
- No modificar la estructura de componentes existentes
- No cambiar el sistema de diseño (Tailwind, colores, tipografía)
- No agregar nuevas dependencias
- No modificar la arquitectura de routing
- No implementar CMS o backend para contenido dinámico

## Decisions

### Decision: Archivo centralizado de datos en TypeScript

**Rationale:** Crear un único archivo `src/data/scraped-content.ts` que exporte todos los datos scrapeados tipados permite que cualquier componente o página los importe fácilmente. Esto evita duplicación y facilita mantenimiento.

**Alternatives considered:**
- JSON files: Menos type-safe, requieren parsing manual
- CMS integration: Overkill para este alcance, requiere backend
- Inline data in components: Difícil de mantener, no reutilizable

### Decision: Copiar assets a public/ en lugar de usar rutas externas

**Rationale:** Copiar imágenes al directorio `public/` del proyecto Next.js garantiza disponibilidad offline, mejor performance (no dependencia de sitio externo), y control total sobre los assets.

**Alternatives considered:**
- Referenciar URLs originales: Riesgo de rotura si el sitio original cambia
- CDN externo: Añade complejidad innecesaria

### Decision: Enriquecer textos manualmente combinando scraped + reporte

**Rationale:** El contenido scrapeado es limitado (solo homepage). El reporte estratégico contiene información detallada sobre servicios, mercado, y posicionamiento. Combinar ambos fuentes produce contenido más completo y estratégico.

**Alternatives considered:**
- Usar solo scraped text: Insuficiente para páginas completas
- Usar solo reporte: Pierde la voz original de la empresa
- Automated NLP enrichment: Complejidad innecesaria, mejor hacer manual

### Decision: Preservar nombres de archivo originales para trazabilidad

**Rationale:** Mantener los nombres hash de las imágenes descargadas (ej: a62620140bf6.png) permite trazabilidad hasta la fuente original. Se pueden crear aliases descriptivos en el código.

## Risks / Trade-offs

**[Risk] Contenido scrapeado insuficiente para todas las páginas** → Mitigation: Complementar con reporte estratégico y marcar secciones que necesitan contenido adicional del cliente.

**[Risk] Imágenes de baja resolución (400x284px)** → Mitigation: Intentar descargar versiones originales de mayor tamaño desde URLs del sitio. Si no es posible, usarlas como placeholders y solicitar al cliente fotos de alta resolución.

**[Risk] Logo no encaja visualmente con nuevo diseño** → Mitigation: El logo es PNG con transparencia, debería funcionar sobre fondos oscuros. Evaluar si necesita ajustes de color o versión simplificada.

**[Risk] Textos scrapeados no coinciden con estructura de componentes existentes** → Mitigation: Adaptar textos a los props que esperan los componentes existentes, no modificar los componentes.

**Trade-off:** Tiempo de implementación vs. Calidad del contenido. Elegimos integrar rápido con lo disponible y mejorar iterativamente.

## Migration Plan

No aplica - este es un proyecto de adición de contenido, no migración de datos.

**Pasos de despliegue:**
1. Ejecutar script de integración que copie assets y genere archivo de datos
2. Actualizar páginas para importar desde `src/data/scraped-content.ts`
3. Verificar visualmente que todo se ve correcto
4. Solicitar al cliente contenido adicional faltante (marcas/partners, email, proyectos detallados)

## Open Questions

- ¿El cliente tiene fotos de mayor resolución disponibles?
- ¿Cuál es el listado completo de marcas/partners que representan?
- ¿Hay email corporativo que no apareció en el scraping?
- ¿Prefieren usar el logo original o diseñar uno nuevo?
