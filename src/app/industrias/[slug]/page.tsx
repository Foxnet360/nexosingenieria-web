import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

export function generateStaticParams() {
  return Object.keys(industries).map(slug => ({
    slug,
  }));
}

const industries: Record<
  string,
  {
    title: string;
    description: string;
    heroImage: string;
    challenges: string[];
    solutions: string[];
    caseStudy: {
      client: string;
      description: string;
      results: string[];
    };
  }
> = {
  corporativo: {
    title: 'Sector Corporativo & Oficinas Inteligentes',
    description:
      'Transformamos edificios corporativos y oficinas en espacios de alto rendimiento con redes 10G, salas de reuniones automatizadas y seguridad integrada.',
    heroImage: '/images/proyectos/centro-empresarial-icono.webp',
    challenges: [
      'Redes lentas, cuellos de botella e inestabilidad en videoconferencias',
      'Salas de juntas complejas de operar y sin integración multimedia',
      'Sistemas de seguridad desactualizados sin control de acceso centralizado',
      'Alto consumo energético por climatización e iluminación ineficientes',
    ],
    solutions: [
      'Cableado estructurado categoría 6A/7 con certificación de canal a 25 años',
      'Sistemas de videoconferencia 4K, audio distribuido y reservación de salas',
      'Videovigilancia IP con analítica de video y control de acceso peatonal/vehicular',
      'Automatización BMS de iluminación dimerizable y control de climatización',
    ],
    caseStudy: {
      client: 'PH Centro Empresarial Ícono',
      description:
        'Blindobarra vertical central, control de acceso Kantech, BMS e infraestructura de alta eficiencia con Acreditación Internacional EDGE.',
      results: [
        'Obtención de la Certificación Ambiental Internacional EDGE',
        'Ahorro del 25% en consumo de energía eléctrica',
        'Disminución del costo de operación y mantenimiento en un 27%',
      ],
    },
  },
  retail: {
    title: 'Retail, Comercio & Centros Comerciales',
    description:
      'Soluciones tecnológicas que mejoran la experiencia del comprador, reducen mermas por hurto y optimizan el consumo energético.',
    heroImage: '/images/proyectos/inversiones-barake-garcia-ibg.webp',
    challenges: [
      'Pérdidas por hurto interno y externo en superficies de venta',
      'Comunicación audiovisual ineficiente con los visitantes del centro comercial',
      'Alto costo operativo de energía eléctrica en iluminación y aire acondicionado',
      'Complejidad en la gestión unificada de múltiples sedes o tiendas regionales',
    ],
    solutions: [
      'Videovigilancia inteligente Hikvision/Hanwha con analítica de conteo y comportamiento',
      'Digital signage centralizado y audio ambiental multizona zonificado',
      'Gestión energética centralizada con telemetría en tiempo real',
      'Monitoreo perimetral y centro de control unificado 24/7',
    ],
    caseStudy: {
      client: 'Inversiones Barake García S.A.S. (IBG)',
      description:
        'Red troncal 10G Cisco Meraki FullStack administrada en la nube unificando bodegas logísticas y puntos de venta.',
      results: [
        'Migración de red en caliente con 100% de continuidad operativa',
        'Centralización total de la gestión de Voz, Datos y Seguridad en la nube',
        'Eliminación de cuellos de botella en despachos logísticos',
      ],
    },
  },
  salud: {
    title: 'Sector Salud & Cuidados Críticos',
    description:
      'Infraestructura tecnológica hospitalaria de máxima disponibilidad, inmunidad electromagnética y bioseguridad para clínicas y centros de salud.',
    heroImage: '/images/proyectos/uci-neonatal-armenia.webp',
    challenges: [
      'Exigencia estricta de 100% de disponibilidad sin interrupciones en áreas críticas',
      'Interferencias electromagnéticas que pueden afectar equipos médicos de precisión',
      'Control de acceso restringido a zonas neonatales, quirófanos y farmacias',
      'Supervisión continua de gases medicinales y condiciones ambientales',
    ],
    solutions: [
      'Cableado estructurado Categoría 7A blindado de grado hospitalario',
      'Redes redundantes con inmunidad electromagnética integral',
      'Control de acceso biométrico e intrusión en áreas restringidas',
      'Iluminación dimerizable por zonas de descanso neurológico neonatal',
    ],
    caseStudy: {
      client: 'Unidad de Cuidados Intensivos Neonatales',
      description:
        'Cableado Cat 7A blindado hospitalario, control de iluminación dimerizable y monitoreo de gases especiales.',
      results: [
        'Cobertura e inmunidad electromagnética integral en UCI Neonatal',
        '37% de reducción en el consumo eléctrico por iluminación',
        'Garantía de descanso neurológico neonatal por control zonal',
      ],
    },
  },
  educacion: {
    title: 'Educación & Smart Campus',
    description:
      'Aulas inteligentes, laboratorios de innovación y redes Wi-Fi de alta densidad para universidades e instituciones educativas.',
    heroImage: '/images/proyectos/unad-edificio-celestino-mutis.webp',
    challenges: [
      'Alta densidad de dispositivos móviles intentando conectarse simultáneamente',
      'Uso ineficiente de laboratorios y salas por falta de automatización de reservas',
      'Consumo elevado de energía eléctrica en grandes complejos de aulas',
      'Seguridad física perimetral e interior en campus extendidos',
    ],
    solutions: [
      'Redes Wi-Fi 6 de alta densidad y cableado estructurado Cat 6A',
      'Automatización de laboratorios vinculada al sistema de agenda institucional',
      'Control de iluminación dimerizable por sensores de ocupación y luz natural',
      'CCTV IP centralizado con botones de pánico e intrusión perimetral',
    ],
    caseStudy: {
      client: 'UNAD — Edificio José Celestino Mutis',
      description:
        'Automatización de gestión de instalaciones, control de iluminación dimerizable y red de comunicaciones para campus.',
      results: [
        'Disminución del 43% en consumo de energía eléctrica por iluminación',
        'Automatización de reservas y control de agenda de laboratorios',
        'Interoperabilidad total de servicios de red en el campus',
      ],
    },
  },
  industrial: {
    title: 'Sector Industrial & Misión Crítica',
    description:
      'Supervisión termográfica 24/7, protección perimetral y conectividad de alta resistencia para plantas de producción y subestaciones eléctricas.',
    heroImage: '/images/proyectos/subestacion-calarca-edeq.webp',
    challenges: [
      'Riesgo de fallas catastróficas por sobrecalentamiento en transformadores de potencia',
      'Vulnerabilidad en perímetros extensos de infraestructura crítica',
      'Ambientes con polvo, humedad y vibraciones extremas',
      'Necesidad de integración remota al BMS central de la compañía energética',
    ],
    solutions: [
      'Supervisión termográfica industrial en tiempo real enfocada a equipos de alta tensión',
      'Anillos perimetrales en fibra óptica con CCTV e inteligencia de intrusión',
      'Gabinetes e infraestructura blindada con grado de protección industrial',
      'Integración remota de alarmas preventivas al sistema BMS corporativo',
    ],
    caseStudy: {
      client: 'Subestación Calarcá — EDEQ S.A. E.S.P.',
      description:
        'Supervisión termográfica industrial 24/7 sobre transformadores de potencia e integración BMS central.',
      results: [
        'Detección temprana de anomalías térmicas en transformadores de potencia',
        'Integración exitosa de alarmas preventivas al BMS central EDEQ',
        'Cero interrupciones en el servicio de energía regional',
      ],
    },
  },
  hospitality: {
    title: 'Hospitality & Senior Living',
    description:
      'Citofonía IP unificada, monitoreo asistencial de emergencias y automatización de confort para complejos de hospedaje y senior living.',
    heroImage: '/images/proyectos/seniors-club-pance.webp',
    challenges: [
      'Necesidad de respuesta asistencial inmediata en departamentos de adultos mayores',
      'Sistemas de comunicaciones fragmentados e ineficientes',
      'Elevados costos de operación y mantenimiento en áreas comunes',
      'Exigencia de conectividad de alta velocidad y entretenimiento sin interrupciones',
    ],
    solutions: [
      'Plataforma asistencial de enfermería con llamadores de emergencia por habitación',
      'Red convergente sobre cableado unificado con citofonía y telefonía IP',
      'CCTV IP en pasillos y zonas comunes con monitoreo en recepción',
      'Audio ambiental zonificado y conectividad Wi-Fi de alta calidad',
    ],
    caseStudy: {
      client: 'Seniors Club Pance',
      description:
        'Plataforma unificada IP con citofonía, videovigilancia y sistema asistencial de emergencia.',
      results: [
        '100% de integración de seguridad y comunicaciones en una plataforma IP',
        'Monitoreo asistencial continuo y atención inmediata de emergencias',
        'Máxima satisfacción y confort para los residentes',
      ],
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) {
    return {
      title: 'Industria no encontrada | Nexos Ingeniería SAS',
    };
  }
  return {
    title: `${industry.title} | Soluciones por Industria | Nexos Ingeniería SAS`,
    description: industry.description,
  };
}

export default async function IndustriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    notFound();
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src={industry.heroImage}
            alt={industry.title}
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedElement animation="fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              Solución por Industria
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              {industry.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">{industry.description}</p>
          </AnimatedElement>
        </div>
      </section>

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
              <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">
                Caso de Éxito
              </p>
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
