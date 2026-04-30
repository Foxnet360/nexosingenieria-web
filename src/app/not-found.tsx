import Link from 'next/link';

const suggestions = [
  { label: 'Cableado Estructurado', href: '/soluciones/cableado-estructurado' },
  { label: 'Seguridad Electrónica', href: '/soluciones/seguridad-electronica' },
  { label: 'Audio y Video', href: '/soluciones/audio-video' },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-8xl md:text-9xl font-bold text-accent/20 mb-4 font-[family-name:var(--font-geist-sans)]">
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Página no encontrada
        </h1>

        <p className="text-text-secondary mb-8">
          La página que buscas no existe o ha sido movida. 
          Te sugerimos explorar estas secciones:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.href}
              href={suggestion.href}
              className="px-6 py-3 bg-bg-card border border-border rounded-lg text-text-primary hover:border-accent/50 transition-colors"
            >
              {suggestion.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg font-medium hover:bg-bg-secondary hover:border-accent/50 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
