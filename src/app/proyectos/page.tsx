import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ContainerCard } from '@/components/ui/ContainerCard';
import { proyectosData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Proyectos | Nexos Ingeniería SAS',
  description:
    'Conoce nuestros proyectos destacados en cableado estructurado, seguridad electrónica, eficiencia energética y automatización.',
};

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 @container md:grid-cols-2 lg:grid-cols-3 gap-6 @md:gap-8">
      {proyectosData.map((proyecto, index) => (
        <AnimatedElement
          key={proyecto.id}
          animation="slide-up"
          delay={index * 100}
        >
          <ContainerCard
            image={proyecto.localPath}
            alt={proyecto.alt}
            title={proyecto.alt}
            location="Armenia, Quindío"
            priority={index < 3}
          />
        </AnimatedElement>
      ))}
    </div>
  );
}

export default function ProyectosPage() {
  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Portafolio de Proyectos
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Proyectos
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary">
              Conoce cómo hemos transformado espacios con tecnología integrada.
              Más de 20 años de experiencia en el Eje Cafetero y Colombia.
            </p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto @container">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-bg-card border border-border rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="h-64 bg-bg-secondary"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-bg-secondary rounded w-3/4"></div>
                      <div className="h-4 bg-bg-secondary rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ProjectsGrid />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
