'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { empresaData, contactoData } from '@/data/scraped-content';
import { processNewsletterForm, FormResponse } from '@/lib/forms/handlers';
import { analytics } from '@/lib/analytics';

const footerLinks = {
  soluciones: [
    { label: 'Cableado Estructurado', href: '/soluciones/cableado-estructurado' },
    { label: 'Seguridad Electrónica', href: '/soluciones/seguridad-electronica' },
    { label: 'Centros de Datos', href: '/soluciones/centros-de-datos' },
    { label: 'Domótica & BMS', href: '/soluciones/domotica' },
    { label: 'Control de Acceso', href: '/soluciones/control-acceso' },
    { label: 'Audio & Video Profesional', href: '/soluciones/audio-video' },
    { label: 'Mantenimiento & Soporte SLA', href: '/soluciones/mantenimiento' },
  ],
  industrias: [
    { label: 'Corporativo', href: '/industrias/corporativo' },
    { label: 'Retail', href: '/industrias/retail' },
    { label: 'Salud', href: '/industrias/salud' },
    { label: 'Educación', href: '/industrias/educacion' },
    { label: 'Industrial', href: '/industrias/industrial' },
  ],
  empresa: [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' },
  ],
};

function NewsletterForm() {
  const [state, setState] = useState<FormResponse | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await processNewsletterForm(formData);
    analytics.formSubmit('newsletter', result.success);
    setState(result);
    setIsPending(false);
  };

  if (state?.success) {
    return (
      <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-accent text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="website_hp" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          placeholder="tu@email.com"
          required
          className="flex-1 px-3 py-2 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors text-sm motion-reduce:transition-none"
        />
        <Button type="submit" size="sm" isLoading={isPending} disabled={isPending}>
          Suscribirse
        </Button>
      </div>
      {state?.success === false && <p className="text-red-400 text-xs">{state.message}</p>}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border relative overflow-hidden">
      {/* Watermark decoration */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/watermark.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center mb-4 text-text-primary hover:text-accent transition-colors"
            >
              <Image
                src="/images/logo-full.svg"
                alt="Nexos Ingeniería"
                className="h-14 w-auto"
                width={200}
                height={56}
              />
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm">{empresaData.descripcionCorta}</p>
            <div className="space-y-2 text-sm text-text-secondary mb-6">
              <p className="font-[family-name:var(--font-geist-mono)]">
                📍 {contactoData.direccion}
              </p>
              <p className="font-[family-name:var(--font-geist-mono)]">
                📞 {contactoData.telefono}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-text-primary font-medium text-sm">Newsletter</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Soluciones</h4>
            <ul className="space-y-2">
              {footerLinks.soluciones.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Industrias</h4>
            <ul className="space-y-2">
              {footerLinks.industrias.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Nexos Ingeniería SAS. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
