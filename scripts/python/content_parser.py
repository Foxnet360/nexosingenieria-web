import hashlib
import json
from datetime import datetime
from pathlib import Path
from bs4 import BeautifulSoup
from logger import logger


class ContentParser:
    """Parse HTML content preserving hierarchy and extracting structured data."""
    
    def __init__(self, config):
        self.config = config
        self.processed_dir = Path(config['paths']['processed_content'])
        self.processed_dir.mkdir(parents=True, exist_ok=True)
    
    def parse_page(self, url, html_content):
        """Parse a single page and extract structured content."""
        soup = BeautifulSoup(html_content, 'lxml')
        
        # Extract title
        title = soup.find('title')
        title_text = title.get_text(strip=True) if title else ''
        
        # Extract headings hierarchy
        headings = []
        for level in range(1, 7):
            for h in soup.find_all(f'h{level}'):
                headings.append({
                    'level': level,
                    'text': h.get_text(strip=True)
                })
        
        # Extract paragraphs
        paragraphs = []
        for p in soup.find_all('p'):
            text = p.get_text(strip=True)
            if text:
                paragraphs.append(text)
        
        # Extract lists
        lists = []
        for ul in soup.find_all('ul'):
            items = []
            for li in ul.find_all('li', recursive=False):
                items.append(li.get_text(strip=True))
            if items:
                lists.append(items)
        
        for ol in soup.find_all('ol'):
            items = []
            for li in ol.find_all('li', recursive=False):
                items.append(li.get_text(strip=True))
            if items:
                lists.append(items)
        
        # Extract all text
        full_text = soup.get_text(separator='\n', strip=True)
        
        # Calculate content hash for deduplication
        content_hash = hashlib.md5(full_text.encode()).hexdigest()
        
        page_data = {
            'url': url,
            'title': title_text,
            'headings': headings,
            'paragraphs': paragraphs,
            'lists': lists,
            'full_text': full_text,
            'content_hash': content_hash,
            'extraction_timestamp': datetime.now().isoformat()
        }
        
        return page_data
    
    def parse_all_pages(self, pages_data):
        """Parse all downloaded pages."""
        parsed_pages = []
        
        for page in pages_data:
            try:
                parsed = self.parse_page(page['url'], page['html'])
                parsed_pages.append(parsed)
                logger.info("Page parsed", url=page['url'])
            except Exception as e:
                logger.error("Failed to parse page", url=page['url'], error=str(e))
        
        # Save parsed content
        output_file = self.processed_dir / 'parsed_content.json'
        output_file.write_text(json.dumps(parsed_pages, indent=2, ensure_ascii=False), encoding='utf-8')
        
        logger.info("All pages parsed", count=len(parsed_pages))
        return parsed_pages


class ContentClassifier:
    """Classify content into categories and detect service types."""
    
    def __init__(self, config):
        self.config = config
        self.categories = config['classification']['categories']
        self.service_types = config['classification']['service_types']
        self.partner_keywords = [k.lower() for k in config['classification']['partner_keywords']]
    
    def classify_page(self, page_data):
        """Classify a single page into categories."""
        url = page_data['url'].lower()
        text = page_data['full_text'].lower()
        headings = ' '.join([h['text'].lower() for h in page_data['headings']])
        
        categories = []
        service_type = None
        partners = []
        
        # URL-based classification
        if any(x in url for x in ['servicio', 'service', 'seguridad', 'cableado', 'automatizacion']):
            categories.append('services')
        if any(x in url for x in ['proyecto', 'project', 'portafolio']):
            categories.append('projects')
        if any(x in url for x in ['partner', 'aliado', 'marca', 'brand']):
            categories.append('partners')
        if any(x in url for x in ['blog', 'articulo', 'noticia']):
            categories.append('blog')
        if any(x in url for x in ['empresa', 'about', 'nosotros', 'contacto']):
            categories.append('corporate')
        
        # Text-based classification as fallback
        if not categories:
            if any(word in text for word in ['cámara', 'vigilancia', 'cctv', 'acceso', 'alarma', 'seguridad']):
                categories.append('services')
                service_type = 'security'
            if any(word in text for word in ['cableado', 'red', 'fibra', 'datos', 'network']):
                categories.append('services')
                service_type = 'cabling'
            if any(word in text for word in ['domótica', 'automatización', 'control', 'smart', 'iluminación']):
                categories.append('services')
                service_type = 'automation'
            if any(word in text for word in ['proyecto', 'cliente', 'implementación']):
                categories.append('projects')
            if any(word in text for word in ['partner', 'distribuidor', 'representante']):
                categories.append('partners')
        
        # Detect service type from headings
        if 'services' in categories and not service_type:
            if any(word in headings for word in ['seguridad', 'cámara', 'vigilancia', 'cctv']):
                service_type = 'security'
            elif any(word in headings for word in ['cableado', 'red', 'fibra']):
                service_type = 'cabling'
            elif any(word in headings for word in ['domótica', 'automatización', 'control']):
                service_type = 'automation'
        
        # Detect partners
        for keyword in self.partner_keywords:
            if keyword in text or keyword in headings:
                partners.append(keyword.title())
        
        # Default to corporate if no category detected
        if not categories:
            categories.append('corporate')
        
        page_data['categories'] = list(set(categories))
        page_data['service_type'] = service_type
        page_data['detected_partners'] = list(set(partners))
        
        return page_data
    
    def classify_all(self, parsed_pages):
        """Classify all parsed pages."""
        classified = []
        
        for page in parsed_pages:
            classified_page = self.classify_page(page)
            classified.append(classified_page)
        
        # Save classified content
        output_file = Path(self.config['paths']['processed_content']) / 'classified_content.json'
        output_file.write_text(json.dumps(classified, indent=2, ensure_ascii=False), encoding='utf-8')
        
        logger.info("All pages classified", count=len(classified))
        return classified


class Deduplicator:
    """Remove duplicate content based on content hash."""
    
    def deduplicate(self, pages):
        """Remove duplicate pages based on content hash."""
        seen_hashes = set()
        unique_pages = []
        duplicates = []
        
        for page in pages:
            content_hash = page.get('content_hash', '')
            if content_hash and content_hash in seen_hashes:
                duplicates.append(page['url'])
            else:
                seen_hashes.add(content_hash)
                unique_pages.append(page)
        
        if duplicates:
            logger.info("Duplicates removed", count=len(duplicates), urls=duplicates)
        
        return unique_pages
