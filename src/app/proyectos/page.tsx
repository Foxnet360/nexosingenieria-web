import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ContainerCard } from '@/components/ui/ContainerCard';
import { realProjectsList } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Proyectos Reales | Nexos Ingeniería SAS',
  description:
    'Explora nuestro portafolio de proyectos reales en infraestructura de red, seguridad electrónica, BMS, automatización y redes contra incendios en Colombia.',
};

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 @container md:grid-cols-2 lg:grid-cols-3 gap-6 @md:gap-8">
      {realProjectsList.map((proyecto, index) => (
        <AnimatedElement key={proyecto.slug} animation="slide-up" delay={(index % 6) * 100}>
          <Link href={`/proyectos/${proyecto.slug}`} className="block group">
            <ContainerCard
              image={proyecto.image}
              alt={proyecto.title}
              title={proyecto.title}
              description={proyecto.description}
              location={proyecto.location}
              priority={index < 3}
            />
          </Link>
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
              Casos de Éxito & Experiencia Demostrada
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Nuestros Proyectos Reales
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary leading-relaxed">
              Descubre cómo Nexos Ingeniería SAS ha transformado la infraestructura de empresas
              energéticas, sedes judiciales, clínicas de alta complejidad, universidades y
              desarrollos comerciales en Colombia desde 2005.
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
