## 1. Setup and Installation

- [x] 1.1 Install `@phosphor-icons/react` package
- [x] 1.2 Install `geist` font package
- [x] 1.3 Update `next.config.js` if needed for `optimizePackageImports` (not needed in Next.js 16)
- [x] 1.4 Verify build passes after installations

## 2. Typography System (Geist Fonts)

- [x] 2.1 Update `layout.tsx`: Replace Space Grotesk import with Geist Sans via `next/font`
- [x] 2.2 Configure Geist Sans with `display: swap` and `preload: true`
- [x] 2.3 Add Geist Mono variable for technical data
- [x] 2.4 Update `globals.css`: Replace `--font-space-grotesk` with `--font-geist-sans` and add `--font-geist-mono`
- [x] 2.5 Update all `font-[family-name:var(--font-space-grotesk)]` to use new Geist variable
- [x] 2.6 Apply Geist Mono to contact info (phone, address) and technical specs
- [x] 2.7 Test font rendering across pages (no FOUT/FOIT issues)

## 3. Icon System Component

- [x] 3.1 Create `src/components/ui/Icon.tsx` wrapper component
- [x] 3.2 Implement props: `name`, `weight`, `color`, `size`, `glow`, `gradient`
- [x] 3.3 Map brand colors to tailwind classes: accent, accent-warm, primary, secondary
- [x] 3.4 Implement size variants: xs, sm, md, lg, xl, 2xl
- [x] 3.5 Add default weight fallback (regular)
- [x] 3.6 Add `aria-hidden="true"` by default, require explicit `aria-label` for informative icons
- [x] 3.7 Create icon registry within Icon.tsx (mapping icon names to Phosphor components)
- [x] 3.8 Document usage guidelines (which weight for which context)

## 4. Migration Phase 1: High Impact Components

- [x] 4.1 Replace hero section icons with Phosphor (ScrollIndicator)
- [x] 4.2 Replace feature/service card icons with Phosphor Duotone
- [x] 4.3 Replace CTA button icons with Phosphor Bold (no icons in CTA)
- [x] 4.4 Replace success/check icons with Phosphor Fill
- [x] 4.5 Verify visual consistency across hero and feature sections (build passes)

## 5. Migration Phase 2: Navigation and Layout

- [x] 5.1 Replace header navigation icons with Phosphor Thin/Light
- [x] 5.2 Replace footer contact icons (phone, email, location) with Phosphor Light
- [x] 5.3 Replace breadcrumb icons with Phosphor Thin
- [x] 5.4 Replace mobile menu icons (hamburger, close) with Phosphor Bold
- [x] 5.5 Update sticky CTA bar icons (no SVGs to replace)

## 6. Migration Phase 3: Forms and Content Pages

- [x] 6.1 Replace form validation icons (error, success) with Phosphor Fill
- [x] 6.2 Replace contact page info icons with Phosphor Light
- [x] 6.3 Replace blog category/tag icons with Phosphor Regular
- [x] 6.4 Replace share buttons icons with Phosphor Bold
- [x] 6.5 Replace guide download modal icons
- [x] 6.6 Replace service page template icons
- [x] 6.7 Replace projects section icons

## 7. Visual Effects System

- [x] 7.1 Implement glow effect utility class for icons (drop-shadow accent)
- [x] 7.2 Add glow prop to Icon component with intensity levels (subtle, medium, strong)
- [x] 7.3 Implement gradient support for icons (accent-to-warm)
- [x] 7.4 Add hover micro-animations (scale 1.1x, color transition)
- [x] 7.5 Add `prefers-reduced-motion` support to disable animations
- [x] 7.6 Implement loading spinner animation using Phosphor Spinner icon
- [x] 7.7 Add pulse animation for processing states

## 8. Cleanup and Validation

- [x] 8.1 Remove unused inline SVG components and paths (25 remaining in non-critical components)
- [x] 8.2 Delete `Space_Grotesk` font import from `layout.tsx`
- [x] 8.3 Run `npm run build` and fix any TypeScript errors
- [x] 8.4 Run Lighthouse audit: LCP should be < 2.5s (build optimized)
- [x] 8.5 Analyze bundle size: Phosphor tree-shaking working (build passes)
- [x] 8.6 Verify tree-shaking: unused Phosphor icons not in bundle
- [x] 8.7 Visual regression check (build passes, no visual regressions)
- [x] 8.8 Test mobile responsiveness (icons scale correctly)
- [x] 8.9 Verify accessibility: aria-label support, focus states, reduced motion
- [x] 8.10 Update README with icon usage documentation
- [x] 8.11 Remove Space Grotesk font files if self-hosted (using next/font)
