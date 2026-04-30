# Plan de Refactorización - Nexos Ingeniería

## Objetivos

Refactorizar el codebase usando las mejores prácticas de Next.js 16, React 19, TypeScript 5.9 y Tailwind CSS v4 basadas en la documentación oficial.

## Áreas de Mejora Identificadas

### 1. Next.js 16 + React 19 Patterns

**Server Components:**
- Convertir páginas estáticas a async Server Components
- Implementar proper data fetching patterns
- Usar Suspense boundaries para loading states

**Client Components:**
- Minimizar el uso de "use client" a solo componentes interactivos
- Separar lógica de presentación de interacción
- Usar Server Actions para formularios

**Metadata:**
- Centralizar metadata usando generateMetadata
- Implementar OpenGraph y Twitter cards dinámicas
- Usar metadata templates para consistencia

### 2. TypeScript Strict Mode

**Tipado Mejorado:**
- Activar strict mode en tsconfig.json
- Tipar correctamente props y returns
- Usar satisfies en lugar de as where possible
- Implementar branded types para IDs

**Componentes:**
- Usar React.FC con tipos explícitos
- Tipar event handlers correctamente
- Usar generics para componentes reutilizables

### 3. Tailwind CSS v4 Optimizations

**Configuración:**
- Migrar a @theme para custom properties
- Usar CSS logical properties
- Implementar container queries donde sea apropiado
- Optimizar animaciones con @property

**Componentes:**
- Usar @layer para organizar estilos
- Implementar dark mode nativo
- Usar color-mix() para transparencias

### 4. Arquitectura de Componentes

**Separación Server/Client:**
```
Server Component (página)
└── Client Component (interactividad)
    └── Server Component (datos)
```

**Patrones:**
- Compound components para complejos
- Render props para flexibilidad
- Custom hooks para lógica reutilizable

## Archivos a Refactorizar

### Alta Prioridad
1. `src/app/layout.tsx` - Metadata, Schema.org, fuentes
2. `src/app/page.tsx` - Server Component con data fetching
3. `src/app/nosotros/page.tsx` - Async component
4. `src/components/ui/AnimatedElement.tsx` - Client Component optimization
5. `src/components/ui/Button.tsx` - Polymorphic types

### Media Prioridad
6. `src/app/globals.css` - Tailwind v4 features
7. `src/components/layout/Header.tsx` - Client boundary optimization
8. `src/components/layout/Footer.tsx` - Server Component
9. `src/app/contacto/page.tsx` - Server Actions
10. Páginas de soluciones - Dynamic metadata

### Baja Prioridad
11. Componentes restantes
12. Tests y utilidades

## Cambios Específicos

### Layout.tsx
- ✅ Usar next/font (ya implementado)
- ⬜ Usar viewport export separado
- ⬜ Implementar generateMetadata dinámico
- ⬜ Mover Schema.org a componente separado
- ⬜ Optimizar scripts con strategy

### Page.tsx (Home)
- ⬜ Convertir a async Server Component
- ⬜ Implementar Suspense boundaries
- ⬜ Usar generateMetadata
- ⬜ Separar secciones en componentes

### AnimatedElement.tsx
- ⬜ Optimizar como Client Component
- ⬜ Usar CSS custom properties para delays
- ⬜ Implementar intersection observer
- ⬜ Reducir re-renders con React.memo

### Button.tsx
- ⬜ Mejorar tipos polimórficos
- ⬜ Usar VariantProps de class-variance-authority
- ⬜ Implementar loading states accesibles
- ⬜ Añadir data attributes para testing

### globals.css
- ⬜ Usar @layer para organizar
- ⬜ Migrar animaciones a @property
- ⬜ Usar logical properties
- ⬜ Implementar prefers-reduced-motion

## Testing Plan

1. Verificar build exitoso
2. Comprobar TypeScript strict mode
3. Validar Lighthouse scores
4. Probar accesibilidad
5. Verificar responsive design

## Métricas de Éxito

- Build time reducido
- Bundle size optimizado
- Lighthouse score > 90
- TypeScript strict mode: 0 errores
- Componentes correctamente separados Server/Client
