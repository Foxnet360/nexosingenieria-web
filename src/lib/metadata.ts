import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Nexos Ingeniería SAS | Integración Tecnológica y Smart Buildings',
  description: 'Soluciones integrales de cableado estructurado, seguridad electrónica, eficiencia energética y audio/video para edificios inteligentes en Colombia.',
  keywords: ['cableado estructurado', 'seguridad electrónica', 'eficiencia energética', 'audio y video', 'smart buildings', 'domótica', 'Colombia'],
  authors: [{ name: 'Nexos Ingeniería SAS' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Nexos Ingeniería SAS',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://nexosingenieria.com',
  },
};

export const serviceMetadata = {
  cableado: {
    title: 'Cableado Estructurado | Nexos Ingeniería SAS',
    description: 'Diseño e implementación de infraestructura de red certificada. Cableado estructurado Cat 6A, fibra óptica y centros de datos en Colombia.',
    canonical: 'https://nexosingenieria.com/soluciones/cableado-estructurado',
  },
  seguridad: {
    title: 'Seguridad Electrónica + Eficiencia Energética | Nexos Ingeniería SAS',
    description: 'Sistemas de videovigilancia, control de acceso, detección de intrusos y gestión energética inteligente para edificios en Colombia.',
    canonical: 'https://nexosingenieria.com/soluciones/seguridad-electronica',
  },
  audiovideo: {
    title: 'Audio y Video Profesional | Nexos Ingeniería SAS',
    description: 'Sistemas AV profesionales para salas de juntas, digital signage, audio distribuido y home theater en Colombia.',
    canonical: 'https://nexosingenieria.com/soluciones/audio-video',
  },
  domotica: {
    title: 'Domótica | Nexos Ingeniería SAS',
    description: 'Automatización inteligente para hogares y edificios. Controla iluminación, climatización, cortinas y más desde un solo dispositivo.',
    canonical: 'https://nexosingenieria.com/soluciones/domotica',
  },
  controlAcceso: {
    title: 'Control de Acceso | Nexos Ingeniería SAS',
    description: 'Sistemas de control de acceso biométrico, tarjetas inteligentes y control vehicular. Seguridad y trazabilidad para tu organización.',
    canonical: 'https://nexosingenieria.com/soluciones/control-acceso',
  },
  centrosDatos: {
    title: 'Centros de Datos | Nexos Ingeniería SAS',
    description: 'Diseño y construcción de centros de datos y cuartos técnicos con máxima eficiencia, redundancia y escalabilidad.',
    canonical: 'https://nexosingenieria.com/soluciones/centros-de-datos',
  },
  mantenimiento: {
    title: 'Mantenimiento | Nexos Ingeniería SAS',
    description: 'Programas de mantenimiento preventivo y correctivo para infraestructura tecnológica, redes, seguridad y sistemas AV.',
    canonical: 'https://nexosingenieria.com/soluciones/mantenimiento',
  },
};

export const pageMetadata = {
  contacto: {
    title: 'Contacto | Nexos Ingeniería SAS',
    description: 'Contáctanos para una consultoría gratuita. Soluciones de cableado estructurado, seguridad electrónica y eficiencia energética en Colombia.',
    canonical: 'https://nexosingenieria.com/contacto',
  },
  soluciones: {
    title: 'Soluciones | Nexos Ingeniería SAS',
    description: 'Descubre nuestras soluciones integrales: cableado estructurado, seguridad electrónica, eficiencia energética y audio/video profesional.',
    canonical: 'https://nexosingenieria.com/soluciones',
  },
  blog: {
    title: 'Blog | Nexos Ingeniería SAS',
    description: 'Artículos técnicos, guías y tendencias sobre cableado estructurado, seguridad electrónica, eficiencia energética y audio/video para edificios inteligentes.',
    canonical: 'https://nexosingenieria.com/blog',
  },
};
