import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Nexos Ingeniería SAS',
  description: 'Términos y condiciones de uso del sitio web de Nexos Ingeniería SAS.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerminosPage() {
  return (
    <Section background="default" padding="xl">
      <div className="max-w-3xl mx-auto">
        <AnimatedElement animation="fade-in">
          <h1 className="text-4xl font-bold text-text-primary mb-8 font-[family-name:var(--font-geist-sans)]">
            Términos y Condiciones
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={100}>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Uso del Sitio Web</h2>
            <p className="text-text-secondary mb-4">
              Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad. 
              Si no está de acuerdo con estos términos, por favor no utilice nuestro sitio.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. Propiedad Intelectual</h2>
            <p className="text-text-secondary mb-4">
              Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, 
              es propiedad de Nexos Ingeniería SAS y está protegido por las leyes de propiedad intelectual.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Limitación de Responsabilidad</h2>
            <p className="text-text-secondary mb-4">
              Nexos Ingeniería SAS no se hace responsable por daños directos, indirectos, incidentales o 
              consecuentes que resulten del uso o la imposibilidad de uso de este sitio web.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. Enlaces a Terceros</h2>
            <p className="text-text-secondary mb-4">
              Este sitio web puede contener enlaces a sitios de terceros. Nexos Ingeniería SAS no tiene 
              control sobre estos sitios y no se hace responsable de su contenido.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Modificaciones</h2>
            <p className="text-text-secondary mb-4">
              Nexos Ingeniería SAS se reserva el derecho de modificar estos términos y condiciones en 
              cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su 
              publicación en el sitio web.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">6. Ley Aplicable</h2>
            <p className="text-text-secondary mb-4">
              Estos términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier 
              disputa relacionada con estos términos será resuelta en los tribunales de Armenia, Quindío.
            </p>

            <p className="text-text-muted text-sm mt-8">
              Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </Section>
  );
}
