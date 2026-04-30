'use client';

import { Lightbulb, ShieldCheck, Flask } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const differentiators = [
  {
    title: 'Consultoría Especializada',
    description: 'Analizamos sus necesidades específicas y diseñamos soluciones a medida que maximizan el retorno de su inversión tecnológica.',
    Icon: Lightbulb,
  },
  {
    title: 'Equipo Certificado',
    description: 'Nuestros ingenieros están certificados por las principales marcas del mercado: Panduit, CommScope, Hikvision, Dahua y más.',
    Icon: ShieldCheck,
  },
  {
    title: 'Respaldo de Marcas',
    description: 'Somos integradores autorizados de las mejores marcas, garantizando soporte directo del fabricante y garantías reales.',
    Icon: Flask,
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="py-20 md:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              ¿Por qué elegirnos?
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Tres pilares que nos distinguen
            </h2>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Más de 20 años de experiencia nos han enseñado que la excelencia 
              se construye sobre bases sólidas.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => {
            const IconComponent = item.Icon;
            return (
              <AnimatedElement
                key={item.title}
                animation="slide-up"
                delay={index * 150}
              >
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl text-accent mb-6 icon-glow-medium">
                    <IconComponent weight="duotone" size={32} className="icon-hover" />
                  </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {item.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedElement>
          );
          })}
        </div>
      </div>
    </section>
  );
}
