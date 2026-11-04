'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarBlank, Clock } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { getAllBlogPosts } from '@/data/blog';

export function BlogPreviewSection() {
  const featuredPosts = getAllBlogPosts().slice(0, 3);
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
                    src={post.image || post.heroImage}
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
                    <div className="flex items-center gap-2 mb-3">
                      {post.author.avatar ? (
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-accent/40 shrink-0">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                          {post.author.initials}
                        </div>
                      )}
                      <p className="text-[11px] text-text-muted font-medium truncate">
                        Por{' '}
                        <span className="text-text-secondary font-semibold">
                          {post.author.name}
                        </span>
                      </p>
                    </div>
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
