## ADDED Requirements

### Requirement: SEO analyzer SHALL extract page metadata
The system SHALL extract all SEO-relevant metadata from each page including title tags, meta descriptions, and Open Graph tags.

#### Scenario: Metadata extraction
- **WHEN** the analyzer processes a page
- **THEN** it SHALL extract title tag content
- **AND** it SHALL extract meta description
- **AND** it SHALL extract Open Graph title, description, and image tags
- **AND** it SHALL extract canonical URL if present

### Requirement: SEO analyzer SHALL analyze heading structure
The system SHALL analyze HTML heading hierarchy (H1-H6) for semantic structure and SEO best practices.

#### Scenario: Heading hierarchy analysis
- **WHEN** analyzing a page
- **THEN** the system SHALL verify exactly one H1 tag exists
- **AND** it SHALL report heading levels in order (no skipped levels)
- **AND** it SHALL flag pages with missing or duplicate H1 tags

### Requirement: SEO analyzer SHALL catalog internal links
The system SHALL catalog all internal links to analyze site structure and navigation.

#### Scenario: Link structure analysis
- **WHEN** analyzing the full site
- **THEN** the system SHALL create a map of all internal links
- **AND** it SHALL identify orphan pages (pages with no incoming links)
- **AND** it SHALL calculate link depth from homepage for each page

### Requirement: SEO analyzer SHALL generate SEO report
The system SHALL generate a comprehensive SEO analysis report with findings and recommendations.

#### Scenario: Report generation
- **WHEN** analysis is complete
- **THEN** the system SHALL generate a report including: total pages, pages with missing meta descriptions, heading structure issues, average page depth, and recommendations
