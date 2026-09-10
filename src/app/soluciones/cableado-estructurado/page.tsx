import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Cableado Estructurado & Redes de Datos | Nexos Ingeniería SAS',
  description:
    'Diseño, instalación y certificación de cableado estructurado Cat 6A y fibra óptica. Garantía de fábrica hasta 25 años y normas ANSI/TIA-568.',
};

const features: ServiceFeature[] = [
  {
    title: 'Diseño de Infraestructura & Topología',
    description:
      'Modelado en CAD/BIM de cuartos de telecomunicaciones (TR/MDF/IDF), escalerillas, ductería y distribución de puertos.',
    tags: ['ANSI/TIA-568', 'Planos CAD', 'Cálculo de Cargas'],
  },
  {
    title: 'Cableado UTP Cat 6 / Cat 6A / Cat 7',
    description:
      'Instalación de par trenzado blindado (F/UTP) y no blindado (U/UTP) para soporte de 10 Gbps Ethernet y PoE++ (Power over Ethernet).',
    tags: ['10 Gbps', 'PoE++ (90W)', 'Cobre de Alta Calidad'],
  },
  {
    title: 'Redes de Fibra Óptica (OM3/OM4/OS2)',
    description:
      'Conexionado, empalmes por fusión de precisión y canalización de backbones monomodo y multimodo para interconexión de edificios.',
    tags: ['Empalmes por Fusión', 'Backbone de Fibra', 'Pruebas OTDR'],
  },
  {
    title: 'Certificación Fluke Networks',
    description:
      'Pruebas de canal y enlace permanente ejecutadas con certificación Fluke DSX-8000 en cumplimiento de las normas ISO/IEC 11801.',
    tags: ['Fluke DSX-8000', 'Garantía 25 Años', 'Reportes PDF'],
  },
  {
    title: 'Organización & Peinado de Racks',
    description:
      'Reestructuración, peinado profesional, etiquetado según norma TIA-606 y optimización del flujo de aire en gabinetes de comunicaciones.',
    tags: ['Etiquetado TIA-606', 'Gestión de Parcheo', 'Flujo de Aire'],
  },
  {
    title: 'Auditoría & Documentación As-Built',
    description:
      'Entrega final de memoria técnica detallada, mapa de puertos, identificación de hilos y garantía respaldada por los fabricantes.',
    tags: ['As-Built', 'Mapa de Puertos', 'Garantía Extendida'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Garantía de Fábrica', value: 'Hasta 25 Años' },
  { label: 'Velocidad Soportada', value: 'Hasta 10/40 Gbps' },
  { label: 'Norma Técnica', value: 'ANSI/TIA-568.2-D' },
  { label: 'Certificación', value: 'Fluke DSX-8000' },
];

const benefits = [
  'Reducción drástica de caídas de red y pérdida de datos mediante componentes de cobre y fibra de primera calidad.',
  'Certificación oficial emitida por fabricantes como Siemon, Panduit y Leviton con cobertura de hasta 25 años.',
  'Soporte directo de tecnología Power over Ethernet (PoE++) para alimentar APs WiFi 6, cámaras IP y teléfonos sin cableado eléctrico adicional.',
  'Rotulado estandarizado TIA-606 que facilita la administración y reduce tiempos de diagnóstico técnico.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Qué diferencia hay entre cableado Cat 6 y Cat 6A?',
    answer:
      'Cat 6 opera a 250 MHz y soporta 10 Gbps en distancias cortas (hasta 37-55 metros). Cat 6A opera a 500 MHz y garantiza 10 Gbps a la distancia máxima de 100 metros con mayor inmunidad al ruido (Alien Crosstalk), siendo el estándar recomendado para empresas.',
  },
  {
    question: '¿Por qué es indispensable certificar el cableado con Fluke?',
    answer:
      'La prueba de continuidad simple no detecta diafonía, atenuaicón ni retardo. La certificación Fluke DSX somete cada hilo a frecuencias reales para avalar que cumple el estándar ANSI/TIA y para que los fabricantes otorguen la garantía de 25 años.',
  },
  {
    question: '¿Pueden reorganizar un rack existente que está en desorden?',
    answer:
      'Sí. Realizamos auditorías y peinado de racks en caliente o programados fuera de horario laboral, reemplazando patch cords deteriorados y re-etiquetando los puertos según la norma.',
  },
];

export default function CableadoEstructuradoPage() {
  return (
    <ServicePageTemplate
      title="Cableado Estructurado & Redes de Datos"
      category="Telecomunicaciones & Redes"
      description="Diseñamos e instalamos la infraestructura física que conecta todos los sistemas de tu empresa. Garantía de fábrica hasta 25 años y certificación oficial TIA/EIA."
      heroImage="/images/soluciones/cableado-estructurado.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Cableado"
    />
  );
}
