const clientLogos = [
  { name: 'EDEQ S.A. E.S.P.', logo: '/images/logos_clientes/logo_EDEQ.png' },
  { name: 'UNAD Colombia', logo: '/images/logos_clientes/Logo_UNAD.svg' },
  { name: 'Rama Judicial de Colombia', logo: '/images/logos_clientes/logo_Rama_Judicial.svg' },
  { name: 'Contraloría de Bogotá', logo: '/images/logos_clientes/logo_Contraloria.svg' },
  { name: 'Inversiones Barake García IBG', logo: '/images/logos_clientes/logo_IBG.svg' },
  { name: 'Seniors Club Pance', logo: '/images/logos_clientes/logo_Seniors_Club.svg' },
  { name: 'Uniminuto', logo: '/images/logos_clientes/logo_Uniminuto.png' },
  { name: 'PH Centro Empresarial Ícono', logo: '/images/logos_clientes/logo_Icono.svg' },
  { name: 'Constructora Uraki', logo: '/images/logos_clientes/logo_Uraki.svg' },
  { name: 'SIL S.A.S. Soporte a la Ingeniería', logo: '/images/logos_clientes/logo_SIL.svg' },
  { name: 'Brenntag Colombia', logo: '/images/logos_clientes/Logo_Brenntag.svg' },
  { name: 'Arquitectura & Civil', logo: '/images/logos_clientes/Logo_Arquitectura_Civil.svg' },
];

export function ClientLogos() {
  return (
    <section className="py-12 md:py-16 bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted text-sm uppercase tracking-wider mb-8 font-medium">
          Empresas e Instituciones que Confían en Nexos Ingeniería
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient masks for smooth fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-secondary via-bg-secondary/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-secondary via-bg-secondary/80 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="flex animate-scroll-x items-center py-2">
            {/* First set */}
            {clientLogos.map((client, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-6 md:mx-8">
                <div className="h-16 px-6 bg-white/90 dark:bg-bg-card/90 backdrop-blur-md border border-border rounded-xl flex items-center justify-center hover:border-accent/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 max-w-[140px] w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for infinite smooth carousel loop */}
            {clientLogos.map((client, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-6 md:mx-8">
                <div className="h-16 px-6 bg-white/90 dark:bg-bg-card/90 backdrop-blur-md border border-border rounded-xl flex items-center justify-center hover:border-accent/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 max-w-[140px] w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
