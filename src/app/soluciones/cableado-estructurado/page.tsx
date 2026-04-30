import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { serviciosData } from '@/data/scraped-content';

const servicio = serviciosData.find(s => s.id === 'cableado-estructurado')!;

const features = servicio.subservicios.map(sub => ({
  title: sub,
  description: `${sub} - Parte de nuestras soluciones integrales de cableado estructurado.`,
}));

export const metadata: Metadata = {
  title: `${servicio.titulo} | Nexos Ingeniería SAS`,
  description: servicio.descripcionCorta,
};

export default function CableadoEstructuradoPage() {
  return (
    <>
      <ServicePageTemplate
        title={servicio.titulo}
        description={servicio.descripcion}
        features={features}
      />
      <PartnersSection serviceFilter="Cableado" />
    </>
  );
}
