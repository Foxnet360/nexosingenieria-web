const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITE_URL = 'https://nexosingenieria.com';

// Static routes
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/soluciones', priority: '0.9', changefreq: 'weekly' },
  { path: '/soluciones/cableado-estructurado', priority: '0.8', changefreq: 'monthly' },
  { path: '/soluciones/seguridad-electronica', priority: '0.8', changefreq: 'monthly' },
  { path: '/soluciones/audio-video', priority: '0.8', changefreq: 'monthly' },
  { path: '/soluciones/domotica', priority: '0.8', changefreq: 'monthly' },
  { path: '/soluciones/centros-de-datos', priority: '0.7', changefreq: 'monthly' },
  { path: '/soluciones/control-acceso', priority: '0.7', changefreq: 'monthly' },
  { path: '/soluciones/mantenimiento', priority: '0.7', changefreq: 'monthly' },
  { path: '/industrias', priority: '0.9', changefreq: 'weekly' },
  { path: '/proyectos', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contacto', priority: '0.8', changefreq: 'monthly' },
  { path: '/cotizar', priority: '0.8', changefreq: 'monthly' },
  { path: '/nosotros', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { path: '/terminos', priority: '0.3', changefreq: 'yearly' },
  { path: '/politica-datos', priority: '0.3', changefreq: 'yearly' },
];

// Dynamic routes (blog posts)
const blogPosts = [
  { slug: 'guia-cableado-estructurado-empresas-colombianas', date: '2024-01-15' },
  { slug: '5-tendencias-seguridad-electronica-2026', date: '2024-02-01' },
  { slug: 'reducir-consumo-energetico-edificios', date: '2024-02-15' },
  { slug: 'diseno-salas-juntas-tecnologia-av', date: '2024-03-01' },
  { slug: 'checklist-infraestructura-red-edificios-inteligentes', date: '2024-03-15' },
];

// Dynamic routes (projects)
const projects = [
  { slug: 'edeq-sedes-y-bms', date: '2024-02-01' },
  { slug: 'unad-edificio-celestino-mutis', date: '2024-01-25' },
  { slug: 'centro-empresarial-icono', date: '2024-01-15' },
  { slug: 'seniors-club-pance', date: '2023-11-20' },
  { slug: 'subestacion-calarca-edeq', date: '2024-01-20' },
  { slug: 'bosque-residencial-la-pradera', date: '2023-10-10' },
  { slug: 'uci-neonatal-armenia', date: '2023-11-05' },
  { slug: 'inversiones-barake-garcia-ibg', date: '2023-08-20' },
  { slug: 'subestacion-centenario-sil-edeq', date: '2024-02-01' },
  { slug: 'contraloria-bogota', date: '2024-01-10' },
  { slug: 'redes-incendio-conjuntos-uraki', date: '2023-09-10' },
  { slug: 'palacio-de-justicia-armenia', date: '2023-06-15' },
];

// Dynamic routes (industries)
const industries = [
  { slug: 'corporativo', date: '2024-01-01' },
  { slug: 'retail', date: '2024-01-01' },
  { slug: 'salud', date: '2024-01-01' },
  { slug: 'educacion', date: '2024-01-01' },
  { slug: 'industrial', date: '2024-01-01' },
  { slug: 'hospitality', date: '2024-01-01' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add static routes
  for (const route of staticRoutes) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  }
  
  // Add blog posts
  for (const post of blogPosts) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    sitemap += `    <lastmod>${post.date}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.6</priority>\n';
    sitemap += '  </url>\n';
  }
  
  // Add projects
  for (const project of projects) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/proyectos/${project.slug}</loc>\n`;
    sitemap += `    <lastmod>${project.date}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  }
  
  // Add industries
  for (const industry of industries) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/industrias/${industry.slug}</loc>\n`;
    sitemap += `    <lastmod>${industry.date}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  }
  
  sitemap += '</urlset>\n';
  
  return sitemap;
}

function main() {
  console.log('🗺️  Generating sitemap...\n');
  
  const sitemap = generateSitemap();
  const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  
  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📄 Total URLs: ${staticRoutes.length + blogPosts.length + projects.length + industries.length}`);
}

main();
