## ADDED Requirements

### Requirement: Centralized data file for scraped content
The system SHALL create a centralized TypeScript data file that exports all scraped content in a typed structure for consumption by React components.

#### Scenario: Data file creation
- **WHEN** the integration process starts
- **THEN** it SHALL create `src/data/scraped-content.ts` with typed exports for empresa, servicios, contacto, and proyectos
- **AND** the file SHALL be importable by any page or component

### Requirement: Company data export
The system SHALL export company information including name, foundation year (2005), location, description, and value proposition.

#### Scenario: Company data availability
- **WHEN** importing from `src/data/scraped-content.ts`
- **THEN** it SHALL provide empresaData with nombre, fundacion (2005), ubicacion, direccion, descripcion, and filosofia fields
- **AND** all text fields SHALL be enriched with strategic report insights

### Requirement: Services data export
The system SHALL export all four main services with titles, descriptions, and subservices extracted from scraped content.

#### Scenario: Services data structure
- **WHEN** accessing services data
- **THEN** it SHALL provide an array of service objects with titulo, descripcion, and subservicios fields
- **AND** descriptions SHALL combine scraped text with strategic report enhancements

### Requirement: Contact information export
The system SHALL export real contact information including phone, address, and social media links extracted from the scraped website.

#### Scenario: Contact data accuracy
- **WHEN** importing contact data
- **THEN** it SHALL provide telefono (+57 315-5089404), direccion (Cra 14 # 6-49), and social media URLs
- **AND** all contact data SHALL match the original nexosingenieria.com website

### Requirement: Content enrichment with strategic report
The system SHALL enrich scraped text content with additional insights from the strategic report (report.md) to improve descriptions and value propositions.

#### Scenario: Text enrichment process
- **WHEN** processing scraped text for the new site
- **THEN** it SHALL combine original scraped paragraphs with relevant insights from report.md
- **AND** the resulting text SHALL maintain the original voice while adding strategic depth
