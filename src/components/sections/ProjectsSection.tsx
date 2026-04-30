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

const projects: Project[] = [
  {
    id: '1',
    title: 'Centro Comercial Los Andes',
    description: 'Implementación completa de cableado estructurado Cat 6A, sistema de videovigilancia IP con 120 cámaras, control de acceso biométrico y gestión energética inteligente.',
    category: 'Retail',
    location: 'Armenia, Quindío',
    metrics: [
      { label: 'Cámaras', value: '120' },
      { label: 'Puntos de red', value: '450' },
      { label: 'Reducción energía', value: '35%' },
    ],
    slug: 'centro-comercial-los-andes',
  },
  {
    id: '2',
    title: 'Clínica del Eje',
    description: 'Diseño e instalación de infraestructura de red para centro de datos, sistemas de seguridad perimetral y videoconferencia para telemedicina.',
    category: 'Salud',
    location: 'Pereira, Risaralda',
    metrics: [
      { label: 'Consultorios', value: '25' },
      { label: 'Servidores', value: '8' },
      { label: ' uptime', value: '99.9%' },
    ],
    slug: 'clinica-del-eje',
  },
  {
    id: '3',
    title: 'Hotel Boutique Casa Verde',
    description: 'Automatización completa del hotel con control de iluminación, climatización inteligente, sistema de audio distribuido y domótica para 45 habitaciones.',
    category: 'Hospitality',
    location: 'Cartagena, Bolívar',
    metrics: [
      { label: 'Habitaciones', value: '45' },
      { label: 'Ahorro energético', value: '40%' },
      { label: 'Calificación', value: '4.9' },
    ],
    slug: 'hotel-boutique-casa-verde',
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
              Cada proyecto es una historia de éxito donde la tecnología integrada 
              genera resultados medibles y tangibles para nuestros clientes.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement
              key={project.id}
              animation="slide-up"
              delay={index * 150}
            >
              <Link
                href={`/proyectos/${project.slug}`}
                className="group block bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-bg-secondary to-bg-primary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5"></div>
                  <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BuildingOffice weight="light" size={40} className="text-accent" />
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
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
                  
                  <p className="text-text-muted text-sm mb-4">
                    📍 {project.location}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {project.metrics.map((metric) => (
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
