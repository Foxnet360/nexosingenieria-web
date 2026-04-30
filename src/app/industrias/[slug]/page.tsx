import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({
    slug,
  }));
}

const industries: Record<string, {
  title: string;
  description: string;
  challenges: string[];
  solutions: string[];
  caseStudy: {
    client: string;
    description: string;
    results: string[];
  };
}> = {
  corporativo: {
    title: 'Corporativo',
    description: 'Transformamos oficinas en espacios inteligentes con tecnología integrada que mejora la productividad y colaboración.',
    challenges: [
      'Redes lentas e inestables',
      'Salas de juntas sin tecnología adecuada',
      'Sistemas de seguridad desactualizados',
      'Alto consumo energético',
    ],
    solutions: [
      'Cableado estructurado categoría 6A/7',
      'Sistemas de videoconferencia 4K',
      'Videovigilancia IP con analítica',
      'Automatización de iluminación y climatización',
    ],
    caseStudy: {
      client: 'Empresa Financiera Nacional',
      description: 'Implementación completa de infraestructura tecnológica para sede principal de 5,000 m².',
      results: [
        'Reducción del 40% en tickets de soporte de red',
        'Ahorro del 25% en consumo energético',
        '99.9% de uptime en sistemas críticos',
      ],
    },
  },
  retail: {
    title: 'Retail y Centros Comerciales',
    description: 'Soluciones tecnológicas que mejoran la experiencia del cliente y protegen tu inversión.',
    challenges: [
      'Pérdidas por hurto',
      'Comunicación ineficiente con clientes',
      'Alto costo operativo de energía',
      'Gestión de múltiples ubicaciones',
    ],
    solutions: [
      'Videovigilancia inteligente con analítica de comportamiento',
      'Digital signage y sistemas de audio',
      'Gestión energética centralizada',
      'Monitoreo remoto 24/7',
    ],
    caseStudy: {
      client: 'Cadena de Retail Nacional',
      description: 'Sistema de seguridad y digital signage para 25 tiendas en Colombia.',
      results: [
        'Reducción del 60% en pérdidas por hurto',
        'Incremento del 15% en engagement de clientes',
        'Ahorro de $120M COP anuales en energía',
      ],
    },
  },
  salud: {
    title: 'Sector Salud',
    description: 'Infraestructura tecnológica de alta disponibilidad para clínicas y hospitales.',
    challenges: [
      'Requiere 100% disponibilidad',
      'Normativas estrictas de privacidad',
      'Integración con equipos médicos',
      'Control de accesos críticos',
    ],
    solutions: [
      'Redes redundantes con 99.99% uptime',
      'Cumplimiento HIPAA y normativas locales',
      'Cableado médico especializado',
      'Control de acceso biométrico',
    ],
    caseStudy: {
      client: 'Clínica del Quindío',
      description: 'Renovación completa de infraestructura de red y seguridad para clínica de 200 camas.',
      results: [
        'Cero downtime en sistemas críticos',
        'Cumplimiento 100% de normativas',
        'Mejora del 50% en velocidad de red',
      ],
    },
  },
  educacion: {
    title: 'Educación',
    description: 'Aulas inteligentes y campus conectados para una educación de vanguardia.',
    challenges: [
      'Conectividad inadecuada',
      'Equipamiento obsoleto',
      'Seguridad de estudiantes',
      'Presupuestos limitados',
    ],
    solutions: [
      'WiFi 6E de alta densidad',
      'Aulas interactivas y videoconferencia',
      'Videovigilancia campus-wide',
      'Soluciones escalables por fases',
    ],
    caseStudy: {
      client: 'Universidad del Eje Cafetero',
      description: 'Modernización tecnológica de campus para 8,000 estudiantes.',
      results: [
        'Cobertura WiFi del 100% del campus',
        '50 aulas equipadas con tecnología interactiva',
        'Reducción del 30% en costos operativos',
      ],
    },
  },
  industrial: {
    title: 'Industrial',
    description: 'Seguridad perimetral y redes robustas para plantas industriales y bodegas.',
    challenges: [
      'Amplias áreas de cobertura',
      'Condiciones ambientales difíciles',
      'Seguridad perimetral crítica',
      'Control de acceso de personal',
    ],
    solutions: [
      'Videovigilancia PTZ con IR para exteriores',
      'Cableado industrial categorizado',
      'Control de acceso vehicular y peatonal',
      'Detección de intrusos perimetral',
    ],
    caseStudy: {
      client: 'Planta de Manufactura',
      description: 'Sistema integral de seguridad para planta industrial de 50,000 m².',
      results: [
        'Cobertura del 100% del perímetro',
        'Reducción del 80% en incidentes de seguridad',
        'Integración con sistema de ERP existente',
      ],
    },
  },
  hospitality: {
    title: 'Hospitality',
    description: 'Hoteles inteligentes que ofrecen experiencias memorables a los huéspedes.',
    challenges: [
      'Experiencia del huésped inconsistente',
      'Alto consumo energético',
      'Sistemas aislados',
      'Seguridad de huéspedes y activos',
    ],
    solutions: [
      'Automatización de habitaciones (IoT)',
      'TV interactiva y entretenimiento',
      'Gestión energética inteligente',
      'Control de acceso con llave móvil',
    ],
    caseStudy: {
      client: 'Hotel Boutique Armenia',
      description: 'Transformación en hotel inteligente con 45 habitaciones.',
      results: [
        'Incremento del 20% en satisfacción de huéspedes',
        'Ahorro del 35% en consumo energético',
        'Check-in/check-out automatizado',
      ],
    },
  },
};

export default function IndustriaPage({ params }: { params: { slug: string } }) {
  const industry = industries[params.slug];

  if (!industry) {
    notFound();
  }

  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <Link
              href="/industrias"
              className="text-accent text-sm font-medium mb-4 inline-flex items-center gap-2 hover:underline"
            >
              <Icon name="arrow-left" size="sm" />
              Volver a Industrias
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              {industry.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-xl text-text-secondary">{industry.description}</p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedElement animation="slide-up">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                  Desafíos Comunes
                </h2>
                <ul className="space-y-4">
                  {industry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="x" color="error" size="xs" />
                      </div>
                      <span className="text-text-secondary">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={100}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
                  Nuestras Soluciones
                </h2>
                <ul className="space-y-4">
                  {industry.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="check" color="accent" size="xs" />
                      </div>
                      <span className="text-text-secondary">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </Section>

      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="slide-up">
            <div className="bg-bg-card border border-border rounded-xl p-8">
              <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">Caso de Éxito</p>
              <h3 className="text-2xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                {industry.caseStudy.client}
              </h3>
              <p className="text-text-secondary mb-6">{industry.caseStudy.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industry.caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-bg-primary/50 rounded-lg p-4 text-center">
                    <p className="text-accent font-semibold">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
