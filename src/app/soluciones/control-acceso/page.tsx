import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';

export const metadata: Metadata = {
  title: 'Control de Acceso | Nexos Ingeniería SAS',
  description: 'Sistemas de control de acceso biométrico, tarjetas inteligentes y control vehicular. Seguridad y trazabilidad para tu organización.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/control-acceso',
  },
};

const features = [
  {
    title: 'Acceso Biométrico',
    description: 'Sistemas de huella dactilar, reconocimiento facial y de iris para máxima seguridad.',
  },
  {
    title: 'Tarjetas Inteligentes',
    description: 'Control de acceso con tarjetas RFID de proximidad con diferentes niveles de permisos.',
  },
  {
    title: 'Control Vehicular',
    description: 'Sistemas de barreras automáticas, lectores de placas y control de parqueaderos.',
  },
  {
    title: 'Trazabilidad Completa',
    description: 'Registro detallado de entradas y salidas con reportes en tiempo real.',
  },
  {
    title: 'Integración con RRHH',
    description: 'Sincronización con sistemas de nómina y gestión de personal.',
  },
  {
    title: 'Control de Visitantes',
    description: 'Sistema de gestión de visitantes con pre-registro y notificaciones.',
  },
];

export default function ControlAccesoPage() {
  return (
    <>
      <ServicePageTemplate
        title="Control de Acceso"
        description="Quién entra, cuándo y a dónde. Sistemas de control de acceso que proporcionan seguridad física y trazabilidad completa de movimientos en tu organización."
        features={features}
      />
      <PartnersSection />
    </>
  );
}
