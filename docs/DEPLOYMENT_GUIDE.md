# Guía de Despliegue - Nexos Ingeniería

## Requisitos Previos

- Node.js 20+
- npm
- Acceso FTP a Hostinger
- Credenciales de Sanity
- Credenciales de EmailJS

## Variables de Entorno

Crear archivo `.env.local`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-04-29

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key

# Site URL
NEXT_PUBLIC_SITE_URL=https://nexosingenieria.com
```

## Proceso de Build

1. **Instalar dependencias**:
```bash
npm install
```

2. **Generar build de producción**:
```bash
npm run build
```

Este comando:
- Optimiza imágenes (WebP/AVIF)
- Genera sitemap.xml
- Compila el sitio estático en `out/`

## Despliegue en Hostinger

### Opción 1: Script Automático

1. Configurar credenciales en `scripts/deploy.sh`:
```bash
HOSTINGER_HOST="ftp.nexosingenieria.com"
HOSTINGER_USER="tu-usuario"
HOSTINGER_PASS="tu-contraseña"
```

2. Ejecutar:
```bash
./scripts/deploy.sh
```

### Opción 2: FTP Manual

1. Conectar al servidor FTP:
   - Host: `ftp.nexosingenieria.com`
   - Puerto: 21
   - Modo: Pasivo

2. Navegar a `public_html/`

3. Subir contenido de carpeta `out/`:
   - Sobrescribir archivos existentes
   - Mantener estructura de directorios

4. Verificar permisos:
   - Archivos: 644
   - Carpetas: 755

### Opción 3: Git (si disponible)

Si Hostinger soporta Git:
```bash
git push hostinger main
```

## Verificación Post-Despliegue

### 1. Funcionalidad Básica

- [ ] Homepage carga correctamente
- [ ] Navegación funciona
- [ ] Formularios envían datos
- [ ] Imágenes se visualizan
- [ ] Enlaces internos funcionan

### 2. SEO

- [ ] Sitemap accesible: `/sitemap.xml`
- [ ] Robots.txt accesible: `/robots.txt`
- [ ] Meta tags presentes
- [ ] Schema.org markup funciona

### 3. Performance

- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Imágenes optimizadas
- [ ] Lazy loading funciona

### 4. Responsive

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)

## Rollback

Si algo sale mal:

1. Mantener backup anterior en `public_html_backup/`
2. Restaurar desde backup:
```bash
# Via SSH (si disponible)
cp -r public_html_backup/* public_html/
```

## Configuración de DNS

Si es necesario apuntar dominio:

1. Acceder panel de Hostinger
2. Ir a "Dominios" > "DNS Zone Editor"
3. Verificar que el dominio apunte al servidor correcto
4. Esperar propagación (hasta 48 horas)

## SSL/HTTPS

1. En Hostinger panel, ir a "SSL"
2. Activar SSL para el dominio
3. Forzar HTTPS redirección
4. Verificar certificado válido

## Monitoreo

### Google Search Console

1. Acceder: https://search.google.com/search-console
2. Añadir propiedad: `nexosingenieria.com`
3. Verificar propiedad (via HTML tag o DNS)
4. Subir sitemap.xml
5. Monitorear errores de indexación

### Google Analytics

1. Verificar GA4 está recibiendo datos
2. Revisar eventos personalizados
3. Configurar goals/conversiones

## Mantenimiento Regular

### Mensual
- [ ] Revisar logs de errores
- [ ] Actualizar dependencias: `npm update`
- [ ] Verificar enlaces rotos
- [ ] Revisar performance en Lighthouse

### Trimestral
- [ ] Actualizar contenido obsoleto
- [ ] Revisar y optimizar imágenes nuevas
- [ ] Analizar métricas de Analytics
- [ ] Hacer backup de base de datos Sanity

## Solución de Problemas

### Error 404 en rutas
- Verificar `next.config.ts` tenga output: 'export'
- Asegurar que todas las rutas usen generateStaticParams

### Imágenes no cargan
- Verificar que las imágenes WebP existan en `public/images/`
- Comprobar que el script de optimización se ejecutó

### Formularios no funcionan
- Verificar variables de EmailJS
- Revisar consola del navegador por errores
- Confirmar que el template de EmailJS está activo

## Contacto de Soporte

- **Desarrollo**: soporte@nexosingenieria.com
- **Hostinger**: Soporte via panel de control
- **Sanity**: docs.sanity.io

## Checklist Final

Antes de considerar el sitio "live":

- [ ] Build exitoso sin errores
- [ ] Deploy completado
- [ ] DNS configurado
- [ ] SSL activo
- [ ] Search Console configurado
- [ ] Analytics funcionando
- [ ] Formularios testeados
- [ ] Responsive verificado
- [ ] Lighthouse score > 80
- [ ] Contenido revisado y aprobado
