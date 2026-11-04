// Nexos Ingeniería - Centralized Projects Database
// Single Source of Truth for projects across listing, detail, and landing sections.

export interface ProjectDetail {
  title: string;
  client: string;
  clientLogo?: string;
  industry: string;
  location: string;
  year: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projects: Record<string, ProjectDetail> = {
  'edeq-sedes-y-bms': {
    title: 'EDEQ S.A. E.S.P. — Proyecto Integral de Sedes y BMS',
    client: 'Empresa de Energía del Quindío S.A. E.S.P. (Grupo EPM)',
    clientLogo: '/images/logos_clientes/logo_EDEQ.png',
    industry: 'Energía & BMS',
    location: 'Armenia & Quindío, Colombia',
    year: '2024',
    image: '/images/proyectos/edeq-sedes-y-bms.webp',
    description:
      'Modernización e integración tecnológica de seguridad electrónica, redes de alta disponibilidad, control de iluminación y BMS corporativo para la principal electrificadora del departamento.',
    challenge:
      'Diseñar, integrar y modernizar los sistemas de seguridad electrónica, comunicaciones y gestión de edificios en las sedes corporativas y operativas de EDEQ S.A. E.S.P., logrando centralizar operaciones y permitiendo la administrabilidad basada en datos en tiempo real.',
    solution:
      'Implementación de una arquitectura integral de seguridad electrónica (CCTV con analítica, sistema de extinción de incendios, control de acceso peatonal/vehicular, intrusión), comunicaciones unificadas, control inteligente de iluminación, salas de juntas e integración al sistema BMS (Building Management System) corporativo.',
    services: [
      'Integración BMS Central',
      'Seguridad Electrónica Integral',
      'Cableado Estructurado Certificado',
      'Control de Iluminación Inteligente',
      'Comunicaciones Unificadas',
    ],
    results: [
      'Centralización y optimización del recurso técnico y humano operando sedes múltiples',
      'Administrabilidad corporativa basada en telemetría y datos en tiempo real',
      'Integración completa y monitoreo de sedes remotas en una única plataforma BMS unificada',
      'Continuidad operativa 100% garantizada durante la fase de puesta en marcha (commissioning)',
    ],
    testimonial: {
      quote:
        'La integración de nuestras sedes remotas en la plataforma central BMS nos brinda visibilidad y administrabilidad en tiempo real sobre toda la infraestructura energética.',
      author: 'Dirección de Tecnología & Operaciones',
      role: 'Empresa de Energía del Quindío (EDEQ S.A. E.S.P. - Grupo EPM)',
    },
  },
  'unad-edificio-celestino-mutis': {
    title: 'UNAD — Edificio José Celestino Mutis',
    client: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    clientLogo: '/images/logos_clientes/Logo_UNAD.svg',
    industry: 'Educación & Smart Campus',
    location: 'Bogotá, Colombia',
    year: '2024',
    image: '/images/proyectos/unad-edificio-celestino-mutis.webp',
    description:
      'Automatización de gestión de instalaciones, laboratorios de prácticas y seguridad electrónica para campus inteligente.',
    challenge:
      'Dotar al Edificio José Celestino Mutis de un sistema automatizado de gestión de instalaciones que optimizara el consumo eléctrico y coordinara el uso ágil de aulas y laboratorios de prácticas.',
    solution:
      'Despliegue de seguridad electrónica integral (CCTV, detección de incendios, intrusión y accesos), red de comunicaciones alambradas e inalámbricas de alta densidad, control de iluminación dimerizable y automatización de laboratorios vinculados al sistema de reservas institucionales.',
    services: [
      'Cableado Estructurado Cat 6A',
      'Control de Iluminación Dimerizable',
      'Seguridad Electrónica Integral',
      'Automatización de Laboratorios',
    ],
    results: [
      'Disminución del 43% en el consumo de energía eléctrica por iluminación',
      'Automatización de reservas de salas y control por agenda de instalaciones universitarias',
      'Integración completa de servicios de red e interoperabilidad de laboratorios de práctica',
    ],
    testimonial: {
      quote:
        'Logramos reducir casi la mitad del consumo de iluminación en el edificio mientras automatizamos el acceso y agenda de nuestros laboratorios.',
      author: 'Dirección de Infraestructura Física',
      role: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    },
  },
  'centro-empresarial-icono': {
    title: 'PH Centro Empresarial Ícono',
    client: 'PH Centro Empresarial Ícono',
    clientLogo: '/images/logos_clientes/logo_Icono.svg',
    industry: 'Corporativo & Certificación EDGE',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/centro-empresarial-icono.webp',
    description:
      'Infraestructura electromecánica, blindobarra vertical, BMS central y acreditación internacional de sostenibilidad EDGE.',
    challenge:
      'Diseñar e implementar la infraestructura de redes especiales y control para un centro empresarial de alto estándar, garantizando máxima eficiencia energética para la obtención de la Certificación EDGE.',
    solution:
      'Instalación de blindobarra vertical central para distribución eléctrica eficiente, bus centralizado de comunicaciones, iluminación dimerizable, CCTV IP Hanwha, control de acceso peatonal/vehicular Kantech KT-400 y BMS central.',
    services: [
      'Certificación EDGE Sostenible',
      'Blindobarra Vertical Central',
      'BMS Central & Virtualización',
      'Control de Acceso Kantech KT-400',
      'CCTV IP Hanwha',
    ],
    results: [
      'Obtención formal de la Certificación Ambiental Internacional EDGE',
      'Ahorro del 25% en consumo de energía eléctrica del complejo empresarial',
      'Disminución del costo de operación y mantenimiento en un 27%',
      '39% menos energía incorporada en los materiales constructivos instalados',
    ],
    testimonial: {
      quote:
        'Nexos Ingeniería fue clave en el diseño e integración electromecánica que nos permitió certificar a Ícono como edificio verde EDGE.',
      author: 'Consejo de Administración',
      role: 'PH Centro Empresarial Ícono',
    },
  },
  'seniors-club-pance': {
    title: 'Seniors Club Pance',
    client: 'Seniors Club Pance',
    clientLogo: '/images/logos_clientes/logo_Seniors_Club.svg',
    industry: 'Asistencial & Senior Living',
    location: 'Cali, Valle del Cauca',
    year: '2024',
    image: '/images/proyectos/seniors-club-pance.webp',
    description:
      'Plataforma unificada de comunicaciones, citofonía IP y monitoreo asistencial con llamadores de emergencia.',
    challenge:
      'Diseñar e integrar una plataforma tecnológica unificada de comunicaciones, seguridad y monitoreo asistencial adaptada a adultos mayores donde la rapidez de respuesta es crítica.',
    solution:
      'Red convergente sobre cableado estructurado unificado que integra citofonía y telefonía IP, circuito cerrado de televisión (CCTV) en pasillos y áreas comunes, llamadores de enfermería de emergencia en cada departamento y audio ambiental zonificado.',
    services: [
      'Sistemas Asistenciales de Emergencia',
      'Citofonía & Telefonía IP',
      'Cableado Estructurado Unificado',
      'CCTV IP & Audio Ambientado',
    ],
    results: [
      'Integración del 100% de los servicios de seguridad y comunicaciones en una misma plataforma IP',
      'Monitoreo asistencial continuo y respuesta inmediata con llamadores de emergencia por habitación',
      'Servicios de conectividad y entretenimiento de alto valor agregado para los residentes',
    ],
  },
  'subestacion-calarca-edeq': {
    title: 'Subestación Calarcá — Termografía de Transformadores EDEQ',
    client: 'Empresa de Energía del Quindío S.A. E.S.P. (EDEQ)',
    clientLogo: '/images/logos_clientes/logo_EDEQ.png',
    industry: 'Energía & Misión Crítica',
    location: 'Calarcá, Quindío',
    year: '2024',
    image: '/images/proyectos/subestacion-calarca-edeq.webp',
    description:
      'Supervisión termográfica industrial en tiempo real sobre transformadores de potencia para prevención de fallas catastróficas.',
    challenge:
      'Implementar un proyecto piloto de supervisión termográfica continua sobre transformadores de potencia para prevenir fallas por sobrecalentamiento, incendios y cortes del servicio eléctrico regional.',
    solution:
      'Instalación de cámaras termográficas industriales IP enfocadas a transformadores de potencia, enlazadas con el sistema de alarma de incendios del edificio y conectadas al BMS central de EDEQ para supervisión remota 24/7.',
    services: [
      'Supervisión Termográfica Industrial',
      'Ingeniería en Alta Tensión',
      'Integración BMS Central 24/7',
      'Prevención de Incendios',
    ],
    results: [
      'Supervisión continua y detección temprana de anomalías térmicas en transformadores de potencia',
      'Integración exitosa de señales de alerta preventiva directamente al BMS central corporativo',
      'Cero interrupciones en la distribución eléctrica durante la fase de instalación e ingeniería',
    ],
  },
  'bosque-residencial-la-pradera': {
    title: 'Bosque Residencial La Pradera',
    client: 'Bosque Residencial La Pradera',
    clientLogo: '/images/logos_clientes/logo_Uraki.svg',
    industry: 'Residencial & Energía Solar',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/bosque-residencial-la-pradera.webp',
    description:
      'Anillo perimetral en fibra óptica, CCTV con analítica de intrusión y generación solar fotovoltaica.',
    challenge:
      'Diseñar y construir la infraestructura de conectividad de alta velocidad, videovigilancia con analítica y automatización residencial con energía renovable para conjunto campestre.',
    solution:
      'Anillo perimetral en fibra óptica, CCTV con analítica inteligente de video para detección de intrusión, automatización domótica integral (seguridad, audio/video multizona) y generación solar fotovoltaica con paneles solares.',
    services: [
      'Domótica Residencial Integral',
      'Energía Solar Fotovoltaica',
      'Anillo Perimetral de Fibra Óptica',
      'Analítica Inteligente de Video',
    ],
    results: [
      '12 residencias campestres completamente automatizadas con control inteligente',
      '47% de reducción en el consumo de energía eléctrica convencional en viviendas con paneles solares',
      'Monitoreo perimetral robusto en tiempo real sobre red de fibra óptica dedicada',
    ],
  },
  'uci-neonatal-armenia': {
    title: 'Unidad de Cuidados Intensivos Neonatales',
    client: 'Sector Salud (Clínica Especializada)',
    clientLogo: '/images/logos_clientes/logo_Uniminuto.png',
    industry: 'Salud & Cuidados Críticos',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/uci-neonatal-armenia.webp',
    description:
      'Cableado Cat 7A blindado hospitalario, control de iluminación dimerizable y monitoreo de gases especiales.',
    challenge:
      'Diseñar e instalar redes de comunicaciones e iluminación de máxima fiabilidad en áreas hospitalarias críticas para recién nacidos, asegurando inmunidad contra interferencias electromagnéticas.',
    solution:
      'Cableado estructurado Categoría 7A blindado de grado hospitalario, sistema de monitoreo de suministro de gases especiales y control de iluminación dimerizable por zonas específicas de atención neonatal.',
    services: [
      'Cableado Cat 7A Blindado Hospitalario',
      'Control de Iluminación Dimerizable',
      'Inmunidad Electromagnética',
      'Monitoreo de Gases Medicinales',
    ],
    results: [
      'Cobertura e inmunidad electromagnética integral en Cuidados Intensivos, Intermedios y Básicos',
      '37% de reducción en el consumo eléctrico de iluminación',
      'Control preciso por zonas para adecuarse a procedimientos médicos y descanso neurológico neonatal',
    ],
  },
  'inversiones-barake-garcia-ibg': {
    title: 'Sede Corporativa & Bodegas IBG',
    client: 'Inversiones Barake García S.A.S. (IBG)',
    clientLogo: '/images/logos_clientes/logo_IBG.svg',
    industry: 'Logística & Redes 10G',
    location: 'Armenia & Caimo, Quindío',
    year: '2024',
    image: '/images/proyectos/inversiones-barake-garcia-ibg.webp',
    description:
      'Red troncal 10G Cisco Meraki FullStack administrada en la nube, unificando voz, datos y seguridad.',
    challenge:
      'Modernizar la infraestructura tecnológica y de comunicaciones de la sede corporativa y bodegas logísticas principales, sustituyendo redes legadas obsoletas por una red de 10 Gigabits.',
    solution:
      'Diseño de topología de red troncal a 10 Gigabits (10G) y suministro, instalación y puesta en marcha de una solución FullStack 10G Cisco Meraki que unifica voz, datos y seguridad administrada centralmente desde la nube.',
    services: [
      'Arquitectura de Red Troncal 10G',
      'Solución FullStack Cisco Meraki',
      'Conectorización de Fibra Óptica',
      'Migración de Red en Caliente',
    ],
    results: [
      'Red de convergencia 10G Cisco Meraki 100% operativa instalada con migración en caliente',
      'Centralización de la gestión de Voz, Datos y Seguridad unificada desde el dashboard Cloud',
      'Eliminación total de cuellos de botella en la operación logística de bodegas principales',
    ],
  },
  'subestacion-centenario-sil-edeq': {
    title: 'Subestación Eléctrica Centenario — SIL / EDEQ',
    client: 'Soporte A La Ingeniería S.A.S. (SIL) / EDEQ S.A. E.S.P.',
    clientLogo: '/images/logos_clientes/logo_SIL.svg',
    industry: 'Seguridad & Infraestructura Crítica',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/subestacion-centenario-sil-edeq.webp',
    description:
      'CCTV IP Hikvision 5MP/4MP domo y fisheye, control de acceso e intrusión perimetral para subestación eléctrica.',
    challenge:
      'Ejecutar el suministro, montaje y comisionamiento de los sistemas de seguridad física y electrónica para la nueva Subestación Eléctrica Centenario, protegiendo la distribución de energía en Armenia.',
    solution:
      'Sistema integral de CCTV IP con cámaras tipo domo y ojo de pez Hikvision de 5MP y 4MP, control de acceso en áreas restringidas y sistema de detección de intrusión y robo con señalización remota.',
    services: [
      'CCTV IP Hikvision 5MP/4MP',
      'Control de Acceso Restringido',
      'Detección de Intrusión Perimetral',
      'Cableado Estruturado Blindado',
    ],
    results: [
      '100% de cobertura perimetral e interior en pasillos, celdas, escaleras y sala de control',
      'Entrega técnica a satisfacción de SIL y recepción de obra técnica por EDEQ S.A. E.S.P.',
    ],
  },
  'contraloria-bogota': {
    title: 'Mantenimiento Especializado — Contraloría de Bogotá',
    client: 'Contraloría de Bogotá / Contraloría General de la República',
    clientLogo: '/images/logos_clientes/logo_Contraloria.svg',
    industry: 'Sector Público & Mantenimiento',
    location: 'Bogotá, D.C.',
    year: '2024',
    image: '/images/proyectos/contraloria-bogota.webp',
    description:
      'Mantenimiento preventivo y correctivo de subsistemas electrónicos de seguridad, automatización e hidráulica.',
    challenge:
      'Gestionar y ejecutar el mantenimiento especializado de subsistemas electrónicos de seguridad, automatización e infraestructura hidráulica en las sedes de la entidad de control, asegurando continuidad operativa.',
    solution:
      'Mantenimiento preventivo y correctivo de sistemas electrónicos e hidráulicos, adquisición de repuestos, ingeniería residente y supervisión de seguridad y salud en el trabajo (SST).',
    services: [
      'Mantenimiento Preventivo & Correctivo',
      'Ingeniería Residente',
      'Supervisión SST Estatal',
      'Sistemas Electrónicos e Hidráulicos',
    ],
    results: [
      'Ejecución del 100% de las actividades contratadas dentro del plazo y presupuesto estipulado',
      'Garantía de continuidad operativa en todas las sedes de la entidad fiscalizadora',
    ],
  },
  'redes-incendio-conjuntos-uraki': {
    title: 'Redes Contra Incendios (Boreal, Austral, Seroa, Macuira)',
    client: 'Uraki Constructora / Desarrolladores del Eje Cafetero',
    clientLogo: '/images/logos_clientes/logo_Uraki.svg',
    industry: 'Residencial Vertical & NFPA',
    location: 'Eje Cafetero, Colombia',
    year: '2024',
    image: '/images/proyectos/redes-incendio-conjuntos-uraki.webp',
    description:
      'Ingeniería y montaje de redes de protección contra incendios bajo estándar NFPA 72/13/14 y norma NSR-10 Títulos J y K.',
    challenge:
      'Diseñar e implementar redes de protección y detección de incendios en torres de apartamentos de gran altura conforme a normas sismorresistentes NSR-10 y estándares internacionales NFPA.',
    solution:
      'Ingeniería básica y de detalle, planos constructivos, memorias de cálculo hidráulicas/electrónicas e instalación de paneles centrales, sensores fototérmicos y sirenas estroboscópicas UL/FM.',
    services: [
      'Diseño de Redes Incendio NFPA',
      'Memorias de Cálculo Hidráulico',
      'Detección Fototérmica UL/FM',
      'Norma Sismorresistente NSR-10',
    ],
    results: [
      'Diseños aprobados ante curadurías urbanas y cuerpos de bomberos en el Eje Cafetero',
      'Cumplimiento normativo integral de seguridad humana en más de 400 apartamentos construidos',
    ],
  },
  'palacio-de-justicia-armenia': {
    title: 'Palacio de Justicia de Armenia — Rama Judicial',
    client: 'Rama Judicial de Colombia (Dirección Seccional Armenia)',
    clientLogo: '/images/logos_clientes/logo_Rama_Judicial.svg',
    industry: 'Institucional & Seguridad Judicial',
    location: 'Armenia, Quindío',
    year: '2024',
    image: '/images/proyectos/palacio-de-justicia-armenia.webp',
    description:
      'Modernización de videovigilancia y cableado estructurado en sedes de la Rama Judicial.',
    challenge:
      'Modernizar los sistemas de seguridad electrónica y la red de datos en la sede judicial de Armenia para garantizar la protección de funcionarios, público y recintos de audiencias.',
    solution:
      'Despliegue de red de videovigilancia IP y cableado estructurado en zonas neurálgicas del palacio de justicia, pasillos, accesos públicos y salas de audiencias.',
    services: [
      'Videovigilancia IP Judicial',
      'Cableado Estructurado',
      'Canalizaciones Perimetrales',
      'Centro de Monitoreo',
    ],
    results: [
      'Cobertura integral de seguridad en accesos y salas públicas de audiencias',
      'Operación continua y protegida de los canales de conectividad judicial',
    ],
  },
};

export interface ProjectSummary {
  slug: string;
  title: string;
  client: string;
  location: string;
  image: string;
  description: string;
  category: string;
}

export const realProjectsList: ProjectSummary[] = Object.entries(projects).map(([slug, p]) => ({
  slug,
  title: p.title,
  client: p.client,
  location: p.location,
  image: p.image,
  description: p.description,
  category: p.industry,
}));

export function getAllProjects(): ProjectSummary[] {
  return realProjectsList;
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects[slug];
}
