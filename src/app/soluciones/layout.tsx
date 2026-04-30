import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ServiceSchema } from '@/components/schema/OrganizationSchema';

const serviceNav = [
  {
    title: 'Cableado Estructurado',
    href: '/soluciones/cableado-estructurado',
  },
  {
    title: 'Seguridad + Eficiencia',
    href: '/soluciones/seguridad-electronica',
  },
  {
    title: 'Audio y Video',
    href: '/soluciones/audio-video',
  },
];

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema name="Servicios de Integración Tecnológica" description="Soluciones integrales de cableado estructurado, seguridad electrónica, eficiencia energética y audio/video" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                Servicios
              </h3>
              <ul className="space-y-2">
                {serviceNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
