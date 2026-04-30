import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Icon } from '@/components/ui/Icon';

interface Partner {
  name: string;
  category: string;
}

const partners: Partner[] = [
  { name: 'Panduit', category: 'Cableado Estructurado' },
  { name: 'CommScope', category: 'Cableado Estructurado' },
  { name: 'Leviton', category: 'Cableado Estructurado' },
  { name: 'Hikvision', category: 'Seguridad Electrónica' },
  { name: 'Dahua', category: 'Seguridad Electrónica' },
  { name: 'Axis Communications', category: 'Seguridad Electrónica' },
  { name: 'Bosch', category: 'Seguridad Electrónica' },
  { name: 'Crestron', category: 'Audio y Video' },
  { name: 'Extron', category: 'Audio y Video' },
  { name: 'Shure', category: 'Audio y Video' },
  { name: 'Philips Dynalite', category: 'Eficiencia Energética' },
  { name: 'Lutron', category: 'Eficiencia Energética' },
];

interface PartnersSectionProps {
  serviceFilter?: string;
}

export function PartnersSection({ serviceFilter }: PartnersSectionProps) {
  const filteredPartners = serviceFilter
    ? partners.filter((p) =>
        p.category.toLowerCase().includes(serviceFilter.toLowerCase())
      )
    : partners;

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Aliados Estratégicos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-[family-name:var(--font-geist-sans)]">
              Partners y Fabricantes
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Trabajamos con las mejores marcas del mundo para garantizar
              calidad y confiabilidad en cada proyecto.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPartners.map((partner, index) => (
            <AnimatedElement
              key={partner.name}
              animation="slide-up"
              delay={index * 50}
            >
              <div className="bg-bg-card border border-border rounded-xl p-6 text-center hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="building-office" color="accent" size="md" />
                </div>
                <p className="text-text-primary font-medium text-sm">{partner.name}</p>
                <p className="text-text-muted text-xs mt-1">{partner.category}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
