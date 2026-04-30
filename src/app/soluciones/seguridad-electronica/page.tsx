import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { serviciosData } from '@/data/scraped-content';

const servicio = serviciosData.find(s => s.id === 'seguridad-electronica')!;

const features = servicio.subservicios.map(sub => ({
  title: sub,
  description: `${sub} - Parte de nuestras soluciones integrales de seguridad electrónica.`,
}));

export const metadata: Metadata = {
  title: `${servicio.titulo} | Nexos Ingeniería SAS`,
  description: servicio.descripcionCorta,
};

export default function SeguridadEficienciaPage() {
  return (
    <>
      <ServicePageTemplate
        title={servicio.titulo}
        description={servicio.descripcion}
        features={features}
      />
      <PartnersSection serviceFilter="Seguridad" />
    </>
  );
}
