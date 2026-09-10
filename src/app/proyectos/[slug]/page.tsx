import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({
    slug,
  }));
}

export interface ProjectDetail {
  title: string;
  client: string;
  clientLogo?: string;
  industry: string;
  location: string;
  year: string;
  image: string;
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
}

export const projects: Record<string, ProjectDetail> = {
  'edeq-sedes-y-bms': {
    title: 'EDEQ S.A. E.S.P. — Proyecto Integral de Sedes y BMS',
    client: 'Empresa de Energía del Quindío S.A. E.S.P. (Grupo EPM)',
    clientLogo: '/images/logos_clientes/logo_EDEQ.png',
    industry: 'Energía & BMS',
    location: 'Armenia & Quindío, Colombia',
    year: '2024',
    image: '/images/proyectos/edeq-sedes-y-bms.webp',
    description:
      'Modernización e integración tecnológica de seguridad electrónica, redes de alta disponibilidad, control de iluminación y BMS corporativo para la principal electrificadora del departamento.',
    challenge:
      'Diseñar, integrar y modernizar los sistemas de seguridad electrónica, comunicaciones y gestión de edificios en las sedes corporativas y operativas de EDEQ S.A. E.S.P., logrando centralizar operaciones y permitiendo la administrabilidad basada en datos en tiempo real.',
    solution:
      'Implementación de una arquitectura integral de seguridad electrónica (CCTV con analítica, sistema de extinción de incendios, control de acceso peatonal/vehicular, intrusión), comunicaciones unificadas, control inteligente de iluminación, salas de juntas e integración al sistema BMS (Building Management System) corporativo.',
    services: [
      'Integración BMS Central',
      'Seguridad Electrónica Integral',
      'Cableado Estructurado Certificado',
      'Control de Iluminación Inteligente',
      'Comunicaciones Unificadas',
    ],
    results: [
      'Centralización y optimización del recurso técnico y humano operando sedes múltiples',
      'Administrabilidad corporativa basada en telemetría y datos en tiempo real',
      'Integración completa y monitoreo de sedes remotas en una única plataforma BMS unificada',
      'Continuidad operativa 100% garantizada durante la fase de puesta en marcha (commissioning)',
    ],
    testimonial: {
      quote:
        'La integración de nuestras sedes remotas en la plataforma central BMS nos brinda visibilidad y administrabilidad en tiempo real sobre toda la infraestructura energética.',
      author: 'Dirección de Tecnología & Operaciones',
      role: 'Empresa de Energía del Quindío (EDEQ S.A. E.S.P. - Grupo EPM)',
    },
  },
  'unad-edificio-celestino-mutis': {
    title: 'UNAD — Edificio José Celestino Mutis',
    client: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    clientLogo: '/images/logos_clientes/Logo_UNAD.svg',
    industry: 'Educación & Smart Campus',
    location: 'Bogotá, Colombia',
    year: '2024',
    image: '/images/proyectos/unad-edificio-celestino-mutis.webp',
    description:
      'Automatización de gestión de instalaciones, laboratorios de prácticas y seguridad electrónica para campus inteligente.',
    challenge:
      'Dotar al Edificio José Celestino Mutis de un sistema automatizado de gestión de instalaciones que optimizara el consumo eléctrico y coordinara el uso ágil de aulas y laboratorios de prácticas.',
    solution:
      'Despliegue de seguridad electrónica integral (CCTV, detección de incendios, intrusión y accesos), red de comunicaciones alambradas e inalámbricas de alta densidad, control de iluminación dimerizable y automatización de laboratorios vinculados al sistema de reservas institucionales.',
    services: [
      'Cableado Estructurado Cat 6A',
      'Control de Iluminación Dimerizable',
      'Seguridad Electrónica Integral',
      'Automatización de Laboratorios',
    ],
    results: [
      'Disminución del 43% en el consumo de energía eléctrica por iluminación',
      'Automatización de reservas de salas y control por agenda de instalaciones universitarias',
      'Integración completa de servicios de red e interoperabilidad de laboratorios de práctica',
    ],
    testimonial: {
      quote:
        'Logramos reducir casi la mitad del consumo de iluminación en el edificio mientras automatizamos el acceso y agenda de nuestros laboratorios.',
      author: 'Dirección de Infraestructura Física',
      role: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    },
  },
  'centro-empresarial-icono': {
    title: 'PH Centro Empresarial Ícono',
    client: 'PH Centro Empresarial Ícono',
    clientLogo: '/images/logos_clientes/logo_Icono.svg',
    industry: 'Corporativo & Certificación EDGE',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/centro-empresarial-icono.webp',
    description:
      'Infraestructura electromecánica, blindobarra vertical, BMS central y acreditación internacional de sostenibilidad EDGE.',
    challenge:
      'Diseñar e implementar la infraestructura de redes especiales y control para un centro empresarial de alto estándar, garantizando máxima eficiencia energética para la obtención de la Certificación EDGE.',
    solution:
      'Instalación de blindobarra vertical central para distribución eléctrica eficiente, bus centralizado de comunicaciones, iluminación dimerizable, CCTV IP Hanwha, control de acceso peatonal/vehicular Kantech KT-400 y BMS central.',
    services: [
      'Certificación EDGE Sostenible',
      'Blindobarra Vertical Central',
      'BMS Central & Virtualización',
      'Control de Acceso Kantech KT-400',
      'CCTV IP Hanwha',
    ],
    results: [
      'Obtención formal de la Certificación Ambiental Internacional EDGE',
      'Ahorro del 25% en consumo de energía eléctrica del complejo empresarial',
      'Disminución del costo de operación y mantenimiento en un 27%',
      '39% menos energía incorporada en los materiales constructivos instalados',
    ],
    testimonial: {
      quote:
        'Nexos Ingeniería fue clave en el diseño e integración electromecánica que nos permitió certificar a Ícono como edificio verde EDGE.',
      author: 'Consejo de Administración',
      role: 'PH Centro Empresarial Ícono',
    },
  },
  'seniors-club-pance': {
    title: 'Seniors Club Pance',
    client: 'Seniors Club Pance',
    clientLogo: '/images/logos_clientes/logo_Seniors_Club.svg',
    industry: 'Asistencial & Senior Living',
    location: 'Cali, Valle del Cauca',
    year: '2024',
    image: '/images/proyectos/seniors-club-pance.webp',
    description:
      'Plataforma unificada de comunicaciones, citofonía IP y monitoreo asistencial con llamadores de emergencia.',
    challenge:
      'Diseñar e integrar una plataforma tecnológica unificada de comunicaciones, seguridad y monitoreo asistencial adaptada a adultos mayores donde la rapidez de respuesta es crítica.',
    solution:
      'Red convergente sobre cableado estructurado unificado que integra citofonía y telefonía IP, circuito cerrado de televisión (CCTV) en pasillos y áreas comunes, llamadores de enfermería de emergencia en cada departamento y audio ambiental zonificado.',
    services: [
      'Sistemas Asistenciales de Emergencia',
      'Citofonía & Telefonía IP',
      'Cableado Estructurado Unificado',
      'CCTV IP & Audio Ambientado',
    ],
    results: [
      'Integración del 100% de los servicios de seguridad y comunicaciones en una misma plataforma IP',
      'Monitoreo asistencial continuo y respuesta inmediata con llamadores de emergencia por habitación',
      'Servicios de conectividad y entretenimiento de alto valor agregado para los residentes',
    ],
  },
  'subestacion-calarca-edeq': {
    title: 'Subestación Calarcá — Termografía de Transformadores EDEQ',
    client: 'Empresa de Energía del Quindío S.A. E.S.P. (EDEQ)',
    clientLogo: '/images/logos_clientes/logo_EDEQ.png',
    industry: 'Energía & Misión Crítica',
    location: 'Calarcá, Quindío',
    year: '2024',
    image: '/images/proyectos/subestacion-calarca-edeq.webp',
    description:
      'Supervisión termográfica industrial en tiempo real sobre transformadores de potencia para prevención de fallas catastróficas.',
    challenge:
      'Implementar un proyecto piloto de supervisión termográfica continua sobre transformadores de potencia para prevenir fallas por sobrecalentamiento, incendios y cortes del servicio eléctrico regional.',
    solution:
      'Instalación de cámaras termográficas industriales IP enfocadas a transformadores de potencia, enlazadas con el sistema de alarma de incendios del edificio y conectadas al BMS central de EDEQ para supervisión remota 24/7.',
    services: [
      'Supervisión Termográfica Industrial',
      'Ingeniería en Alta Tensión',
      'Integración BMS Central 24/7',
      'Prevención de Incendios',
    ],
    results: [
      'Supervisión continua y detección temprana de anomalías térmicas en transformadores de potencia',
      'Integración exitosa de señales de alerta preventiva directamente al BMS central corporativo',
      'Cero interrupciones en la distribución eléctrica durante la fase de instalación e ingeniería',
    ],
  },
  'bosque-residencial-la-pradera': {
    title: 'Bosque Residencial La Pradera',
    client: 'Bosque Residencial La Pradera',
    clientLogo: '/images/logos_clientes/logo_Uraki.svg',
    industry: 'Residencial & Energía Solar',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/bosque-residencial-la-pradera.webp',
    description:
      'Anillo perimetral en fibra óptica, CCTV con analítica de intrusión y generación solar fotovoltaica.',
    challenge:
      'Diseñar y construir la infraestructura de conectividad de alta velocidad, videovigilancia con analítica y automatización residencial con energía renovable para conjunto campestre.',
    solution:
      'Anillo perimetral en fibra óptica, CCTV con analítica inteligente de video para detección de intrusión, automatización domótica integral (seguridad, audio/video multizona) y generación solar fotovoltaica con paneles solares.',
    services: [
      'Domótica Residencial Integral',
      'Energía Solar Fotovoltaica',
      'Anillo Perimetral de Fibra Óptica',
      'Analítica Inteligente de Video',
    ],
    results: [
      '12 residencias campestres completamente automatizadas con control inteligente',
      '47% de reducción en el consumo de energía eléctrica convencional en viviendas con paneles solares',
      'Monitoreo perimetral robusto en tiempo real sobre red de fibra óptica dedicada',
    ],
  },
  'uci-neonatal-armenia': {
    title: 'Unidad de Cuidados Intensivos Neonatales',
    client: 'Sector Salud (Clínica Especializada)',
    clientLogo: '/images/logos_clientes/logo_Uniminuto.png',
    industry: 'Salud & Cuidados Críticos',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/uci-neonatal-armenia.webp',
    description:
      'Cableado Cat 7A blindado hospitalario, control de iluminación dimerizable y monitoreo de gases especiales.',
    challenge:
      'Diseñar e instalar redes de comunicaciones e iluminación de máxima fiabilidad en áreas hospitalarias críticas para recién nacidos, asegurando inmunidad contra interferencias electromagnéticas.',
    solution:
      'Cableado estructurado Categoría 7A blindado de grado hospitalario, sistema de monitoreo de suministro de gases especiales y control de iluminación dimerizable por zonas específicas de atención neonatal.',
    services: [
      'Cableado Cat 7A Blindado Hospitalario',
      'Control de Iluminación Dimerizable',
      'Inmunidad Electromagnética',
      'Monitoreo de Gases Medicinales',
    ],
    results: [
      'Cobertura e inmunidad electromagnética integral en Cuidados Intensivos, Intermedios y Básicos',
      '37% de reducción en el consumo eléctrico de iluminación',
      'Control preciso por zonas para adecuarse a procedimientos médicos y descanso neurológico neonatal',
    ],
  },
  'inversiones-barake-garcia-ibg': {
    title: 'Sede Corporativa & Bodegas IBG',
    client: 'Inversiones Barake García S.A.S. (IBG)',
    clientLogo: '/images/logos_clientes/logo_IBG.svg',
    industry: 'Logística & Redes 10G',
    location: 'Armenia & Caimo, Quindío',
    year: '2024',
    image: '/images/proyectos/inversiones-barake-garcia-ibg.webp',
    description:
      'Red troncal 10G Cisco Meraki FullStack administrada en la nube, unificando voz, datos y seguridad.',
    challenge:
      'Modernizar la infraestructura tecnológica y de comunicaciones de la sede corporativa y bodegas logísticas principales, sustituyendo redes legadas obsoletas por una red de 10 Gigabits.',
    solution:
      'Diseño de topología de red troncal a 10 Gigabits (10G) y suministro, instalación y puesta en marcha de una solución FullStack 10G Cisco Meraki que unifica voz, datos y seguridad administrada centralmente desde la nube.',
    services: [
      'Arquitectura de Red Troncal 10G',
      'Solución FullStack Cisco Meraki',
      'Conectorización de Fibra Óptica',
      'Migración de Red en Caliente',
    ],
    results: [
      'Red de convergencia 10G Cisco Meraki 100% operativa instalada con migración en caliente',
      'Centralización de la gestión de Voz, Datos y Seguridad unificada desde el dashboard Cloud',
      'Eliminación total de cuellos de botella en la operación logística de bodegas principales',
    ],
  },
  'subestacion-centenario-sil-edeq': {
    title: 'Subestación Eléctrica Centenario — SIL / EDEQ',
    client: 'Soporte A La Ingeniería S.A.S. (SIL) / EDEQ S.A. E.S.P.',
    clientLogo: '/images/logos_clientes/logo_SIL.svg',
    industry: 'Seguridad & Infraestructura Crítica',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/subestacion-centenario-sil-edeq.webp',
    description:
      'CCTV IP Hikvision 5MP/4MP domo y fisheye, control de acceso e intrusión perimetral para subestación eléctrica.',
    challenge:
      'Ejecutar el suministro, montaje y comisionamiento de los sistemas de seguridad física y electrónica para la nueva Subestación Eléctrica Centenario, protegiendo la distribución de energía en Armenia.',
    solution:
      'Sistema integral de CCTV IP con cámaras tipo domo y ojo de pez Hikvision de 5MP y 4MP, control de acceso en áreas restringidas y sistema de detección de intrusión y robo con señalización remota.',
    services: [
      'CCTV IP Hikvision 5MP/4MP',
      'Control de Acceso Restringido',
      'Detección de Intrusión Perimetral',
      'Cableado Estruturado Blindado',
    ],
    results: [
      '100% de cobertura perimetral e interior en pasillos, celdas, escaleras y sala de control',
      'Entrega técnica a satisfacción de SIL y recepción de obra técnica por EDEQ S.A. E.S.P.',
    ],
  },
  'contraloria-bogota': {
    title: 'Mantenimiento Especializado — Contraloría de Bogotá',
    client: 'Contraloría de Bogotá / Contraloría General de la República',
    clientLogo: '/images/logos_clientes/logo_Contraloria.svg',
    industry: 'Sector Público & Mantenimiento',
    location: 'Bogotá, D.C.',
    year: '2024',
    image: '/images/proyectos/contraloria-bogota.webp',
    description:
      'Mantenimiento preventivo y correctivo de subsistemas electrónicos de seguridad, automatización e hidráulica.',
    challenge:
      'Gestionar y ejecutar el mantenimiento especializado de subsistemas electrónicos de seguridad, automatización e infraestructura hidráulica en las sedes de la entidad de control, asegurando continuidad operativa.',
    solution:
      'Mantenimiento preventivo y correctivo de sistemas electrónicos e hidráulicos, adquisición de repuestos, ingeniería residente y supervisión de seguridad y salud en el trabajo (SST).',
    services: [
      'Mantenimiento Preventivo & Correctivo',
      'Ingeniería Residente',
      'Supervisión SST Estatal',
      'Sistemas Electrónicos e Hidráulicos',
    ],
    results: [
      'Ejecución del 100% de las actividades contratadas dentro del plazo y presupuesto estipulado',
      'Garantía de continuidad operativa en todas las sedes de la entidad fiscalizadora',
    ],
  },
  'redes-incendio-conjuntos-uraki': {
    title: 'Redes Contra Incendios (Boreal, Austral, Seroa, Macuira)',
    client: 'Uraki Constructora / Desarrolladores del Eje Cafetero',
    clientLogo: '/images/logos_clientes/logo_Uraki.svg',
    industry: 'Residencial Vertical & NFPA',
    location: 'Eje Cafetero, Colombia',
    year: '2024',
    image: '/images/proyectos/redes-incendio-conjuntos-uraki.webp',
    description:
      'Ingeniería y montaje de redes de protección contra incendios bajo estándar NFPA 72/13/14 y norma NSR-10 Títulos J y K.',
    challenge:
      'Diseñar e implementar redes de protección y detección de incendios en torres de apartamentos de gran altura conforme a normas sismorresistentes NSR-10 y estándares internacionales NFPA.',
    solution:
      'Ingeniería básica y de detalle, planos constructivos, memorias de cálculo hidráulicas/electrónicas e instalación de paneles centrales, sensores fototérmicos y sirenas estroboscópicas UL/FM.',
    services: [
      'Diseño de Redes Incendio NFPA',
      'Memorias de Cálculo Hidráulico',
      'Detección Fototérmica UL/FM',
      'Norma Sismorresistente NSR-10',
    ],
    results: [
      'Diseños aprobados ante curadurías urbanas y cuerpos de bomberos en el Eje Cafetero',
      'Cumplimiento normativo integral de seguridad humana en más de 400 apartamentos construidos',
    ],
  },
  'palacio-de-justicia-armenia': {
    title: 'Palacio de Justicia de Armenia — Rama Judicial',
    client: 'Rama Judicial de Colombia (Dirección Seccional Armenia)',
    clientLogo: '/images/logos_clientes/logo_Rama_Judicial.svg',
    industry: 'Institucional & Seguridad Judicial',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/palacio-de-justicia-armenia.webp',
    description:
      'Modernización de videovigilancia y cableado estructurado en sedes de la Rama Judicial.',
    challenge:
      'Modernizar los sistemas de seguridad electrónica y la red de datos en la sede judicial de Armenia para garantizar la protección de funcionarios, público y recintos de audiencias.',
    solution:
      'Despliegue de red de videovigilancia IP y cableado estructurado en zonas neurálgicas del palacio de justicia, pasillos, accesos públicos y salas de audiencias.',
    services: [
      'Videovigilancia IP Judicial',
      'Cableado Estructurado',
      'Canalizaciones Perimetrales',
      'Centro de Monitoreo',
    ],
    results: [
      'Cobertura integral de seguridad en accesos y salas públicas de audiencias',
      'Operación continua y protegida de los canales de conectividad judicial',
    ],
  },
};

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
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 scale-105 transition-transform duration-1000"
            loading="eager"
            decoding="async"
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
                    <img
                      src={project.clientLogo}
                      alt={project.client}
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
