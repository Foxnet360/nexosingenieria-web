import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Audio y Video Profesional (AV) | Nexos Ingeniería SAS',
  description:
    'Diseño e integración de tecnología AV profesional para salas de juntas, auditorios, hoteles, salas de videoconferencia 4K y digital signage.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/audio-video',
  },
};

const features: ServiceFeature[] = [
  {
    title: 'Sistemas de Videoconferencia Microsoft Teams / Zoom',
    description:
      'Equipamiento certificado para salas de juntas con cámaras PTZ 4K de seguimiento automático por voz y micrófonos de arreglo en techo.',
    tags: ['Teams Rooms / Zoom Rooms', 'Cámaras PTZ 4K', 'Micrófonos de Techo'],
  },
  {
    title: 'Audio Distribuido Comercial & Multi-Zona',
    description:
      'Sonorización de alta fidelidad para hoteles, restaurantes, centros comerciales y corporativos con control de volumen independiente por zonas.',
    tags: ['70V / 100V DANTE', 'Audio Multi-Zona', 'Música Ambiental'],
  },
  {
    title: 'Digital Signage & Videowalls LED/LCD',
    description:
      'Pantallas comerciales de alta luminosidad operando 24/7 con procesadores de video y software de gestión remota de contenidos.',
    tags: ['Videowalls LED / LCD', 'Digital Signage Cloud', 'Operación 24/7'],
  },
  {
    title: 'Sistemas para Auditorios & Espacios Magna',
    description:
      'Acústica arquitectónica, proyección 4K de alto lumen, microfonía inalámbrica profesional y procesamiento digital de señales (DSP).',
    tags: ['DSP Profesional', 'Microfonía Shure', 'Proyección High-Lumen'],
  },
  {
    title: 'Control Centralizado & Pantallas Táctiles',
    description:
      'Automatización de sala mediante teclados de pared y tablets táctiles para encendido de un solo toque ("One Touch Join").',
    tags: ['Crestron / Extron', 'One-Touch Join', 'Control Intuitivo'],
  },
  {
    title: 'Home Theater Luxury & Salas Privadas de Cine',
    description:
      'Diseño acústico, aislamiento sonoro, proyectores láser 4K y sonido envolvente Dolby Atmos para residencias exclusivas.',
    tags: ['Dolby Atmos', 'Pantallas Acústicas', 'Cine Privado'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Resolución de Video', value: '4K Ultra HD' },
  { label: 'Plataforma AV', value: 'DANTE / AVoIP' },
  { label: 'Integración Teams/Zoom', value: '100% Certificado' },
  { label: 'Control de Sala', value: 'One-Touch Join' },
];

const benefits = [
  'Reuniones híbridas sin interrupciones con audio y video cristalino que elimina la fatiga de comunicación.',
  'Control centralizado simplificado: cualquier usuario puede operar la tecnología de la sala sin conocimientos técnicos.',
  'Gestión remota de pantallas de señalización digital para actualización instantánea de contenidos corporativos.',
  'Aislamiento y tratamiento acústico que evita la reverberación y mejora la inteligibilidad de la voz.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Qué es una solución Microsoft Teams Rooms o Zoom Rooms?',
    answer:
      'Es un hardware dedicado en la sala de juntas (pantalla, barra de video/micrófonos y consola táctil de control) que permite unirse a videollamadas con un solo toque sin necesidad de conectar computadores portátiles personales.',
  },
  {
    question: '¿Qué ventaja tiene la tecnología DANTE para audio distribuido?',
    answer:
      'DANTE permite transmitir canales de audio digital multi-zona sin compresión a través de la red Ethernet estándar con latencia cercana a cero, reduciendo drásticamente el cableado analógico tradicional.',
  },
];

export default function AudioVideoPage() {
  return (
    <ServicePageTemplate
      title="Audio y Video Profesional (AV)"
      category="Integración Audiovisual & Multimedia"
      description="Creamos experiencias audiovisuales de alto impacto. Videoconferencias corporativas 4K, audio distribuido multi-zona, videowalls y control centralizado."
      heroImage="/images/soluciones/audio-video.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Audio"
    />
  );
}
