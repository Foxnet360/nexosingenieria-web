import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'service' | 'testimonial' | 'case-study';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border transition-all duration-300',
          {
            'bg-bg-card border-border p-6': variant === 'default',
            'bg-bg-card border-border p-8': variant === 'service',
            'bg-bg-secondary border-border p-6': variant === 'testimonial',
            'bg-bg-card border-border overflow-hidden': variant === 'case-study',
            'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5': hover,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>{children}</div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold text-text-primary', className)} {...props}>{children}</h3>
);

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-text-secondary mt-2', className)} {...props}>{children}</p>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props}>{children}</div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 pt-4 border-t border-border', className)} {...props}>{children}</div>
);
