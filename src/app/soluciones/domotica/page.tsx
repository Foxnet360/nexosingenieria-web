import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Domótica & BMS (Edificios Inteligentes) | Nexos Ingeniería SAS',
  description:
    'Automatización y eficiencia energética para edificaciones comerciales y residenciales de lujo. Sistemas BMS, control de iluminación y climatización HVAC.',
};

const features: ServiceFeature[] = [
  {
    title: 'Sistemas BMS (Building Management Systems)',
    description:
      'Gestión unificada de climatización, energía, agua e iluminación en un dashboard centralizado en tiempo real.',
    tags: ['BACnet / KNX', 'Dashboard Central', 'Monitoreo HVAC'],
  },
  {
    title: 'Control Inteligente de Iluminación',
    description:
      'Zonificación, escenas personalizadas, dimmerización DALI y sensores de ocupación/presencia para ahorro energético.',
    tags: ['Protocolo DALI', 'Sensores de Ocupación', 'Escenas de Luz'],
  },
  {
    title: 'Automatización Climatización HVAC',
    description:
      'Termostatos inteligentes interconectados que ajustan la temperatura según los horarios de ocupación y radiación solar.',
    tags: ['Control Chiller / VRF', 'Termostatos Smart', 'Ahorro Hasta 30%'],
  },
  {
    title: 'Gestión Energética & Medición Inteligente',
    description:
      'Medidores de energía multicanal con reportes históricos para detectar picos de consumo y pérdidas electromecánicas.',
    tags: ['Smart Metering', 'Eficiencia Energética', 'ISO 50001'],
  },
  {
    title: 'Domótica Residencial de Lujo',
    description:
      'Integración completa de audio, video, persianas motorizadas, iluminación y seguridad en pantallas táctiles intuitivas.',
    tags: ['Control4 / Lutron', 'Touch Panels', 'Integración Total'],
  },
  {
    title: 'Integración IoT & Protocolos Abiertos',
    description:
      'Conectividad entre subsistemas KNX, Modbus, BACnet, Zigbee y APIs de integración nube.',
    tags: ['KNX / Modbus', 'BACnet/IP', 'Interoperabilidad'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Ahorro Energético', value: 'Hasta un 30%' },
  { label: 'Protocolos Abiertos', value: 'BACnet / KNX' },
  { label: 'Retorno de Inversión', value: '18 a 36 Meses' },
  { label: 'Control Unificado', value: '100% Central' },
];

const benefits = [
  'Reducción directa de la factura eléctrica mediante automatización inteligente de iluminación y aire acondicionado.',
  'Monitoreo remoto de la salud de los equipos mecánicos y alertas de mantenimiento predictivo.',
  'Experiencia de confort premium con escenas personalizadas para oficinas, salas de juntas y viviendas.',
  'Valorización patrimonial inmediata del inmueble al certificar altos estándares de sostenibilidad.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Un sistema BMS se puede implementar en un edificio existente?',
    answer:
      'Sí. Diseñamos arquitectura de modernización (Retrofit) utilizando protocolos híbridos inalámbricos e IP para integrar sistemas existentes sin necesidad de realizar grandes obras civiles.',
  },
  {
    question: '¿Qué diferencia hay entre domótica residencial y un BMS corporativo?',
    answer:
      'La domótica residencial se enfoca en el confort del usuario (iluminación, audio, persianas). El BMS (Building Management System) gestiona grandes cargas industriales y comerciales (chillares, bombas, subestaciones) para máxima eficiencia energética y continuidad operativa.',
  },
];

export default function DomoticaPage() {
  return (
    <ServicePageTemplate
      title="Domótica & BMS (Edificios Inteligentes)"
      category="Automatización & Sostenibilidad"
      description="Convertimos estructuras convencionales en edificaciones eficientes e inteligentes. Automatización de clima, iluminación, persianas y gestión energética."
      heroImage="/images/soluciones/domotica.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Domótica"
    />
  );
}
