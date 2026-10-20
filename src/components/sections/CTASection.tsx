'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-accent/20 to-accent-warm/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
            ¿Listo para transformar su edificio?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Agenda una consultoría gratuita y descubra cómo podemos ayudarle a crear un espacio más
            inteligente, seguro y eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contacto">Agendar Consultoría Gratis</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/soluciones">Ver Más Servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCTASection({ serviceName }: { serviceName: string }) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-accent/20 to-accent-warm/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
            ¿Necesita {serviceName}?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Agenda una consultoría gratuita y descubra cómo podemos ayudarle a implementar la mejor
            solución para su proyecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/cotizar">Solicitar Cotización</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/soluciones">Ver Más Servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
