import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { AlliedBrandsSection } from '@/components/sections/AlliedBrandsSection';
import { empresaData, statsData, valoresData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Nosotros | Nexos Ingeniería SAS',
  description: `${empresaData.descripcionCorta}. Conoce nuestra historia y valores.`,
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-end py-16 md:py-24 bg-bg-primary overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-nosotros.webp"
            alt="Sobre Nexos Ingeniería"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110 scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement animation="fade-in">
              <span className="px-3.5 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-md mb-4 inline-block">
                Más de 20 Años de Excelencia
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                Sobre Nexos Ingeniería SAS
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                {empresaData.mision}
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Section background="default" padding="lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <AnimatedElement key={stat.label} animation="slide-up" delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-bg-card border border-border">
                  <span className="block text-3xl md:text-4xl font-bold text-accent mb-2 font-[family-name:var(--font-geist-sans)]">
                    {stat.number}
                  </span>
                  <span className="text-sm text-text-muted">{stat.label}</span>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      <Section background="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="slide-right">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                  Nuestra Filosofía de Ingeniería
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {empresaData.filosofia}
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slide-left">
              <div className="bg-bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
                <h3 className="text-xl font-semibold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                  Liderazgo e Innovación
                </h3>
                <p className="text-text-secondary leading-relaxed">{empresaData.descripcion}</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement animation="fade-in">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-12 font-[family-name:var(--font-geist-sans)]">
              Nuestros Valores
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valoresData.map((value, index) => (
              <AnimatedElement key={value.title} animation="slide-up" delay={index * 100}>
                <div className="bg-bg-card border border-border rounded-xl p-8 text-center hover:border-accent/30 transition-colors">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      <AlliedBrandsSection
        title="Red de Marcas Proveedoras & Aliados Certificados"
        subtitle="Respaldados directamente por las marcas tecnológicas líderes a nivel global para ofrecer ingeniería de especificación, soporte oficial y garantías de fábrica."
      />
    </>
  );
}
