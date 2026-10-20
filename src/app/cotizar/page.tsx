'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from '@phosphor-icons/react';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Button } from '@/components/ui/Button';
import { processQuoteForm, FormResponse } from '@/lib/forms/handlers';
import { analytics } from '@/lib/analytics';

export default function CotizarPage() {
  const [state, setState] = useState<FormResponse | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await processQuoteForm(formData);
    analytics.formSubmit('cotizar', result.success);
    setState(result);
    setIsPending(false);
  };

  if (state?.success) {
    return (
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <div className="text-center mb-12">
              <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
                Solicitar Cotización
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                Cuéntanos sobre tu proyecto
              </h1>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up">
            <div className="bg-bg-card border border-accent/30 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check weight="bold" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">¡Solicitud Recibida!</h3>
              <p className="text-text-secondary">
                Hemos recibido tu solicitud. Un especialista se pondrá en contacto contigo pronto.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[42vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-soluciones.webp"
            alt="Solicitar Cotización Nexos Ingeniería"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedElement animation="fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              Propuestas a Medida
            </span>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
              Cotizá tu Proyecto
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Contanos sobre tu necesidad técnica o arquitectónica y recibí un presupuesto detallado
              sin compromiso en menos de 48 horas.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="slide-up" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-bg-card border border-border rounded-xl p-8 space-y-6"
            >
              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="website_hp"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {state?.success === false && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm space-y-3">
                  <p>{state.message}</p>
                  {state.whatsappUrl && (
                    <a
                      href={state.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      Enviar cotización directa por WhatsApp
                    </a>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="+57 (6) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Servicio de interés *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="cableado">Cableado Estructurado</option>
                    <option value="seguridad">Seguridad Electrónica</option>
                    <option value="eficiencia">Eficiencia Energética</option>
                    <option value="audio-video">Audio y Video</option>
                    <option value="domotica">Domótica</option>
                    <option value="multiple">Múltiples servicios</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="projectSize"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Tamaño del proyecto
                  </label>
                  <select
                    id="projectSize"
                    name="projectSize"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="pequeno">Pequeño (&lt; 100 m²)</option>
                    <option value="mediano">Mediano (100 - 500 m²)</option>
                    <option value="grande">Grande (500 - 2000 m²)</option>
                    <option value="muy-grande">Muy grande (&gt; 2000 m²)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Presupuesto estimado
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                >
                  <option value="">Selecciona un rango (opcional)</option>
                  <option value="menos-50m">Menos de $50 millones COP</option>
                  <option value="50-100m">$50 - $100 millones COP</option>
                  <option value="100-300m">$100 - $300 millones COP</option>
                  <option value="300-500m">$300 - $500 millones COP</option>
                  <option value="mas-500m">Más de $500 millones COP</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Descripción del proyecto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none motion-reduce:transition-none"
                  placeholder="Describe tu proyecto, necesidades específicas, ubicación, cantidad de puntos de red, cámaras, etc."
                ></textarea>
              </div>

              <Button type="submit" className="w-full" isLoading={isPending} disabled={isPending}>
                Solicitar Cotización
              </Button>

              <p className="text-text-muted text-sm text-center">
                Al enviar, aceptas nuestra{' '}
                <Link href="/privacidad" className="text-accent hover:underline">
                  política de privacidad
                </Link>
              </p>
            </form>
          </AnimatedElement>
        </div>
      </Section>
    </>
  );
}
