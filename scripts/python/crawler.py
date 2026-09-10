import time
import requests
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser
from pathlib import Path
import yaml
from logger import logger


class Crawler:
    """Web crawler that navigates sites following internal links."""
    
    def __init__(self, config_path="config.yaml"):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.base_url = self.config['target']['base_url']
        self.domain = self.config['target']['domain']
        self.max_depth = self.config['scraping']['max_depth']
        self.delay = self.config['scraping']['rate_limit_delay']
        self.timeout = self.config['scraping']['timeout']
        self.user_agent = self.config['scraping']['user_agent']
        
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': self.user_agent})
        
        self.visited_urls = set()
        self.url_queue = [(self.base_url, 0)]  # (url, depth)
        self.robots_parser = None
        
    def _is_valid_url(self, url):
        """Check if URL is internal and valid."""
        parsed = urlparse(url)
        return (parsed.netloc == '' or parsed.netloc == self.domain) and \
               parsed.scheme in ('', 'http', 'https') and \
               not url.startswith('#') and \
               not url.startswith('mailto:') and \
               not url.startswith('tel:')
    
    def _can_fetch(self, url):
        """Check robots.txt permissions."""
        if self.robots_parser is None:
            return True
        return self.robots_parser.can_fetch(self.user_agent, url)
    
    def parse_robots_txt(self):
        """Parse robots.txt for the target domain."""
        robots_url = urljoin(self.base_url, '/robots.txt')
        try:
            self.robots_parser = RobotFileParser()
            self.robots_parser.set_url(robots_url)
            self.robots_parser.read()
            logger.info("robots.txt parsed successfully", url=robots_url)
        except Exception as e:
            logger.warning("Could not parse robots.txt", error=str(e), url=robots_url)
            self.robots_parser = None
    
    def fetch_page(self, url):
        """Fetch a single page with retries."""
        max_retries = self.config['scraping']['max_retries']
        
        for attempt in range(max_retries):
            try:
                logger.debug("Fetching page", url=url, attempt=attempt + 1)
                response = self.session.get(url, timeout=self.timeout, allow_redirects=True)
                response.raise_for_status()
                
                # Rate limiting
                time.sleep(self.delay)
                
                return response
            except requests.exceptions.RequestException as e:
                logger.error("Request failed", url=url, attempt=attempt + 1, error=str(e))
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt  # Exponential backoff
                    logger.info("Retrying after delay", seconds=wait_time)
                    time.sleep(wait_time)
                else:
                    logger.error("Max retries exceeded", url=url)
                    return None
        
        return None
    
    def extract_links(self, url, html_content):
        """Extract all internal links from a page."""
        from bs4 import BeautifulSoup
        
        soup = BeautifulSoup(html_content, 'lxml')
        links = set()
        
        for anchor in soup.find_all('a', href=True):
            href = anchor['href']
            full_url = urljoin(url, href)
            
            if self._is_valid_url(full_url):
                # Normalize URL
                parsed = urlparse(full_url)
                normalized = f"{parsed.scheme or 'https'}://{parsed.netloc or self.domain}{parsed.path}"
                if normalized not in self.visited_urls:
                    links.add(normalized)
        
        return links
    
    def crawl(self):
        """Crawl the website up to max_depth."""
        self.parse_robots_txt()
        
        pages_data = []
        
        while self.url_queue:
            url, depth = self.url_queue.pop(0)
            
            if url in self.visited_urls or depth > self.max_depth:
                continue
            
            if not self._can_fetch(url):
                logger.info("Skipping URL (robots.txt)", url=url)
                continue
            
            self.visited_urls.add(url)
            logger.info("Crawling page", url=url, depth=depth)
            
            response = self.fetch_page(url)
            if response is None:
                continue
            
            page_data = {
                'url': url,
                'depth': depth,
                'status_code': response.status_code,
                'content_type': response.headers.get('content-type', ''),
                'html': response.text
            }
            pages_data.append(page_data)
            
            # Extract links for next level
            if depth < self.max_depth:
                new_links = self.extract_links(url, response.text)
                for link in new_links:
                    if link not in self.visited_urls:
                        self.url_queue.append((link, depth + 1))
        
        logger.info("Crawl complete", pages_found=len(pages_data))
        return pages_data
