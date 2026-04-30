# Nexos Ingeniería - Sitio Web

Sitio web corporativo de Nexos Ingeniería SAS - Especialistas en integración tecnológica y Smart Buildings.

## 🚀 Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Sanity CMS** - Gestión de contenido
- **EmailJS** - Formularios de contacto
- **Sharp** - Optimización de imágenes

## 📋 Requisitos Previos

- Node.js 20+
- npm o yarn
- Cuenta en Sanity.io
- Cuenta en EmailJS (para formularios)
- Cuenta en Google Analytics (opcional)

## 🔧 Configuración

1. **Clonar el repositorio**:
```bash
git clone https://github.com/tu-usuario/nexosingenieria-web.git
cd nexosingenieria-web
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp .env.production .env.local
```

Editar `.env.local` con tus credenciales:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - ID del proyecto Sanity
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset (production)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - Service ID de EmailJS
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - Template ID de EmailJS
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - Public Key de EmailJS
- `NEXT_PUBLIC_GA_ID` - ID de Google Analytics (opcional)
- `NEXT_PUBLIC_SITE_URL` - URL del sitio (https://nexosingenieria.com)

## 🏗️ Build para Producción

El sitio se genera como estático para Hostinger:

```bash
npm run build
```

Esto genera la carpeta `out/` con todos los archivos estáticos listos para subir.

## 📤 Despliegue en Hostinger

### Opción 1: Script Automático

1. Configurar credenciales FTP en `scripts/deploy.sh`
2. Ejecutar:
```bash
./scripts/deploy.sh
```

### Opción 2: Manual (FTP)

1. Conectar via FTP al servidor Hostinger
2. Subir el contenido de la carpeta `out/` a `public_html/`
3. Verificar permisos de archivos (644) y carpetas (755)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Rutas de Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── soluciones/        # Páginas de servicios
│   ├── proyectos/         # Case studies
│   ├── blog/              # Artículos
│   ├── contacto/          # Formulario de contacto
│   └── cotizar/           # Solicitar cotización
├── components/
│   ├── ui/                # Componentes reutilizables
│   ├── layout/            # Header, Footer, Layouts
│   ├── sections/          # Secciones de página
│   └── schema/            # Schema.org markup
├── lib/                   # Utilidades
├── data/                  # Datos estáticos
└── types/                 # Tipos TypeScript

public/                    # Assets estáticos
├── images/               # Imágenes optimizadas
├── sitemap.xml          # Sitemap generado
└── robots.txt           # Reglas para crawlers

scripts/
├── optimize-images.js   # Optimización de imágenes
└── generate-sitemap.js  # Generación de sitemap
```

## 🎨 Sistema de Diseño

### Colores
- `--color-bg-primary`: #0a0e1a (Fondo principal)
- `--color-bg-secondary`: #111827 (Fondo secundario)
- `--color-accent`: #00d4ff (Acento cyan)
- `--color-accent-warm`: #f59e0b (Acento ámbar)
- `--color-text-primary`: #f9fafb (Texto principal)
- `--color-text-secondary`: #9ca3af (Texto secundario)

### Tipografía
- **Display**: Space Grotesk
- **Body**: Inter

## 🔍 SEO

- **Sitemap**: Generado automáticamente en `/sitemap.xml`
- **Robots.txt**: Permitido todo el sitio público
- **Schema.org**: Organization, LocalBusiness, Service, Article
- **Open Graph**: Imagen por defecto 1200x630
- **Canonical URLs**: Configuradas en layout
- **Hreflang**: es-CO

## ♿ Accesibilidad

- Skip-to-content link
- Navegación por teclado
- ARIA labels
- Contraste WCAG AA
- Imágenes con alt text
- Lazy loading nativo

## 💻 Desarrollador

**Desarrollado por:** [BaconHacks.com](https://baconhacks.com)

### Sobre BaconHacks

BaconHacks es un estudio de desarrollo web especializado en crear experiencias digitales de alto rendimiento. Nos enfocamos en:

- **Desarrollo Web Moderno** - Utilizando las últimas tecnologías (Next.js, React, TypeScript)
- **Optimización de Performance** - Core Web Vitals, lazy loading, optimización de imágenes
- **SEO Técnico Avanzado** - Schema.org, sitemaps dinámicos, metadata optimizada
- **Accesibilidad (a11y)** - Cumplimiento WCAG 2.1 AA
- **Diseño Responsivo** - Mobile-first, adaptable a todos los dispositivos
- **CMS Headless** - Integración con Sanity, Contentful, Strapi

### Servicios Ofrecidos

- Desarrollo de sitios web corporativos
- E-commerce (Shopify, WooCommerce, custom)
- Aplicaciones web progresivas (PWA)
- Optimización SEO y performance
- Migración de sitios legacy a arquitecturas modernas
- Integración con CRM y sistemas de marketing

### Contacto del Desarrollador

- **Website**: [baconhacks.com](https://baconhacks.com)
- **Email**: info@baconhacks.com
- **GitHub**: [@baconhacks](https://github.com/baconhacks)

---

## 📞 Contacto del Proyecto

Para soporte técnico:
- Email: soporte@nexosingenieria.com
- Teléfono: +57 (6) 123-4567

## 📄 Licencia

Proyecto interno de Nexos Ingeniería SAS.

---

**Desarrollado con ❤️ por BaconHacks para Nexos Ingeniería SAS**
