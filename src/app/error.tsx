'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Warning } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
          <Warning weight="bold" size={32} className="text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-text-primary">Algo salió mal</h2>

        <p className="text-text-secondary">
          Lo sentimos, ha ocurrido un error inesperado. Puedes intentar recargar la página.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <pre className="text-left text-xs bg-surface p-4 rounded-lg overflow-auto text-red-400">
            {error.message}
            {'\n'}
            {error.stack}
          </pre>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={unstable_retry} variant="primary">
            Intentar de nuevo
          </Button>

          <Button asChild variant="ghost">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
