import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { Icon } from '@/components/ui/Icon';
import { notFound } from 'next/navigation';
import { ArticleSchema } from '@/components/schema/OrganizationSchema';

interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  author: Author;
  heroImage: string;
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map(slug => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return {
      title: 'Artículo no encontrado | Nexos Ingeniería SAS',
    };
  }
  return {
    title: `${post.title} | Nexos Ingeniería SAS`,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

const authors: Record<'javier' | 'diego', Author> = {
  javier: {
    name: 'Javier Ramírez Tafur',
    role: 'Gerente General',
    bio: 'Ingeniero y líder directivo en Nexos Ingeniería SAS. Especialista en formulación de proyectos tecnológicos estratégicos, eficiencia energética BMS, modernización de instalaciones y cumplimiento normativo en Colombia.',
    initials: 'JR',
  },
  diego: {
    name: 'Diego Mauricio Toro',
    role: 'Director de Proyectos',
    bio: 'Director de Proyectos e Ingeniería en Nexos Ingeniería SAS. Especialista en diseño e implementación de redes de cableado estructurado certificado, seguridad electrónica convergente, centros de datos y automatización para edificios inteligentes.',
    initials: 'DT',
  },
};

const blogPosts: Record<string, BlogPost> = {
  'guia-cableado-estructurado-empresas-colombianas': {
    id: '1',
    title: 'Guía Completa de Cableado Estructurado para Empresas Colombianas',
    content: `
<p class="lead">El cableado estructurado representa los cimientos críticos sobre los que opera la totalidad de las comunicaciones, seguridad y procesos operacionales de una empresa moderna. En el entorno colombiano, cumplir estrictamente con los estándares internacionales y la normativa técnica nacional (RETIE / NTC 2050) marca la frontera entre una red resiliente y un flujo constante de sobrecostos e indisponibilidad operacional.</p>

<h2>1. ¿Por Qué el Cableado Estructurado es una Inversión Estratégica?</h2>
<p>Aproximadamente el <strong>70% de las caídas de red y cuellos de botella intermitentes</strong> en las organizaciones tienen su origen en fallas físicas de cableado, conectores defectuosos o tendidos que no respetan los radios de curvatura ni la separación electromagnética adecuada. Sin embargo, el subsistema de cableado representa menos del 7% de la inversión total en infraestructura tecnológica de una empresa.</p>

<p>Adoptar una topología en estrella jerárquica bajo normativas internacionales <strong>ANSI/TIA-568.2-D</strong> e <strong>ISO/IEC 11801</strong> permite:</p>
<ul>
  <li><strong>Interoperabilidad universal:</strong> Integrar datos corporativos, telefonía IP, cámaras de videovigilancia PoE, control de accesos y controladores de automatización BMS sobre el mismo estándar de transporte físico.</li>
  <li><strong>Mantenimiento y trazabilidad:</strong> Reducción drástica del tiempo medio de reparación (MTTR) gracias al etiquetado estandarizado bajo ANSI/TIA-606-C.</li>
  <li><strong>Ciclo de vida extendido:</strong> Infraestructura proyectada para una vida útil operativa mínima de 15 a 25 años.</li>
</ul>

<h2>2. Comparativa de Categorías: Cobre vs. Fibra Óptica</h2>
<p>La selección correcta del medio depende de las distancias operativas, el ancho de banda requerido y el nivel de interferencia electromagnética (EMI) del entorno:</p>

<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse border border-border text-sm">
    <thead>
      <tr class="bg-bg-secondary text-text-primary">
        <th class="p-3 border border-border">Categoría / Tipo</th>
        <th class="p-3 border border-border">Ancho de Banda</th>
        <th class="p-3 border border-border">Velocidad Máxima</th>
        <th class="p-3 border border-border">Distancia Canal</th>
        <th class="p-3 border border-border">Uso Recomendado</th>
      </tr>
    </thead>
    <tbody class="text-text-secondary">
      <tr>
        <td class="p-3 border border-border font-semibold text-text-primary">Cat 6 UTP</td>
        <td class="p-3 border border-border">250 MHz</td>
        <td class="p-3 border border-border">1 Gbps (10G hasta 37-55m)</td>
        <td class="p-3 border border-border">100 metros</td>
        <td class="p-3 border border-border">Puntos de trabajo estándar y telefonía IP</td>
      </tr>
      <tr>
        <td class="p-3 border border-border font-semibold text-text-primary">Cat 6A F/UTP</td>
        <td class="p-3 border border-border">500 MHz</td>
        <td class="p-3 border border-border">10 Gbps</td>
        <td class="p-3 border border-border">100 metros</td>
        <td class="p-3 border border-border">Enlaces a Access Points Wi-Fi 6/7, cámaras 4K, cuartos de servidores</td>
      </tr>
      <tr>
        <td class="p-3 border border-border font-semibold text-text-primary">Fibra Multimodo OM4</td>
        <td class="p-3 border border-border">4700 MHz·km</td>
        <td class="p-3 border border-border">40 Gbps / 100 Gbps</td>
        <td class="p-3 border border-border">Hasta 400 metros</td>
        <td class="p-3 border border-border">Backbone vertical en edificios corporativos y centros de cómputo</td>
      </tr>
      <tr>
        <td class="p-3 border border-border font-semibold text-text-primary">Fibra Monomodo OS2</td>
        <td class="p-3 border border-border">Banda ancha óptica</td>
        <td class="p-3 border border-border">100 Gbps+</td>
        <td class="p-3 border border-border">Hasta 10 - 40 km</td>
        <td class="p-3 border border-border">Campus inter-edificios, parques industriales y acometidas de ISP</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>3. Certificación de Canal con Fluke Networks: Cero Conjeturas</h2>
<p>No basta con que un enlace encienda el led de enlace (link) en un switch. En Nexos Ingeniería certificamos cada uno de los puntos instalados con equipos de análisis de campo <strong>Fluke Networks DSX-8000</strong>, emitiendo reportes individualizados en formato PDF que validan los parámetros físicos:</p>
<ul>
  <li><strong>Pérdida de Inserción (Atenuación):</strong> Disipación de energía de la señal a lo largo del canal.</li>
  <li><strong>NEXT (Near-End Crosstalk) y PS-NEXT:</strong> Ruido e interferencia inducida entre pares adyacentes.</li>
  <li><strong>Pérdida de Retorno (Return Loss):</strong> Ondas reflejadas causadas por desadaptaciones de impedancia en conectores RJ-45 o patch panels.</li>
  <li><strong>Resistencia de Bucle CC y Desbalance Resistivo:</strong> Requisito indispensable para garantizar PoE de alta potencia (PoE++ 60W y 90W) sin calentamiento excesivo en los mazos de cable.</li>
</ul>

<h2>4. Cuartos de Telecomunicaciones (MDF / IDF) y Gestión Térmica</h2>
<p>El rack es el corazón de la red. Una correcta organización contempla ordenadores horizontales y verticales de alta densidad, respeto estricto a los límites de llenado de canaletas (máximo 40% según norma para garantizar circulación de aire) y un esquema de conexiones con patch cords de fábrica que evite los latiguillos artesanales propensos a falsos contactos.</p>

<h2>5. Respaldo y Garantía del Fabricante</h2>
<p>Al ser integradores certificados de marcas líderes globales (como Siemon, Leviton, Panduit), cada proyecto entregado por Nexos Ingeniería puede optar a la <strong>garantía extendida del fabricante de hasta 25 años</strong> sobre el canal completo instalado, brindando total tranquilidad a la dirección financiera y de operaciones de su compañía.</p>
    `,
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    date: '2024-01-15',
    category: 'Cableado Estructurado',
    readTime: '8 min',
    author: authors.diego,
    heroImage: '/images/soluciones/cableado-estructurado.webp',
  },
  '5-tendencias-seguridad-electronica-2026': {
    id: '2',
    title: '5 Tendencias de Seguridad Electrónica para 2026',
    content: `
<p class="lead">La seguridad física corporativa e industrial ha dejado de ser un conjunto de sistemas pasivos de grabación para transformarse en ecosistemas predictivos impulsados por Inteligencia Artificial en el borde (Edge AI), integración de protocolos abiertos y convergencia total con las políticas de ciberseguridad corporativas.</p>

<h2>1. Analítica de Video con Inteligencia Artificial en el Borde</h2>
<p>Las cámaras IP modernas ya no son simples capturadoras de video que requieren operadores frente a un mural de monitores. La tendencia imperante para 2026 es el procesamiento de <strong>Deep Learning y Visión Artificial directamente en el chip de la cámara (Edge AI)</strong>:</p>
<ul>
  <li><strong>Clasificación precisa de objetivos:</strong> Diferenciación instantánea entre personas, vehículos, animales o vegetación en movimiento, reduciendo las falsas alarmas en más de un 95%.</li>
  <li><strong>Reconocimiento de Placas (LPR/ANPR) a alta velocidad:</strong> Gestión automatizada de accesos vehiculares en porterías y centros logísticos sin intervención humana.</li>
  <li><strong>Búsqueda Forense Inteligente:</strong> Capacidad de localizar eventos en grabaciones de semanas en cuestión de segundos, filtrando por color de vestimenta, dirección de movimiento, portación de equipaje o tipo de vehículo.</li>
</ul>

<h2>2. Control de Accesos Sin Contacto y Credenciales Móviles</h2>
<p>Las tarjetas plásticas tradicionales de proximidad (fácilmente clonables mediante duplicadores comerciales) están siendo sustituidas a gran escala por:</p>
<ul>
  <li><strong>Biometría Facial 3D con Detección de Vida (Liveness Detection):</strong> Autenticación en menos de 0.2 segundos que rechaza fotografías impresas o pantallas de teléfonos móviles.</li>
  <li><strong>Credenciales Móviles en Smartphones:</strong> Uso de Bluetooth Low Energy (BLE) y NFC en terminales móviles para abrir torniquetes y puertas con el teléfono en el bolsillo, garantizando revocación inmediata desde la consola de RRHH.</li>
</ul>

<h2>3. Radares Perimetrales y Cámaras Térmicas Convergentes</h2>
<p>Para subestaciones eléctricas, bodegas logísticas y condominios residenciales de gran extensión, la combinación de <strong>radares de microondas perimetrales y cámaras térmicas PTZ con auto-seguimiento</strong> ofrece cobertura 24/7 inmune a condiciones climáticas adversas como niebla densa, lluvia torrencial u oscuridad absoluta.</p>

<h2>4. Plataformas de Gestión Unificada (PSIM)</h2>
<p>Gestionar la videovigilancia en un software, el control de acceso en otro y la detección de incendios en un tercer panel genera lentitud operativa y silos de información. La tendencia definitiva es la implementación de plataformas unificadas bajo el estándar <strong>ONVIF (Perfiles S, G, T y M)</strong> y <strong>BACnet</strong>, permitiendo que una alarma de intrusión active automáticamente la iluminación disuasiva, cierre esclusas y envíe notificaciones push georreferenciadas a los supervisores de seguridad.</p>

<h2>5. Ciberseguridad en Dispositivos IoT y Encriptación de Punta a Punta</h2>
<p>Cada cámara y controladora de acceso es un endpoint conectado a la red corporativa. La normativa internacional exige hoy:</p>
<ul>
  <li>Comunicaciones cifradas mediante <strong>TLS 1.3 y HTTPS</strong> en todos los flujos de video y control.</li>
  <li>Firmware firmado digitalmente y deshabilitación estricta de puertos no utilizados (Telnet, UPnP).</li>
  <li>Autenticación multifactor (MFA) para operadores del centro de control y auditoría de eventos inmutable.</li>
</ul>
    `,
    slug: '5-tendencias-seguridad-electronica-2026',
    date: '2024-01-10',
    category: 'Seguridad',
    readTime: '6 min',
    author: authors.diego,
    heroImage: '/images/soluciones/seguridad-electronica.webp',
  },
  'reducir-consumo-energetico-edificios': {
    id: '3',
    title: 'Cómo Reducir el Consumo Energético en Edificios un 30%',
    content: `
<p class="lead">En Colombia, los costos tarifarios de energía eléctrica representan uno de los gastos operacionales fijos de mayor impacto para el sector terciario, corporativo y comercial. La implementación de un sistema de gestión inteligente de edificios (BMS) no solo mitiga la huella de carbono organizacional, sino que amortiza la inversión tecnológica en plazos habitualmente inferiores a 24 meses.</p>

<h2>1. Dónde se Concentra el Gasto Energético en un Edificio</h2>
<p>Una auditoría energética típica en edificaciones corporativas y comerciales en el territorio nacional arroja la siguiente distribución media:</p>
<ul>
  <li><strong>Climatización y Ventilación Mecánica (HVAC):</strong> 48% a 55% del consumo total.</li>
  <li><strong>Sistemas de Iluminación:</strong> 22% a 28% del consumo.</li>
  <li><strong>Fuerza, Equipos de Cómputo y Servidores:</strong> 15% a 20%.</li>
  <li><strong>Sistemas de Bombeo y Ascensores:</strong> 5% a 10%.</li>
</ul>

<h2>2. Automatización BMS con Protocolos Abiertos (BACnet & Modbus)</h2>
<p>El error más frecuente en la construcción tradicional es adquirir sistemas aislados que no dialogan entre sí. Una arquitectura <strong>BMS (Building Management System)</strong> unificada permite:</p>
<ul>
  <li><strong>Arranques y paradas secuenciales:</strong> Eliminación de los picos de demanda en hora punta que penalizan la tarifa eléctrica ante el operador de red.</li>
  <li><strong>Ajuste dinámico según ocupación real:</strong> Integración de sensores de presencia y medidores de CO2 que regulan el caudal de aire fresco y la temperatura de consigna piso a piso, evitando refrigerar áreas desiertas.</li>
  <li><strong>Submedición energética discriminada:</strong> Medidores digitales en tableros eléctricos principales y secundarios que detectan fugas, armónicos y equipos defectuosos en tiempo real.</li>
</ul>

<h2>3. Control Lumínico DALI-2 y Aprovechamiento de Luz Natural (Daylight Harvesting)</h2>
<p>La sustitución de luminarias fluorescentes por LED es solo el primer paso. El verdadero salto de eficiencia se produce al incorporar protocolos de control digital como <strong>DALI-2</strong> y sensores fotoeléctricos calibrados:</p>
<ul>
  <li>Atenuación automática y continua de las luminarias ubicadas en el perímetro de las fachadas vidriadas a medida que entra la luz solar.</li>
  <li>Programación de escenas horarias de limpieza y mantenimiento con un nivel de iluminación restringido al 30%.</li>
  <li>Ahorros adicionales comprobados de hasta un 38% sobre el consumo de iluminación neta.</li>
</ul>

<h2>4. Certificaciones EDGE y LEED: Valorización Inmobiliaria y Beneficios Tributarios</h2>
<p>En proyectos como el <strong>PH Centro Empresarial Ícono</strong> en Armenia, intervenido por Nexos Ingeniería, la integración tecnológica de BMS y blindobarras de alta eficiencia permitió la obtención de la acreditación internacional <strong>EDGE (Excellence in Design for Greater Efficiencies)</strong>.</p>
<p>En el marco de la <strong>Ley 1715 de 2014</strong> y su actualización mediante la <strong>Ley 2099 de 2021</strong>, las inversiones en eficiencia energética y sistemas de gestión en Colombia pueden acceder a beneficios tributarios sustanciales, incluyendo la <strong>deducción especial de renta de hasta el 50%</strong> del valor de la inversión y la exclusión de IVA en bienes y servicios calificados por la UPME.</p>
    `,
    slug: 'reducir-consumo-energetico-edificios',
    date: '2024-01-05',
    category: 'Eficiencia Energética',
    readTime: '7 min',
    author: authors.javier,
    heroImage: '/images/hero-industrias.webp',
  },
  'diseno-salas-juntas-tecnologia-av': {
    id: '4',
    title: 'Diseño de Salas de Juntas: Tecnología AV para Impresionar',
    content: `
<p class="lead">El modelo de trabajo híbrido ha transformado radicalmente la función de las salas de juntas corporativas. Hoy en día, una sala con cables desordenados en la mesa, audio incomprensible con eco o cámaras con ángulos deficientes deteriora la imagen institucional y entorpece las decisiones de alto nivel.</p>

<h2>1. Filosofía One-Touch Join y Plataformas Nativas (MTR / Zoom Rooms)</h2>
<p>Atrás quedó la época en que una reunión requería 15 minutos previos de configuración y cables HDMI cruzados. El estándar actual se basa en sistemas modulares con controladores táctiles dedicados:</p>
<ul>
  <li><strong>Microsoft Teams Rooms (MTR) y Zoom Rooms:</strong> La sala cuenta con identidad propia en el calendario corporativo de Microsoft 365 / Google Workspace. Iniciar la sesión solo requiere tocar un botón en la consola de mesa.</li>
  <li><strong>BYOM (Bring Your Own Meeting):</strong> Conectividad inalámbrica o mediante un único cable USB-C que transmite simultáneamente video 4K, audio bidireccional y carga al portátil del usuario.</li>
</ul>

<h2>2. Captura de Audio de Precisión: Micrófonos Beamforming en Techo</h2>
<p>El 80% del éxito de una videoconferencia reside en la inteligibilidad de la voz. La tecnología moderna de arreglos de micrófonos en techo (como Sennheiser TeamConnect o Shure Microflex):</p>
<ul>
  <li>Crea haces direccionales dinámicos (beamforming) que siguen automáticamente la voz de la persona que habla en cualquier rincón de la sala.</li>
  <li>Elimina ruidos de tecleo, aire acondicionado, papel o crujidos gracias a algoritmos de cancelación de eco acústico (AEC) y supresión por IA.</li>
  <li>Mantiene la mesa de juntas completamente limpia y libre de cables o micrófonos invasivos.</li>
</ul>

<h2>3. Cámaras con Encuadre Automático e Inteligencia de Participantes</h2>
<p>Las cámaras 4K con ópticas motorizadas e IA analizan la geometría de la sala para ofrecer:</p>
<ul>
  <li><strong>Encuadre de grupo (Auto-framing):</strong> Ajusta el plano para que todos los asistentes presenciales aparezcan equilibrados en pantalla.</li>
  <li><strong>Seguimiento de presentador (Speaker tracking):</strong> Realiza un plano medio suave del orador cuando se levanta a exponer frente a la pantalla o pizarra interactiva.</li>
  <li><strong>Galería de participantes individuales:</strong> Divide a los asistentes presenciales en mosaicos individuales para que los participantes remotos disfruten de equidad visual.</li>
</ul>

<h2>4. Acústica de Sala e Iluminación Diseñada para Video</h2>
<p>Ningún equipo electrónico rinde al máximo en una sala con paredes de vidrio desnudo y piso duro. En Nexos Ingeniería combinamos la ingeniería audiovisual con:</p>
<ul>
  <li>Cálculo de tiempo de reverberación <strong>RT60 óptimo (entre 0.4 y 0.6 segundos)</strong> mediante paneles fonoabsorbentes decorativos.</li>
  <li>Iluminación difusa indirecta de temperatura neutra (4000K) con alto índice de reproducción cromática (CRI > 90) para evitar sombras duras en los rostros de los interlocutores.</li>
</ul>
    `,
    slug: 'diseno-salas-juntas-tecnologia-av',
    date: '2023-12-28',
    category: 'Audio y Video',
    readTime: '5 min',
    author: authors.diego,
    heroImage: '/images/soluciones/audio-video.webp',
  },
  'checklist-infraestructura-red-edificios-inteligentes': {
    id: '5',
    title: 'Checklist: Infraestructura de Red para Edificios Inteligentes',
    content: `
<p class="lead">Antes de licitar o implementar soluciones de domótica, videovigilancia o gestión energética en una edificación, es imperativo diagnosticar si la infraestructura pasiva y activa de comunicaciones está dimensionada para soportar la carga, concurrencia y criticidad requeridas. Esta lista de verificación ejecutiva sirve como guía para directores de obra, gerentes de operaciones y líderes de tecnología.</p>

<h2>Fase 1: Capa Física y Canalizaciones (Infraestructura Pasiva)</h2>
<div class="space-y-3 my-4">
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Categoría de Cableado Horizontal:</strong>
      <p class="text-text-secondary text-sm">¿La red cuenta con Cat 6A o superior para los enlaces de datos y cámaras de alta resolución? (Cat 5e es obsoleta para alimentar APs Wi-Fi 6/7 o cámaras con analítica).</p>
    </div>
  </div>
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Backbone de Fibra Óptica:</strong>
      <p class="text-text-secondary text-sm">¿Los enlaces entre el cuarto principal (MDF) y los cuartos de piso (IDF) están enlazados con fibra óptica multimodo OM4 o monomodo OS2 con enlaces redundantes en anillo?</p>
    </div>
  </div>
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Canalizaciones y Ocupación:</strong>
      <p class="text-text-secondary text-sm">¿Las bandejas portacables y ductos cumplen el factor de ocupación máximo del 40% para permitir ampliaciones futuras y ventilación?</p>
    </div>
  </div>
</div>

<h2>Fase 2: Conmutación Activa y Presupuesto de Potencia PoE</h2>
<div class="space-y-3 my-4">
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Capacidad PoE (Power over Ethernet):</strong>
      <p class="text-text-secondary text-sm">¿Los switches soportan PoE+ (802.3at de 30W) y PoE++ (802.3bt de 60W/90W) para alimentar pantallas táctiles, luminarias inteligentes y cámaras térmicas sin fuentes de poder locales?</p>
    </div>
  </div>
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Segmentación de Red (VLANs & QOS):</strong>
      <p class="text-text-secondary text-sm">¿Existe aislamiento estricto entre la red corporativa de usuarios, la red de videovigilancia CCTV, la red de controladores BMS y la red de invitados?</p>
    </div>
  </div>
</div>

<h2>Fase 3: Calidad de Energía y Climatización en Cuartos Técnicos</h2>
<div class="space-y-3 my-4">
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Respaldo Eléctrico con UPS Online:</strong>
      <p class="text-text-secondary text-sm">¿Los equipos de comunicaciones están respaldados por UPS de doble conversión con autonomía mínima de 30 minutos y enlace a planta eléctrica de emergencia?</p>
    </div>
  </div>
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Puesta a Tierra de Telecomunicaciones:</strong>
      <p class="text-text-secondary text-sm">¿Existe una barra principal de tierra (TMGB) en el cuarto técnico conectada a la malla general con una resistencia menor a 5 ohmios según RETIE?</p>
    </div>
  </div>
</div>

<h2>Fase 4: Documentación y Trazabilidad As-Built</h2>
<div class="space-y-3 my-4">
  <div class="p-3 bg-bg-secondary rounded-lg border border-border flex items-start gap-3">
    <span class="text-accent font-bold">☑</span>
    <div>
      <strong class="text-text-primary">Certificados de Calibración Fluke y Planos Finales:</strong>
      <p class="text-text-secondary text-sm">¿Cuenta la empresa con los archivos originales de certificación digital punto a punto y planos as-built digitalizados en DWG/PDF?</p>
    </div>
  </div>
</div>
    `,
    slug: 'checklist-infraestructura-red-edificios-inteligentes',
    date: '2023-12-20',
    category: 'Cableado Estructurado',
    readTime: '10 min',
    author: authors.javier,
    heroImage: '/images/soluciones/centros-de-datos.webp',
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <ArticleSchema
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, '').slice(0, 160)}
        slug={post.slug}
        date={post.date}
      />

      {/* Hero Photographic Banner */}
      <section className="relative min-h-[50vh] flex items-end pb-16 pt-28 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
          <AnimatedElement animation="fade-in">
            <Link
              href="/blog"
              className="text-accent text-sm font-medium mb-6 inline-flex items-center gap-2 hover:underline bg-bg-primary/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border"
            >
              <Icon name="arrow-left" size="sm" />
              Volver al Blog
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                {post.category}
              </span>
              <span className="text-text-muted text-xs">•</span>
              <span className="text-text-muted text-xs font-mono">{post.readTime} de lectura</span>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)] leading-tight">
              {post.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300}>
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="w-12 h-12 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center font-bold text-accent text-sm tracking-wider">
                {post.author.initials}
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm md:text-base">
                  {post.author.name}
                  <span className="text-text-muted font-normal text-xs ml-2">
                    ({post.author.role})
                  </span>
                </p>
                <time className="text-text-muted text-xs font-mono">
                  {new Date(post.date).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement animation="slide-up">
            <article
              className="prose prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-headings:text-text-primary prose-headings:font-[family-name:var(--font-geist-sans)] prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-strong:text-accent prose-table:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedElement>

          {/* Author Card */}
          <div className="bg-bg-card border border-border rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg shadow-black/20">
            <div className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center text-xl font-bold text-accent shrink-0">
              {post.author.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h4 className="text-text-primary font-bold text-base">{post.author.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
                  {post.author.role}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{post.author.bio}</p>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <ShareButtons
              title={post.title}
              url={`https://nexosingenieria.com/blog/${post.slug}`}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
