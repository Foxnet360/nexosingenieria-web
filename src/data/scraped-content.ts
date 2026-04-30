/**
 * Datos extraídos de nexosingenieria.com
 * Fecha de extracción: 2026-04-28
 * Fuente: https://nexosingenieria.com
 * 
 * Este archivo centraliza todos los datos scrapeados del sitio original
 * para su uso en el nuevo sitio Next.js.
 */

// ============================================================================
// INTERFACES
// ============================================================================

export interface EmpresaData {
  nombre: string;
  fundacion: number;
  ubicacion: string;
  direccion: string;
  descripcion: string;
  descripcionCorta: string;
  filosofia: string;
  mision: string;
}

export interface ServicioData {
  id: string;
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  subservicios: string[];
  href: string;
}

export interface ContactoData {
  telefono: string;
  direccion: string;
  email: string | null;
  ciudad: string;
  departamento: string;
  redesSociales: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface ProyectoImage {
  id: string;
  filename: string;
  originalUrl: string;
  localPath: string;
  alt: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface LogoData {
  filename: string;
  localPath: string;
  originalUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// ============================================================================
// DATOS DE LA EMPRESA
// ============================================================================

export const empresaData: EmpresaData = {
  nombre: 'Nexos Ingeniería',
  fundacion: 2005,
  ubicacion: 'Armenia, Quindío, Colombia',
  direccion: 'Cra 14 # 6-49 (Av. Bolívar)',
  descripcionCorta:
    'Especialistas en Seguridad electrónica, domótica y cableado estructurado en la ciudad de Armenia Quindío',
  descripcion:
    'Somos una compañía quindiana especializada en el diseño e implementación de soluciones multisectoriales en Seguridad Electrónica, Cableado Estructurado, Automatización y Eficiencia Energética que desde 2005 opera en el territorio nacional caracterizándose por la calidad de sus trabajos y la experiencia de servicio que brinda un equipo altamente calificado.',
  filosofia:
    'La importancia de una buena asesoría para encontrar el enfoque y lograr un buen diseño, permite que las implementaciones e integraciones de los sistemas tengan un resultado optimizado.',
  mision:
    'Como soporte de nuestras actividades, contamos con el respaldo de las marcas que representamos; garantizando así un acompañamiento costo-eficiente, escalable y flexible que responde con precisión a las necesidades de nuestros clientes.',
};

// ============================================================================
// DATOS DE SERVICIOS
// ============================================================================

export const serviciosData: ServicioData[] = [
  {
    id: 'seguridad-electronica',
    titulo: 'Seguridad Electrónica',
    descripcionCorta:
      'Reconocemos en la seguridad una arista fundamental en la experiencia de uso y habilidad de nuestros usuarios y espacios.',
    descripcion:
      'Diseñamos e implementamos sistemas de seguridad electrónica integrales que protegen sus espacios y activos. Nuestras soluciones incluyen videovigilancia inteligente, control de acceso biométrico, detección de intrusos perimetral, alarmas integrales, citofonía digital y soluciones de networking para convergencia de sistemas.',
    subservicios: [
      'Control de Acceso',
      'Detección de Intrusos',
      'Circuito Cerrado de Televisión (CCTV)',
      'Citofonía',
      'Soluciones Integrales',
      'Networking',
    ],
    href: '/soluciones/seguridad-electronica',
  },
  {
    id: 'cableado-estructurado',
    titulo: 'Cableado Estructurado',
    descripcionCorta:
      'Las redes de datos son el corazón que permite la convergencia de cada uno de los sistemas que se conectan al mundo global.',
    descripcion:
      'Las redes de datos son el corazón que permite la convergencia de cada uno de los sistemas que se conectan al mundo global. Si existe un buen cableado estructurado, todos podemos conectarnos al avance de la tecnología. Diseñamos e implementamos infraestructura de red certificada para soportar la tecnología de hoy y del mañana.',
    subservicios: [
      'Diseño de Infraestructura',
      'Instalación de Redes',
      'Fibra Óptica',
      'Certificación de Redes',
      'Mantenimiento',
    ],
    href: '/soluciones/cableado-estructurado',
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización y Eficiencia Energética',
    descripcionCorta:
      'Buscamos una solución integral de punta a punta, confiable, transparente y eficiente.',
    descripcion:
      'Buscamos una solución integral de punta a punta, confiable, transparente y eficiente. La integración de los sistemas como elemento medular y la eficiencia como apuesta por un mundo mejor. Transformamos espacios en ambientes inteligentes que optimizan recursos y mejoran la calidad de vida.',
    subservicios: [
      'Domótica Residencial',
      'Sistemas de Audio',
      'Gestión Energética',
      'Control Inteligente',
      'Blindaje Electromagnético',
      'Integración de Sistemas',
    ],
    href: '/soluciones/domotica',
  },
  {
    id: 'consultoria',
    titulo: 'Consultoría, Diseño e Integración',
    descripcionCorta:
      'Ofrecemos servicios integrales que abarcan desde la consultoría inicial hasta la implementación completa.',
    descripcion:
      'Ofrecemos servicios integrales que abarcan desde la consultoría inicial, pasando por el diseño especializado, hasta la implementación completa de soluciones tecnológicas. Nuestro enfoque consultivo garantiza que cada proyecto sea tratado de manera integral desde la concepción hasta la puesta en marcha.',
    subservicios: [
      'Asesoría Técnica',
      'Diseño de Soluciones',
      'Implementación',
      'Integración de Sistemas',
      'Capacitación',
    ],
    href: '/soluciones',
  },
];

// ============================================================================
// DATOS DE CONTACTO
// ============================================================================

export const contactoData: ContactoData = {
  telefono: '+57 315-5089404',
  direccion: 'Cra 14 # 6-49 (Av. Bolívar)',
  email: null, // No se encontró email en el scraping
  ciudad: 'Armenia',
  departamento: 'Quindío',
  redesSociales: {
    facebook: 'https://facebook.com/nexosingenieria',
    instagram: 'https://instagram.com/nexosing',
    linkedin: 'https://linkedin.com/company/nexos-ingenieria',
  },
};

// ============================================================================
// DATOS DE PROYECTOS (IMÁGENES)
// ============================================================================

export const proyectosData: ProyectoImage[] = [
  {
    id: 'proyecto-1',
    filename: '0ad41befd852.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/D71D804F-6FBF-4EE4-803D-5B2AEA53F12A-400x284.jpg',
    localPath: '/images/proyectos/0ad41befd852.jpg',
    alt: 'Proyecto de seguridad electrónica - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-2',
    filename: '1a7db0d96073.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/870D6E2B-D895-4E54-9643-49196EFA2521-400x284.jpg',
    localPath: '/images/proyectos/1a7db0d96073.jpg',
    alt: 'Proyecto de cableado estructurado - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-3',
    filename: '33b24e3cf0d6.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/50AFCAC3-4F7F-40EE-B67F-1CD3553E2AEC-400x284.jpg',
    localPath: '/images/proyectos/33b24e3cf0d6.jpg',
    alt: 'Proyecto de automatización - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-4',
    filename: '53a9edd9f4fb.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/b43bc7a6-c1ba-4c20-b8a1-d89720fab15b-400x284.jpg',
    localPath: '/images/proyectos/53a9edd9f4fb.jpg',
    alt: 'Proyecto de eficiencia energética - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-5',
    filename: '7239dfc47395.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/0538D341-FE2F-4F36-9C3B-88BC78E9FF43-400x284.jpg',
    localPath: '/images/proyectos/7239dfc47395.jpg',
    alt: 'Proyecto residencial - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-6',
    filename: '91575926b290.jpg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/07/358b488f-633f-4794-843f-79b476f31908-400x284.jpg',
    localPath: '/images/proyectos/91575926b290.jpg',
    alt: 'Proyecto comercial - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
  {
    id: 'proyecto-7',
    filename: 'b2d527e0c5c0.jpeg',
    originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/06/nexos7-400x284.jpeg',
    localPath: '/images/proyectos/b2d527e0c5c0.jpeg',
    alt: 'Proyecto institucional - Nexos Ingeniería',
    dimensions: { width: 400, height: 284 },
  },
];

// ============================================================================
// DATOS DEL LOGO
// ============================================================================

export const logoData: LogoData = {
  filename: 'logo-original.png',
  localPath: '/images/logo-original.png',
  originalUrl: 'https://www.nexosingenieria.com/wp-content/uploads/2020/12/web-cabecera.png',
  dimensions: { width: 641, height: 641 },
};

// ============================================================================
// METADATOS SEO
// ============================================================================

export const seoData = {
  title: 'Nexos Ingeniería - Especialistas en Seguridad electrónica, domótica y cableado estructurado',
  description:
    'Especialistas en Seguridad electrónica, domótica y cableado estructurado en la ciudad de Armenia Quindío. Más de 20 años de experiencia.',
  keywords: [
    'seguridad electrónica',
    'domótica',
    'cableado estructurado',
    'Armenia',
    'Quindío',
    'automatización',
    'eficiencia energética',
    'CCTV',
    'control de acceso',
  ],
};

// ============================================================================
// DATOS ADICIONALES
// ============================================================================

export const statsData = [
  { number: '20+', label: 'Años de Experiencia' },
  { number: '500+', label: 'Proyectos Completados' },
  { number: '50+', label: 'Clientes Satisfechos' },
  { number: '15', label: 'Expertos Certificados' },
];

export const valoresData = [
  {
    title: 'Excelencia',
    description:
      'Nos comprometemos con los más altos estándares de calidad en cada proyecto.',
  },
  {
    title: 'Innovación',
    description:
      'Adoptamos las tecnologías más avanzadas para ofrecer soluciones de vanguardia.',
  },
  {
    title: 'Integridad',
    description:
      'Actuamos con honestidad y transparencia en todas nuestras relaciones.',
  },
  {
    title: 'Compromiso',
    description:
      'Estamos dedicados al éxito de nuestros clientes, más allá de la entrega del proyecto.',
  },
];

// ============================================================================
// NOTAS SOBRE DATOS FALTANTES
// ============================================================================

export const notasFaltantes = {
  email: 'No se encontró email corporativo en el sitio web original. Se requiere solicitar al cliente.',
  marcas: 'Solo se detectó "LG" automáticamente. El listado completo de marcas/partners requiere revisión manual.',
  proyectosDetallados: 'Las imágenes de proyectos están disponibles pero faltan descripciones detalladas de cada uno.',
  equipo: 'No se encontró información sobre el equipo de trabajo en el sitio original.',
};
