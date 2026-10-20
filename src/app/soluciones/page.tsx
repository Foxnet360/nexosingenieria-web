import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';
import { AlliedBrandsSection } from '@/components/sections/AlliedBrandsSection';
import { ServiceCTASection } from '@/components/sections/CTASection';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pageMetadata.soluciones.title,
  description: pageMetadata.soluciones.description,
};

const allServices = [
  {
    id: 'cableado-estructurado',
    title: 'Cableado Estructurado & Redes de Datos',
    subtitle: 'Infraestructura de conectividad física de alta velocidad y máxima fiabilidad.',
    description:
      'Diseño, canalización, peinado y certificación Fluke Networks de redes en Cobre Cat 6/6A y Fibra Óptica Monomodo/Multimodo.',
    image: '/images/soluciones/cableado-estructurado.webp',
    href: '/soluciones/cableado-estructurado',
    badge: 'Redes & Datos',
    subsystems: [
      'Cat 6A & Fibra Óptica',
      'Certificación Fluke DSX',
      'Ordenamiento de Racks',
      'Memoria TIA/EIA-568',
    ],
  },
  {
    id: 'seguridad-electronica',
    title: 'Seguridad Electrónica & Videovigilancia IP',
    subtitle: 'Protección inteligente 24/7 con analítica avanzada de inteligencia artificial.',
    description:
      'Sistemas convergentes de CCTV de alta definición, analítica de video, intrusión perimetral, citofonía IP y centros de monitoreo.',
    image: '/images/soluciones/seguridad-electronica.webp',
    href: '/soluciones/seguridad-electronica',
    badge: 'Seguridad Integral',
    subsystems: [
      'CCTV IP con IA',
      'Analítica de Video',
      'Citofonía Digital',
      'Detección Perimetral',
    ],
  },
  {
    id: 'domotica',
    title: 'Domótica & BMS (Edificios Inteligentes)',
    subtitle: 'Automatización integral de iluminación, clima, persianas y gestión de energía.',
    description:
      'Soluciones de gestión de edificación (BMS) que reducen el consumo energético hasta un 30% y simplifican el control operacional.',
    image: '/images/soluciones/domotica.webp',
    href: '/soluciones/domotica',
    badge: 'Smart Buildings',
    subsystems: [
      'Gestión Energética BMS',
      'Control de Iluminación',
      'Automatización HVAC',
      'Escenas Integradas',
    ],
  },
  {
    id: 'centros-de-datos',
    title: 'Centros de Datos & Cuartos Técnicos',
    subtitle: 'Infraestructura crítica con máxima disponibilidad y redundancia N+1 / 2N.',
    description:
      'Construcción y diseño Tier III/IV de Data Centers, incluyendo climatización de precisión, UPS modulares y monitoreo DCIM.',
    image: '/images/soluciones/centros-de-datos.webp',
    href: '/soluciones/centros-de-datos',
    badge: 'Infraestructura Crítica',
    subsystems: [
      'Diseño Tier III / IV',
      'Climatización de Precisión',
      'UPS Modulares & Plantas',
      'Monitoreo DCIM 24/7',
    ],
  },
  {
    id: 'audio-video',
    title: 'Audio y Video Profesional (AV)',
    subtitle: 'Experiencias audiovisuales inmersivas para salas de juntas y espacios comerciales.',
    description:
      'Sistemas de videoconferencia corporativa, videowalls de alta resolución, audio distribuido multizona y salas de control.',
    image: '/images/soluciones/audio-video.webp',
    href: '/soluciones/audio-video',
    badge: 'Multimedia AV',
    subsystems: [
      'Videoconferencia 4K',
      'Audio Distribuido',
      'Digital Signage',
      'Control Centralizado',
    ],
  },
  {
    id: 'control-acceso',
    title: 'Control de Acceso & Biometría',
    subtitle: 'Trazabilidad total de movimientos de personal, visitantes y vehículos.',
    description:
      'Terminales biométricas de reconocimiento facial, iris y huella, molinetes de alta velocidad, Lectura LPR y gestión de visitantes.',
    image: '/images/soluciones/seguridad-electronica.webp',
    href: '/soluciones/control-acceso',
    badge: 'Control Físico',
    subsystems: [
      'Reconocimiento Facial',
      'Lectura de Placas LPR',
      'Molinetes & Torniquetes',
      'Integración Nómina',
    ],
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Técnico & Soporte SLA 24/7',
    subtitle: 'Planes preventivos y correctivos para garantizar la continuidad del negocio.',
    description:
      'Vigilancia de infraestructura, atención inmediata de contingencias, actualización de firmware y administración de garantías.',
    image: '/images/proyectos/contraloria-bogota.webp',
    href: '/soluciones/mantenimiento',
    badge: 'Soporte Continuo',
    subsystems: [
      'Inspección Preventiva',
      'Respuesta Correctiva SLA',
      'Actualización de Firmware',
      'Reportes de Diagnóstico',
    ],
  },
];

const methodologySteps = [
  {
    number: '01',
    title: 'Diagnóstico & Levamiento',
    desc: 'Inspección técnica en sitio, análisis de requerimientos físicos, cargas eléctricas y normativas aplicables.',
  },
  {
    number: '02',
    title: 'Ingeniería de Detalle',
    desc: 'Diseño de arquitectura de red, planos CAD/BIM, cálculo de consumo energético y especificación de marcas.',
  },
  {
    number: '03',
    title: 'Instalación & Certificación',
    desc: 'Montaje bajo estándares TIA/EIA y pruebas rigurosas de certificación con equipos Fluke DSX-8000.',
  },
  {
    number: '04',
    title: 'Soporte SLA & As-Built',
    desc: 'Entrega de documentación técnica completa, capacitación del equipo cliente y acompañamiento 24/7.',
  },
];

export default function SolucionesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[52vh] flex items-end py-16 md:py-24 bg-bg-primary overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-soluciones.webp"
            alt="Soluciones de Ingeniería Nexos"
            fill
            className="object-cover object-center filter brightness-[0.38] contrast-110 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement animation="fade-in">
              <span className="px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider rounded-full mb-4 inline-block backdrop-blur-md">
                Portafolio de Especialidades 360°
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)] leading-tight">
                Nuestras Soluciones de Ingeniería
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-8">
                Transformamos infraestructuras convencionales en espacios inteligentes, seguros y de
                alta eficiencia mediante el diseño e integración certificada de tecnología
                multisectorial.
              </p>
            </AnimatedElement>

            {/* Quick Metrics Bar */}
            <AnimatedElement animation="slide-up" delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-bg-card/70 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <p className="text-accent font-bold text-lg font-mono">15+ Años</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">
                    Experiencia Real
                  </p>
                </div>
                <div className="bg-bg-card/70 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <p className="text-accent font-bold text-lg font-mono">300+ Proyectos</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">Implementados</p>
                </div>
                <div className="bg-bg-card/70 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <p className="text-accent font-bold text-lg font-mono">ANSI/TIA</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">
                    Norma Internacional
                  </p>
                </div>
                <div className="bg-bg-card/70 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <p className="text-accent font-bold text-lg font-mono">Hasta 25 Años</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">
                    Garantía de Fábrica
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Solutions Catalog Grid */}
      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedElement animation="fade-in">
              <span className="text-accent font-medium tracking-wide uppercase text-xs font-mono">
                Portafolio Integral
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 font-[family-name:var(--font-geist-sans)]">
                Líneas Especializadas de Servicio
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-text-secondary mt-3 text-base">
                Explora cada una de nuestras especialidades y sus capacidades técnicas integradas.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <AnimatedElement key={service.id} animation="slide-up" delay={index * 80}>
                <article className="bg-bg-card border border-border/80 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full">
                  {/* Image Banner Header */}
                  <div className="relative h-56 overflow-hidden bg-bg-secondary">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
                    <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border border-white/10 text-accent text-xs font-semibold uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors font-[family-name:var(--font-geist-sans)]">
                        {service.title}
                      </h3>
                      <p className="text-accent text-xs font-medium mb-4 font-mono">
                        {service.subtitle}
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Subsystems Pills */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                          Subsistemas Incluidos:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.subsystems.map(sub => (
                            <span
                              key={sub}
                              className="px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-text-secondary text-xs flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border/60">
                      <Link
                        href={service.href}
                        className="inline-flex items-center justify-between w-full text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform"
                      >
                        <span>Explorar Especificaciones Técnicas</span>
                        <Icon name="arrow-right" size="sm" />
                      </Link>
                    </div>
                  </div>
                </article>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      {/* Engineering Workflow Methodology */}
      <Section background="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedElement animation="fade-in">
              <span className="text-accent font-medium tracking-wide uppercase text-xs font-mono">
                Rigor Técnico & Calidad
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 font-[family-name:var(--font-geist-sans)]">
                Nuestro Enfoque Metodológico de Entrega
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-text-secondary mt-3 text-base">
                Garantizamos que cada proyecto cumpla con los estándares de ingeniería de principio
                a fin.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((m, idx) => (
              <AnimatedElement key={m.number} animation="slide-up" delay={idx * 100}>
                <div className="bg-bg-card border border-border rounded-2xl p-6 h-full relative overflow-hidden group hover:border-accent/40 transition-colors">
                  <span className="text-4xl font-bold text-accent/20 font-mono absolute top-4 right-4 group-hover:text-accent/30 transition-colors">
                    {m.number}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mb-3 font-[family-name:var(--font-geist-sans)]">
                    {m.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{m.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      {/* Allied Brands */}
      <AlliedBrandsSection
        title="Marcas Aliadas & Fabricantes Certificados"
        subtitle="Respaldamos nuestras instalaciones con la tecnología líder global de fabricantes en cada categoría de solución."
      />

      {/* CTA */}
      <ServiceCTASection serviceName="Portafolio de Soluciones" />
    </>
  );
}
