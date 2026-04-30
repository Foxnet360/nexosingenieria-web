import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { Icon } from '@/components/ui/Icon';
import { notFound } from 'next/navigation';
import { ArticleSchema } from '@/components/schema/OrganizationSchema';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts[params.slug];
  if (!post) {
    return {
      title: 'Artículo no encontrado | Nexos Ingeniería SAS',
    };
  }
  return {
    title: `${post.title} | Nexos Ingeniería SAS`,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

const blogPosts: Record<string, BlogPost> = {
  'guia-cableado-estructurado-empresas-colombianas': {
    id: '1',
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    content: `
<p>El cableado estructurado es la columna vertebral de cualquier infraestructura tecnológica moderna. En Colombia, donde la transformación digital avanza a pasos agigantados, contar con una red bien diseñada e implementada no es un lujo, sino una necesidad estratégica.</p>

<h2>¿Qué es el Cableado Estructurado?</h2>

<p>El cableado estructurado es un sistema de cableado organizado y estandarizado que soporta múltiples usos de hardware, incluyendo voz, datos, video y sistemas de gestión de edificios. A diferencia del cableado tradicional punto a punto, el cableado estructurado está diseñado para ser flexible, escalable y fácil de administrar.</p>

<h2>Estándares y Categorías</h2>

<p>Las categorías más comunes en el mercado colombiano son:</p>

<ul>
  <li><strong>Cat 5e:</strong> Soporta velocidades de hasta 1 Gbps. Adecuada para oficinas pequeñas.</li>
  <li><strong>Cat 6:</strong> Soporta 10 Gbps en distancias cortas. Ideal para la mayoría de empresas.</li>
  <li><strong>Cat 6A:</strong> Soporta 10 Gbps a 100 metros. Recomendada para empresas medianas y grandes.</li>
  <li><strong>Fibra Óptica:</strong> Para backbone y conexiones de alta velocidad entre edificios.</li>
</ul>

<h2>Beneficios para su Empresa</h2>

<p>Implementar un sistema de cableado estructurado certificado ofrece múltiples ventajas:</p>

<ol>
  <li><strong>Escalabilidad:</strong> Facilita la expansión futura de su red sin reemplazar toda la infraestructura.</li>
  <li><strong>Reducción de costos:</strong> Menor tiempo de inactividad y mantenimiento más eficiente.</li>
  <li><strong>Flexibilidad:</strong> Permite reconfigurar espacios de trabajo sin alterar la infraestructura física.</li>
  <li><strong>Preparación para el futuro:</strong> Soporta tecnologías emergentes como IoT y 5G.</li>
</ol>

<h2>Conclusión</h2>

<p>Invertir en un sistema de cableado estructurado de calidad es fundamental para cualquier empresa que quiera mantenerse competitiva en la era digital. No se trata solo de cables, sino de la base que permitirá el crecimiento tecnológico de su organización en los próximos años.</p>
    `,
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '2024-01-15',
    category: 'Cableado Estructurado',
    readTime: '8 min',
    author: 'Equipo Nexos',
  },
  '5-tendencias-seguridad-electronica-2026': {
    id: '2',
    title: '5 Tendencias de Seguridad Electrónica para 2026',
    content: `
<p>La seguridad electrónica está evolucionando rápidamente. Con la llegada de nuevas tecnologías y la creciente sofisticación de las amenazas, las empresas deben estar preparadas para adoptar soluciones más inteligentes y proactivas.</p>

<h2>1. Inteligencia Artificial en Videovigilancia</h2>

<p>La IA está revolucionando la videovigilancia, permitiendo análisis en tiempo real, detección de comportamientos anómalos y respuestas automáticas ante incidentes. Las cámaras modernas pueden identificar objetos, reconocer rostros y detectar patrones sospechosos sin intervención humana.</p>

<h2>2. Seguridad Convergente</h2>

<p>La integración de sistemas de seguridad física con ciberseguridad está creando un enfoque holístico de protección. Las empresas están buscando plataformas unificadas que gestionen tanto la seguridad física como la lógica desde una sola interfaz.</p>

<h2>3. Control de Acceso Biométrico</h2>

<p>Los sistemas biométricos están reemplazando rápidamente las tarjetas y contraseñas tradicionales. El reconocimiento facial, de iris y de huellas dactilares ofrecen niveles de seguridad superiores y una experiencia de usuario más fluida.</p>

<h2>4. Nube y Edge Computing</h2>

<p>La migración hacia soluciones basadas en la nube permite una gestión más flexible y escalable de los sistemas de seguridad. El edge computing complementa esta tendencia procesando datos localmente para reducir la latencia y el consumo de ancho de banda.</p>

<h2>5. Automatización de Respuesta</h2>

<p>Los sistemas de seguridad modernos no solo detectan amenazas, sino que responden automáticamente. Desde el bloqueo de puertas hasta la notificación a autoridades, la automatización reduce drásticamente los tiempos de respuesta ante incidentes.</p>
    `,
    slug: '5-tendencias-seguridad-electronica-2026',
    date: '2024-01-10',
    category: 'Seguridad',
    readTime: '6 min',
    author: 'Equipo Nexos',
  },
  'reducir-consumo-energetico-edificios': {
    id: '3',
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    content: `
<p>La eficiencia energética no es solo una tendencia ambiental, sino una necesidad económica. Los edificios comerciales consumen aproximadamente el 40% de la energía total, y optimizar este consumo puede generar ahorros significativos.</p>

<h2>Automatización Inteligente</h2>

<p>Los sistemas de gestión energética (BMS) permiten monitorear y controlar el consumo en tiempo real. Desde la iluminación hasta la climatización, la automatización inteligente puede reducir el consumo entre un 20% y 30%.</p>

<h2>Iluminación LED con Control</h2>

<p>Reemplazar las luces tradicionales por LEDs puede reducir el consumo de iluminación hasta un 75%. Agregar sensores de ocupación y control de luz diurna puede incrementar estos ahorros aún más.</p>

<h2>Climatización Eficiente</h2>

<p>Los sistemas HVAC representan el mayor consumo energético en la mayoría de edificios. Implementar termostatos inteligentes, mantenimiento predictivo y zonificación puede optimizar drásticamente este consumo.</p>

<h2>Monitoreo Continuo</h2>

<p>La clave para mantener la eficiencia es el monitoreo continuo. Los dashboards de energía permiten identificar anomalías, comparar consumos históricos y establecer metas de reducción medibles.</p>
    `,
    slug: 'reducir-consumo-energetico-edificios',
    date: '2024-01-05',
    category: 'Eficiencia Energética',
    readTime: '7 min',
    author: 'Equipo Nexos',
  },
  'diseno-salas-juntas-tecnologia-av': {
    id: '4',
    title: 'Diseño de Salas de Juntas: Tecnología AV para Impresionar',
    content: `
<p>Una sala de juntas bien equipada puede marcar la diferencia entre una presentación exitosa y una oportunidad perdida. La tecnología audiovisual moderna permite crear experiencias inmersivas que impresionan a clientes y facilitan la colaboración.</p>

<h2>Pantallas y Proyectores</h2>

<p>Las pantallas interactivas de 4K están reemplazando a los proyectores tradicionales. Ofrecen mayor brillo, mejor contraste y permiten la anotación en tiempo real, transformando cualquier presentación en una experiencia colaborativa.</p>

<h2>Sistemas de Videoconferencia</h2>

<p>Con el auge del trabajo híbrido, las salas de juntas necesitan sistemas de videoconferencia de alta calidad. Cámaras con seguimiento automático, micrófonos con cancelación de ruido y altavoces direccionales garantizan una comunicación clara y profesional.</p>

<h2>Control Unificado</h2>

<p>Un panel de control centralizado permite gestionar toda la tecnología de la sala desde una sola interfaz. Encender el sistema, ajustar el volumen, compartir pantalla y gestionar la videoconferencia desde una tablet simplifica la experiencia del usuario.</p>
    `,
    slug: 'diseno-salas-juntas-tecnologia-av',
    date: '2023-12-28',
    category: 'Audio y Video',
    readTime: '5 min',
    author: 'Equipo Nexos',
  },
  'checklist-infraestructura-red-edificios-inteligentes': {
    id: '5',
    title: 'Checklist: Infraestructura de Red para Edificios Inteligentes',
    content: `
<p>Antes de iniciar cualquier proyecto de transformación digital, es fundamental evaluar la infraestructura de red existente. Esta lista de verificación le ayudará a identificar si su edificio está listo para convertirse en inteligente.</p>

<h2>Evaluación de Cableado</h2>

<ul>
  <li>¿Qué categoría de cableado tiene instalada? (Cat 5e, 6, 6A)</li>
  <li>¿El cableado está certificado y documentado?</li>
  <li>¿Hay puertos disponibles para nuevos dispositivos?</li>
  <li>¿La infraestructura soporta PoE (Power over Ethernet)?</li>
</ul>

<h2>Capacidad de Red</h2>

<ul>
  <li>¿Cuál es el ancho de banda actual?</li>
  <li>¿Hay cuellos de botella identificados?</li>
  <li>¿La red soporta VLANs para segmentación?</li>
  <li>¿Hay redundancia en los enlaces críticos?</li>
</ul>

<h2>Infraestructura WiFi</h2>

<ul>
  <li>¿Cobertura completa en todas las áreas?</li>
  <li>¿Capacidad para soportar alta densidad de dispositivos?</li>
  <li>¿Separación entre redes corporativas y de invitados?</li>
</ul>

<h2>Centro de Datos/Cuarto Técnico</h2>

<ul>
  <li>¿Temperatura y humedad controladas?</li>
  <li>¿Sistema UPS para respaldo eléctrico?</li>
  <li>¿Espacio para expansión futura?</li>
  <li>¿Documentación actualizada del cableado?</li>
</ul>
    `,
    slug: 'checklist-infraestructura-red-edificios-inteligentes',
    date: '2023-12-20',
    category: 'Cableado Estructurado',
    readTime: '10 min',
    author: 'Equipo Nexos',
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <ArticleSchema 
        title={post.title} 
        description={post.content.replace(/<[^>]*>/g, '').slice(0, 160)}
        slug={post.slug}
        date={post.date}
      />
      <Section background="secondary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement animation="fade-in">
            <Link
              href="/blog"
              className="text-accent text-sm font-medium mb-8 inline-flex items-center gap-2 hover:underline"
            >
              <Icon name="arrow-left" size="sm" />
              Volver al Blog
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted text-sm">{post.readTime} de lectura</span>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              {post.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-medium">{post.author.charAt(0)}</span>
              </div>
              <div>
                <p className="text-text-primary font-medium">{post.author}</p>
                <time className="text-text-muted text-sm">
                  {new Date(post.date).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement animation="slide-up">
            <article 
              className="prose prose-invert prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedElement>
          
          <div className="border-t border-border pt-8">
            <ShareButtons 
              title={post.title} 
              url={`https://nexosingenieria.com/blog/${post.slug}`} 
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
