'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const animationStyles: Record<AnimationType, string> = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
};

export const AnimatedElement = React.memo(
  React.forwardRef<HTMLDivElement, AnimatedElementProps>(
    (
      {
        className,
        animation = 'fade-in',
        delay = 0,
        duration = 500,
        threshold = 0.1,
        once = true,
        children,
        ...props
      },
      ref
    ) => {
      const [isVisible, setIsVisible] = useState(false);
      const internalRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const element = internalRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once) {
                observer.unobserve(element);
              }
            } else if (!once) {
              setIsVisible(false);
            }
          },
          { threshold }
        );

        observer.observe(element);

        return () => {
          observer.disconnect();
        };
      }, [threshold, once]);

      return (
        <div
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            'opacity-0',
            isVisible && 'animate-fill-forwards',
            isVisible && animationStyles[animation],
            className
          )}
          style={{
            animationDelay: isVisible ? `${delay}ms` : undefined,
            animationDuration: `${duration}ms`,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

AnimatedElement.displayName = 'AnimatedElement';

interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  children: React.ReactNode;
}

export const StaggerContainer = React.memo(
  React.forwardRef<HTMLDivElement, StaggerContainerProps>(
    ({ className, staggerDelay = 100, children, ...props }, ref) => {
      return (
        <div ref={ref} className={cn('', className)} {...props}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              const element = child as React.ReactElement<{ style?: React.CSSProperties } & Record<string, unknown>>;
              const existingStyle = element.props.style || {};
              return React.cloneElement(element, {
                ...element.props,
                style: {
                  ...existingStyle,
                  animationDelay: `${index * staggerDelay}ms`,
                },
              });
            }
            return child;
          })}
        </div>
      );
    }
  )
);

StaggerContainer.displayName = 'StaggerContainer';
