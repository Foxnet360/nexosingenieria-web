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

## Despliegue en Railway (Producción Actual)

El despliegue del frontend se realiza en Railway mediante Nixpacks (`railway.json`).

### 1. Variables de Entorno en Railway

Configurar en Railway Dashboard > Servicio > **Variables**:

- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://nexosingenieria.com`
- Variables de Sanity y EmailJS según `.env.production`.

### 2. Configuración de Dominio Personalizado en Railway

1. Ir a **Settings** > **Networking** > **Custom Domain**.
2. Agregar:
   - `nexosingenieria.com`
   - `www.nexosingenieria.com`
3. Railway generará un registro CNAME (ej. `xxxx.up.railway.app`) y un registro TXT de verificación `_railway-verify`.

---

## Configuración de DNS en Hostinger (Preservando Correos)

Para apuntar la web a Railway sin afectar los correos del hosting compartido (`45.79.23.185`):

### 1. Pre-cargar registros en Hostinger DNS Zone Editor

Antes de cambiar los Name Servers, registrar en Hostinger:

| Tipo    | Nombre                | Valor / Destino                                                                     | Propósito                         |
| :------ | :-------------------- | :---------------------------------------------------------------------------------- | :-------------------------------- |
| `A`     | `mail`                | `45.79.23.185`                                                                      | IP directa del servidor de correo |
| `MX`    | `@`                   | `mail.nexosingenieria.com` (Prioridad 0)                                            | Servidor de correo desacoplado    |
| `A`     | `webmail`             | `45.79.23.185`                                                                      | Acceso a Webmail                  |
| `A`     | `cpanel`              | `45.79.23.185`                                                                      | Acceso a cPanel del hosting       |
| `TXT`   | `@`                   | `v=spf1 ip4:45.79.23.185 include:relay.mailbaby.net ip4:104.237.139.26 +a +mx ~all` | SPF                               |
| `TXT`   | `default._domainkey`  | `v=DKIM1; k=rsa; p=MIIBIjAN...`                                                     | Clave DKIM actual                 |
| `TXT`   | `_railway-verify`     | `railway-verify=efdff7753bd0c5b201fcc948ab5f4fc143ef602c4e2279e2d381126b65d8b299`   | Verificación Railway raíz         |
| `TXT`   | `_railway-verify.www` | `railway-verify=0638f6e805dab42456f865c34380953055c5bcd871145662ad8d958ee6879b49`   | Verificación Railway www          |
| `CNAME` | `@`                   | `bpc0gbwm.up.railway.app`                                                           | Tráfico web raíz a Railway        |
| `CNAME` | `www`                 | `0ghcyot7.up.railway.app`                                                           | Tráfico www a Railway             |

### 2. Cambiar Name Servers a Hostinger

1. En Hostinger > **Dominios** > `nexosingenieria.com` > **Servidores de nombres**.
2. Seleccionar **Usar servidores de nombres de Hostinger** (`ns1.dns-parking.com` / `ns2.dns-parking.com`).

### 3. Verificación Automatizada

Ejecutar el script de auditoría en cualquier momento:

```bash
./scripts/verify-dns.sh
```

---

## Despliegue en Hostinger (Legacy / Fallback FTP)

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
