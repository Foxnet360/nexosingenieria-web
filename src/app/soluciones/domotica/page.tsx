import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { serviciosData } from '@/data/scraped-content';

const servicio = serviciosData.find(s => s.id === 'automatizacion')!;

const features = servicio.subservicios.map(sub => ({
  title: sub,
  description: `${sub} - Parte de nuestras soluciones integrales de automatización y eficiencia energética.`,
}));

export const metadata: Metadata = {
  title: `${servicio.titulo} | Nexos Ingeniería SAS`,
  description: servicio.descripcionCorta,
};

export default function DomoticaPage() {
  return (
    <>
      <ServicePageTemplate
        title={servicio.titulo}
        description={servicio.descripcion}
        features={features}
      />
      <PartnersSection />
    </>
  );
}
