'use client';

import Link from 'next/link';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Section } from '@/components/ui/Section';
import { ServiceCTASection } from '@/components/sections/CTASection';

interface ServicePageProps {
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  ctaText?: string;
  ctaHref?: string;
}

export function ServicePageTemplate({
  title,
  description,
  features,
  ctaText = 'Solicitar Cotización',
  ctaHref = '/contacto',
}: ServicePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/soluciones"
              className="text-accent text-sm font-medium mb-4 inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft weight="light" size={16} />
              Volver a Soluciones
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)]">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-8">
              {description}
            </p>

            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-bg-primary rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section background="default" padding="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Check weight="bold" size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <ServiceCTASection serviceName={title} />
    </>
  );
}
