'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, X, Plugs, ShieldCheck, VideoCamera, CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

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
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      if (prev) {
        setIsMobileSolutionsOpen(false);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
        setIsHidden(true);
        setIsMegaMenuOpen(false);
      } else {
        setIsHidden(false);
      }

      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        closeMobileMenu();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setIsMegaMenuOpen(false)}
        className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b', {
          'bg-bg-primary border-border shadow-2xl': isMobileMenuOpen,
          'bg-bg-primary/95 backdrop-blur-md border-border/50':
            (isScrolled || isMegaMenuOpen) && !isMobileMenuOpen,
          'bg-transparent border-transparent': !isScrolled && !isMegaMenuOpen && !isMobileMenuOpen,
          '-translate-y-full': isHidden && !isMobileMenuOpen,
          'translate-y-0': !isHidden || isMobileMenuOpen,
        })}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => {
                setIsMegaMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center text-text-primary hover:text-accent transition-colors"
            >
              <Image
                src="/images/logo-full.svg"
                alt="Nexos Ingeniería"
                className="h-11 md:h-14 w-auto"
                width={200}
                height={56}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {navLinks.map(link => (
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
                        className={cn('transition-transform duration-200', {
                          'rotate-180': isMegaMenuOpen,
                        })}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      prefetch={true}
                      onMouseEnter={() => setIsMegaMenuOpen(false)}
                      onClick={() => {
                        if (isMegaMenuOpen) setIsMegaMenuOpen(false);
                      }}
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
                onClick={() => setIsMegaMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-9 px-4 text-sm"
              >
                Cotizar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X weight="bold" size={24} /> : <List weight="bold" size={24} />}
            </button>
          </div>

          {/* Mega Menu */}
          <div
            className={cn(
              'hidden md:block absolute left-0 right-0 top-full bg-bg-primary/95 backdrop-blur-md border-b border-border/50',
              'transition-all duration-200 overflow-hidden',
              {
                'max-h-[32rem] opacity-100 pointer-events-auto': isMegaMenuOpen,
                'max-h-0 opacity-0 pointer-events-none': !isMegaMenuOpen,
              }
            )}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-3 gap-8">
                {/* Priority Services */}
                <div className="col-span-2 grid grid-cols-3 gap-6">
                  {megaMenuItems.prioritarios.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={true}
                      className="group p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                      onClick={() => {
                        if (isMegaMenuOpen) setIsMegaMenuOpen(false);
                      }}
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
                <div className="border-l border-border pl-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">
                      Más Servicios
                    </h4>
                    <ul className="space-y-3">
                      {megaMenuItems.secundarios.map(item => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            prefetch={true}
                            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                            onClick={() => {
                              if (isMegaMenuOpen) setIsMegaMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Link
                      href="/soluciones"
                      prefetch={true}
                      className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                      onClick={() => {
                        if (isMegaMenuOpen) setIsMegaMenuOpen(false);
                      }}
                    >
                      Ver todas las soluciones &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={cn('md:hidden overflow-y-auto transition-all duration-300 bg-bg-primary', {
              'max-h-[calc(100dvh-5rem)] opacity-100 py-4 pb-6 pointer-events-auto border-t border-border/50':
                isMobileMenuOpen,
              'max-h-0 opacity-0 pointer-events-none invisible border-t-0': !isMobileMenuOpen,
            })}
          >
            <nav className="space-y-2 pt-2">
              {navLinks.map(link => {
                if (link.hasMegaMenu) {
                  return (
                    <div key={link.href} className="space-y-1">
                      <div className="flex items-center justify-between px-3 py-1">
                        <Link
                          href={link.href}
                          className="text-text-secondary hover:text-text-primary font-medium transition-colors flex-1 py-1.5"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                          className="p-2 text-text-muted hover:text-accent rounded-lg"
                          aria-label="Ver sub-servicios"
                          aria-expanded={isMobileSolutionsOpen}
                        >
                          <CaretDown
                            weight="bold"
                            size={18}
                            className={cn('transition-transform duration-200', {
                              'rotate-180': isMobileSolutionsOpen,
                            })}
                          />
                        </button>
                      </div>

                      {isMobileSolutionsOpen && (
                        <div className="pl-4 ml-3 space-y-1 border-l-2 border-accent/40 text-sm">
                          {megaMenuItems.prioritarios.map(item => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-accent hover:text-accent/80 font-medium py-2 px-2 rounded-md hover:bg-accent/10 transition-colors"
                              onClick={closeMobileMenu}
                            >
                              {item.title}
                            </Link>
                          ))}
                          {megaMenuItems.secundarios.map(item => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-text-secondary hover:text-text-primary py-2 px-2 rounded-md hover:bg-bg-secondary/60 transition-colors"
                              onClick={closeMobileMenu}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className="block text-text-secondary hover:text-text-primary hover:bg-bg-secondary/60 rounded-lg px-3 py-2.5 font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/cotizar"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center w-full gap-2 rounded-lg font-semibold transition-all duration-200 bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80 h-11 px-6 text-base mt-4 shadow-lg shadow-accent/20"
              >
                Cotizar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[45] md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
