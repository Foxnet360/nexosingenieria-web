import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Spinner } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-bg-primary hover:bg-accent/90 active:bg-accent/80',
        secondary:
          'bg-bg-card border border-border text-text-primary hover:bg-bg-secondary hover:border-accent/50',
        ghost:
          'text-text-secondary hover:text-text-primary hover:bg-bg-secondary',
        icon: 'p-2 text-text-secondary hover:text-accent hover:bg-bg-secondary rounded-full',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-9 w-9',
      },
    },
    compoundVariants: [
      {
        variant: 'icon',
        size: ['sm', 'md', 'lg'],
        className: 'h-auto w-auto p-2',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        disabled={disabled || isLoading}
        data-loading={isLoading || undefined}
        {...props}
      >
        {isLoading && (
          <Spinner
            weight="bold"
            size={16}
            className="animate-spin shrink-0"
            aria-hidden="true"
          />
        )}
        <span className={cn(isLoading && 'opacity-70')}>{children}</span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';
