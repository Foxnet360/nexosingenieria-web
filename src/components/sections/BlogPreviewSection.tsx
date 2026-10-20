'use client';

import Link from 'next/link';
import { ArrowRight, CalendarBlank, Clock } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const featuredPosts = [
  {
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    excerpt:
      'Estándares, categorías TIA/EIA, certificaciones de canal a 25 años y mejores prácticas para evitar cuellos de botella.',
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '15 Ene 2024',
    category: 'Cableado Estructurado',
    readTime: '8 min',
    image: '/images/soluciones/cableado-estructurado.webp',
  },
  {
    title: '5 Tendencias de Seguridad Electrónica para 2026',
    excerpt:
      'Analítica de video con IA perimetral, control de accesos biométrico sin contacto e interoperabilidad IP unificada.',
    slug: '5-tendencias-seguridad-electronica-2026',
    date: '10 Ene 2024',
    category: 'Seguridad',
    readTime: '6 min',
    image: '/images/soluciones/seguridad-electronica.webp',
  },
  {
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    excerpt:
      'Estrategias prácticas de automatización BMS, control lumínico inteligente y sensores IoT con retorno de inversión comprobado.',
    slug: 'reducir-consumo-energetico-edificios',
    date: '05 Ene 2024',
    category: 'Eficiencia Energética',
    readTime: '7 min',
    image: '/images/hero-industrias.webp',
  },
];

export function BlogPreviewSection() {
  return (
    <section className="py-20 md:py-32 bg-bg-secondary border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in">
            <span className="px-3.5 py-1 bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-md mb-4 inline-block">
              Centro de Conocimiento
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Artículos Técnicos & Tendencias
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Guías especializadas, normativas y criterios técnicos elaborados por nuestros
              ingenieros para la toma de decisiones en infraestructura.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <AnimatedElement key={post.slug} animation="slide-up" delay={index * 150}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 h-full"
              >
                <div className="h-48 relative overflow-hidden bg-bg-primary">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-bg-primary/90 backdrop-blur-sm text-accent text-xs font-semibold rounded-md border border-border/40">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3 font-[family-name:var(--font-geist-mono)]">
                      <span className="inline-flex items-center gap-1">
                        <CalendarBlank size={14} />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2 transition-all pt-2 border-t border-border/40">
                    Leer artículo completo
                    <ArrowRight weight="bold" size={12} />
                  </div>
                </div>
              </Link>
            </AnimatedElement>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedElement animation="fade-in">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg font-medium hover:bg-bg-secondary hover:border-accent/50 transition-colors"
            >
              Ver todos los artículos y guías
              <ArrowRight weight="light" size={16} />
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
