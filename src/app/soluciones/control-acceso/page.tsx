import type { Metadata } from 'next';
import {
  ServicePageTemplate,
  ServiceFeature,
  MetricChip,
  ServiceFAQ,
} from '@/components/templates/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Control de Acceso & Biometría | Nexos Ingeniería SAS',
  description:
    'Sistemas de control de acceso biométrico facial y dactilar, lectura de placas LPR, barreras vehiculares y gestión de visitantes con trazabilidad total.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/control-acceso',
  },
};

const features: ServiceFeature[] = [
  {
    title: 'Biometría Facial Sin Contacto & Iris',
    description:
      'Terminales de autenticación ultra-rápida (menos de 0.2 segundos) con lectura de temperatura corporal y detección de mascarilla.',
    tags: ['Reconocimiento Facial 0.2s', 'Doble Cámara Liveness', 'Anti-Spoofing'],
  },
  {
    title: 'Control Vehicular LPR & Molinetes de Paso',
    description:
      'Lectura automática de placas vehiculares (LPR/ANPR), barreras electromecánicas de alta velocidad y torniquetes de cristal para peatones.',
    tags: ['Lectura LPR / ANPR', 'Torniquetes Ópticos', 'Barreras 1.5s'],
  },
  {
    title: 'Tarjetas RFID Inteligentes & Acceso Móvil NFC/BLE',
    description:
      'Lectores de credenciales seguras DESFire EV2/EV3 y apertura mediante teléfonos inteligentes vía Bluetooth o NFC.',
    tags: ['DESFire EV3 High Sec', 'Móvil NFC / BLE', 'Llave Virtual'],
  },
  {
    title: 'Gestión de Visitantes & Auto-Registro',
    description:
      'Kioscos digitales de autoservicio con escaneo de documento de identidad, emisión de código QR temporal y notificación al anfitrión.',
    tags: ['Escaneo Cédula/QR', 'Kioscos Touch', 'Notificación SMS/Email'],
  },
  {
    title: 'Integración con Software de Nómina y RRHH',
    description:
      'Sincronización automática de altas, bajas, ausentismos y cálculo de horas trabajadas directamente con el sistema contable.',
    tags: ['Sincronización RRHH', 'Reportes de Tiempo', 'Nómina Directa'],
  },
  {
    title: 'Lockers Inteligentes & Control de Activos',
    description:
      'Casilleros electrónicos automatizados para entrega de herramientas, laptops y llaves con registro de auditoría en tiempo real.',
    tags: ['Lockers Smart', 'Trazabilidad de Llaves', 'Auditoría 100%'],
  },
];

const metrics: MetricChip[] = [
  { label: 'Velocidad Biométrica', value: '< 0.2 Segundos' },
  { label: 'Trazabilidad', value: '100% Auditado' },
  { label: 'Precisión Facial', value: '99.9% Anti-Spoof' },
  { label: 'Integración RRHH', value: 'API Directa' },
];

const benefits = [
  'Auditoría y trazabilidad completa de quién ingresa, a dónde y a qué hora en todas las áreas de la compañía.',
  'Eliminación de la suplantación de identidad mediante lectura de biometría facial de alta fidelidad.',
  'Agilización en las porterías y parqueaderos evitando filas y congestiones en horas pico.',
  'Bloqueo automático de acceso para personal desvinculado o visitantes con permisos vencidos.',
];

const faqs: ServiceFAQ[] = [
  {
    question: '¿El sistema de reconocimiento facial funciona en la oscuridad o con tapabocas?',
    answer:
      'Sí. Las terminales biométricas modernas utilizan sensores infrarrojos 3D (Liveness Detection) que garantizan lectura exacta en total oscuridad y con accesorios faciales, evitando además ser engañadas por fotografías o videos.',
  },
  {
    question: '¿Se puede controlar el acceso vehicular sin necesidad de tarjetas físicas?',
    answer:
      'Sí. Mediante cámaras LPR (License Plate Recognition) las barreras se abren automáticamente al identificar la matrícula registrada del empleado o residente.',
  },
];

export default function ControlAccesoPage() {
  return (
    <ServicePageTemplate
      title="Control de Acceso & Biometría"
      category="Seguridad Física & Trazabilidad"
      description="Garantiza la seguridad y trazabilidad completa en tus instalaciones. Control biométrico facial, acceso vehicular LPR, barreras y gestión de visitantes."
      heroImage="/images/soluciones/seguridad-electronica.webp"
      metrics={metrics}
      benefits={benefits}
      features={features}
      faqs={faqs}
      partnerFilter="Control de Acceso"
    />
  );
}
