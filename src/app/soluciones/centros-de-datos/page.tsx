import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Centros de Datos & Cuartos Técnicos | Nexos Ingeniería SAS',
  description:
    'Diseño y construcción Tier III/IV de Data Centers, cuartos de comunicaciones (MDF/IDF), climatización de precisión, UPS y monitoreo DCIM.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/centros-de-datos',
  },
};

const features: ServiceFeature[] = [
  {
    title: 'Diseño Estándar Tier III / Tier IV',
    description:
      'Arquitectura física con redundancia de rutas de potencia y enfriamiento para disponibilidad garantizada del 99.982% o superior.',
    tags: ['ANSI/TIA-942', 'Uptime Institute', 'Redundancia N+1 / 2N'],
  },
  {
    title: 'Climatización de Precisión In-Row / Perimeter',
    description:
      'Sistemas HVAC dedicados a Data Centers con contención de pasillo frío/caliente (Hot/Cold Aisle Containment) y control de humedad.',
    tags: ['In-Row Cooling', 'Aisle Containment', 'Control Humedad'],
  },
  {
    title: 'Energía Ininterrumpida UPS & Respaldo Diesel',
    description:
      'Sistemas UPS modulares de alta eficiencia con baterías Li-Ion/VRLA y plantas eléctricas con transferencia automática en milisegundos.',
    tags: ['UPS Modulares', 'Baterías Litio/VRLA', 'Plantas Diesel'],
  },
  {
    title: 'Gestión & Monitoreo DCIM 24/7',
    description:
      'Plataformas de gestión de infraestructura de Data Center (DCIM) para visibilidad de carga térmica, consumo eléctrico y PUE.',
    tags: ['DCIM Real Time', 'Sensorización PUE', 'Alertas Tempranas'],
  },
  {
    title: 'Sistemas de Supresión de Incendio Limpio',
    description:
      'Detección por aspiración ultra-temprana (VESDA) y agente limpio no conductor (Novec 1230 / FM-200) inocuo para equipos electrónicos.',
    tags: ['VESDA', 'Novec 1230 / FM-200', 'Sin Daño de Equipos'],
  },
  {
    title: 'Pisos Falsos Elevados & Cableado Organizado',
    description:
      'Instalación de piso técnico estructurado de alta carga capacitiva y organizadores superiores de fibra MTP/MPO y cobre Cat 6A.',
    tags: ['Piso Técnico Elevado', 'MTP/MPO High Density', 'Cobre Cat 6A'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Disponibilidad Tier III', value: '99.982%' },
  { label: 'Norma de Diseño', value: 'ANSI/TIA-942' },
  { label: 'PUE Objetivo', value: '< 1.4 Eficiente' },
  { label: 'Respaldo Eléctrico', value: 'Redundante 2N' },
];

const benefits = [
  'Garantía de continuidad operativa ininterrumpida ante cortes en la red pública o fallas mecánicas.',
  'Optimización del PUE (Power Usage Effectiveness) para reducir significativamente el gasto en aire acondicionado.',
  'Seguridad ambiental integral contra humedad, polvo, fuego y accesos físicos no autorizados.',
  'Diseño modular escalable que permite aumentar gabinetes de servidores sin detener el Data Center activo.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Qué es la certificación TIA-942 para Centros de Datos?',
    answer:
      'La norma ANSI/TIA-942 especifica los requisitos mínimos de infraestructura de telecomunicaciones, electricidad, arquitectura y mecánica para Data Centers, definiendo los niveles de redundancia Tier I, II, III y IV.',
  },
  {
    question: '¿Por qué se utiliza agente limpio para extinción de fuego en salas de servidores?',
    answer:
      'El agente limpio (como Novec 1230 o FM-200) extingue el fuego por sofocación térmica sin dejar residuos líquidos, químicos o conductores que dañen las placas de los servidores o provoquen cortocircuitos.',
  },
];

export default function CentrosDatosPage() {
  return (
    <ServicePageTemplate
      title="Centros de Datos & Cuartos Técnicos"
      category="Infraestructura Crítica & Data Centers"
      description="El corazón digital de tu organización. Diseñamos, construimos y certificamos centros de datos con los más altos estándares de disponibilidad Tier III/IV."
      heroImage="/images/soluciones/centros-de-datos.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Centros de Datos"
    />
  );
}
