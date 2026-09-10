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
        'hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5',
        className
      )}
    >
      <div
        className="relative h-48 @sm:h-56 @md:h-64 @lg:h-72 bg-bg-secondary overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:duration-0"
          width={640}
          height={360}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
      </div>

      <div className="p-4 @sm:p-5 @md:p-6">
        <h3 className="text-base @sm:text-lg @md:text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {location && (
          <div className="flex items-center gap-2 text-text-muted text-xs font-medium pt-2 border-t border-border/50">
            <MapPin weight="light" size={16} className="shrink-0 text-accent" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
