import { ReactNode } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';

interface BlogLayoutProps {
  children: ReactNode;
}

const recentPosts = [
  {
    slug: 'guia-cableado-estructurado-empresas-colombianas',
    title: 'Guía Completa de Cableado Estructurado',
    date: '2024-01-15',
  },
  {
    slug: '5-tendencias-seguridad-electronica-2026',
    title: '5 Tendencias de Seguridad Electrónica',
    date: '2024-01-10',
  },
  {
    slug: 'reducir-consumo-energetico-edificios',
    title: 'Reducir Consumo Energético un 30%',
    date: '2024-01-05',
  },
];

const categories = [
  { name: 'Cableado Estructurado', count: 2 },
  { name: 'Seguridad Electrónica', count: 1 },
  { name: 'Eficiencia Energética', count: 1 },
  { name: 'Audio y Video', count: 1 },
  { name: 'Domótica', count: 0 },
];

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {children}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Search */}
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Buscar
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Icon name="magnifying-glass" color="secondary" size="sm" />
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Artículos Recientes
            </h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <p className="text-text-primary group-hover:text-accent transition-colors font-medium text-sm">
                    {post.title}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {new Date(post.date).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Categorías
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog?categoria=${encodeURIComponent(category.name)}`}
                  className="flex items-center justify-between group py-2"
                >
                  <span className="text-text-secondary group-hover:text-accent transition-colors text-sm">
                    {category.name}
                  </span>
                  <span className="text-text-muted text-xs bg-bg-primary px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-accent/20 to-accent-warm/20 border border-accent/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              ¿Necesitas asesoría?
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Nuestros expertos están listos para ayudarte con tu proyecto.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-accent text-bg-primary rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
            >
              Contactar
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
