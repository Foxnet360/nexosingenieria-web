'use client';

import { useState } from 'react';
import { Check, MapPin, Phone, EnvelopeSimple } from '@phosphor-icons/react';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Button } from '@/components/ui/Button';
import { contactoData } from '@/data/scraped-content';
import { sendEmail } from '@/lib/emailjs';
import { analytics } from '@/lib/analytics';

export default function ContactoClientPage() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || '',
      service: formData.get('service') as string || '',
      message: formData.get('message') as string,
      page: 'Contacto',
    };
    
    const result = await sendEmail(data);
    analytics.formSubmit('contacto', result.success);
    setState(result);
    setIsPending(false);
  };

  if (state?.success) {
    return (
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                Contacto
              </h1>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up">
            <div className="bg-bg-card border border-accent/30 rounded-xl p-8 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check weight="bold" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                ¡Mensaje Enviado!
              </h3>
              <p className="text-text-secondary">
                Gracias por contactarnos. Nuestro equipo revisará tu mensaje
                y te responderá en menos de 24 horas hábiles.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-[family-name:var(--font-geist-sans)]">
                Contacto
              </h1>
              <p className="text-text-secondary">
                Estamos listos para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedElement animation="slide-up" delay={100}>
              <form
                onSubmit={handleSubmit}
                className="bg-bg-card border border-border rounded-xl p-8 space-y-6"
              >
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
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="Tu nombre"
                    required
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
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

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
                    htmlFor="service"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors motion-reduce:transition-none"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="cableado">Cableado Estructurado</option>
                    <option value="seguridad">Seguridad Electrónica</option>
                    <option value="eficiencia">Eficiencia Energética</option>
                    <option value="audio-video">Audio y Video</option>
                    <option value="domotica">Domótica</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none motion-reduce:transition-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  Enviar Mensaje
                </Button>
              </form>
            </AnimatedElement>

            {/* Contact Info */}
            <AnimatedElement animation="slide-up" delay={200}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin weight="light" size={20} className="text-accent" />
                      </div>
                       <div>
                        <p className="text-text-primary font-medium">Dirección</p>
                        <p className="text-text-secondary font-[family-name:var(--font-geist-mono)]">{contactoData.direccion}</p>
                        <p className="text-text-secondary font-[family-name:var(--font-geist-mono)]">{contactoData.ciudad}, {contactoData.departamento}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone weight="light" size={20} className="text-accent" />
                      </div>
                       <div>
                        <p className="text-text-primary font-medium">Teléfono</p>
                        <p className="text-text-secondary font-[family-name:var(--font-geist-mono)]">{contactoData.telefono}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <EnvelopeSimple weight="light" size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">Email</p>
                        <p className="text-text-secondary">
                          {contactoData.email || 'Por favor contáctenos por teléfono o redes sociales'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Horario de Atención
                  </h3>
                  <div className="space-y-2 text-text-secondary">
                    <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábado: 9:00 AM - 1:00 PM</p>
                    <p>Domingo: Cerrado</p>
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Ubicación</h3>
                  <div className="aspect-video bg-bg-card border border-border rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.1234567890123!2d-75.68123456789012!3d4.531234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzEnNTIuNCJOIDc1wrA0MCc1Mi40Ilc!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Nexos Ingeniería SAS"
                      className="grayscale hover:grayscale-0 transition-all duration-300 motion-reduce:transition-none"
                    />
                  </div>
                </div>

                {/* Calendly */}
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Agendar Consultoría Gratuita
                  </h3>
                  <div className="aspect-[4/3] bg-bg-card border border-border rounded-xl overflow-hidden">
                    <iframe
                      src="https://calendly.com/nexosingenieria/consultoria-gratuita"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="Agendar consultoría gratuita"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </Section>
    </>
  );
}
