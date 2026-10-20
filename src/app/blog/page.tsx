import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

export const metadata: Metadata = {
  title: 'Blog | Nexos Ingeniería SAS',
  description:
    'Artículos técnicos, guías y tendencias sobre cableado estructurado, seguridad electrónica, eficiencia energética y audio/video para edificios inteligentes.',
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
  image: string;
  author: {
    name: string;
    role: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    excerpt:
      'Parámetros ANSI/TIA-568.2-D, certificación Fluke DSX-8000 a 25 años y mejores prácticas para garantizar redes de alta disponibilidad.',
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '2024-01-15',
    category: 'Cableado Estructurado',
    readTime: '8 min',
    image: '/images/soluciones/cableado-estructurado.webp',
    author: {
      name: 'Diego Mauricio Toro',
      role: 'Director de Proyectos',
    },
  },
  {
    id: '2',
    title: '5 Tendencias de Seguridad Electrónica para 2026',
    excerpt:
      'Analítica de video con IA en el borde, biometría facial 3D sin contacto, radares perimetrales y plataformas unificadas PSIM.',
    slug: '5-tendencias-seguridad-electronica-2026',
    date: '2024-01-10',
    category: 'Seguridad',
    readTime: '6 min',
    image: '/images/soluciones/seguridad-electronica.webp',
    author: {
      name: 'Diego Mauricio Toro',
      role: 'Director de Proyectos',
    },
  },
  {
    id: '3',
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    excerpt:
      'Automatización BMS (BACnet/Modbus), control lumínico DALI-2, acreditaciones EDGE/LEED y beneficios tributarios bajo la Ley 1715.',
    slug: 'reducir-consumo-energetico-edificios',
    date: '2024-01-05',
    category: 'Eficiencia Energética',
    readTime: '7 min',
    image: '/images/hero-industrias.webp',
    author: {
      name: 'Javier Ramírez Tafur',
      role: 'Gerente General',
    },
  },
  {
    id: '4',
    title: 'Diseño de Salas de Juntas: Tecnología AV para Impresionar',
    excerpt:
      'Ecosistemas One-Touch Join (MTR/Zoom Rooms), micrófonos beamforming de techo, encuadre de orador con IA y acústica RT60 controlada.',
    slug: 'diseno-salas-juntas-tecnologia-av',
    date: '2023-12-28',
    category: 'Audio y Video',
    readTime: '5 min',
    image: '/images/soluciones/audio-video.webp',
    author: {
      name: 'Diego Mauricio Toro',
      role: 'Director de Proyectos',
    },
  },
  {
    id: '5',
    title: 'Checklist: Infraestructura de Red para Edificios Inteligentes',
    excerpt:
      'Guía técnica y ejecutiva para evaluar canalizaciones, capacidad PoE++, fibra óptica backbone, UPS y documentación as-built.',
    slug: 'checklist-infraestructura-red-edificios-inteligentes',
    date: '2023-12-20',
    category: 'Cableado Estructurado',
    readTime: '10 min',
    image: '/images/soluciones/centros-de-datos.webp',
    author: {
      name: 'Javier Ramírez Tafur',
      role: 'Gerente General',
    },
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
      {/* Hero Banner */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-soluciones.webp"
            alt="Blog Nexos Ingeniería"
            fill
            className="object-cover object-center opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedElement animation="fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              Centro de Conocimiento
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Blog & Noticia Técnica
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Artículos técnicos, guías de infraestructura y tendencias de ingeniería para edificios
              inteligentes.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category, idx) => (
              <button
                key={category}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                  idx === 0
                    ? 'bg-accent/20 border-accent/50 text-accent shadow-sm shadow-accent/10'
                    : 'border-border bg-bg-card/50 text-text-secondary hover:text-text-primary hover:border-accent/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedElement key={post.id} animation="slide-up" delay={index * 100}>
                <article className="bg-bg-card border border-border/80 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full">
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {/* Thumbnail image with overlay hover zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent opacity-60" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border border-white/10 text-accent text-xs font-semibold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-bg-primary/80 backdrop-blur-md text-text-secondary text-xs font-mono">
                        {post.readTime}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
                          <time className="text-accent/80">
                            {new Date(post.date).toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                          <span className="text-text-muted text-[11px]">{post.author.name}</span>
                        </div>

                        <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-medium group-hover:translate-x-1 transition-transform">
                        <span className="text-text-muted text-[11px] font-normal">
                          {post.author.role}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-accent">
                          Leer artículo →
                        </span>
                      </div>
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
