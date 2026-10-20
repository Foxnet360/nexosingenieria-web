'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

const industries = [
  {
    slug: 'corporativo',
    title: 'Corporativo & Oficinas',
    description:
      'Cableado estructurado Cat 6A, salas de juntas multimedia y control de acceso unificado.',
    icon: <Icon name="building-office" size="md" />,
    badge: '10G & BMS',
  },
  {
    slug: 'retail',
    title: 'Retail & Centros Comerciales',
    description:
      'Videovigilancia con analítica de flujo, digital signage y audio distribuido de alta fidelidad.',
    icon: <Icon name="shopping-bag" size="md" />,
    badge: 'CCTV & Audio',
  },
  {
    slug: 'salud',
    title: 'Sector Salud & Clínicas',
    description:
      'Infraestructura de misión crítica con alta disponibilidad y monitoreo perimetral estricto.',
    icon: <Icon name="heart" size="md" />,
    badge: 'Misión Crítica',
  },
  {
    slug: 'educacion',
    title: 'Educación & Campus',
    description:
      'Aulas híbridas interactivas, auditorios automatizados y redes Wi-Fi de alta densidad.',
    icon: <Icon name="graduation-cap" size="md" />,
    badge: 'Smart Campus',
  },
  {
    slug: 'industrial',
    title: 'Industrial & Logística',
    description:
      'Seguridad perimetral con radar térmico, control de accesos vehiculares y redes industriales.',
    icon: <Icon name="flask" size="md" />,
    badge: 'Perimetral & Redes',
  },
  {
    slug: 'hospitality',
    title: 'Hospitality & Hoteles',
    description:
      'Automatización de habitaciones (Guest Room Management), sonido ambiental y redes de huéspedes.',
    icon: <Icon name="sparkle" size="md" />,
    badge: 'GRMS & Confort',
  },
];

export function IndustriesSection() {
  return (
    <section className="py-20 md:py-32 bg-bg-primary border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in">
            <span className="px-3.5 py-1 bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-md mb-4 inline-block">
              Especialización Vertical
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Sectores que Transformamos
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Cada industria demanda soluciones específicas. Diseñamos arquitectura tecnológica
              alineada a los estándares normativos y operacionales de su sector en Colombia.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => (
            <AnimatedElement key={ind.slug} animation="slide-up" delay={index * 100}>
              <Link
                href={`/industrias/${ind.slug}`}
                className="group flex flex-col justify-between p-6 bg-bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg-primary transition-colors duration-200">
                      {ind.icon}
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface text-text-muted border border-border/60">
                      {ind.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                  Ver soluciones para este sector
                  <ArrowRight weight="bold" size={12} />
                </div>
              </Link>
            </AnimatedElement>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedElement animation="fade-in">
            <Link
              href="/industrias"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg font-medium hover:bg-bg-secondary hover:border-accent/50 transition-colors"
            >
              Explorar todos los sectores e industrias
              <ArrowRight weight="light" size={16} />
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
