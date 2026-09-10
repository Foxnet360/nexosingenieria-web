'use client';

import Link from 'next/link';
import { WhatsappLogo } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = '+573155089404',
  message = 'Hola, me gustaría solicitar una consultoría técnica o información sobre sus servicios.',
  className,
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-20 md:bottom-6 right-6 z-50',
        'w-14 h-14 bg-green-500 rounded-full',
        'flex items-center justify-center',
        'shadow-lg shadow-green-500/30',
        'hover:scale-110 hover:shadow-xl hover:shadow-green-500/40',
        'transition-all duration-300',
        className
      )}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsappLogo weight="fill" size={28} className="text-white" />
    </Link>
  );
}
