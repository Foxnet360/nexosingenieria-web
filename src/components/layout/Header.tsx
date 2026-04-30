'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, X, Plugs, ShieldCheck, VideoCamera, CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Soluciones', href: '/soluciones', hasMegaMenu: true },
  { label: 'Industrias', href: '/industrias' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

const megaMenuItems = {
  prioritarios: [
    {
      title: 'Cableado Estructurado',
      description: 'Infraestructura de red certificada',
      href: '/soluciones/cableado-estructurado',
      icon: <Plugs weight="light" size={24} />,
    },
    {
      title: 'Seguridad + Eficiencia',
      description: 'Protección y optimización energética',
      href: '/soluciones/seguridad-electronica',
      icon: <ShieldCheck weight="light" size={24} />,
    },
    {
      title: 'Audio y Video',
      description: 'Experiencias AV profesionales',
      href: '/soluciones/audio-video',
      icon: <VideoCamera weight="light" size={24} />,
    },
  ],
  secundarios: [
    { label: 'Domótica', href: '/soluciones/domotica' },
    { label: 'Control de Acceso', href: '/soluciones/control-acceso' },
    { label: 'Centros de Datos', href: '/soluciones/centros-de-datos' },
    { label: 'Mantenimiento', href: '/soluciones/mantenimiento' },
  ],
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
        setIsMegaMenuOpen(false);
      } else {
        setIsHidden(false);
      }
      
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'border-b border-transparent',
        {
          'bg-bg-primary/95 backdrop-blur-md border-border/50': isScrolled || isMegaMenuOpen,
          'bg-transparent': !isScrolled && !isMegaMenuOpen,
          '-translate-y-full': isHidden,
          'translate-y-0': !isHidden,
        }
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center text-text-primary hover:text-accent transition-colors">
            <img
              src="/images/logo-full.svg"
              alt="Nexos Ingeniería"
              className="h-11 md:h-14 w-auto"
              width={200}
              height={56}
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasMegaMenu ? (
                  <button
                    className={cn(
                      'text-sm font-medium transition-colors duration-200 flex items-center gap-1',
                      'text-text-secondary hover:text-text-primary'
                    )}
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    aria-expanded={isMegaMenuOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <CaretDown
                      weight="regular"
                      size={16}
                      className={cn(
                        'transition-transform duration-200',
                        { 'rotate-180': isMegaMenuOpen }
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-9 px-4 text-sm"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X weight="bold" size={24} />
            ) : (
              <List weight="bold" size={24} />
            )}
          </button>
        </div>

        {/* Mega Menu */}
        <div
          className={cn(
            'hidden md:block absolute left-0 right-0 top-full bg-bg-primary/95 backdrop-blur-md border-b border-border/50',
            'transition-all duration-200 overflow-hidden',
            {
              'max-h-96 opacity-100': isMegaMenuOpen,
              'max-h-0 opacity-0': !isMegaMenuOpen,
            }
          )}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Priority Services */}
              <div className="col-span-2 grid grid-cols-3 gap-6">
                {megaMenuItems.prioritarios.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className="group p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                    onClick={() => setIsMegaMenuOpen(false)}
                  >
                    <div className="text-accent mb-3 icon-glow-subtle">{item.icon}</div>
                    <h3 className="text-text-primary font-semibold mb-1 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </Link>
                ))}
              </div>

              {/* Secondary Services */}
              <div className="border-l border-border pl-8">
                <h4 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">
                  Más Servicios
                </h4>
                <ul className="space-y-3">
                  {megaMenuItems.secundarios.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={true}
                        className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            {
              'max-h-96 opacity-100': isMobileMenuOpen,
              'max-h-0 opacity-0': !isMobileMenuOpen,
            }
          )}
        >
          <nav className="py-4 space-y-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className="block text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotizar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center w-full gap-2 rounded-lg font-medium transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-11 px-6 text-base mt-4"
            >
              Cotizar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
