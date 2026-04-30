import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Gracias por Contactarnos | Nexos Ingeniería SAS',
  description: 'Tu mensaje ha sido enviado exitosamente. Nuestro equipo te contactará pronto.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ThankYouPageProps {
  searchParams: {
    tipo?: string;
  };
}

const messages: Record<string, { title: string; description: string; cta: string; ctaHref: string }> = {
  contacto: {
    title: '¡Mensaje Enviado!',
    description: 'Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá en menos de 24 horas hábiles.',
    cta: 'Volver al Inicio',
    ctaHref: '/',
  },
  cotizacion: {
    title: '¡Solicitud Recibida!',
    description: 'Hemos recibido tu solicitud de cotización. Un especialista se pondrá en contacto contigo para entender mejor tus necesidades y preparar una propuesta a medida.',
    cta: 'Ver Servicios',
    ctaHref: '/soluciones',
  },
  newsletter: {
    title: '¡Suscripción Confirmada!',
    description: 'Gracias por suscribirte a nuestro newsletter. Recibirás las últimas noticias y tendencias sobre tecnología para edificios inteligentes.',
    cta: 'Ver Blog',
    ctaHref: '/blog',
  },
  default: {
    title: '¡Gracias!',
    description: 'Tu acción ha sido completada exitosamente.',
    cta: 'Volver al Inicio',
    ctaHref: '/',
  },
};

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const tipo = searchParams.tipo || 'default';
  const message = messages[tipo] || messages.default;

  return (
    <Section background="secondary" padding="xl">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedElement animation="fade-in">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="check" weight="bold" color="accent" size="xl" />
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={100}>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
            {message.title}
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={200}>
          <p className="text-lg text-text-secondary mb-8">
            {message.description}
          </p>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={300}>
          <Link
            href={message.ctaHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-bg-primary rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            {message.cta}
          </Link>
        </AnimatedElement>
      </div>
    </Section>
  );
}
