import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';

export const metadata: Metadata = {
  title: 'Mantenimiento | Nexos Ingeniería SAS',
  description: 'Programas de mantenimiento preventivo y correctivo para infraestructura tecnológica, redes, seguridad y sistemas AV.',
  alternates: {
    canonical: 'https://nexosingenieria.com/soluciones/mantenimiento',
  },
};

const features = [
  {
    title: 'Mantenimiento Preventivo',
    description: 'Visitas programadas periódicamente para inspección, limpieza y ajuste de todos los sistemas.',
  },
  {
    title: 'Mantenimiento Correctivo',
    description: 'Respuesta rápida a fallos con técnicos certificados y repuestos originales.',
  },
  {
    title: 'Monitoreo 24/7',
    description: 'Vigilancia remota de sistemas críticos con alertas tempranas de posibles fallos.',
  },
  {
    title: 'Actualización de Firmware',
    description: 'Mantenimiento actualizado de software en cámaras, switches y dispositivos de red.',
  },
  {
    title: 'Gestión de Garantías',
    description: 'Administramos las garantías de todos los equipos y gestionamos reemplazos con fabricantes.',
  },
  {
    title: 'Reportes Detallados',
    description: 'Informes periódicos del estado de la infraestructura y recomendaciones de mejora.',
  },
];

export default function MantenimientoPage() {
  return (
    <>
      <ServicePageTemplate
        title="Mantenimiento"
        description="Mantén tu infraestructura tecnológica en óptimas condiciones. Programas de mantenimiento preventivo y correctivo que prolongan la vida útil de tus sistemas y previenen fallos inesperados."
        features={features}
      />
      <PartnersSection />
    </>
  );
}
