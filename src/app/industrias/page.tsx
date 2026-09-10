import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Industrias | Nexos Ingeniería SAS',
  description:
    'Soluciones tecnológicas especializadas por sector: corporativo, retail, salud, educación, industrial y más.',
};

const industries = [
  {
    slug: 'corporativo',
    title: 'Corporativo',
    description:
      'Espacios de oficina inteligentes con cableado estructurado, salas de juntas equipadas y sistemas de seguridad integrados.',
    icon: <Icon name="building-office" size="lg" />,
    services: ['Cableado Estructurado', 'Audio y Video', 'Seguridad Electrónica'],
  },
  {
    slug: 'retail',
    title: 'Retail y Centros Comerciales',
    description:
      'Videovigilancia inteligente, digital signage y sistemas de audio para mejorar la experiencia del cliente.',
    icon: <Icon name="shopping-bag" size="lg" />,
    services: ['Seguridad Electrónica', 'Audio y Video', 'Eficiencia Energética'],
  },
  {
    slug: 'salud',
    title: 'Sector Salud',
    description:
      'Infraestructura tecnológica para clínicas y hospitales con altos estándares de disponibilidad y seguridad.',
    icon: <Icon name="heart" size="lg" />,
    services: ['Cableado Estructurado', 'Seguridad Electrónica', 'Control de Acceso'],
  },
  {
    slug: 'educacion',
    title: 'Educación',
    description:
      'Aulas inteligentes, auditorios equipados y redes de alta velocidad para instituciones educativas.',
    icon: <Icon name="graduation-cap" size="lg" />,
    services: ['Cableado Estructurado', 'Audio y Video', 'Seguridad Electrónica'],
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    description:
      'Sistemas de videovigilancia perimetral, control de acceso y redes industriales para plantas y bodegas.',
    icon: <Icon name="flask" size="lg" />,
    services: ['Seguridad Electrónica', 'Cableado Estructurado', 'Control de Acceso'],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    description:
      'Hoteles inteligentes con sistemas de entretenimiento, automatización de habitaciones y seguridad.',
    icon: <Icon name="sparkle" size="lg" />,
    services: ['Domótica', 'Audio y Video', 'Eficiencia Energética'],
  },
];

export default function IndustriasPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-end py-16 md:py-24 bg-bg-primary overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-industrias.webp"
            alt="Industrias e Sectores"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110 scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement animation="fade-in">
              <span className="px-3.5 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-md mb-4 inline-block">
                Especialización por Sectores
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                Soluciones por Sector Industrial
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                Diseñamos e implementamos infraestructura tecnológica adaptada a los requerimientos
                normativos, operativos y de seguridad de cada sector productivo en Colombia.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <AnimatedElement key={industry.slug} animation="slide-up" delay={index * 100}>
                <Link
                  href={`/industrias/${industry.slug}`}
                  className="group block bg-bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-accent mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-text-secondary mb-4">{industry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.services.map(service => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
