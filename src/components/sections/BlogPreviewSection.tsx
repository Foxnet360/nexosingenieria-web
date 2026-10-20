'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarBlank, Clock } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const featuredPosts = [
  {
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    excerpt:
      'Parámetros ANSI/TIA-568.2-D, certificación Fluke DSX-8000 a 25 años y mejores prácticas para garantizar redes de alta disponibilidad.',
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '15 Ene 2024',
    category: 'Cableado Estructurado',
    readTime: '8 min',
    image: '/images/soluciones/cableado-estructurado.webp',
    author: 'Diego Mauricio Toro (Director de Proyectos)',
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
    author: 'Diego Mauricio Toro (Director de Proyectos)',
  },
  {
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    excerpt:
      'Estrategias prácticas de automatización BMS, control lumínico DALI-2 y beneficios tributarios bajo la Ley 1715 de Colombia.',
    slug: 'reducir-consumo-energetico-edificios',
    date: '05 Ene 2024',
    category: 'Eficiencia Energética',
    readTime: '7 min',
    image: '/images/hero-industrias.webp',
    author: 'Javier Ramírez Tafur (Gerente)',
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
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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

                    <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-[11px] text-text-muted font-medium mb-3">
                      Por <span className="text-text-secondary font-semibold">{post.author}</span>
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
