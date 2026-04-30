import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { empresaData, statsData, valoresData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Nosotros | Nexos Ingeniería SAS',
  description: `${empresaData.descripcionCorta}. Conoce nuestra historia y valores.`,
};

export default function NosotrosPage() {
  return (
    <>
      <Section background="secondary" padding="xl" className="relative overflow-hidden">
        {/* Decorative watermark - positioned in corner */}
        <div
          className="absolute top-8 right-8 w-32 h-32 md:w-48 md:h-48 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/watermark.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Sobre Nosotros
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Nexos Ingeniería SAS
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-lg text-text-secondary">
                {empresaData.descripcionCorta}. Somos tu Smart Building Partner en Colombia.
              </p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <AnimatedElement
                key={stat.label}
                animation="slide-up"
                delay={index * 100}
              >
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-accent mb-2 font-[family-name:var(--font-geist-sans)]">
                    {stat.number}
                  </p>
                  <p className="text-text-secondary">{stat.label}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="slide-up">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center font-[family-name:var(--font-geist-sans)]">
              Nuestra Historia
            </h2>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={100}>
              <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary mb-4">
                {empresaData.descripcion}
              </p>
              <p className="text-text-secondary mb-4">
                {empresaData.filosofia}
              </p>
              <p className="text-text-secondary">
                {empresaData.mision}
              </p>
            </div>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement animation="slide-up">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center font-[family-name:var(--font-geist-sans)]">
              Nuestros Valores
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valoresData.map((value, index) => (
              <AnimatedElement
                key={value.title}
                animation="slide-up"
                delay={index * 100}
              >
                <div className="bg-bg-card border border-border rounded-xl p-8 text-center hover:border-accent/30 transition-colors">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
