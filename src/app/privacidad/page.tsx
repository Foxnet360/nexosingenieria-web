import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Nexos Ingeniería SAS',
  description: 'Política de privacidad y tratamiento de datos personales de Nexos Ingeniería SAS.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacidadPage() {
  return (
    <Section background="default" padding="xl">
      <div className="max-w-3xl mx-auto">
        <AnimatedElement animation="fade-in">
          <h1 className="text-4xl font-bold text-text-primary mb-8 font-[family-name:var(--font-geist-sans)]">
            Política de Privacidad
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={100}>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Introducción</h2>
            <p className="text-text-secondary mb-4">
              Nexos Ingeniería SAS (en adelante, &quot;Nexos&quot;) se compromete a proteger la
              privacidad de los usuarios que visitan nuestro sitio web. Esta política de privacidad
              describe cómo recopilamos, usamos y protegemos su información personal.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">
              2. Información que Recopilamos
            </h2>
            <p className="text-text-secondary mb-4">Podemos recopilar la siguiente información:</p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Nombre y apellidos</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de la empresa</li>
              <li>Información sobre el proyecto o servicio de interés</li>
            </ul>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">
              3. Uso de la Información
            </h2>
            <p className="text-text-secondary mb-4">Utilizamos su información personal para:</p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Responder a sus consultas y solicitudes</li>
              <li>Enviar cotizaciones y propuestas comerciales</li>
              <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
              <li>Mejorar nuestros servicios y sitio web</li>
            </ul>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">
              4. Protección de Datos
            </h2>
            <p className="text-text-secondary mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su
              información personal contra acceso no autorizado, pérdida o alteración.
            </p>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Sus Derechos</h2>
            <p className="text-text-secondary mb-4">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
            </ul>

            <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">6. Contacto</h2>
            <p className="text-text-secondary mb-4">
              Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
            </p>
            <p className="text-text-secondary">
              Email: info@nexosingenieria.com
              <br />
              Teléfono: +57 (6) 123-4567
              <br />
              Dirección: Armenia, Quindío, Colombia
            </p>

            <p className="text-text-muted text-sm mt-8">
              Última actualización:{' '}
              {new Date().toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </Section>
  );
}
