# Estrategia Integral de Posicionamiento SEO & SEM — Nexos Ingeniería S.A.S.

## 1. Resumen Ejecutivo y Diagnóstico Técnico

Nexos Ingeniería S.A.S. cuenta con una arquitectura web moderna construida en **Next.js 16 (App Router + React 19)** con renderizado estático híbrido (SSG/SSR), optimización automática de imágenes vía `sharp`, y marcado semántico avanzado enriquecido con JSON-LD (Schema.org: `Organization`, `LocalBusiness`, `Article`, `Service`).

Esta infraestructura técnica garantiza un puntaje Core Web Vitals de primer nivel (LCP < 1.2s, FID < 50ms, CLS = 0), lo que posiciona al sitio con ventaja competitiva frente a los competidores tradicionales del sector de ingeniería y telecomunicaciones.

---

## 2. Alineación y Preparación con Google Analytics 4 (GA4)

### Implementación Actual

- El script de GA4 está desacoplado e inyectado con `next/script` (`strategy="afterInteractive"`) en `src/app/layout.tsx`.
- Para activarlo en producción basta con establecer la variable de entorno en Railway / Vercel / Servidor:
  ```env
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  ```

### Eventos de Conversión Clave Instrumentados:

1. `form_submit`:
   - `contacto`: Envío del formulario principal de contacto.
   - `cotizar`: Radicación de requerimiento con presupuesto y tamaño de proyecto.
   - `newsletter`: Suscripción a boletines técnicos.
2. `contact_click`:
   - `whatsapp`: Clic en el botón flotante con mensaje predefinido.
   - `phone` / `email`: Clics directos `tel:` y `mailto:`.
3. `cta_click`:
   - Clics en botones principales de llamada a la acción en Hero, páginas de Soluciones y Casos de Éxito.
4. `blog_read` & `scroll_depth`:
   - Medición de engagement y tiempo de permanencia en guías técnicas de ingeniería.

---

## 3. Estrategia SEO Orgánica (Search Engine Optimization) & GEO (Generative Engine Optimization)

### A. Pilares de Contenido (Topic Clusters)

1. **Cluster 1: Cableado Estructurado y Fibra Óptica**
   - _Pilar:_ `/soluciones/cableado-estructurado`
   - _Satélites:_ Guías de certificación Fluke DSX-8000, diferencias entre Cat 6A vs Cat 7, normativa RETIE / NTC 2050.
2. **Cluster 2: Edificios Inteligentes & BMS (Building Management Systems)**
   - _Pilar:_ `/soluciones/domotica`
   - _Satélites:_ Ahorro energético corporativo con protocolos BACnet/Modbus, control de iluminación inteligente DALI.
3. **Cluster 3: Centros de Datos de Alta Disponibilidad**
   - _Pilar:_ `/soluciones/centros-de-datos`
   - _Satélites:_ Enfriamiento de precisión, sistemas contra incendios VESDA / Novec 1230, diseño de racks de alta densidad bajo norma TIA-942.
4. **Cluster 4: Seguridad Electrónica & Control de Acceso**
   - _Pilar:_ `/soluciones/seguridad-electronica` y `/soluciones/control-acceso`
   - _Satélites:_ CCTV con inteligencia artificial perimetral, biometría facial, integración de torniquetes vehiculares y peatonales.

### B. GEO (Optimización para Motores de IA: ChatGPT, Claude, Perplexity, Gemini)

- Manifiesto `llms.txt` y `.well-known/llms.txt` publicado y actualizado con especificaciones corporativas, directores e historial de proyectos emblemáticos (EDEQ Grupo EPM, UNAD, Centro Empresarial Ícono).
- Robots.txt configurado para dar acceso sin restricciones a rastreadores de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `CCBot`, `Google-Extended`).

---

## 4. Estrategia SEM (Google Ads / Campañas de Búsqueda de Alta Intención)

### A. Enfoque de Campañas B2B

El público objetivo de Nexos Ingeniería está compuesto por:

- Gerentes de Operaciones y TI (CTO, CIO, Directores de Tecnología).
- Constructores, firmas de interventoría y directores de obra.
- Administradores de centros empresariales, parques industriales, clínicas y entidades públicas.

### B. Países y Geotargeting Prioritario

1. **Tier 1 (Principal - Máxima Rentabilidad y Cobertura Operativa Directa):**
   - **Colombia:**
     - _Eje Cafetero:_ Armenia, Pereira, Manizales.
     - _Región Andina / Capital:_ Bogotá D.C., Medellín, Cali.
     - _Ciudades intermedias industriales:_ Ibagué, Barranquilla, Bucaramanga.

2. **Tier 2 (Proyectos de Expansión / Licitaciones / Consultoría Técnica Especializada):**
   - **Panamá:** Alta demanda de certificaciones de cableado en torres de oficinas, logística y centros bancarios.
   - **Ecuador (Quito, Guayaquil):** Demanda en proyectos de infraestructura energética y telecomunicaciones corporativas.
   - **Perú (Lima):** Minería, banca y centros empresariales con necesidad de automatización BMS y centros de datos.
   - **Estados Unidos / Florida (Nearshoring):** Empresas con sedes remotas o centros de soporte en Colombia que contratan el montaje de infraestructura local desde el extranjero.

---

## 5. Matriz de Palabras Clave (Google Ads / Google Search)

### Campaña 1: Cableado Estructurado y Redes (B2B Intent)

| Palabra Clave                                 | Tipo de Concordancia | Intención de Búsqueda      | Página de Destino Recomendada       |
| :-------------------------------------------- | :------------------- | :------------------------- | :---------------------------------- |
| `empresa de cableado estructurado colombia`   | `"Frase"`            | Transaccional / Cotización | `/soluciones/cableado-estructurado` |
| `instalacion de cableado estructurado cat 6a` | `"Frase"`            | Transaccional Técnica      | `/soluciones/cableado-estructurado` |
| `certificacion fluke networks colombia`       | `+Amplia modificada` | Comercial Especializada    | `/soluciones/cableado-estructurado` |
| `redes de fibra optica para empresas`         | `"Frase"`            | Transaccional              | `/soluciones/cableado-estructurado` |
| `[cableado estructurado armenia]`             | `[Exacta]`           | Local Alta Intención       | `/soluciones/cableado-estructurado` |

### Campaña 2: Building Management Systems (BMS) & Eficiencia Energética

| Palabra Clave                                       | Tipo de Concordancia | Intención de Búsqueda  | Página de Destino Recomendada                |
| :-------------------------------------------------- | :------------------- | :--------------------- | :------------------------------------------- |
| `sistemas bms para edificios`                       | `"Frase"`            | Comercial B2B          | `/soluciones/domotica`                       |
| `automatizacion de edificios inteligentes colombia` | `"Frase"`            | Solución Corporativa   | `/soluciones/domotica`                       |
| `eficiencia energetica edificios corporativos`      | `"Frase"`            | Consultiva / Ahorro    | `/blog/reducir-consumo-energetico-edificios` |
| `control de iluminacion dali bms`                   | `+Amplia modificada` | Especificación Técnica | `/soluciones/domotica`                       |

### Campaña 3: Centros de Datos & Seguridad Electrónica

| Palabra Clave                                     | Tipo de Concordancia | Intención de Búsqueda | Página de Destino Recomendada       |
| :------------------------------------------------ | :------------------- | :-------------------- | :---------------------------------- |
| `diseno de cuartos de datos tia 942`              | `"Frase"`            | Alta Ingeniería       | `/soluciones/centros-de-datos`      |
| `instalacion de cctv empresarial colombia`        | `"Frase"`            | Transaccional         | `/soluciones/seguridad-electronica` |
| `control de acceso biometrico para edificios`     | `"Frase"`            | Transaccional         | `/soluciones/control-acceso`        |
| `sistema contra incendios novec 1230 datacenters` | `"Frase"`            | Crítica / Licitación  | `/soluciones/centros-de-datos`      |

### Palabras Clave Negativas (Obligatorias para no quemar presupuesto):

- `gratis`, `cursos`, `tutorial`, `que es`, `descargar`, `ofertas de empleo`, `trabajo`, `sena`, `pdf manual`, `cable utp mercado libre`, `precio metro cable homecenter`.

---

## 6. Integración y Ajuste de la Tecnología Desarrollada

| Componente                              | Estado Técnico                                | Alineación SEO / SEM                                                                                                                 |
| :-------------------------------------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Páginas de Destino (Landing Pages)**  | Next.js 16 SSG                                | Carga instantánea; eleva el **Quality Score** en Google Ads, reduciendo el Costo por Clic (CPC).                                     |
| **Formulario `/cotizar` y `/contacto`** | Persistencia PostgreSQL + Notificación SMTP   | Redirige o confirma en pantalla con disparador `analytics.formSubmit` para conversión directa en GA4.                                |
| **Botón Flotante de WhatsApp**          | `analytics.contactClick('whatsapp')`          | Captura leads con menor fricción desde tráfico móvil pagado.                                                                         |
| **Metadatos & OpenGraph**               | `src/lib/metadata.ts`                         | Títulos dinámicos optimizados para CTR en SERP y vistas previas enriquecidas en LinkedIn/WhatsApp.                                   |
| **Datos Estructurados JSON-LD**         | Organization + LocalBusiness + Article        | Permite snippets enriquecidos en Google y citación en respuestas de IA.                                                              |
| **Consola Oculta `/admin`**             | Autenticación privada con `noindex, nofollow` | Permite al equipo comercial ver leads inmediatamente para responder en menos de 15 minutos (aumentando la tasa de cierre comercial). |
