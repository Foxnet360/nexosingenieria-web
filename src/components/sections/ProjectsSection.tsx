'use client';

import Link from 'next/link';
import { BuildingOffice, ArrowRight } from '@phosphor-icons/react';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  metrics: {
    label: string;
    value: string;
  }[];
  slug: string;
}

const projects: (Project & { image: string })[] = [
  {
    id: '1',
    title: 'EDEQ S.A. E.S.P. — Proyecto Integral & BMS',
    description:
      'Integración tecnológica de seguridad electrónica, redes de alta disponibilidad y plataforma BMS corporativa para la principal electrificadora del Quindío.',
    category: 'Energía & BMS',
    location: 'Armenia & Quindío',
    image: '/images/proyectos/edeq-sedes-y-bms.webp',
    metrics: [
      { label: 'Sedes unificadas', value: '100%' },
      { label: 'Monitoreo BMS', value: '24/7' },
      { label: 'Disponibilidad', value: '99.9%' },
    ],
    slug: 'edeq-sedes-y-bms',
  },
  {
    id: '2',
    title: 'UNAD — Edificio José Celestino Mutis',
    description:
      'Automatización de gestión de instalaciones, control de iluminación dimerizable y red de comunicaciones para laboratorios de prácticas.',
    category: 'Educación & Smart Campus',
    location: 'Bogotá, Colombia',
    image: '/images/proyectos/unad-edificio-celestino-mutis.webp',
    metrics: [
      { label: 'Ahorro iluminación', value: '43%' },
      { label: 'Reservas Aulas', value: 'Auto' },
      { label: 'Redes Campus', value: 'Cat 6A' },
    ],
    slug: 'unad-edificio-celestino-mutis',
  },
  {
    id: '3',
    title: 'PH Centro Empresarial Ícono',
    description:
      'Blindobarra vertical central, control de acceso Kantech, BMS e infraestructura de alta eficiencia con Acreditación Internacional EDGE.',
    category: 'Corporativo EDGE',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/centro-empresarial-icono.webp',
    metrics: [
      { label: 'Certificación', value: 'EDGE' },
      { label: 'Ahorro energía', value: '25%' },
      { label: 'Reducción O&M', value: '27%' },
    ],
    slug: 'centro-empresarial-icono',
  },
];

export function ProjectsSection() {
  return (
    <section className="py-20 md:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Proyectos Destacados
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Transformaciones que hablan por sí solas
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Cada proyecto es una historia de éxito donde la tecnología integrada genera resultados
              medibles y tangibles para nuestros clientes.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement key={project.id} animation="slide-up" delay={index * 150}>
              <Link
                href={`/proyectos/${project.slug}`}
                className="group block bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="aspect-video bg-bg-secondary relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60"></div>

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <p className="text-text-muted text-sm mb-4">📍 {project.location}</p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {project.metrics.map(metric => (
                      <div key={metric.label} className="text-center">
                        <p className="text-accent text-lg font-bold">{metric.value}</p>
                        <p className="text-text-muted text-xs">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </AnimatedElement>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedElement animation="fade-in">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg font-medium hover:bg-bg-secondary hover:border-accent/50 transition-colors"
            >
              Ver todos los proyectos
              <ArrowRight weight="light" size={16} />
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
