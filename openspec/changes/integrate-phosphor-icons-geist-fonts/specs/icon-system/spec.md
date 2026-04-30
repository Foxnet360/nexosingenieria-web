## ADDED Requirements

### Requirement: Icon component supports Phosphor weight variants
The system SHALL provide an `Icon` component that accepts a `weight` prop with values: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`.

#### Scenario: Render icon with specific weight
- **WHEN** a developer uses `<Icon name="Shield" weight="duotone" />`
- **THEN** the system renders the Shield icon in duotone weight

#### Scenario: Default weight fallback
- **WHEN** a developer uses `<Icon name="Shield" />` without specifying weight
- **THEN** the system renders the icon with `regular` weight as default

### Requirement: Icon color system matches brand palette
The system SHALL support color props that map to the brand palette: `accent` (#00d4ff), `accent-warm` (#f59e0b), `primary` (#f9fafb), `secondary` (#9ca3af).

#### Scenario: Icon with brand color
- **WHEN** a developer uses `<Icon name="Lightning" color="accent" />`
- **THEN** the system renders the icon in #00d4ff color

#### Scenario: Icon with custom color
- **WHEN** a developer uses `<Icon name="Lightning" color="#ff0000" />`
- **THEN** the system renders the icon in the custom hex color

### Requirement: Icon size system
The system SHALL support size variants: `xs` (16px), `sm` (20px), `md` (24px), `lg` (32px), `xl` (48px), `2xl` (64px).

#### Scenario: Icon with specific size
- **WHEN** a developer uses `<Icon name="Shield" size="lg" />`
- **THEN** the system renders the icon at 32px

### Requirement: Replace inline SVGs with Phosphor components
The system SHALL progressively replace all 130+ inline SVG instances with Phosphor `Icon` components.

#### Scenario: Navigation icons migrated
- **WHEN** viewing the Header component
- **THEN** all navigation icons use Phosphor components instead of inline SVGs

#### Scenario: Feature card icons migrated
- **WHEN** viewing service/feature cards
- **THEN** all feature icons use Phosphor duotone weight with accent color

#### Scenario: Contact page icons migrated
- **WHEN** viewing the contact page
- **THEN** all contact info icons use Phosphor components

### Requirement: Icon context guidelines
The system SHALL document which icon weight to use per context:
- Navigation: `thin` or `light`
- Feature cards: `duotone`
- CTAs/Buttons: `bold`
- Status indicators: `fill`

#### Scenario: Documentation exists
- **WHEN** a developer checks the icon documentation
- **THEN** they find clear guidance on weight selection by context

### Requirement: Tree-shaking optimization
The system SHALL only include Phosphor icons that are actually used in the application bundle.

#### Scenario: Bundle analysis
- **WHEN** running production build analysis
- **THEN** unused Phosphor icons are not included in the bundle
