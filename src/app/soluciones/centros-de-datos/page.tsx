import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';

export const metadata: Metadata = {
  title: 'Centros de Datos | Nexos Ingeniería SAS',
  description: 'Diseño y construcción de centros de datos y cuartos técnicos con máxima eficiencia, redundancia y escalabilidad.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/centros-de-datos',
  },
};

const features = [
  {
    title: 'Diseño Tier III/IV',
    description: 'Centros de datos diseñados según estándares internacionales con redundancia N+1 o 2N.',
  },
  {
    title: 'Sistema de Enfriamiento',
    description: 'Soluciones de climatización de precisión con aisle containment y free cooling.',
  },
  {
    title: 'UPS y Generación',
    description: 'Sistemas de respaldo de energía con UPS modular y generadores diesel automáticos.',
  },
  {
    title: 'Monitoreo DCIM',
    description: 'Plataforma integral de monitoreo de infraestructura con alertas en tiempo real.',
  },
  {
    title: 'Cableado Estructurado',
    description: 'Cableado de cobre y fibra óptica con gestión de cables profesional y etiquetado.',
  },
  {
    title: 'Seguridad Física',
    description: 'Control de acceso biométrico, videovigilancia 24/7 y detección de intrusos.',
  },
];

export default function CentrosDatosPage() {
  return (
    <>
      <ServicePageTemplate
        title="Centros de Datos"
        description="El corazón digital de tu organización. Diseñamos y construimos centros de datos y cuartos técnicos con los más altos estándares de disponibilidad, eficiencia y seguridad."
        features={features}
      />
      <PartnersSection />
    </>
  );
}
