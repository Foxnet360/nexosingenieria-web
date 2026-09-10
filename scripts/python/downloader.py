import os
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse, urljoin
from logger import logger


class Downloader:
    """Download and save raw HTML pages and assets."""
    
    def __init__(self, config):
        self.config = config
        self.pages_dir = Path(config['paths']['raw_pages'])
        self.assets_dir = Path(config['paths']['raw_assets'])
        
        self.pages_dir.mkdir(parents=True, exist_ok=True)
        self.assets_dir.mkdir(parents=True, exist_ok=True)
    
    def save_page(self, url, html_content):
        """Save HTML page to disk."""
        # Create filename from URL
        parsed = urlparse(url)
        path = parsed.path.strip('/') or 'index'
        filename = path.replace('/', '_') + '.html'
        filepath = self.pages_dir / filename
        
        # Save HTML
        filepath.write_text(html_content, encoding='utf-8')
        
        logger.info("Page saved", url=url, filepath=str(filepath))
        return str(filepath)
    
    def download_image(self, img_url, page_url, session):
        """Download an image asset."""
        from bs4 import BeautifulSoup
        
        try:
            # Get image alt text from page if available
            response = session.get(img_url, timeout=30)
            response.raise_for_status()
            
            # Determine filename
            parsed = urlparse(img_url)
            original_filename = os.path.basename(parsed.path) or 'image'
            if not original_filename or '.' not in original_filename:
                original_filename = f"img_{hashlib.md5(img_url.encode()).hexdigest()[:8]}.jpg"
            
            # Organize by page
            page_parsed = urlparse(page_url)
            page_folder = page_parsed.path.strip('/').replace('/', '_') or 'index'
            image_dir = self.assets_dir / page_folder
            image_dir.mkdir(exist_ok=True)
            
            filepath = image_dir / original_filename
            
            # Save image
            filepath.write_bytes(response.content)
            
            logger.info("Image downloaded", url=img_url, filepath=str(filepath))
            
            return {
                'original_url': img_url,
                'filepath': str(filepath),
                'filename': original_filename,
                'page_source': page_url,
                'size': len(response.content),
                'content_type': response.headers.get('content-type', '')
            }
        except Exception as e:
            logger.error("Failed to download image", url=img_url, error=str(e))
            return None
    
    def extract_and_download_images(self, url, html_content, session):
        """Extract all images from a page and download them."""
        from bs4 import BeautifulSoup
        
        soup = BeautifulSoup(html_content, 'lxml')
        images = []
        
        # Find all img tags
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src:
                full_url = urljoin(url, src)
                image_data = self.download_image(full_url, url, session)
                if image_data:
                    image_data['alt_text'] = img.get('alt', '')
                    images.append(image_data)
        
        # Find background images in style attributes
        for tag in soup.find_all(style=True):
            style = tag['style']
            if 'background-image' in style:
                # Extract URL from background-image: url(...)
                import re
                match = re.search(r'url\(["\']?([^"\')]+)["\']?\)', style)
                if match:
                    full_url = urljoin(url, match.group(1))
                    image_data = self.download_image(full_url, url, session)
                    if image_data:
                        image_data['alt_text'] = ''
                        images.append(image_data)
        
        return images
    
    def save_metadata(self, pages_data, images_data):
        """Save metadata about all downloaded assets."""
        metadata_dir = Path(self.config['paths']['processed_metadata'])
        metadata_dir.mkdir(parents=True, exist_ok=True)
        
        metadata = {
            'pages': pages_data,
            'images': images_data,
            'total_pages': len(pages_data),
            'total_images': len(images_data)
        }
        
        filepath = metadata_dir / 'download_metadata.json'
        filepath.write_text(json.dumps(metadata, indent=2, default=str), encoding='utf-8')
        
        logger.info("Metadata saved", filepath=str(filepath))
        return str(filepath)
