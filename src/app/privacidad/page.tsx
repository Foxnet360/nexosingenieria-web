import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { contactoData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Nexos Ingeniería S.A.S.',
  description:
    'Política de privacidad y protección de la información de Nexos Ingeniería S.A.S. (NIT 900.230.435-1). Conozca cómo recopilamos, protegemos y gestionamos sus datos.',
  alternates: {
    canonical: 'https://nexosingenieria.com/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[35vh] flex items-center justify-center pt-28 pb-14 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/80 to-bg-primary" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedElement animation="fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              Marco Legal & Transparencia
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Política de Privacidad
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
              Nexos Ingeniería S.A.S. · NIT 900.230.435-1 · Representante Legal: Javier Ramírez
              Tafur
            </p>
          </AnimatedElement>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="slide-up">
            <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-12 space-y-8 text-text-secondary leading-relaxed">
              <div className="border-b border-border/60 pb-6">
                <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                  Última actualización: Octubre de 2026
                </p>
                <p className="text-sm text-text-muted">
                  En cumplimiento del marco constitucional y normativo colombiano para la protección
                  de la información y privacidad digital.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  1. Identificación del Responsable del Tratamiento
                </h2>
                <div className="p-4 bg-bg-secondary rounded-xl border border-border/60 space-y-2 text-sm font-mono text-text-primary">
                  <p>
                    <span className="text-text-muted">Razón Social:</span> NEXOS INGENIERÍA S.A.S.
                  </p>
                  <p>
                    <span className="text-text-muted">NIT:</span> 900.230.435-1
                  </p>
                  <p>
                    <span className="text-text-muted">Representante Legal:</span> Javier Ramírez
                    Tafur
                  </p>
                  <p>
                    <span className="text-text-muted">Domicilio Principal:</span>{' '}
                    {contactoData.direccion}
                  </p>
                  <p>
                    <span className="text-text-muted">Correo Electrónico de Contacto:</span>{' '}
                    {contactoData.email}
                  </p>
                  <p>
                    <span className="text-text-muted">Línea Telefónica:</span>{' '}
                    {contactoData.telefono}
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  2. Alcance y Compromiso
                </h2>
                <p>
                  En <strong>NEXOS INGENIERÍA S.A.S.</strong> reconocemos la importancia de la
                  seguridad, privacidad y confidencialidad de la información personal de los
                  usuarios, clientes, proveedores y visitantes de nuestra plataforma web{' '}
                  <code>https://nexosingenieria.com</code>.
                </p>
                <p>
                  Esta Política de Privacidad describe las prácticas relativas a la recolección,
                  almacenamiento, uso, circulación y protección de la información suministrada a
                  través de nuestros canales digitales interactivos, formularios de cotización,
                  suscripción a boletines y solicitudes de asesoría técnica.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  3. Información que Recopilamos en Este Sitio
                </h2>
                <p>
                  Recopilamos únicamente los datos necesarios para brindar una atención comercial y
                  técnica idónea:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Datos de contacto e identificación:</strong> Nombres, apellidos,
                    dirección de correo electrónico corporativo o personal, número telefónico o
                    WhatsApp de contacto.
                  </li>
                  <li>
                    <strong>Datos de la entidad solicitante:</strong> Razón social de la empresa,
                    sector industrial, ciudad y cargo del solicitante dentro de la organización.
                  </li>
                  <li>
                    <strong>Información técnica del requerimiento:</strong> Tipología del proyecto
                    (cableado estructurado, seguridad electrónica, centros de datos, domótica/BMS,
                    audio/video), escala estimada y descripción de necesidades de infraestructura.
                  </li>
                  <li>
                    <strong>Datos de navegación y telemetría anónima:</strong> Dirección IP
                    anonimizada, tipo de navegador, sistema operativo, páginas visitadas y tiempos
                    de permanencia, gestionados mediante almacenamiento local y analítica sin fines
                    de perfilamiento intrusivo.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  4. Finalidades del Tratamiento de Datos
                </h2>
                <p>
                  La información recopilada a través del sitio web es utilizada exclusivamente para:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>
                    Elaborar y remitir propuestas técnico-económicas y cotizaciones solicitadas por
                    el usuario.
                  </li>
                  <li>
                    Coordinar visitas técnicas de levantamiento de información en sitio o reuniones
                    virtuales de asesoría con ingenieros de proyectos.
                  </li>
                  <li>
                    Atender oportunamente consultas, PQRS (Peticiones, Quejas, Reclamos y
                    Sugerencias) radicadas a través de nuestro formulario de contacto.
                  </li>
                  <li>
                    Remitir actualizaciones técnicas, boletines de ingeniería, guías de diseño y
                    novedades sobre certificaciones de infraestructura a usuarios previamente
                    suscritos.
                  </li>
                  <li>
                    Evaluar la calidad de los servicios prestados y optimizar la experiencia de
                    navegación del portal web.
                  </li>
                  <li>
                    Cumplir con las obligaciones legales, tributarias, contables y contractuales
                    exigibles en Colombia.
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  5. Seguridad de la Información y Transferencia
                </h2>
                <p>
                  NEXOS INGENIERÍA S.A.S. adopta rigurosas medidas técnicas, humanas y
                  administrativas para garantizar la confidencialidad de la información y prevenir
                  su adulteración, pérdida, consulta o acceso no autorizado:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Cifrado SSL/TLS:</strong> Todas las comunicaciones entre su navegador y
                    nuestros servidores viajan encriptadas bajo protocolos HTTPS de alta seguridad.
                  </li>
                  <li>
                    <strong>No comercialización:</strong> NEXOS INGENIERÍA S.A.S. no vende, alquila,
                    cede ni comercializa bases de datos personales a terceros bajo ninguna
                    circunstancia.
                  </li>
                  <li>
                    <strong>Proveedores de infraestructura:</strong> La información puede ser
                    alojada temporalmente en proveedores tecnológicos de nivel empresarial
                    (servicios de correo electrónico, hosting e infraestructura en la nube) que
                    acreditan estándares internacionales de seguridad (ISO 27001, SOC 2).
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  6. Política de Cookies y Almacenamiento Local
                </h2>
                <p>
                  Nuestro sitio web utiliza cookies técnicas esenciales y almacenamiento en caché
                  para garantizar el correcto funcionamiento del menú de navegación, temas de
                  contraste y rendimiento de carga.
                </p>
                <p className="text-sm">
                  Usted puede configurar su navegador en cualquier momento para rechazar o eliminar
                  cookies; no obstante, algunas funcionalidades de interacción interactiva y
                  formularios podrían verse limitadas.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  7. Ejercicio de Derechos de los Titulares (Habeas Data)
                </h2>
                <p>
                  De conformidad con la legislación colombiana (Ley 1581 de 2012), usted tiene
                  derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos
                  personales de nuestras bases de datos en cualquier momento.
                </p>
                <p className="text-sm">
                  Para consultar el procedimiento detallado, tiempos de respuesta y canales
                  formales, visite nuestra{' '}
                  <Link
                    href="/politica-datos"
                    className="text-accent hover:underline font-semibold"
                  >
                    Política de Tratamiento de Datos Personales
                  </Link>
                  .
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  8. Modificaciones a Esta Política
                </h2>
                <p className="text-sm">
                  NEXOS INGENIERÍA S.A.S. se reserva el derecho de actualizar la presente política
                  para adaptarla a modificaciones normativas o evoluciones de nuestra plataforma
                  tecnológica. Cualquier cambio sustancial será publicado en esta misma sección
                  indicando la fecha de entrada en vigencia.
                </p>
              </section>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
