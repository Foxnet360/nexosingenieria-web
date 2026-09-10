import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'secondary' | 'gradient' | 'accent' | 'elevated';
  container?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, padding = 'lg', background = 'default', container = true, children, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative border-b border-border/60 transition-colors',
          {
            'py-0': padding === 'none',
            'py-8 md:py-12': padding === 'sm',
            'py-12 md:py-20': padding === 'md',
            'py-16 md:py-24': padding === 'lg',
            'py-20 md:py-32': padding === 'xl',
            'bg-bg-primary text-text-primary': background === 'default',
            'bg-bg-secondary text-text-primary border-t border-border/80':
              background === 'secondary',
            'bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary text-text-primary':
              background === 'gradient',
            'bg-accent/10 border-accent/20 text-text-primary': background === 'accent',
            'bg-bg-card text-text-primary shadow-sm': background === 'elevated',
          },
          className
        )}
        {...props}
      >
        {container ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
