import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { PartnersSection } from '@/components/sections/PartnersSection';

const title = 'Audio y Video Profesional';
const description = 'Experiencias audiovisuales excepcionales. Diseñamos e integramos sistemas AV de alta calidad para espacios corporativos, hospitality y residenciales de lujo.';

const features = [
  {
    title: 'Audio Distribuido',
    description: 'Sistemas de audio multi-zona para oficinas, hoteles y espacios comerciales con control centralizado.',
  },
  {
    title: 'Videoconferencia',
    description: 'Salas de juntas equipadas con tecnología de videoconferencia de última generación.',
  },
  {
    title: 'Digital Signage',
    description: 'Pantallas inteligentes para comunicación interna, publicidad y señalización digital.',
  },
  {
    title: 'Home Theater',
    description: 'Diseño e instalación de salas de cine privadas con experiencia audiovisual inmersiva.',
  },
  {
    title: 'Sistemas de Presentación',
    description: 'Equipamiento profesional para auditorios y salas de presentaciones.',
  },
  {
    title: 'Integración de Sistemas',
    description: 'Unificación de todos los sistemas AV en una sola plataforma de control intuitiva.',
  },
];

export const metadata: Metadata = {
  title: `${title} | Nexos Ingeniería SAS`,
  description,
};

export default function AudioVideoPage() {
  return (
    <>
      <ServicePageTemplate
        title={title}
        description={description}
        features={features}
      />
      <PartnersSection serviceFilter="Audio" />
    </>
  );
}
