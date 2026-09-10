export interface AlliedBrand {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  website?: string;
  solutions: string[]; // Slugs of solutions where this brand is applied
}

export const alliedBrands: AlliedBrand[] = [
  {
    id: 'cisco',
    name: 'Cisco / Cisco Meraki',
    category: 'Redes y Comunicaciones',
    description:
      'Proveedor mundial de infraestructura de conectividad gestionada en la nube, switches 10G, puntos de acceso Wi-Fi 6/6E y appliances de seguridad convergente.',
    logo: '/images/aliados/cisco.png',
    solutions: ['cableado-estructurado', 'centros-de-datos'],
  },
  {
    id: 'siemon',
    name: 'The Siemon Company (Siemon)',
    category: 'Cableado Estructurado',
    description:
      'Fabricante estadounidense especialista en sistemas de cableado de telecomunicaciones de alto rendimiento (Cat 6A, Cat 7A TERA y fibra óptica), con certificación técnica oficial de Nexos.',
    logo: '/images/aliados/siemon.png',
    solutions: ['cableado-estructurado', 'centros-de-datos'],
  },
  {
    id: 'schneider',
    name: 'Schneider Electric (EcoStruxure)',
    category: 'Energía & Automatización (BMS)',
    description:
      'Multinacional especialista en gestión de energía y automatización, creadora de la arquitectura abierta e interoperable EcoStruxure para edificios inteligentes.',
    logo: '/images/aliados/schneider-electric.png',
    solutions: ['domotica', 'centros-de-datos', 'mantenimiento'],
  },
  {
    id: 'bosch',
    name: 'Bosch Security and Safety Systems',
    category: 'Seguridad Electrónica',
    description:
      'División de seguridad del Grupo Bosch, especializada en sistemas integrados de videovigilancia, detección de incendios, control de accesos e intrusión.',
    logo: '/images/aliados/bosch-security.png',
    solutions: ['seguridad-electronica', 'control-acceso', 'mantenimiento'],
  },
  {
    id: 'axis',
    name: 'Axis Communications',
    category: 'Videovigilancia & Analítica IP',
    description:
      'Líder mundial sueco en soluciones de videovigilancia IP, cámaras en red, control de acceso, audio IP y analítica basada en inteligencia artificial.',
    logo: '/images/aliados/axis-communications.png',
    solutions: ['seguridad-electronica', 'control-acceso', 'audio-video'],
  },
  {
    id: 'lutron',
    name: 'Lutron Electronics',
    category: 'Automatización e Iluminación',
    description:
      'Empresa líder en sistemas de control inteligente de iluminación, atenuación (dimming), cortinas automatizadas y optimización de consumo eléctrico.',
    logo: '/images/aliados/lutron.png',
    solutions: ['domotica', 'audio-video'],
  },
  {
    id: 'control4',
    name: 'Control4 (Snap One)',
    category: 'Automatización y Domótica',
    description:
      'Plataforma de automatización inteligente y domótica integrada para espacios residenciales premium, hotelería y salas corporativas.',
    logo: '/images/aliados/control4.png',
    solutions: ['domotica', 'audio-video'],
  },
  {
    id: 'leviton',
    name: 'Leviton Network Solutions',
    category: 'Cableado Estructurado',
    description:
      'Fabricante estadounidense especializado en infraestructura de telecomunicaciones, cableado estructurado en cobre (Cat 6/6A) y fibra óptica.',
    logo: '/images/aliados/leviton.png',
    solutions: ['cableado-estructurado'],
  },
  {
    id: 'hid',
    name: 'HID Global',
    category: 'Control de Acceso e Identificación',
    description:
      'Desarrollador líder en tecnologías de identificación segura, credenciales móviles, biometría y lectores de control de acceso físico y digital.',
    logo: '/images/aliados/hid-global.png',
    solutions: ['control-acceso', 'seguridad-electronica'],
  },
  {
    id: 'tyco',
    name: 'Tyco / Johnson Controls',
    category: 'Seguridad Física Empresarial',
    description:
      'Corporación multinacional especializada en plataformas de seguridad física empresarial, control de acceso centralizado Kantech y gestión de video.',
    logo: '/images/aliados/tyco.png',
    solutions: ['seguridad-electronica', 'control-acceso'],
  },
  {
    id: 'siemens',
    name: 'Siemens (Desigo CC)',
    category: 'Automatización & BMS',
    description:
      'Conglomerado tecnológico multinacional cuya plataforma Desigo CC integra y centraliza la supervisión de HVAC, iluminación, energía y seguridad (BMS).',
    logo: '/images/aliados/siemens.svg',
    solutions: ['domotica', 'mantenimiento'],
  },
  {
    id: 'dahua',
    name: 'Dahua Technology',
    category: 'Videovigilancia IP',
    description:
      'Proveedor global de soluciones de IoT centradas en video, especializado en videovigilancia IP, analítica y control de acceso.',
    logo: '/images/aliados/dahua.svg',
    solutions: ['seguridad-electronica', 'control-acceso'],
  },
  {
    id: 'honeywell',
    name: 'Honeywell Building Technologies',
    category: 'Seguridad y Automatización',
    description:
      'Multinacional de tecnología para edificios que suministra sistemas de detección de incendios, control de accesos e intrusión.',
    logo: '/images/aliados/honeywell.svg',
    solutions: ['seguridad-electronica', 'mantenimiento'],
  },
  {
    id: 'allied',
    name: 'Allied Telesis',
    category: 'Redes y Conectividad',
    description:
      'Fabricante global de soluciones de conectividad IP, switches empresariales de alta disponibilidad, enrutadores y redes convergentes seguras.',
    logo: '/images/aliados/allied-telesis.png',
    solutions: ['cableado-estructurado', 'centros-de-datos'],
  },
  {
    id: 'cambium',
    name: 'Cambium Networks',
    category: 'Redes Inalámbricas',
    description:
      'Fabricante de soluciones inalámbricas fijas de banda ancha, enlaces punto a punto y redes Wi-Fi de nivel empresarial.',
    logo: '/images/aliados/cambium-networks.png',
    solutions: ['cableado-estructurado'],
  },
  {
    id: 'suprema',
    name: 'Suprema Inc.',
    category: 'Biometría & Control de Acceso',
    description:
      'Líder global en biometría y tecnología de control de acceso facial y dactilar para empresas.',
    logo: '/images/aliados/suprema.png',
    solutions: ['control-acceso'],
  },
  {
    id: 'russound',
    name: 'Russound',
    category: 'Audio Distribuido',
    description:
      'Fabricante especializado en sistemas de audio distribuido multizona y sonorización para proyectos residenciales y comerciales.',
    logo: '/images/aliados/russound.svg',
    solutions: ['audio-video', 'domotica'],
  },
  {
    id: 'marantz',
    name: 'Marantz / Monitor Audio',
    category: 'Audio Hi-Fi & Cine en Casa',
    description:
      'Sistemas de amplificación de audio de alta fidelidad y parlantes de diseño acústico para arquitectura corporativa y residencial.',
    logo: '/images/aliados/marantz.png',
    solutions: ['audio-video', 'domotica'],
  },
];
