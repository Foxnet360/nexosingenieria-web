import json
import csv
import os
from datetime import datetime
from pathlib import Path
from markdownify import markdownify as md
from logger import logger


class DataExporter:
    """Export scraped data in multiple formats."""
    
    def __init__(self, config):
        self.config = config
        self.exports_dir = Path(config['paths']['exports_json']).parent
        self.exports_dir.mkdir(parents=True, exist_ok=True)
    
    def export_json(self, data, filename='scraped_data.json'):
        """Export data in JSON format."""
        output_path = Path(self.config['paths']['exports_json']) / filename
        
        output = {
            'metadata': {
                'export_date': datetime.now().isoformat(),
                'source': self.config['target']['base_url'],
                'total_pages': len(data.get('pages', []))
            },
            'data': data
        }
        
        output_path.write_text(json.dumps(output, indent=2, ensure_ascii=False, default=str), encoding='utf-8')
        logger.info("JSON export complete", filepath=str(output_path))
        return str(output_path)
    
    def export_csv(self, pages_data, filename_prefix='scraped'):
        """Export tabular data in CSV format."""
        csv_dir = Path(self.config['paths']['exports_csv'])
        csv_dir.mkdir(parents=True, exist_ok=True)
        
        exported_files = []
        
        # Export services
        services = [p for p in pages_data if 'services' in p.get('categories', [])]
        if services:
            services_file = csv_dir / f"{filename_prefix}_services.csv"
            with open(services_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['url', 'title', 'service_type', 'paragraphs', 'headings'])
                writer.writeheader()
                for page in services:
                    writer.writerow({
                        'url': page['url'],
                        'title': page.get('title', ''),
                        'service_type': page.get('service_type', ''),
                        'paragraphs': '\n'.join(page.get('paragraphs', [])),
                        'headings': '\n'.join([h['text'] for h in page.get('headings', [])])
                    })
            exported_files.append(str(services_file))
        
        # Export projects
        projects = [p for p in pages_data if 'projects' in p.get('categories', [])]
        if projects:
            projects_file = csv_dir / f"{filename_prefix}_projects.csv"
            with open(projects_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['url', 'title', 'paragraphs', 'headings'])
                writer.writeheader()
                for page in projects:
                    writer.writerow({
                        'url': page['url'],
                        'title': page.get('title', ''),
                        'paragraphs': '\n'.join(page.get('paragraphs', [])),
                        'headings': '\n'.join([h['text'] for h in page.get('headings', [])])
                    })
            exported_files.append(str(projects_file))
        
        # Export partners
        partners = {}
        for page in pages_data:
            for partner in page.get('detected_partners', []):
                if partner not in partners:
                    partners[partner] = []
                partners[partner].append(page['url'])
        
        if partners:
            partners_file = csv_dir / f"{filename_prefix}_partners.csv"
            with open(partners_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['partner_name', 'mentioned_on_pages'])
                writer.writeheader()
                for partner, urls in partners.items():
                    writer.writerow({
                        'partner_name': partner,
                        'mentioned_on_pages': '\n'.join(urls)
                    })
            exported_files.append(str(partners_file))
        
        logger.info("CSV export complete", files=exported_files)
        return exported_files
    
    def export_markdown(self, pages_data, filter_category=None):
        """Export pages as Markdown files."""
        md_dir = Path(self.config['paths']['exports_markdown'])
        md_dir.mkdir(parents=True, exist_ok=True)
        
        exported_files = []
        
        for page in pages_data:
            # Apply filter if specified
            if filter_category and filter_category not in page.get('categories', []):
                continue
            
            # Generate filename from URL
            from urllib.parse import urlparse
            parsed = urlparse(page['url'])
            filename = parsed.path.strip('/').replace('/', '_') or 'index'
            filename = f"{filename}.md"
            
            # Convert HTML content to Markdown
            html_content = f"<h1>{page.get('title', '')}</h1>"
            for p in page.get('paragraphs', []):
                html_content += f"<p>{p}</p>"
            
            markdown_content = md(html_content)
            
            # Add frontmatter
            frontmatter = f"""---
title: {page.get('title', '')}
url: {page['url']}
extraction_date: {page.get('extraction_timestamp', '')}
categories: {', '.join(page.get('categories', []))}
service_type: {page.get('service_type', '')}
---

"""
            
            filepath = md_dir / filename
            filepath.write_text(frontmatter + markdown_content, encoding='utf-8')
            exported_files.append(str(filepath))
        
        logger.info("Markdown export complete", files_count=len(exported_files))
        return exported_files
    
    def export_all(self, data, pages_data, filter_category=None):
        """Export data in all formats."""
        exports = {}
        
        # JSON
        exports['json'] = self.export_json(data)
        
        # CSV
        exports['csv'] = self.export_csv(pages_data)
        
        # Markdown
        exports['markdown'] = self.export_markdown(pages_data, filter_category)
        
        logger.info("All exports complete", formats=list(exports.keys()))
        return exports
    
    def export_filtered(self, pages_data, category=None, content_type=None, date_range=None):
        """Export filtered data."""
        filtered = pages_data
        
        if category:
            filtered = [p for p in filtered if category in p.get('categories', [])]
        
        if content_type:
            filtered = [p for p in filtered if p.get('service_type') == content_type]
        
        if date_range:
            # Simple date filtering
            from_date = datetime.fromisoformat(date_range.get('from', '1970-01-01'))
            to_date = datetime.fromisoformat(date_range.get('to', '2099-12-31'))
            filtered = [
                p for p in filtered 
                if from_date <= datetime.fromisoformat(p.get('extraction_timestamp', '1970-01-01')) <= to_date
            ]
        
        return self.export_all({'pages': filtered}, filtered)
