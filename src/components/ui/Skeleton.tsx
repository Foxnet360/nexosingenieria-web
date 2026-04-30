import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ 
  className, 
  variant = 'text',
  ...props 
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-bg-secondary',
        {
          'rounded': variant === 'text',
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rectangular',
        },
        className
      )}
      {...props}
    />
  );
}
