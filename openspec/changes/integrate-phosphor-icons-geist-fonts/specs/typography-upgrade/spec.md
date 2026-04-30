## ADDED Requirements

### Requirement: Geist Sans replaces Space Grotesk for headlines
The system SHALL load Geist Sans as a variable font for all headline and display text, replacing Space Grotesk.

#### Scenario: Hero headline uses Geist Sans
- **WHEN** viewing the homepage hero section
- **THEN** the headline text uses Geist Sans font family

#### Scenario: Section titles use Geist Sans
- **WHEN** viewing any page section title
- **THEN** the title uses Geist Sans with weight 600-700

#### Scenario: Font loading optimization
- **WHEN** the page loads
- **THEN** Geist Sans loads as a single variable font file (not multiple static files)

### Requirement: Geist Mono for technical data
The system SHALL use Geist Mono for technical data: phone numbers, addresses, specifications, and code blocks.

#### Scenario: Contact info uses monospace
- **WHEN** viewing the contact page
- **THEN** phone numbers and addresses display in Geist Mono

#### Scenario: Technical specifications use monospace
- **WHEN** viewing service specifications
- **THEN** technical data (dimensions, counts, measurements) uses Geist Mono

### Requirement: Inter remains for body text
The system SHALL maintain Inter as the primary body text font.

#### Scenario: Body text unchanged
- **WHEN** reading paragraph content
- **THEN** the text uses Inter font family at weight 400

### Requirement: Font variable CSS integration
The system SHALL expose font variables in CSS for consistent usage.

#### Scenario: CSS variables available
- **WHEN** inspecting CSS custom properties
- **THEN** `--font-sans` (Inter), `--font-display` (Geist Sans), and `--font-mono` (Geist Mono) are defined

### Requirement: Performance budget for fonts
The system SHALL keep total font payload under 200KB for initial page load.

#### Scenario: Font file size check
- **WHEN** analyzing the production bundle
- **THEN** combined font files (Inter + Geist Sans + Geist Mono) are less than 200KB
