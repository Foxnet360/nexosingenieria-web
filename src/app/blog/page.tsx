import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

export const metadata: Metadata = {
  title: 'Blog | Nexos Ingeniería SAS',
  description: 'Artículos técnicos, guías y tendencias sobre cableado estructurado, seguridad electrónica, eficiencia energética y audio/video para edificios inteligentes.',
  alternates: {
    canonical: 'https://nexosingenieria.com/blog',
  },
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    excerpt: 'Descubre todo lo que necesitas saber sobre cableado estructurado: estándares, categorías, certificaciones y mejores prácticas para tu empresa.',
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '2024-01-15',
    category: 'Cableado Estructurado',
    readTime: '8 min',
  },
  {
    id: '2',
    title: '5 Tendencias de Seguridad Electrónica para 2026',
    excerpt: 'La seguridad electrónica evoluciona rápidamente. Conoce las 5 tendencias que definirán el mercado en los próximos años.',
    slug: '5-tendencias-seguridad-electronica-2026',
    date: '2024-01-10',
    category: 'Seguridad',
    readTime: '6 min',
  },
  {
    id: '3',
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    excerpt: 'Estrategias prácticas y tecnologías para optimizar el consumo energético de tu edificio y reducir costos operativos.',
    slug: 'reducir-consumo-energetico-edificios',
    date: '2024-01-05',
    category: 'Eficiencia Energética',
    readTime: '7 min',
  },
  {
    id: '4',
    title: 'Diseño de Salas de Juntas: Tecnología AV para Impresionar',
    excerpt: 'Guía completa para equipar salas de juntas con tecnología audiovisual de última generación que impresionará a tus clientes.',
    slug: 'diseno-salas-juntas-tecnologia-av',
    date: '2023-12-28',
    category: 'Audio y Video',
    readTime: '5 min',
  },
  {
    id: '5',
    title: 'Checklist: Infraestructura de Red para Edificios Inteligentes',
    excerpt: 'Lista de verificación completa para evaluar si tu infraestructura de red está lista para soportar un edificio inteligente.',
    slug: 'checklist-infraestructura-red-edificios-inteligentes',
    date: '2023-12-20',
    category: 'Cableado Estructurado',
    readTime: '10 min',
  },
];

const categories = [
  'Todos',
  'Cableado Estructurado',
  'Seguridad',
  'Eficiencia Energética',
  'Audio y Video',
  'Domótica',
];

export default function BlogPage() {
  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Centro de Conocimiento
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Blog
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary">
              Artículos técnicos, guías y tendencias sobre tecnología para edificios inteligentes.
            </p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors text-sm"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedElement
                key={post.id}
                animation="slide-up"
                delay={index * 100}
              >
                <article className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors group">
                  <Link href={`/blog/${post.slug}`}>
                    {/* Thumbnail placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-bg-secondary to-bg-primary flex items-center justify-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Icon name="article" weight="light" color="accent" size="lg" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-accent text-xs font-medium uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-text-muted text-xs">{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-text-secondary text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <time className="text-text-muted text-sm">
                        {new Date(post.date).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </Link>
                </article>
              </AnimatedElement>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors">
              Anterior
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent text-bg-primary font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
