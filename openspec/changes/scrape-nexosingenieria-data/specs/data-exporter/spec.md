## ADDED Requirements

### Requirement: Data exporter SHALL generate JSON output
The system SHALL export all scraped and cataloged data in JSON format with consistent schema.

#### Scenario: Full dataset export
- **WHEN** export to JSON is requested
- **THEN** the system SHALL generate a JSON file containing all pages, content, images, and metadata
- **AND** the output SHALL follow a consistent hierarchical structure

### Requirement: Data exporter SHALL generate CSV output
The system SHALL provide tabular exports for content suitable for spreadsheet analysis.

#### Scenario: Services CSV export
- **WHEN** export to CSV is requested for services data
- **THEN** the system SHALL generate a CSV file with columns: service_name, description, features, related_images, source_url

### Requirement: Data exporter SHALL generate Markdown output
The system SHALL export content in Markdown format for easy reading and documentation.

#### Scenario: Page content as Markdown
- **WHEN** export to Markdown is requested for a specific page
- **THEN** the system SHALL convert HTML content to Markdown preserving headings, lists, and emphasis
- **AND** it SHALL include frontmatter with metadata (title, url, extraction_date)

### Requirement: Data exporter SHALL support selective export
The system SHALL allow filtering exported data by category, date range, or content type.

#### Scenario: Filtered export
- **WHEN** export is requested with filter "category=projects"
- **THEN** only content classified as projects SHALL be included in the output
