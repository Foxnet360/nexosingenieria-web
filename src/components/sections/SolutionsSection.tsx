'use client';

import Link from 'next/link';
import { Plugs, Shield, House, ArrowRight } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { serviciosData } from '@/data/scraped-content';

const serviceIcons: Record<string, typeof Plugs> = {
  'Cableado Estructurado': Plugs,
  'Seguridad Electrónica': Shield,
  'Automatización y Eficiencia Energética': House,
  Domótica: House,
};

const serviceImages: Record<string, string> = {
  'Cableado Estructurado': '/images/soluciones/cableado-estructurado.webp',
  'Seguridad Electrónica': '/images/soluciones/seguridad-electronica.webp',
  'Automatización y Eficiencia Energética': '/images/soluciones/domotica.webp',
  Domótica: '/images/soluciones/domotica.webp',
};

const pillars = serviciosData.slice(0, 3).map(servicio => ({
  title: servicio.titulo,
  description: servicio.descripcionCorta,
  href: servicio.href,
  Icon: serviceIcons[servicio.titulo] || Plugs,
  image: serviceImages[servicio.titulo] || '/images/soluciones/domotica.webp',
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
            Ofrecemos soluciones integrales que convierten su edificio en un espacio inteligente,
            seguro y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.Icon;
            return (
              <AnimatedElement key={pillar.title} animation="slide-up" delay={index * 150}>
                <Link
                  href={pillar.href}
                  className="group block bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="h-44 relative overflow-hidden bg-bg-primary">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 w-12 h-12 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-xl flex items-center justify-center icon-glow-medium">
                      <IconComponent
                        weight="duotone"
                        size={24}
                        className="text-accent icon-hover"
                      />
                    </div>
                  </div>

                  <div className="p-6 pt-2">
                    <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                    <span className="text-accent font-medium text-sm inline-flex items-center gap-2">
                      Conocer más
                      <ArrowRight
                        weight="light"
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </Link>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
