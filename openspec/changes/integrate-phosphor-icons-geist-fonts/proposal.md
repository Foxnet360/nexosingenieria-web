## Why

El sitio actual utiliza más de 130 SVGs inline manualmente distribuidos en todo el codebase. Este enfoque es difícil de mantener, inconsistente visualmente, y carece de sistema de diseño para iconos. No hay librería de iconos moderna ni fuentes optimizadas para la estética "Smart Building Partner" que define la marca. Este cambio establece un sistema visual profesional y escalable.

## What Changes

- **Instalar Phosphor Icons React** (`@phosphor-icons/react`): Librería de 7000+ iconos con soporte para 6 pesos (Thin, Light, Regular, Bold, Fill, Duotone)
- **Instalar Geist font family** (`geist`): Fuentes variable (Sans + Mono) diseñadas por Vercel para interfaces técnicas
- **Crear sistema de iconos**: Componente `Icon` con soporte para pesos, colores, tamaños, y efectos visuales (glow, gradientes)
- **Reemplazar SVGs inline**: Migrar los 130+ SVGs manuales a componentes Phosphor con pesos apropiados por contexto
- **Actualizar carga de fuentes**: Reemplazar Space Grotesk por Geist Sans en `layout.tsx` con `next/font`
- **Agregar Geist Mono**: Para datos técnicos (teléfonos, especificaciones, código)
- **Crear efectos visuales**: Glow sutil en iconos duotone, micro-animaciones en hover
- **Documentar uso**: Guía de qué peso usar en qué contexto (navegación, features, CTAs)

## Capabilities

### New Capabilities
- `icon-system`: Integración de Phosphor Icons con sistema de pesos, colores, y efectos visuales. Reemplaza todos los SVGs inline.
- `typography-upgrade`: Migración de Space Grotesk a Geist Sans (headlines) + Geist Mono (datos técnicos). Mantiene Inter para body text.
- `visual-effects`: Efectos visuales para iconos (glow, gradientes, micro-animaciones) que encajan con la paleta oscura tecnológica.

### Modified Capabilities
- (Ninguno — este cambio es puramente aditivo y no modifica comportamiento existente)

## Impact

- **Código afectado**: Todos los componentes con SVGs inline (~130 instancias en 25+ archivos)
- **Archivos clave**: `layout.tsx` (fuentes), `globals.css` (variables), `package.json` (dependencias)
- **Bundle size**: Reducción esperada al eliminar SVGs duplicados y aprovechar tree-shaking de Phosphor
- **Performance**: Mejora en LCP al usar fuentes variables (un solo archivo para todos los pesos)
- **DX**: Desarrolladores pueden usar `<Icon name="Shield" weight="duotone" />` en vez de copiar SVGs
- **Accesibilidad**: Mejor soporte para `aria-label`, `role`, y contraste con iconos consistentes
- **Dependencias nuevas**: `@phosphor-icons/react`, `geist`
- **Breaking**: Ninguno — cambio aditivo, los SVGs existentes se reemplazan progresivamente
