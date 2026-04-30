import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pageMetadata.soluciones.title,
  description: pageMetadata.soluciones.description,
};

const services = [
  {
    title: 'Cableado Estructurado',
    description: 'Infraestructura de red certificada que soporta la tecnología de hoy y del mañana. Diseño, instalación y certificación de redes Cat 6A y fibra óptica.',
    href: '/soluciones/cableado-estructurado',
    features: ['Diseño de infraestructura', 'Instalación certificada', 'Centros de datos', 'Documentación As-Built'],
  },
  {
    title: 'Seguridad + Eficiencia Energética',
    description: 'Protegemos su inversión y optimizamos sus recursos con sistemas de seguridad electrónica integrados y soluciones de eficiencia energética.',
    href: '/soluciones/seguridad-electronica',
    features: ['Videovigilancia IP', 'Control de acceso', 'Gestión energética', 'Automatización HVAC'],
  },
  {
    title: 'Audio y Video Profesional',
    description: 'Diseñamos e integramos sistemas AV de alta calidad para espacios corporativos, hospitality y residenciales de lujo.',
    href: '/soluciones/audio-video',
    features: ['Audio distribuido', 'Videoconferencia', 'Digital Signage', 'Home Theater'],
  },
];

export default function SolucionesPage() {
  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Nuestras Soluciones
            </h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={100}>
            <p className="text-lg text-text-secondary">
              Ofrecemos soluciones integrales que convierten su edificio en un espacio inteligente, 
              seguro y eficiente.
            </p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="space-y-12">
          {services.map((service, index) => (
            <AnimatedElement key={service.title} animation="slide-up" delay={index * 100}>
              <div className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary mb-6">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
                    >
                      Conocer más
                      <Icon name="arrow-right" size="sm" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="check" color="accent" size="sm" />
                        </div>
                        <span className="text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </Section>
    </>
  );
}
