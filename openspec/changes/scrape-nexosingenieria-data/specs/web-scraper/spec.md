## ADDED Requirements

### Requirement: Scraper SHALL navigate target website
The scraper SHALL be capable of navigating all pages on nexosingenieria.com following internal links up to a configurable depth.

#### Scenario: Full site crawl
- **WHEN** the scraper starts with base URL "https://nexosingenieria.com"
- **THEN** it SHALL discover and visit all internal pages within 3 levels of depth
- **AND** it SHALL respect robots.txt directives

### Requirement: Scraper SHALL extract text content
The scraper SHALL extract all visible text content from each page, preserving structural context (headings, paragraphs, lists).

#### Scenario: Extract service page content
- **WHEN** the scraper processes a service page
- **THEN** it SHALL extract page title, all heading levels, paragraph text, and list items
- **AND** it SHALL maintain the hierarchical relationship between headings and content

### Requirement: Scraper SHALL extract image assets
The scraper SHALL identify and download all image assets referenced in the HTML.

#### Scenario: Download project images
- **WHEN** the scraper encounters image elements (img tags, CSS background images)
- **THEN** it SHALL download each image to local storage
- **AND** it SHALL record original URL, alt text, and page source for each image
- **AND** it SHALL create organized folder structure by page

### Requirement: Scraper SHALL support rate limiting
The scraper SHALL implement configurable rate limiting to prevent overloading the target server.

#### Scenario: Respectful crawling
- **WHEN** the scraper is configured with a delay of 2 seconds between requests
- **THEN** it SHALL wait at least 2 seconds between consecutive HTTP requests
- **AND** it SHALL honor retry-after headers when receiving 429 responses
