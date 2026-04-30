'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretRight } from '@phosphor-icons/react';

const routeLabels: Record<string, string> = {
  'soluciones': 'Soluciones',
  'cableado-estructurado': 'Cableado Estructurado',
  'seguridad-electronica': 'Seguridad Electrónica',
  'audio-video': 'Audio y Video',
  'industrias': 'Industrias',
  'proyectos': 'Proyectos',
  'blog': 'Blog',
  'contacto': 'Contacto',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;
  
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;

  // Build Schema.org BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://nexosingenieria.com',
      },
      ...segments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: routeLabels[segment] || segment,
        item: `https://nexosingenieria.com/${segments.slice(0, index + 1).join('/')}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              Inicio
            </Link>
          </li>
          
          {segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;
            const label = routeLabels[segment] || segment;
            
            return (
              <li key={segment} className="flex items-center gap-2">
                <CaretRight weight="thin" size={16} className="text-text-muted" />
                
                {isLast ? (
                  <span className="text-text-secondary">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
