import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

const projects: Record<string, {
  title: string;
  industry: string;
  location: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}> = {
  'sede-financiera-nacional': {
    title: 'Sede Principal Empresa Financiera',
    industry: 'Corporativo',
    location: 'Bogotá, Colombia',
    year: '2024',
    description: 'Implementación completa de infraestructura tecnológica para sede corporativa de 5,000 m².',
    challenge: 'La empresa financiera contaba con infraestructura obsoleta que generaba constantes caídas de red, sistemas de videoconferencia inoperables y un consumo energético excesivo. Necesitaban una solución integral que garantizara disponibilidad 24/7.',
    solution: 'Diseñamos e implementamos una solución integral que incluye cableado estructurado categoría 6A con certificación, 20 salas de juntas equipadas con sistemas de videoconferencia 4K, videovigilancia IP con analítica de video, y automatización completa de iluminación y climatización.',
    services: ['Cableado Estructurado', 'Audio y Video', 'Seguridad Electrónica', 'Eficiencia Energética'],
    results: [
      'Reducción del 40% en tickets de soporte de red',
      'Ahorro del 25% en consumo energético anual',
      '99.9% de uptime en sistemas críticos',
      'Certificación ISO de calidad de red',
    ],
    testimonial: {
      quote: 'Nexos transformó completamente nuestra infraestructura tecnológica. La diferencia es abismal.',
      author: 'Carlos Rodríguez',
      role: 'CTO, Empresa Financiera',
    },
  },
  'cadena-retail-25-tiendas': {
    title: 'Cadena de Retail - 25 Tiendas',
    industry: 'Retail',
    location: 'Nacional',
    year: '2023',
    description: 'Despliegue nacional de sistemas de seguridad y digital signage.',
    challenge: 'La cadena de retail enfrentaba pérdidas significativas por hurto, falta de engagement con clientes y costos operativos elevados por consumo de energía. Necesitaban una solución escalable para 25 ubicaciones.',
    solution: 'Implementamos un sistema centralizado de videovigilancia inteligente con analítica de comportamiento en 25 tiendas, 150 pantallas de digital signage, y un sistema de gestión energética centralizado con monitoreo remoto 24/7.',
    services: ['Seguridad Electrónica', 'Audio y Video', 'Eficiencia Energética'],
    results: [
      'Reducción del 60% en pérdidas por hurto',
      'Incremento del 15% en engagement de clientes',
      'Ahorro de $120M COP anuales en energía',
      'ROI positivo en 18 meses',
    ],
    testimonial: {
      quote: 'La inversión se pagó sola. Los resultados en reducción de pérdidas superaron nuestras expectativas.',
      author: 'María Fernanda López',
      role: 'Directora de Operaciones',
    },
  },
  'hotel-boutique-armenia': {
    title: 'Hotel Boutique Inteligente',
    industry: 'Hospitality',
    location: 'Armenia, Quindío',
    year: '2024',
    description: 'Transformación de hotel boutique en establecimiento inteligente.',
    challenge: 'El hotel necesitaba diferenciarse en un mercado competitivo ofreciendo experiencias únicas a los huéspedes, mientras reducía costos operativos mediante automatización.',
    solution: 'Implementamos automatización IoT en 45 habitaciones con control de iluminación, cortinas y temperatura. Instalamos TV interactiva, sistema de control de acceso con llave móvil, y gestión energética inteligente.',
    services: ['Domótica', 'Audio y Video', 'Eficiencia Energética', 'Control de Acceso'],
    results: [
      'Incremento del 20% en satisfacción de huéspedes',
      'Ahorro del 35% en consumo energético',
      'Check-in/check-out 100% automatizado',
      'Incremento del 12% en tarifa promedio',
    ],
  },
  'universidad-eje-cafetero': {
    title: 'Universidad del Eje Cafetero',
    industry: 'Educación',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Modernización tecnológica de campus universitario.',
    challenge: 'La universidad contaba con conectividad inadecuada, equipamiento obsoleto en aulas y sistemas de seguridad insuficientes para 8,000 estudiantes y 500 docentes.',
    solution: 'Diseñamos e implementamos una red WiFi 6E de alta densidad con cobertura total del campus, equipamos 50 aulas con tecnología interactiva, renovamos el auditorio con sistemas AV profesionales, e instalamos videovigilancia campus-wide.',
    services: ['Cableado Estructurado', 'Audio y Video', 'Seguridad Electrónica'],
    results: [
      'Cobertura WiFi del 100% del campus',
      '50 aulas equipadas con tecnología interactiva',
      'Reducción del 30% en costos operativos',
      'Incremento del 25% en matrícula virtual',
    ],
  },
  'planta-manufactura': {
    title: 'Planta de Manufactura',
    industry: 'Industrial',
    location: 'Cali, Valle del Cauca',
    year: '2024',
    description: 'Sistema integral de seguridad perimetral y control de acceso.',
    challenge: 'La planta industrial de 50,000 m² requería un sistema de seguridad integral que cubriera todo el perímetro, controlara el acceso vehicular y peatonal, e integrara con su sistema de ERP existente.',
    solution: 'Implementamos videovigilancia PTZ con visión nocturna IR para exteriores, control de acceso vehicular con lectura de placas, control peatonal biométrico, y detección de intrusos perimetral con cable sensorizado.',
    services: ['Seguridad Electrónica', 'Control de Acceso'],
    results: [
      'Cobertura del 100% del perímetro',
      'Reducción del 80% en incidentes de seguridad',
      'Integración completa con ERP existente',
      'Tiempo de respuesta reducido a 2 minutos',
    ],
  },
  'clinica-quindio': {
    title: 'Clínica del Quindío',
    industry: 'Salud',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Renovación de infraestructura de red y seguridad para clínica.',
    challenge: 'La clínica de 200 camas requería infraestructura de red de alta disponibilidad que soportara equipos médicos críticos, cumpliera con normativas de privacidad, y garantizara cero downtime en sistemas vitales.',
    solution: 'Diseñamos redes redundantes con 99.99% uptime, implementamos cableado médico especializado con aislamiento, instalamos control de acceso biométrico para áreas restringidas, y videovigilancia 24/7 con almacenamiento seguro.',
    services: ['Cableado Estructurado', 'Seguridad Electrónica', 'Control de Acceso'],
    results: [
      'Cero downtime en sistemas críticos',
      'Cumplimiento 100% de normativas de salud',
      'Mejora del 50% en velocidad de red',
      'Reducción del 90% en accesos no autorizados',
    ],
  },
};

export default function ProyectoPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <Link
              href="/proyectos"
              className="text-accent text-sm font-medium mb-4 inline-flex items-center gap-2 hover:underline"
            >
              <Icon name="arrow-left" size="sm" />
              Volver a Proyectos
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">{project.industry}</span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted text-sm">{project.location}</span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted text-sm">{project.year}</span>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              {project.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300}>
            <p className="text-xl text-text-secondary">{project.description}</p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedElement animation="slide-up">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                  El Desafío
                </h2>
                <p className="text-text-secondary">{project.challenge}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={100}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                  La Solución
                </h2>
                <p className="text-text-secondary">{project.solution}</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </Section>

      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="slide-up">
            <h2 className="text-2xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Servicios Implementados
            </h2>
          </AnimatedElement>

          <div className="flex flex-wrap gap-3 mb-12">
            {project.services.map((service) => (
              <AnimatedElement key={service} animation="fade-in">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium">
                  {service}
                </span>
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-2xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Resultados Medibles
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.results.map((result, index) => (
              <AnimatedElement
                key={index}
                animation="slide-up"
                delay={index * 100}
              >
                <div className="bg-bg-card border border-border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="check-circle" color="accent" size="md" />
                  </div>
                  <p className="text-text-primary font-medium">{result}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      {project.testimonial && (
        <Section background="default" padding="xl">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement animation="slide-up">
              <div className="bg-bg-card border border-accent/20 rounded-2xl p-8 md:p-12">
                <div className="mx-auto mb-6">
                  <Icon name="quotes" color="accent" size="2xl" className="opacity-30" />
                </div>
                <blockquote className="text-xl md:text-2xl text-text-primary font-medium mb-6">
                  "{project.testimonial.quote}"
                </blockquote>
                <cite className="not-italic">
                  <p className="text-text-primary font-semibold">{project.testimonial.author}</p>
                  <p className="text-text-secondary">{project.testimonial.role}</p>
                </cite>
              </div>
            </AnimatedElement>
          </div>
        </Section>
      )}

      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="slide-up">
            <h2 className="text-3xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              ¿Tienes un proyecto similar?
            </h2>
            <p className="text-text-secondary mb-8">
              Hablemos sobre cómo podemos ayudarte a alcanzar resultados similares.
            </p>
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-14 px-8 text-lg"
            >
              Solicitar Cotización
            </Link>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
