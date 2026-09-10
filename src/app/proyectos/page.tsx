import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ContainerCard } from '@/components/ui/ContainerCard';

export const metadata: Metadata = {
  title: 'Proyectos Reales | Nexos Ingeniería SAS',
  description:
    'Explora nuestro portafolio de proyectos reales en infraestructura de red, seguridad electrónica, BMS, automatización y redes contra incendios en Colombia.',
};

export const realProjectsList = [
  {
    slug: 'edeq-sedes-y-bms',
    title: 'EDEQ S.A. E.S.P. — Proyecto Integral de Sedes y BMS',
    client: 'Empresa de Energía del Quindío S.A. E.S.P.',
    location: 'Armenia & Quindío, Colombia',
    image: '/images/proyectos/edeq-sedes-y-bms.webp',
    description:
      'Modernización e integración tecnológica de seguridad electrónica, redes de alta disponibilidad y plataforma BMS corporativa.',
    category: 'Energía & BMS',
  },
  {
    slug: 'unad-edificio-celestino-mutis',
    title: 'UNAD — Edificio José Celestino Mutis',
    client: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    location: 'Bogotá, Colombia',
    image: '/images/proyectos/unad-edificio-celestino-mutis.webp',
    description:
      'Automatización de instalaciones, control de iluminación dimerizable (-43% consumo) y red de comunicaciones para laboratorios.',
    category: 'Educación & Smart Campus',
  },
  {
    slug: 'centro-empresarial-icono',
    title: 'PH Centro Empresarial Ícono',
    client: 'PH Centro Empresarial Ícono',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/centro-empresarial-icono.webp',
    description:
      'Blindobarra vertical central, control de acceso Kantech, BMS e infraestructura de alta eficiencia con Certificación EDGE.',
    category: 'Corporativo & Certificación EDGE',
  },
  {
    slug: 'seniors-club-pance',
    title: 'Seniors Club Pance',
    client: 'Seniors Club Pance',
    location: 'Cali, Valle del Cauca',
    image: '/images/proyectos/seniors-club-pance.webp',
    description:
      'Plataforma unificada IP con citofonía, videovigilancia y sistema asistencial de llamadores de enfermería de emergencia.',
    category: 'Asistencial & Senior Living',
  },
  {
    slug: 'subestacion-calarca-edeq',
    title: 'Subestación Calarcá — Termografía EDEQ',
    client: 'Empresa de Energía del Quindío S.A. E.S.P.',
    location: 'Calarcá, Quindío',
    image: '/images/proyectos/subestacion-calarca-edeq.webp',
    description:
      'Supervisión termográfica industrial 24/7 sobre transformadores de potencia e integración con el BMS central para prevención de fallas.',
    category: 'Energía & Misión Crítica',
  },
  {
    slug: 'bosque-residencial-la-pradera',
    title: 'Bosque Residencial La Pradera',
    client: 'Bosque Residencial La Pradera',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/bosque-residencial-la-pradera.webp',
    description:
      'Anillo perimetral en fibra óptica, CCTV con analítica de intrusión y generación solar fotovoltaica con 47% de ahorro en red.',
    category: 'Residencial & Energía Solar',
  },
  {
    slug: 'uci-neonatal-armenia',
    title: 'Unidad de Cuidados Intensivos Neonatales',
    client: 'Sector Salud (Clínica Especializada)',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/uci-neonatal-armenia.webp',
    description:
      'Cableado Cat 7A blindado grado hospitalario, inmunidad electromagnética e iluminación dimerizable por zonas neonatales.',
    category: 'Salud & Cuidados Críticos',
  },
  {
    slug: 'inversiones-barake-garcia-ibg',
    title: 'Sede Corporativa & Bodegas IBG',
    client: 'Inversiones Barake García S.A.S. (IBG)',
    location: 'Armenia & Caimo, Quindío',
    image: '/images/proyectos/inversiones-barake-garcia-ibg.webp',
    description:
      'Red troncal 10G Cisco Meraki FullStack administrada en la nube, unificando voz, datos y seguridad con migración en caliente.',
    category: 'Logística & Redes 10G',
  },
  {
    slug: 'subestacion-centenario-sil-edeq',
    title: 'Subestación Eléctrica Centenario — SIL / EDEQ',
    client: 'Soporte A La Ingeniería S.A.S. (SIL) / EDEQ S.A. E.S.P.',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/subestacion-centenario-sil-edeq.webp',
    description:
      'CCTV IP Hikvision de 5MP/4MP con domos y ojo de pez, control de acceso e intrusión perimetral para infraestructura crítica.',
    category: 'Seguridad & Infraestructura Crítica',
  },
  {
    slug: 'contraloria-bogota',
    title: 'Mantenimiento Especializado — Contraloría de Bogotá',
    client: 'Contraloría de Bogotá / General de la República',
    location: 'Bogotá, D.C.',
    image: '/images/proyectos/contraloria-bogota.webp',
    description:
      'Mantenimiento preventivo y correctivo de subsistemas electrónicos de seguridad, automatización e infraestructura hidráulica.',
    category: 'Sector Público & Mantenimiento',
  },
  {
    slug: 'redes-incendio-conjuntos-uraki',
    title: 'Redes Contra Incendios (Boreal, Austral, Seroa, Macuira)',
    client: 'Uraki Constructora / Desarrolladores Eje Cafetero',
    location: 'Eje Cafetero, Colombia',
    image: '/images/proyectos/redes-incendio-conjuntos-uraki.webp',
    description:
      'Diseño e implementación de redes de detección y extinción de incendios bajo norma NSR-10 e internacionales NFPA 72/13/14.',
    category: 'Residencial Vertical & NFPA',
  },
  {
    slug: 'palacio-de-justicia-armenia',
    title: 'Palacio de Justicia de Armenia — Rama Judicial',
    client: 'Rama Judicial de Colombia (Dirección Seccional)',
    location: 'Armenia, Quindío',
    image: '/images/proyectos/palacio-de-justicia-armenia.webp',
    description:
      'Despliegue de red de videovigilancia IP y cableado estructurado en zonas neurálgicas y salas de audiencias del palacio de justicia.',
    category: 'Institucional & Seguridad Judicial',
  },
];

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 @container md:grid-cols-2 lg:grid-cols-3 gap-6 @md:gap-8">
      {realProjectsList.map((proyecto, index) => (
        <AnimatedElement key={proyecto.slug} animation="slide-up" delay={(index % 6) * 100}>
          <Link href={`/proyectos/${proyecto.slug}`} className="block group">
            <ContainerCard
              image={proyecto.image}
              alt={proyecto.title}
              title={proyecto.title}
              description={proyecto.description}
              location={proyecto.location}
              priority={index < 3}
            />
          </Link>
        </AnimatedElement>
      ))}
    </div>
  );
}

export default function ProyectosPage() {
  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Casos de Éxito & Experiencia Demostrada
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              Nuestros Proyectos Reales
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary leading-relaxed">
              Descubre cómo Nexos Ingeniería SAS ha transformado la infraestructura de empresas
              energéticas, sedes judiciales, clínicas de alta complejidad, universidades y
              desarrollos comerciales en Colombia desde 2005.
            </p>
          </AnimatedElement>
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="max-w-7xl mx-auto @container">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-bg-card border border-border rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="h-64 bg-bg-secondary"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-bg-secondary rounded w-3/4"></div>
                      <div className="h-4 bg-bg-secondary rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ProjectsGrid />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
