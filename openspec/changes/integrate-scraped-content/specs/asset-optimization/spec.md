## ADDED Requirements

### Requirement: Logo adaptation to new design
The system SHALL copy the scraped logo (a62620140bf6.png) to the project's public directory and ensure it integrates with the new site's design system.

#### Scenario: Logo integration
- **WHEN** the asset integration runs
- **THEN** it SHALL copy `data/scraped/raw/assets/a62620140bf6.png` to `public/images/logo-original.png`
- **AND** the logo SHALL be usable in Header and Footer components

### Requirement: Project images integration
The system SHALL copy all 7 scraped project images to the public directory for use in the ProjectsSection and gallery components.

#### Scenario: Images availability
- **WHEN** accessing project images
- **THEN** all 7 images SHALL be available in `public/images/proyectos/`
- **AND** each image SHALL retain its original filename for traceability

### Requirement: High-resolution image search
The system SHALL attempt to find higher resolution versions of the scraped project images from the original URLs or source website.

#### Scenario: Resolution improvement
- **WHEN** processing images
- **THEN** it SHALL check if original source URLs offer larger versions
- **AND** if found, it SHALL download and replace the low-resolution versions
- **AND** all images SHALL be optimized for web use (compressed, proper format)

### Requirement: Image metadata preservation
The system SHALL maintain metadata about each image including original URL, dimensions, and source page for reference.

#### Scenario: Metadata tracking
- **WHEN** integrating images
- **THEN** it SHALL create an image registry in `src/data/scraped-content.ts`
- **AND** each entry SHALL include originalUrl, localPath, dimensions, and alt text
