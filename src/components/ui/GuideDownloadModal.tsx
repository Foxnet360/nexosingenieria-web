'use client';

import { useState } from 'react';
import { X, Check, Download } from '@phosphor-icons/react';
import { Button } from './Button';

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideTitle: string;
  guideDescription: string;
}

export function GuideDownloadModal({
  isOpen,
  onClose,
  guideTitle,
  guideDescription,
}: GuideDownloadModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X weight="bold" size={24} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check weight="bold" size={32} className="text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">¡Guía Enviada!</h3>
            <p className="text-text-secondary">
              Revisa tu correo electrónico. Te hemos enviado la guía técnica.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download weight="light" size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{guideTitle}</h3>
              <p className="text-text-secondary text-sm">{guideDescription}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="guide-name" className="block text-sm font-medium text-text-primary mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="guide-name"
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="guide-email" className="block text-sm font-medium text-text-primary mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="guide-email"
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="guide-company" className="block text-sm font-medium text-text-primary mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="guide-company"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <Button type="submit" className="w-full">
                Descargar Guía
              </Button>

              <p className="text-text-muted text-xs text-center">
                Al descargar, aceptas recibir comunicaciones de Nexos Ingeniería.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
