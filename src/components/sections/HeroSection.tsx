'use client';

import Link from 'next/link';
import { ArrowDown } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Button } from '@/components/ui/Button';
import { empresaData } from '@/data/scraped-content';
import { analytics } from '@/lib/analytics';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.webp"
          alt="Tecnología e innovación"
          className="absolute inset-0 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          srcSet="/images/hero-bg-640.webp 640w, /images/hero-bg-750.webp 750w, /images/hero-bg-828.webp 828w, /images/hero-bg-1080.webp 1080w, /images/hero-bg-1200.webp 1200w, /images/hero-bg.webp 1920w"
          sizes="100vw"
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg-primary/80" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary/80" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.08),transparent_60%)]" />
        {/* Watermark decoration */}
        <div
          className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/watermark.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Smart Building Partner
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight font-[family-name:var(--font-geist-sans)]">
              Transformamos espacios con <span className="text-accent">tecnología integrada</span>
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              {empresaData.descripcionCorta}. Diseñamos e implementamos soluciones de cableado
              estructurado, seguridad electrónica, eficiencia energética y automatización para
              edificios inteligentes.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link
                  href="/cotizar"
                  onClick={() => analytics.ctaClick('solicitar_cotizacion', 'hero')}
                >
                  Solicitar Cotización
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/proyectos" onClick={() => analytics.ctaClick('ver_proyectos', 'hero')}>
                  Ver Proyectos
                </Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ArrowDown weight="thin" size={24} className="text-text-muted" />
    </div>
  );
}
