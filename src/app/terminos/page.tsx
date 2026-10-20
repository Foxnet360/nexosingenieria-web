import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { contactoData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | Nexos Ingeniería S.A.S.',
  description:
    'Términos y condiciones de uso del portal web y servicios de consultoría técnica de Nexos Ingeniería S.A.S. (NIT 900.230.435-1).',
  alternates: {
    canonical: 'https://nexosingenieria.com/terminos',
  },
};

export default function TerminosPage() {
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
              Condiciones Contractuales
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Términos y Condiciones de Uso
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
                  Por favor lea detenidamente estos términos antes de interactuar con el portal web
                  o remitir requerimientos de ingeniería.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  1. Aceptación de los Términos
                </h2>
                <p>
                  El acceso, navegación y uso del sitio web <code>https://nexosingenieria.com</code>{' '}
                  (en adelante, el &quot;Sitio Web&quot;) confiere la condición de Usuario a quien
                  lo visite y supone la aceptación plena y sin reservas de la totalidad de las
                  cláusulas contenidas en este documento.
                </p>
                <p className="text-sm">
                  Si el Usuario no está de acuerdo con las condiciones aquí expuestas, deberá
                  abstenerse de navegar en este portal y de remitir información a través de los
                  formularios electrónicos.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  2. Titularidad del Sitio Web
                </h2>
                <p>
                  El presente Sitio Web es de propiedad exclusiva de{' '}
                  <strong>NEXOS INGENIERÍA S.A.S.</strong>, sociedad comercial legalmente
                  constituida bajo las leyes de la República de Colombia, identificada con{' '}
                  <strong>NIT 900.230.435-1</strong>, con domicilio principal en la ciudad de
                  Armenia, Quindío, representada legalmente por{' '}
                  <strong>Javier Ramírez Tafur</strong>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  3. Propiedad Intelectual e Industrial
                </h2>
                <p>
                  Todos los contenidos exhibidos en este Sitio Web, incluyendo sin limitación:
                  marcas, nombres comerciales, enseñas, logotipos, diseños gráficos, renders
                  arquitectónicos, fotografías de proyectos, diagramas de topología, infografías
                  técnicas, artículos del blog, código fuente y estructura de software, son de
                  propiedad exclusiva de NEXOS INGENIERÍA S.A.S. o de terceros que han autorizado
                  legítimamente su exhibición.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    Queda estrictamente prohibida la reproducción total o parcial, transformación,
                    distribución, comunicación pública o explotación comercial de dichos contenidos
                    sin la autorización previa, expresa y por escrito de NEXOS INGENIERÍA S.A.S.
                  </li>
                  <li>
                    Las marcas comerciales de aliados (Siemon, Leviton, Bosch, Axis, Cisco,
                    Schneider Electric, etc.) pertenecen a sus respectivos fabricantes y se exhiben
                    en el portal únicamente a título informativo e indicativo de nuestra capacidad
                    de integración técnica autorizada.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  4. Naturaleza de las Cotizaciones y Estimaciones Web
                </h2>
                <p>
                  Las calculadoras, formularios de cotización preliminar o valores paramétricos que
                  puedan generarse en el Sitio Web tienen un carácter{' '}
                  <strong>estrictamente estimativo, orientativo y no vinculante</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    Una propuesta económica adquiere validez jurídica y contractual únicamente
                    cuando es emitida formalmente en papel membretado por la Dirección Comercial de
                    NEXOS INGENIERÍA S.A.S., precedida por un levantamiento técnico en sitio o la
                    validación exhaustiva de planos y memorias técnicas por parte de nuestros
                    ingenieros especialistas.
                  </li>
                  <li>
                    Las cotizaciones formales se rigen por la vigencia específica allí señalada
                    (habitualmente 15 o 30 días calendario) y están sujetas a la fluctuación
                    cambiaria oficial (TRM) respecto a componentes y equipos de importación directa.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  5. Uso Aceptable del Portal
                </h2>
                <p>
                  El Usuario se compromete a hacer un uso lícito y diligente del portal web,
                  obligándose a no:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>
                    Introducir o difundir virus informáticos, malware o códigos maliciosos
                    orientados a desestabilizar la infraestructura del servidor o vulnerar la
                    seguridad de la información.
                  </li>
                  <li>
                    Suplantar la identidad de personas naturales o jurídicas mediante el
                    diligenciamiento de formularios de contacto con datos falsos o de terceros no
                    autorizados.
                  </li>
                  <li>
                    Realizar scraping automatizado, extracción masiva de datos o intentos de
                    ingeniería inversa sobre los activos digitales de la empresa.
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  6. Exención y Limitación de Responsabilidad
                </h2>
                <p>
                  NEXOS INGENIERÍA S.A.S. realiza sus mayores esfuerzos para mantener la información
                  del sitio actualizada y libre de imprecisiones. No obstante:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    No garantiza la disponibilidad ininterrumpida del sitio web ante caídas de
                    proveedores de hosting, fallas de conectividad ajenas o eventos de fuerza mayor
                    o caso fortuito.
                  </li>
                  <li>
                    Los artículos técnicos y publicaciones del blog constituyen conceptos
                    profesionales de carácter general y no reemplazan el diseño de ingeniería
                    detallado requerido para una obra específica.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  7. Legislación Aplicable y Jurisdicción
                </h2>
                <p>
                  Los presentes Términos y Condiciones se rigen e interpretan conforme a las leyes
                  de la <strong>República de Colombia</strong>.
                </p>
                <p className="text-sm">
                  Cualquier controversia que se suscite en relación con la validez, interpretación o
                  ejecución de los mismos será resuelta prioritariamente por arreglo directo entre
                  las partes. En caso de no alcanzarse acuerdo, las partes se someten a la
                  jurisdicción de los jueces competentes de la ciudad de{' '}
                  <strong>Armenia, Quindío</strong>, renunciando expresamente a cualquier otro fuero
                  que pudiera corresponderles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  8. Canales de Notificación
                </h2>
                <div className="p-4 bg-bg-secondary rounded-xl border border-border/60 text-sm space-y-1 font-mono">
                  <p>Para cualquier inquietud o notificación judicial y contractual:</p>
                  <p className="text-text-primary">NEXOS INGENIERÍA S.A.S.</p>
                  <p>Dirección: {contactoData.direccion}</p>
                  <p>Correo de Notificaciones: {contactoData.email}</p>
                  <p>Teléfono: {contactoData.telefono}</p>
                </div>
              </section>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <Link href="/privacidad" className="text-accent hover:underline">
                  ← Ver Política de Privacidad Web
                </Link>
                <Link href="/politica-datos" className="text-accent hover:underline">
                  Ver Política de Tratamiento de Datos (Habeas Data) →
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
