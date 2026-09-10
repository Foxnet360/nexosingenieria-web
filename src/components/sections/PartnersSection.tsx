'use client';

import { alliedBrands } from '@/data/alliedBrands';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

interface PartnersSectionProps {
  serviceFilter?: string;
}

export function PartnersSection({ serviceFilter }: PartnersSectionProps) {
  // Map serviceFilter strings (e.g. 'Cableado', 'Seguridad', 'Audio', 'Eficiencia') to solution slugs
  const normalizeSlug = (filter?: string) => {
    if (!filter) return undefined;
    const lower = filter.toLowerCase();
    if (lower.includes('cableado')) return 'cableado-estructurado';
    if (lower.includes('seguridad')) return 'seguridad-electronica';
    if (lower.includes('audio') || lower.includes('video')) return 'audio-video';
    if (lower.includes('domótica') || lower.includes('domotica') || lower.includes('eficiencia'))
      return 'domotica';
    if (lower.includes('acceso')) return 'control-acceso';
    if (lower.includes('datos') || lower.includes('data')) return 'centros-de-datos';
    if (lower.includes('mantenimiento')) return 'mantenimiento';
    return undefined;
  };

  const slug = normalizeSlug(serviceFilter);

  const filteredPartners = slug
    ? alliedBrands.filter(b => b.solutions.includes(slug))
    : alliedBrands;

  const displayedList = filteredPartners.length > 0 ? filteredPartners : alliedBrands.slice(0, 8);

  return (
    <section className="py-12 md:py-16 bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in">
          <div className="text-center mb-8">
            <p className="text-accent font-medium mb-2 tracking-wide uppercase text-xs">
              Tecnología & Respaldo Oficial
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
              Partners y Fabricantes Certificados
            </h2>
            <p className="text-text-secondary mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Suministramos e integramos productos originales directamente de las marcas líderes
              mundiales con garantía directa de canal.
            </p>
          </div>
        </AnimatedElement>

        {/* Compact Grid of Allied Manufacturer Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedList.map((partner, index) => (
            <AnimatedElement key={partner.id} animation="slide-up" delay={index * 40}>
              <div className="group bg-white/95 dark:bg-bg-card/90 border border-border rounded-xl p-3.5 h-24 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:shadow-md transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 max-w-[110px] w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300 mb-1"
                  loading="lazy"
                />
                <p className="text-text-primary font-semibold text-[11px] truncate max-w-full group-hover:text-accent transition-colors">
                  {partner.name}
                </p>
                <p className="text-text-muted text-[9px] truncate max-w-full">{partner.category}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
