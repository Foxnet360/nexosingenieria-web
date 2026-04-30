## Context

Nexos Ingeniería es un sitio Next.js 16 con App Router que actualmente usa 130+ SVGs inline manualmente. No hay sistema de iconos ni librería de fuentes moderna. La estética es "Oscuridad Tecnológica" (fondo #0a0e1a, acento #00d4ff).

El cambio introduce Phosphor Icons (7000+ iconos, 6 pesos incluyendo Duotone) y Geist font family (Vercel) para modernizar el sistema visual sin romper la identidad existente.

## Goals / Non-Goals

**Goals:**
- Reemplazar todos los SVGs inline con componentes Phosphor mantenibles
- Establecer sistema de pesos de iconos por contexto (thin/light para nav, duotone para features, bold para CTAs)
- Migrar de Space Grotesk a Geist Sans para headlines + Geist Mono para datos técnicos
- Mantener Inter para body text
- Agregar efectos visuales (glow, gradientes, micro-animaciones) que encajen con la paleta oscura
- Reducir bundle size mediante tree-shaking de iconos

**Non-Goals:**
- No crear iconos SVG custom desde cero
- No cambiar la paleta de colores existente
- No modificar layouts de página (solo tipografía e iconos)
- No agregar emojis al sitio (mantener estética B2B corporativa)

## Decisions

### 1. Phosphor Icons sobre Lucide/Tabler/Heroicons

**Elegido:** Phosphor Icons React (`@phosphor-icons/react`)

**Rationale:**
- **Duotone weight** es único de Phosphor y perfecto para fondos oscuros — permite iconos que "brillan" sin ser estridentes
- 7000+ iconos cubren necesidades específicas de industria (circuitos, servidores, CCTV, edificios inteligentes)
- Estilo moderno redondeado que transmite precisión técnica sin ser frío
- Next.js optimiza automáticamente `lucide-react` y librerías similares vía `optimizePackageImports`

**Alternativas consideradas:**
- **Lucide:** Más maduro, pero carece de Duotone. Estilo más clásico.
- **Tabler:** Más iconos específicos, pero estilo outline puede perderse en fondos oscuros.
- **Heroicons:** Integración Tailwind nativa, pero solo 300 iconos y sin variaciones de peso suficientes.

### 2. Geist sobre Space Grotesk + System Fonts

**Elegido:** Geist Sans (headlines) + Geist Mono (técnicos) + Inter (body)

**Rationale:**
- Geist es variable font = un solo archivo para todos los pesos (mejor performance)
- Diseñada por Vercel para código y sistemas — resuena con "ingeniería"
- Next.js soporte nativo via `next/font`
- Geist Mono tiene ligaduras opcionales para código/datos técnicos

**Alternativas consideradas:**
- **Mantener Space Grotesk:** Funciona pero se ve "2020", no "2026"
- **Plus Jakarta Sans:** Más personalidad pero menos "técnica"
- **Inter para todo:** Pierde carácter en headlines

### 3. Componente Icon wrapper vs. Import directo

**Elegido:** Componente `Icon` wrapper + import directo para casos especiales

**Rationale:**
- Wrapper permite aplicar efectos globales (glow, tamaños, colores de marca) consistentemente
- Pero Phosphor React ya tiene tree-shaking, así que import directo es viable para casos edge
- Wrapper será un thin wrapper, no re-implementación

**Implementación:**
```tsx
// Wrapper para consistencia de marca
import { Icon } from '@/components/ui/Icon'
<Icon name="Shield" weight="duotone" color="accent" size="lg" />

// Import directo para casos especiales (tree-shaking funciona igual)
import { Shield } from '@phosphor-icons/react'
<Shield weight="duotone" className="text-accent" />
```

### 4. Estrategia de migración progresiva vs. Big Bang

**Elegido:** Fases progresivas

**Rationale:**
- 130+ SVGs es mucho riesgo para cambiar de golpe
- Permite validar visualmente cada sección
- Reduce chance de regressions

**Fases:**
1. **Fase 1 (Alto impacto):** Hero icons, CTAs, Feature cards
2. **Fase 2 (Media):** Navegación, Footer, Formularios
3. **Fase 3 (Baja):** Blog, Páginas legales, Componentes misceláneos

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| **Bundle size aumenta** al agregar librería de iconos | Phosphor usa tree-shaking; solo se incluyen iconos importados. Analizar con `next bundle-analyzer` |
| **FOUT/FOIT con nueva fuente** | Usar `next/font` con `display: swap` y preload. Geist variable carga en un solo request |
| **Iconos Phosphor no cubren casos edge** | Mantener capacidad de usar SVG inline para casos muy específicos (documentar como excepción) |
| **Diseñadores/content editors no familiarizados** | Crear guía visual con tabla de "qué peso usar dónde" |
| **Cambio visual muy drástico para usuarios recurrentes** | Migración progresiva por fases, no todo de golpe |
| **Accesibilidad: iconos decorativos sin aria-label** | Componente Icon añade `aria-hidden="true"` por defecto; requiere `aria-label` explícito para iconos informativos |

## Migration Plan

### Paso 1: Instalación (0 downtime)
```bash
npm install @phosphor-icons/react geist
```

### Paso 2: Configurar fuentes (0 downtime)
- Actualizar `layout.tsx`: Reemplazar Space Grotesk por Geist Sans
- Actualizar `globals.css`: Variables CSS para `--font-display` y `--font-mono`
- Configurar Geist Mono para elementos técnicos

### Paso 3: Crear componente Icon (0 downtime)
- Crear `src/components/ui/Icon.tsx`
- Implementar wrapper con props: `name`, `weight`, `color`, `size`, `glow`
- Documentar uso en Storybook o archivo MD

### Paso 4: Migración por fases (0 downtime)
- **Semana 1:** Hero + Features (impacto visual máximo)
- **Semana 2:** Navegación + Footer
- **Semana 3:** Formularios + Páginas de servicio
- **Semana 4:** Blog + Misceláneos + Cleanup de SVGs no usados

### Paso 5: Validación
- Lighthouse audit (LCP, CLS)
- Bundle analysis (comparar antes/después)
- Visual regression testing en rutas principales

### Rollback
- Cada fase es independiente — se puede revertir individualmente
- Git tags por fase para rollback rápido
- Mantener SVGs originales hasta Fase 4 completada

## Open Questions

1. **¿Qué hacer con los iconos de redes sociales?** Phosphor tiene iconos de marca pero no cubre todos. ¿Usar SVGs custom para redes o importar de otra librería?
2. **¿Animaciones de entrada para iconos?** ¿Agregar stagger animation cuando aparecen en viewport? (Podría ser scope de otro change)
3. **¿Dark mode toggle?** Actualmente solo hay dark mode. ¿Esta migración debería preparar el terreno para light mode futuro?
4. **¿Iconos en el favicon/apple-touch-icon?** ¿Generar dinámicamente con `ImageResponse` de Next.js usando Phosphor?
