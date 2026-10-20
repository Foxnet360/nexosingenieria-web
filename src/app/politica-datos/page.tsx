import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { contactoData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales | Nexos Ingeniería S.A.S.',
  description:
    'Manual y Política de Tratamiento y Protección de Datos Personales (Habeas Data) de Nexos Ingeniería S.A.S. (NIT 900.230.435-1) bajo la Ley 1581 de 2012 de Colombia.',
  alternates: {
    canonical: 'https://nexosingenieria.com/politica-datos',
  },
};

export default function PoliticaDatosPage() {
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
              Ley 1581 de 2012 · Habeas Data
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Política de Tratamiento de Datos Personales
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
              NEXOS INGENIERÍA S.A.S. · NIT 900.230.435-1 · Representante Legal: Javier Ramírez
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
                  Régimen General de Protección de Datos Personales en Colombia
                </p>
                <p className="text-sm text-text-muted">
                  Documento formal de políticas y procedimientos para la protección, recolección,
                  almacenamiento, uso y circulación de datos personales.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  1. Marco Normativo y Principios Rectores
                </h2>
                <p>
                  En cumplimiento del artículo 15 de la Constitución Política de Colombia, la{' '}
                  <strong>Ley Estatutaria 1581 de 2012</strong>, sus Decretos Reglamentarios{' '}
                  <strong>1377 de 2013</strong> y <strong>1074 de 2015</strong>,{' '}
                  <strong>NEXOS INGENIERÍA S.A.S.</strong> adopta la presente Política de
                  Tratamiento de Datos Personales fundamentada en los principios de:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-bg-secondary rounded-lg border border-border/60">
                    <strong className="text-text-primary block mb-1">
                      Principio de Legalidad:
                    </strong>
                    El tratamiento es una actividad reglada sujeta a las disposiciones legales
                    colombianas.
                  </div>
                  <div className="p-3 bg-bg-secondary rounded-lg border border-border/60">
                    <strong className="text-text-primary block mb-1">
                      Principio de Finalidad:
                    </strong>
                    Los datos se tratan con un propósito legítimo y comunicado previamente al
                    titular.
                  </div>
                  <div className="p-3 bg-bg-secondary rounded-lg border border-border/60">
                    <strong className="text-text-primary block mb-1">Principio de Libertad:</strong>
                    El tratamiento solo se ejerce con el consentimiento previo, expreso e informado
                    del titular.
                  </div>
                  <div className="p-3 bg-bg-secondary rounded-lg border border-border/60">
                    <strong className="text-text-primary block mb-1">
                      Principio de Seguridad y Confidencialidad:
                    </strong>
                    Protección estricta contra adulteración, pérdida, consulta o acceso no
                    autorizado.
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  2. Responsable del Tratamiento de la Información
                </h2>
                <div className="p-4 bg-bg-secondary rounded-xl border border-border/60 space-y-1.5 text-sm font-mono text-text-primary">
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
                    <span className="text-text-muted">Domicilio:</span> Armenia, Quindío, Colombia
                  </p>
                  <p>
                    <span className="text-text-muted">Dirección:</span> {contactoData.direccion}
                  </p>
                  <p>
                    <span className="text-text-muted">Canal Exclusivo de Habeas Data:</span>{' '}
                    {contactoData.email}
                  </p>
                  <p>
                    <span className="text-text-muted">Teléfono:</span> {contactoData.telefono}
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  3. Derechos de los Titulares de los Datos
                </h2>
                <p>
                  Como titular de datos personales frente a NEXOS INGENIERÍA S.A.S., usted tiene
                  derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Conocer, actualizar y rectificar:</strong> Sus datos personales frente a
                    la compañía en caso de datos parciales, inexactos, incompletos, fraccionados o
                    que induzcan a error.
                  </li>
                  <li>
                    <strong>Solicitar prueba de la autorización:</strong> Otorgada a NEXOS
                    INGENIERÍA S.A.S. para el tratamiento de su información, salvo en los casos
                    expresamente exceptuados por la ley.
                  </li>
                  <li>
                    <strong>Ser informado:</strong> Previa solicitud, respecto del uso que la
                    empresa le ha dado a sus datos personales.
                  </li>
                  <li>
                    <strong>Presentar quejas ante la SIC:</strong> Ante la Superintendencia de
                    Industria y Comercio por infracciones a lo dispuesto en la Ley 1581 de 2012, una
                    vez agotado el trámite de consulta o reclamo ante NEXOS INGENIERÍA S.A.S.
                  </li>
                  <li>
                    <strong>Revocar la autorización y/o solicitar la supresión:</strong> De sus
                    datos cuando en el tratamiento no se respeten los principios, derechos y
                    garantías constitucionales y legales.
                  </li>
                  <li>
                    <strong>Acceder de forma gratuita:</strong> A sus datos personales que hayan
                    sido objeto de tratamiento.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  4. Procedimiento para el Ejercicio de Derechos (Consultas y Reclamos)
                </h2>
                <p>
                  Los titulares o sus causahabientes podrán ejercer sus derechos mediante solicitud
                  escrita dirigida al Responsable del Tratamiento:
                </p>

                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-bg-secondary rounded-xl border border-border/60">
                    <h3 className="font-bold text-text-primary text-base mb-2">
                      Procedimiento para Consultas
                    </h3>
                    <p className="mb-2">
                      Las consultas sobre información personal contenida en nuestras bases de datos
                      serán atendidas en un{' '}
                      <strong>término máximo de diez (10) días hábiles</strong> contados a partir de
                      la fecha de recibo de la misma.
                    </p>
                    <p className="text-xs text-text-muted">
                      Cuando no fuere posible atender la consulta dentro de dicho término, se
                      informará al interesado antes del vencimiento expresando los motivos de la
                      demora y señalando la fecha en que se atenderá, la cual en ningún caso podrá
                      superar los cinco (5) días hábiles siguientes al vencimiento del primer
                      término.
                    </p>
                  </div>

                  <div className="p-4 bg-bg-secondary rounded-xl border border-border/60">
                    <h3 className="font-bold text-text-primary text-base mb-2">
                      Procedimiento para Reclamos (Corrección, Actualización o Supresión)
                    </h3>
                    <p className="mb-2">
                      El titular que considere que la información debe ser corregida, actualizada o
                      suprimida, o que advierta el presunto incumplimiento de cualquiera de los
                      deberes legales, podrá presentar un reclamo que será tramitado bajo las
                      siguientes reglas:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5 text-xs text-text-secondary">
                      <li>
                        El reclamo se formulará mediante comunicación con identificación del
                        titular, descripción de los hechos que dan lugar al reclamo, dirección de
                        respuesta y documentos soporte pertinentes.
                      </li>
                      <li>
                        Si el reclamo resulta incompleto, se requerirá al interesado dentro de los
                        cinco (5) días siguientes a la recepción para que subsane las fallas.
                        Transcurridos dos (2) meses desde la fecha del requerimiento sin que el
                        solicitante presente la información requerida, se entenderá que ha desistido
                        del reclamo.
                      </li>
                      <li>
                        El término máximo para atender el reclamo será de{' '}
                        <strong>quince (15) días hábiles</strong> contados a partir del día
                        siguiente a la fecha de su recibo completo. Si no fuere posible atenderlo en
                        dicho lapso, se informará al interesado señalando la fecha en que se
                        resolverá (máximo 8 días hábiles adicionales).
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
                  5. Vigencia de las Bases de Datos
                </h2>
                <p className="text-sm">
                  Los datos personales recolectados permanecerán en las bases de datos de NEXOS
                  INGENIERÍA S.A.S. durante el tiempo que sea necesario para cumplir con las
                  finalidades autorizadas por el titular, la relación contractual o comercial
                  vigente, y durante los plazos legalmente exigibles por las normas comerciales,
                  tributarias y de auditoría contable en Colombia (generalmente 10 años para
                  documentos y soportes contables según el Código de Comercio).
                </p>
              </section>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <Link href="/privacidad" className="text-accent hover:underline">
                  ← Ver Política de Privacidad Web
                </Link>
                <Link href="/terminos" className="text-accent hover:underline">
                  Ver Términos y Condiciones de Uso →
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
