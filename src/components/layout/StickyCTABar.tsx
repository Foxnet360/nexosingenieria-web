'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-md border-t border-border',
        'transform transition-transform duration-300 md:hidden',
        {
          'translate-y-0': isVisible,
          'translate-y-full': !isVisible,
        }
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-text-primary text-sm font-medium">¿Necesitas una solución?</p>
          <p className="text-text-muted text-xs">Consultoría gratuita</p>
        </div>

        <Link
          href="/cotizar"
          className="flex-shrink-0 px-4 py-2 bg-accent text-bg-primary rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Cotizar
        </Link>
      </div>
    </div>
  );
}
