'use client';

import { cn } from '@/lib/utils';

const clients = [
  'Cliente 1',
  'Cliente 2', 
  'Cliente 3',
  'Cliente 4',
  'Cliente 5',
  'Cliente 6',
  'Cliente 7',
  'Cliente 8',
];

export function ClientLogos() {
  return (
    <section className="py-12 md:py-16 bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted text-sm uppercase tracking-wider mb-8">
          Empresas que confían en nosotros
        </p>
        
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-secondary to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-secondary to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex animate-scroll-x">
            {/* First set */}
            {clients.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <div className="w-32 h-12 bg-bg-card border border-border rounded-lg flex items-center justify-center text-text-muted text-sm font-medium hover:border-accent/30 transition-colors">
                  {client}
                </div>
              </div>
            ))}
            
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <div className="w-32 h-12 bg-bg-card border border-border rounded-lg flex items-center justify-center text-text-muted text-sm font-medium hover:border-accent/30 transition-colors">
                  {client}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
