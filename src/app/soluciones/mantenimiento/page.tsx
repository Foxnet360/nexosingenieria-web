import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Mantenimiento Técnico & Soporte SLA 24/7 | Nexos Ingeniería SAS',
  description:
    'Programas de mantenimiento preventivo y correctivo para redes, seguridad electrónica, domótica y centros de datos con acuerdos de nivel de servicio (SLA).',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/mantenimiento',
  },
};

const features: ServiceFeature[] = [
  {
    title: 'Mantenimiento Preventivo Programado',
    description:
      'Inspecciones periódicas en sitio, limpieza técnica de lentes y gabinetes, recalibración de voltaje y ajuste de conectores.',
    tags: ['Visitas Periódicas', 'Limpieza Técnica', 'Ajuste Electrónico'],
  },
  {
    title: 'Atención Correctiva de Contingencias SLA 24/7',
    description:
      'Mesa de ayuda y despliegue de técnicos certificados con repuestos en stock para solución de fallas críticas en tiempos récord.',
    tags: ['SLA 24/7', 'Repuestos Stock', 'Técnicos Certificados'],
  },
  {
    title: 'Monitoreo Remoto & Diagnóstico Predictivo',
    description:
      'Supervisión constante del estado de salud de switches, servidores, NVRs y fuentes de poder con alertas antes de que ocurra la falla.',
    tags: ['Telemetría 24/7', 'Mantenimiento Predictivo', 'Alertas Tempranas'],
  },
  {
    title: 'Actualización de Firmware & Ciberseguridad',
    description:
      'Parcheo periódico del sistema operativo y firmware de cámaras, biométricos y controladores para prevenir vulnerabilidades.',
    tags: ['Parcheo de Firmware', 'Ciberseguridad CCTV', 'Hardening'],
  },
  {
    title: 'Administración de Garantías con Fabricantes',
    description:
      'Gestionamos directamente ante marcas como Cisco, Panduit, Axis o Hikvision la reparación o reemplazo de partes en garantía.',
    tags: ['Gestión con Fabricante', 'Reemplazo Directo', 'Cero Trámites'],
  },
  {
    title: 'Informes Técnicos & Indicadores KPIs',
    description:
      'Entrega de reportes ejecutivos del estado de la infraestructura, horas de operación, fallas resueltas y recomendaciones de actualización.',
    tags: ['Reportes Ejecutivos', 'Indicadores SLA', 'Auditoría Anual'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Disponibilidad SLA', value: '24/7 Continuo' },
  { label: 'Tiempo de Respuesta', value: '< 2 Horas Crítico' },
  { label: 'Stock de Repuestos', value: 'Local en Colombia' },
  { label: 'Reducción de Fallas', value: 'Hasta un 80%' },
];

const benefits = [
  'Extensión significativa de la vida útil de los equipos tecnológicos de la compañía.',
  'Evita interrupciones inesperadas en las operaciones comerciales o de producción.',
  'Presupuesto de mantenimiento predecible sin sorpresas por reparaciones de emergencia costosas.',
  'Atención prioritaria con personal técnico especializado y certificado por los fabricantes.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿Qué incluye un contrato de mantenimiento SLA con Nexos Ingeniería?',
    answer:
      'Incluye visitas preventivas periódicas (mensuales/trimestrales), atención prioritaria de llamadas de emergencia 24/7 con tiempo de respuesta garantizado por escrito, mano de obra especializada y soporte en la gestión de garantías de fábrica.',
  },
  {
    question: '¿Pueden asumir el mantenimiento de una infraestructura instalada por otra empresa?',
    answer:
      'Sí. Realizamos una auditoría técnica inicial para diagnosticar el estado actual de la infraestructura, elaborar el inventario As-Built y nivelar la instalación antes de iniciar el contrato de mantenimiento.',
  },
];

export default function MantenimientoPage() {
  return (
    <ServicePageTemplate
      title="Mantenimiento Técnico & Soporte SLA 24/7"
      category="Soporte Continuo & Mantenimiento"
      description="Garantizamos la máxima disponibilidad y vida útil de tus sistemas tecnológicos. Programas de mantenimiento preventivo, correctivo y respuesta SLA 24/7."
      heroImage="/images/proyectos/contraloria-bogota.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Mantenimiento"
    />
  );
}
