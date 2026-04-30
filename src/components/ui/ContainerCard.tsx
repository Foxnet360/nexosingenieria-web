'use client';

import { MapPin } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ContainerCardProps {
  image: string;
  alt: string;
  title: string;
  description?: string;
  location?: string;
  className?: string;
  priority?: boolean;
}

function getWebpSrc(src: string): string {
  // Replace extension with .webp
  return src.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
}

function getSrcSet(src: string): string {
  const base = src.replace(/\.(jpg|jpeg|png|gif)$/i, '');
  return `${base}-640.webp 640w, ${base}-750.webp 750w, ${base}-828.webp 828w, ${base}-1080.webp 1080w, ${base}.webp 1200w`;
}

export function ContainerCard({
  image,
  alt,
  title,
  description,
  location,
  className,
  priority = false,
}: ContainerCardProps) {
  return (
    <div
      className={cn(
        '@container group bg-bg-card border border-border rounded-xl overflow-hidden',
        'hover:border-accent/30 transition-all duration-300',
        className
      )}
    >
      <div className="relative h-48 @sm:h-56 @md:h-64 @lg:h-72 bg-bg-secondary overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={getWebpSrc(image)}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:duration-0"
          width={640}
          height={360}
          srcSet={getSrcSet(image)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>

      <div className="p-4 @sm:p-5 @md:p-6">
        <h3 className="text-base @sm:text-lg @md:text-xl font-semibold text-text-primary mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">{description}</p>
        )}

        {location && (
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <MapPin weight="light" size={16} className="shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
