'use client';

import React from 'react';
import {
  Shield,
  Lightning,
  House,
  Plugs,
  Circuitry,
  SpeakerHifi,
  WifiHigh,
  Camera,
  LockKey,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  CaretDown,
  CaretUp,
  List,
  Phone,
  EnvelopeSimple,
  MapPin,
  Spinner,
  Pulse,
  Article,
  LinkedinLogo,
  XLogo,
  FacebookLogo,
  WhatsappLogo,
  BuildingOffice,
  ShoppingBag,
  Heart,
  GraduationCap,
  Flask,
  Sparkle,
  CheckCircle,
  Quotes,
  MagnifyingGlass,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export type IconName =
  | 'shield'
  | 'lightning'
  | 'house'
  | 'plugs'
  | 'circuit'
  | 'speaker-hifi'
  | 'wifi-high'
  | 'camera'
  | 'lock-key'
  | 'check'
  | 'x'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'menu'
  | 'phone'
  | 'envelope'
  | 'map-pin'
  | 'spinner'
  | 'pulse'
  | 'article'
  | 'linkedin-logo'
  | 'x-logo'
  | 'facebook-logo'
  | 'whatsapp-logo'
  | 'building-office'
  | 'shopping-bag'
  | 'heart'
  | 'graduation-cap'
  | 'flask'
  | 'sparkle'
  | 'check-circle'
  | 'quotes'
  | 'magnifying-glass';

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconColor = 'accent' | 'accent-warm' | 'primary' | 'secondary' | 'success' | 'error';
export type GlowIntensity = 'subtle' | 'medium' | 'strong';

const iconRegistry: Record<IconName, PhosphorIcon> = {
  shield: Shield,
  lightning: Lightning,
  house: House,
  plugs: Plugs,
  circuit: Circuitry,
  'speaker-hifi': SpeakerHifi,
  'wifi-high': WifiHigh,
  camera: Camera,
  'lock-key': LockKey,
  check: Check,
  x: X,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'chevron-down': CaretDown,
  'chevron-up': CaretUp,
  menu: List,
  phone: Phone,
  envelope: EnvelopeSimple,
  'map-pin': MapPin,
  spinner: Spinner,
  pulse: Pulse,
  article: Article,
  'linkedin-logo': LinkedinLogo,
  'x-logo': XLogo,
  'facebook-logo': FacebookLogo,
  'whatsapp-logo': WhatsappLogo,
  'building-office': BuildingOffice,
  'shopping-bag': ShoppingBag,
  heart: Heart,
  'graduation-cap': GraduationCap,
  flask: Flask,
  sparkle: Sparkle,
  'check-circle': CheckCircle,
  quotes: Quotes,
  'magnifying-glass': MagnifyingGlass,
};

const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
};

const colorMap: Record<IconColor, string> = {
  accent: 'text-accent',
  'accent-warm': 'text-accent-warm',
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  success: 'text-success',
  error: 'text-error',
};

const glowMap: Record<GlowIntensity, string> = {
  subtle: 'drop-shadow-[0_0_4px_rgba(0,212,255,0.2)]',
  medium: 'drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]',
  strong: 'drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]',
};

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  weight?: IconWeight;
  color?: IconColor | string;
  size?: IconSize | number;
  glow?: GlowIntensity;
  gradient?: 'accent-to-warm';
  'aria-label'?: string;
}

export const Icon = React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(
    (
      {
        name,
        weight = 'regular',
        color = 'primary',
        size = 'md',
        glow,
        gradient,
        'aria-label': ariaLabel,
        className,
        ...props
      },
      ref
    ) => {
      const PhosphorIconComponent = iconRegistry[name];

      if (!PhosphorIconComponent) {
        console.warn(`Icon "${name}" not found in registry`);
        return null;
      }

      const iconSize = typeof size === 'number' ? size : sizeMap[size];
      const colorClass = colorMap[color as IconColor] || '';
      const customColor = !colorMap[color as IconColor] ? color : undefined;
      const glowClass = glow ? glowMap[glow] : '';

      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center',
            glowClass,
            className
          )}
          aria-hidden={!ariaLabel}
          aria-label={ariaLabel}
          {...props}
        >
          {gradient === 'accent-to-warm' ? (
            <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text">
              <PhosphorIconComponent
                weight={weight}
                size={iconSize}
                className={cn(colorClass, 'text-transparent')}
                color={customColor}
              />
            </span>
          ) : (
            <PhosphorIconComponent
              weight={weight}
              size={iconSize}
              className={cn(colorClass)}
              color={customColor}
            />
          )}
        </span>
      );
    }
  )
);

Icon.displayName = 'Icon';
