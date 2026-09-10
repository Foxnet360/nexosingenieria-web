'use client';

import { useState } from 'react';
import { alliedBrands } from '@/data/alliedBrands';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

interface AlliedBrandsSectionProps {
  solutionFilter?: string;
  title?: string;
  subtitle?: string;
  showTabs?: boolean;
}

export function AlliedBrandsSection({
  solutionFilter,
  title = 'Nuestros Aliados Tecnológicos & Marcas Certificadas',
  subtitle = 'Trabajamos con los fabricantes globales líderes en redes, seguridad electrónica, automatización y BMS para garantizar soporte directo y certificación oficial.',
  showTabs = true,
}: AlliedBrandsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Filter brands by solution slug if provided
  const filteredBySolution = solutionFilter
    ? alliedBrands.filter(brand => brand.solutions.includes(solutionFilter))
    : alliedBrands;

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'Redes y Comunicaciones', name: 'Redes & Conectividad' },
    { id: 'Seguridad Electrónica', name: 'Seguridad & CCTV' },
    { id: 'Cableado Estructurado', name: 'Cableado Estructurado' },
    { id: 'Energía & Automatización (BMS)', name: 'BMS & Energía' },
    { id: 'Automatización y Domótica', name: 'Domótica & AV' },
  ];

  const displayedBrands =
    selectedCategory === 'todos'
      ? filteredBySolution
      : filteredBySolution.filter(brand =>
          brand.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <section className="py-12 md:py-16 bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <AnimatedElement animation="fade-in">
            <p className="text-accent font-medium mb-2 tracking-wide uppercase text-xs">
              Alianzas & Marcas de Fabrica
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 font-[family-name:var(--font-geist-sans)]">
              {title}
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={150}>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">{subtitle}</p>
          </AnimatedElement>
        </div>

        {/* Compact Category Pill Bar */}
        {showTabs && !solutionFilter && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-accent text-bg-primary font-semibold shadow-sm shadow-accent/20'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border hover:border-accent/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Compact 6-Column Grid of Sleek Brand Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedBrands.map((brand, index) => (
            <AnimatedElement key={brand.id} animation="slide-up" delay={(index % 6) * 40}>
              <div
                className="group relative bg-white/95 dark:bg-bg-card/90 border border-border rounded-xl p-3.5 h-24 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:shadow-md transition-all duration-300"
                title={`${brand.name} - ${brand.category}: ${brand.description}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-8 max-w-[110px] w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300 mb-1.5"
                  loading="lazy"
                />
                <span className="text-[11px] font-semibold text-text-primary group-hover:text-accent transition-colors truncate max-w-full">
                  {brand.name}
                </span>
                <span className="text-[9px] text-text-muted truncate max-w-full">
                  {brand.category}
                </span>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
