'use client';

import { useState } from 'react';
import { Check, Copy, LinkedinLogo, XLogo, FacebookLogo, WhatsappLogo } from '@phosphor-icons/react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinLogo weight="fill" size={20} />,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XLogo weight="fill" size={20} />,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookLogo weight="fill" size={20} />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsappLogo weight="fill" size={20} />,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-text-muted text-sm">Compartir:</span>
      
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-bg-secondary border border-border rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
            aria-label={`Compartir en ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        
        <button
          onClick={handleCopyLink}
          className="w-9 h-9 bg-bg-secondary border border-border rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
          aria-label="Copiar enlace"
        >
          {copied ? (
            <Check weight="bold" size={20} className="text-success" />
          ) : (
            <Copy weight="regular" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
