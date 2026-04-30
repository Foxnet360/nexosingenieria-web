import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'secondary' | 'gradient';
  container?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = 'lg', background = 'default', container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative',
          {
            'py-0': padding === 'none',
            'py-8 md:py-12': padding === 'sm',
            'py-12 md:py-20': padding === 'md',
            'py-16 md:py-24': padding === 'lg',
            'py-20 md:py-32': padding === 'xl',
            'bg-bg-primary': background === 'default',
            'bg-bg-secondary': background === 'secondary',
            'bg-gradient-to-b from-bg-primary to-bg-secondary': background === 'gradient',
          },
          className
        )}
        {...props}
      >
        {container ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
