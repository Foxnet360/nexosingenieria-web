## ADDED Requirements

### Requirement: Icon glow effect on dark backgrounds
The system SHALL support a subtle glow effect for icons using the brand accent color (#00d4ff) on dark backgrounds.

#### Scenario: Duotone icon glow
- **WHEN** viewing a feature card with duotone icon
- **THEN** the icon has a subtle drop-shadow glow in accent color

#### Scenario: Glow intensity control
- **WHEN** a developer sets `glow="subtle"` on an Icon
- **THEN** the icon renders with a 4px blur, 20% opacity glow

#### Scenario: No glow on light backgrounds
- **WHEN** an icon appears on a light/colored background
- **THEN** the glow effect is disabled automatically

### Requirement: Icon gradient effects
The system SHALL support gradient fills for icons using brand colors.

#### Scenario: Icon with gradient
- **WHEN** a developer uses `<Icon name="Lightning" gradient="accent-to-warm" />`
- **THEN** the icon renders with a gradient from #00d4ff to #f59e0b

### Requirement: Micro-animations on icon hover
The system SHALL support subtle hover animations for interactive icons.

#### Scenario: Scale on hover
- **WHEN** hovering over a clickable icon
- **THEN** the icon scales to 1.1x over 200ms with ease-out

#### Scenario: Color transition on hover
- **WHEN** hovering over an interactive icon
- **THEN** the icon color transitions to full brightness over 150ms

#### Scenario: Reduced motion support
- **WHEN** user has `prefers-reduced-motion: reduce` enabled
- **THEN** all icon animations are disabled

### Requirement: Icon loading states
The system SHALL provide loading state icons with animation.

#### Scenario: Spinner icon
- **WHEN** a button shows loading state
- **THEN** a spinning icon (Phosphor `Spinner`) rotates continuously at 1s per revolution

#### Scenario: Pulse icon
- **WHEN** a system is processing
- **THEN** a pulsing icon (Phosphor `Pulse`) fades in/out at 2s intervals
