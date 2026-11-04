import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) {
    return {
      title: 'Proyecto no encontrado | Nexos Ingeniería SAS',
    };
  }
  return {
    title: `${project.title} | Casos de Éxito | Nexos Ingeniería SAS`,
    description: project.description,
  };
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* High-Impact Photographic Hero Section */}
      <section className="relative min-h-[60vh] flex items-end py-16 md:py-24 bg-bg-primary overflow-hidden border-b border-border">
        {/* Background Location Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center filter brightness-[0.45] contrast-110 scale-105 transition-transform duration-1000"
            priority
          />
          {/* Gradient Overlay for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <AnimatedElement animation="fade-in">
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card/80 backdrop-blur-md border border-border text-accent text-sm font-medium mb-6 hover:border-accent/50 transition-all"
              >
                <Icon name="arrow-left" size="sm" />
                Volver a Proyectos
              </Link>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={100}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-md">
                  {project.industry}
                </span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-text-secondary text-sm font-medium flex items-center gap-1">
                  📍 {project.location}
                </span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-text-secondary text-sm font-medium">🗓️ {project.year}</span>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 leading-tight font-[family-name:var(--font-geist-sans)]">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <p className="text-text-secondary text-base md:text-lg">
                  Cliente: <strong className="text-accent font-semibold">{project.client}</strong>
                </p>
                {project.clientLogo && (
                  <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-bg-card/90 backdrop-blur-md border border-border inline-flex items-center shadow-md">
                    <Image
                      src={project.clientLogo}
                      alt={project.client}
                      width={120}
                      height={28}
                      className="max-h-7 max-w-[120px] w-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={300}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Main Content & Architecture Detail */}
      <Section background="default" padding="xl">
        <div className="max-w-6xl mx-auto">
          {/* Challenge & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedElement animation="slide-up">
              <div className="bg-bg-card border border-border hover:border-accent/40 transition-all duration-300 rounded-2xl p-8 h-full shadow-lg relative overflow-hidden group">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-6 text-red-400">
                  <Icon name="pulse" size="md" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                  El Desafío
                </h2>
                <p className="text-text-secondary leading-relaxed text-base">{project.challenge}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={150}>
              <div className="bg-bg-card border border-border hover:border-accent/40 transition-all duration-300 rounded-2xl p-8 h-full shadow-lg relative overflow-hidden group">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent">
                  <Icon name="sparkle" size="md" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                  La Solución Integrada
                </h2>
                <p className="text-text-secondary leading-relaxed text-base">{project.solution}</p>
              </div>
            </AnimatedElement>
          </div>

          {/* Implemented Services Badges */}
          <div className="mb-16">
            <AnimatedElement animation="slide-up">
              <h2 className="text-2xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                Servicios & Especialidades Aplicadas
              </h2>
            </AnimatedElement>

            <div className="flex flex-wrap gap-3">
              {project.services.map(service => (
                <AnimatedElement key={service} animation="fade-in">
                  <span className="px-4 py-2.5 bg-bg-card border border-accent/30 text-text-primary rounded-xl font-medium text-sm inline-flex items-center gap-2 hover:bg-accent/10 hover:border-accent transition-all">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {service}
                  </span>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Measurable Results Grid */}
          <div className="mb-16">
            <AnimatedElement animation="slide-up">
              <h2 className="text-2xl font-bold text-text-primary mb-8 font-[family-name:var(--font-geist-sans)]">
                Resultados Medibles & Impacto
              </h2>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <AnimatedElement key={index} animation="slide-up" delay={index * 100}>
                  <div className="bg-bg-card border border-border rounded-xl p-6 flex items-start gap-4 hover:border-accent/40 transition-colors">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="check-circle" color="accent" size="md" />
                    </div>
                    <p className="text-text-primary font-medium text-base leading-relaxed">
                      {result}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <Section background="secondary" padding="xl">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement animation="slide-up">
              <div className="bg-bg-card border border-accent/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-xl">
                <div className="mx-auto mb-6 flex justify-center">
                  <Icon name="quotes" color="accent" size="2xl" className="opacity-40" />
                </div>
                <blockquote className="text-xl md:text-2xl text-text-primary font-medium mb-6 leading-relaxed">
                  &quot;{project.testimonial.quote}&quot;
                </blockquote>
                <cite className="not-italic">
                  <p className="text-text-primary font-semibold text-lg">
                    {project.testimonial.author}
                  </p>
                  <p className="text-accent text-sm font-medium">{project.testimonial.role}</p>
                </cite>
              </div>
            </AnimatedElement>
          </div>
        </Section>
      )}

      {/* Conversion Call to Action */}
      <Section background="default" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              ¿Requieres un proyecto con este nivel de precisión?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
              Nuestro equipo de ingenieros especialistas está preparado para diseñar e implementar
              la solución tecnológica a medida para tu empresa.
            </p>
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-14 px-8 text-lg shadow-lg shadow-accent/20"
            >
              Solicitar Cotización Técnica
            </Link>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
