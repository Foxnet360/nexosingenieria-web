import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Seguridad Electrónica & Videovigilancia IP | Nexos Ingeniería SAS',
  description:
    'Sistemas de seguridad electrónica convergentes, CCTV IP con Inteligencia Artificial, analítica de video, intrusión y centros de control 24/7.',
};

const features: ServiceFeature[] = [
  {
    title: 'Videovigilancia IP con Analítica IA',
    description:
      'Cámaras 4K con detección de rostros, lectura de matrículas (LPR), mapeo térmico y algoritmos de comportamiento anómalo en tiempo real.',
    tags: ['CCTV 4K', 'Analítica IA', 'LPR Matrículas', 'Visión Nocturna Starlight'],
  },
  {
    title: 'Detección Perimetral de Intrusos',
    description:
      'Barreras fotoeléctricas, sensores de fibra óptica en malla y sistemas de microondas para detección anticipada antes de cualquier brecha física.',
    tags: ['Cerco Perimetral', 'Fibra Sensora', 'Cero Falsas Alarmas'],
  },
  {
    title: 'Centros de Control & VMS',
    description:
      'Plataformas de gestión de video unificadas (VMS) con paneles de control multivigilancia y respaldo de almacenamiento redundant en RAID.',
    tags: ['VMS Unificado', 'Matriz de Video', 'RAID / Nube'],
  },
  {
    title: 'Citofonía Digital & Videoporteros IP',
    description:
      'Sistemas de comunicación residencial y corporativa integrados con aplicaciones móviles para respuesta remota y apertura de accesos.',
    tags: ['Citofonía IP', 'Pantallas Touch', 'App Móvil'],
  },
  {
    title: 'Alarmas & Sensores de Intrusión Integrados',
    description:
      'Paneles de alarma zonificados con comunicación dual (IP/4G), teclados táctiles y sirenas de alta potencia con monitoreo en tiempo real.',
    tags: ['Alarma Grado 3', 'Doble Vía IP/GSM', 'Monitoreo 24/7'],
  },
  {
    title: 'Convergencia de Redes de Seguridad',
    description:
      'Diseño de VLANs dedicadas para tráfico de video y control de acceso, garantizando que el streaming no sature la red corporativa.',
    tags: ['VLAN Seguridad', 'QoS Video', 'Ciberseguridad CCTV'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Resolución de Video', value: 'Hasta 4K UHD' },
  { label: 'Disponibilidad VMS', value: '99.99%' },
  { label: 'Protocolo de Red', value: 'ONVIF / IP Native' },
  { label: 'Tiempo de Respuesta', value: '< 2 Segundos' },
];

const benefits = [
  'Detección proactiva de amenazas mediante IA en lugar de monitoreo pasivo tradicional.',
  'Integración nativa con sistemas de control de acceso para automatizar protocolos de evacuación y cierre en caso de emergencia.',
  'Cifrado de extremo a extremo en todas las transmisiones de video para evitar interceptaciones o ataques cibernéticos.',
  'Acceso y monitoreo remoto seguro desde dispositivos móviles iOS y Android.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Qué es la analítica de video con Inteligencia Artificial?',
    answer:
      'A diferencia de la detección de movimiento clásica que genera falsas alarmas por viento o animales, la analítica IA reconoce patrones humanos, vehículos, intrusiones en zonas restringidas, merodeo y conteo de personas con alta precisión.',
  },
  {
    question: '¿Cómo afecta el streaming de cámaras de seguridad a mi red de internet?',
    answer:
      'En Nexos Ingeniería diseñamos VLANs seguras y aisladas para el tráfico audiovisual e implementamos códecs de compresión inteligente (H.265+ / Smart Codec) que reducen el ancho de banda y almacenamiento hasta un 70% sin perder calidad.',
  },
  {
    question: '¿Las cámaras funcionan en caso de un corte en el suministro eléctrico?',
    answer:
      'Sí. Todos nuestros diseños incorporan bancos de baterías de respaldo (UPS) dimensionados para brindar autonomía continua de varias horas en cámaras, switches PoE y grabadores.',
  },
];

export default function SeguridadElectronicaPage() {
  return (
    <ServicePageTemplate
      title="Seguridad Electrónica & Videovigilancia IP"
      category="Seguridad Física & Electrónica"
      description="Protegemos tus instalaciones, activos y personal con soluciones convergentes de videovigilancia inteligente, analítica IA, intrusión perimetral y centros de control."
      heroImage="/images/soluciones/seguridad-electronica.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Seguridad"
    />
  );
}
