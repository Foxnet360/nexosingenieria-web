'use client';

import Link from 'next/link';
import { Plugs, Shield, House, ArrowRight } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { serviciosData } from '@/data/scraped-content';

const serviceIcons = {
  'Cableado Estructurado': Plugs,
  'Seguridad Electrónica': Shield,
  'Domótica': House,
};

const pillars = serviciosData.slice(0, 3).map((servicio) => ({
  title: servicio.titulo,
  description: servicio.descripcionCorta,
  href: servicio.href,
  Icon: serviceIcons[servicio.titulo as keyof typeof serviceIcons] || Plugs,
}));

export default function SolutionsSection() {
  return (
    <section className="py-20 md:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
            Nuestras Soluciones
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ofrecemos soluciones integrales que convierten su edificio en un espacio
            inteligente, seguro y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.Icon;
            return (
              <AnimatedElement
                key={pillar.title}
                animation="slide-up"
                delay={index * 150}
              >
                <Link
                  href={pillar.href}
                  className="group block bg-bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300 icon-glow-medium">
                    <IconComponent
                      weight="duotone"
                      size={28}
                      className="text-accent icon-hover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{pillar.title}</h3>
                  <p className="text-text-secondary mb-6">{pillar.description}</p>
                  <span className="text-accent font-medium inline-flex items-center gap-2">
                    Conocer más
                    <ArrowRight
                      weight="light"
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
