#!/usr/bin/env python3
"""Main CLI entry point for Nexos Scraper."""

import argparse
import sys
import yaml
from pathlib import Path
from datetime import datetime

# Import our modules
from src.crawler import Crawler
from src.downloader import Downloader
from src.content_parser import ContentParser, ContentClassifier, Deduplicator
from src.seo_analyzer import SEOAnalyzer
from src.data_exporter import DataExporter
from src.logger import logger


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='Scrape and catalog content from nexosingenieria.com',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scrape.py                    # Run full pipeline
  python scrape.py --crawl-only       # Only crawl and download
  python scrape.py --parse-only       # Only parse existing data
  python scrape.py --export-only      # Only export to formats
  python scrape.py --filter services  # Export only services
        """
    )
    
    parser.add_argument('--config', '-c', default='config.yaml',
                        help='Path to configuration file (default: config.yaml)')
    parser.add_argument('--crawl-only', action='store_true',
                        help='Only crawl and download, skip parsing')
    parser.add_argument('--parse-only', action='store_true',
                        help='Only parse existing downloads')
    parser.add_argument('--export-only', action='store_true',
                        help='Only export data to formats')
    parser.add_argument('--filter', type=str,
                        help='Filter exports by category (services, projects, partners, etc.)')
    parser.add_argument('--validate', action='store_true',
                        help='Run validation after scraping')
    
    return parser.parse_args()


def load_config(config_path):
    """Load configuration from YAML file."""
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def run_crawl(config):
    """Run the crawl and download phase."""
    logger.info("Starting crawl phase...")
    
    crawler = Crawler(config_path='config.yaml')
    pages_data = crawler.crawl()
    
    logger.info("Crawl complete", pages_count=len(pages_data))
    
    # Download pages and images
    downloader = Downloader(config)
    
    saved_pages = []
    all_images = []
    
    for i, page in enumerate(pages_data):
        logger.info(f"Processing page {i+1}/{len(pages_data)}", url=page['url'])
        
        # Save HTML
        filepath = downloader.save_page(page['url'], page['html'])
        saved_pages.append({
            'url': page['url'],
            'filepath': filepath,
            'depth': page['depth']
        })
        
        # Download images
        images = downloader.extract_and_download_images(page['url'], page['html'], crawler.session)
        all_images.extend(images)
    
    # Save metadata
    downloader.save_metadata(saved_pages, all_images)
    
    logger.info("Download phase complete", 
                pages_saved=len(saved_pages), 
                images_downloaded=len(all_images))
    
    return pages_data


def run_parse(config, pages_data):
    """Run the parse and classify phase."""
    logger.info("Starting parse phase...")
    
    parser = ContentParser(config)
    parsed_pages = parser.parse_all_pages(pages_data)
    
    # Classify content
    classifier = ContentClassifier(config)
    classified_pages = classifier.classify_all(parsed_pages)
    
    # Deduplicate
    deduplicator = Deduplicator()
    unique_pages = deduplicator.deduplicate(classified_pages)
    
    logger.info("Parse phase complete", 
                total_parsed=len(parsed_pages),
                unique_pages=len(unique_pages))
    
    return unique_pages


def run_seo_analysis(config, pages_data):
    """Run SEO analysis."""
    logger.info("Starting SEO analysis...")
    
    analyzer = SEOAnalyzer(config)
    analysis_data = analyzer.analyze_all(pages_data)
    analyzer.save_report(analysis_data)
    
    logger.info("SEO analysis complete",
                total_pages=analysis_data['report']['summary']['total_pages'],
                orphan_pages=analysis_data['report']['summary']['orphan_pages'])
    
    return analysis_data


def run_export(config, pages_data, filter_category=None):
    """Run the export phase."""
    logger.info("Starting export phase...")
    
    exporter = DataExporter(config)
    
    # Prepare data for export
    data = {
        'pages': pages_data,
        'metadata': {
            'export_date': datetime.now().isoformat(),
            'source': config['target']['base_url']
        }
    }
    
    if filter_category:
        exports = exporter.export_filtered(pages_data, category=filter_category)
    else:
        exports = exporter.export_all(data, pages_data)
    
    logger.info("Export phase complete")
    return exports


def validate_data(config):
    """Validate completeness of extracted data."""
    logger.info("Running validation...")
    
    issues = []
    
    # Check raw pages
    raw_pages_dir = Path(config['paths']['raw_pages'])
    if not raw_pages_dir.exists():
        issues.append("Raw pages directory does not exist")
    else:
        html_files = list(raw_pages_dir.glob('*.html'))
        if not html_files:
            issues.append("No HTML files found in raw pages directory")
        logger.info(f"Found {len(html_files)} HTML files")
    
    # Check processed content
    content_file = Path(config['paths']['processed_content']) / 'classified_content.json'
    if not content_file.exists():
        issues.append("Classified content file not found")
    else:
        import json
        with open(content_file) as f:
            data = json.load(f)
            logger.info(f"Found {len(data)} classified pages")
    
    # Check exports
    json_dir = Path(config['paths']['exports_json'])
    if json_dir.exists():
        json_files = list(json_dir.glob('*.json'))
        logger.info(f"Found {len(json_files)} JSON export files")
    
    if issues:
        logger.warning("Validation issues found:", issues=issues)
        return False
    else:
        logger.info("Validation passed")
        return True


def main():
    """Main entry point."""
    args = parse_args()
    
    # Load configuration
    config = load_config(args.config)
    logger.info("Configuration loaded", config_file=args.config)
    
    start_time = datetime.now()
    
    try:
        pages_data = None
        
        # Crawl phase (unless parse-only or export-only)
        if not args.parse_only and not args.export_only:
            pages_data = run_crawl(config)
        elif args.parse_only or args.export_only:
            # Load existing pages data
            import json
            metadata_file = Path(config['paths']['processed_metadata']) / 'download_metadata.json'
            if metadata_file.exists():
                with open(metadata_file) as f:
                    metadata = json.load(f)
                    # Reconstruct pages_data with HTML
                    pages_data = []
                    for page_meta in metadata['pages']:
                        html_file = Path(page_meta['filepath'])
                        if html_file.exists():
                            html_content = html_file.read_text(encoding='utf-8')
                            pages_data.append({
                                'url': page_meta['url'],
                                'html': html_content,
                                'depth': page_meta['depth']
                            })
                logger.info("Loaded existing pages data", count=len(pages_data))
            else:
                logger.error("No existing data found. Run crawl first.")
                sys.exit(1)
        
        # Parse phase (unless crawl-only or export-only)
        if not args.crawl_only and not args.export_only and pages_data:
            classified_pages = run_parse(config, pages_data)
        elif args.export_only:
            # Load existing classified data
            import json
            content_file = Path(config['paths']['processed_content']) / 'classified_content.json'
            if content_file.exists():
                with open(content_file) as f:
                    classified_pages = json.load(f)
            else:
                logger.error("No classified content found. Run parse first.")
                sys.exit(1)
        else:
            classified_pages = []
        
        # SEO Analysis (unless crawl-only)
        if not args.crawl_only and pages_data:
            run_seo_analysis(config, pages_data)
        
        # Export phase (unless crawl-only or parse-only)
        if not args.crawl_only and not args.parse_only and classified_pages:
            run_export(config, classified_pages, args.filter)
        
        # Validation
        if args.validate:
            validate_data(config)
        
        # Summary
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        logger.info("Pipeline complete", duration_seconds=duration)
        
    except KeyboardInterrupt:
        logger.info("Pipeline interrupted by user")
        sys.exit(1)
    except Exception as e:
        logger.error("Pipeline failed", error=str(e))
        sys.exit(1)


if __name__ == '__main__':
    main()
