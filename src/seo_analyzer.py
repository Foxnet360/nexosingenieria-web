import json
from collections import defaultdict
from bs4 import BeautifulSoup
from logger import logger


class SEOAnalyzer:
    """Analyze SEO structure and metadata of scraped pages."""
    
    def __init__(self, config):
        self.config = config
    
    def analyze_page(self, url, html_content):
        """Analyze SEO elements of a single page."""
        soup = BeautifulSoup(html_content, 'lxml')
        
        # Extract metadata
        metadata = {
            'url': url,
            'title': '',
            'meta_description': '',
            'og_title': '',
            'og_description': '',
            'og_image': '',
            'canonical_url': ''
        }
        
        # Title tag
        title_tag = soup.find('title')
        if title_tag:
            metadata['title'] = title_tag.get_text(strip=True)
        
        # Meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            metadata['meta_description'] = meta_desc.get('content', '')
        
        # Open Graph tags
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        if og_title:
            metadata['og_title'] = og_title.get('content', '')
        
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        if og_desc:
            metadata['og_description'] = og_desc.get('content', '')
        
        og_image = soup.find('meta', attrs={'property': 'og:image'})
        if og_image:
            metadata['og_image'] = og_image.get('content', '')
        
        # Canonical URL
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if canonical:
            metadata['canonical_url'] = canonical.get('href', '')
        
        # Heading hierarchy analysis
        headings_analysis = self._analyze_headings(soup)
        
        # Internal links
        internal_links = self._extract_internal_links(url, soup)
        
        return {
            'metadata': metadata,
            'headings_analysis': headings_analysis,
            'internal_links': internal_links,
            'link_count': len(internal_links)
        }
    
    def _analyze_headings(self, soup):
        """Analyze heading hierarchy (H1-H6)."""
        headings = []
        for level in range(1, 7):
            for h in soup.find_all(f'h{level}'):
                headings.append({
                    'level': level,
                    'text': h.get_text(strip=True)
                })
        
        # Check for single H1
        h1_count = len([h for h in headings if h['level'] == 1])
        has_single_h1 = h1_count == 1
        
        # Check for skipped levels
        levels_present = sorted(set([h['level'] for h in headings]))
        skipped_levels = []
        if levels_present:
            for i in range(1, max(levels_present)):
                if i not in levels_present and i < max(levels_present):
                    skipped_levels.append(i)
        
        return {
            'headings': headings,
            'h1_count': h1_count,
            'has_single_h1': has_single_h1,
            'levels_present': levels_present,
            'skipped_levels': skipped_levels,
            'total_headings': len(headings)
        }
    
    def _extract_internal_links(self, url, soup):
        """Extract internal links from a page."""
        from urllib.parse import urljoin, urlparse
        
        domain = self.config['target']['domain']
        links = []
        
        for anchor in soup.find_all('a', href=True):
            href = anchor['href']
            full_url = urljoin(url, href)
            parsed = urlparse(full_url)
            
            if parsed.netloc == '' or parsed.netloc == domain:
                links.append({
                    'url': full_url,
                    'text': anchor.get_text(strip=True),
                    'is_internal': True
                })
        
        return links
    
    def analyze_all(self, pages_data):
        """Analyze all pages and generate comprehensive report."""
        seo_data = []
        all_links = defaultdict(list)
        
        for page in pages_data:
            try:
                analysis = self.analyze_page(page['url'], page['html'])
                seo_data.append(analysis)
                
                # Catalog links
                for link in analysis['internal_links']:
                    all_links[link['url']].append(page['url'])
                
                logger.info("SEO analysis complete", url=page['url'])
            except Exception as e:
                logger.error("SEO analysis failed", url=page['url'], error=str(e))
        
        # Find orphan pages
        all_page_urls = set([p['url'] for p in pages_data])
        linked_urls = set(all_links.keys())
        orphan_pages = all_page_urls - linked_urls
        
        # Calculate link depth from homepage
        homepage = self.config['target']['base_url']
        link_depths = self._calculate_link_depths(homepage, all_links)
        
        # Generate report
        report = self._generate_report(seo_data, orphan_pages, link_depths)
        
        return {
            'page_analyses': seo_data,
            'orphan_pages': list(orphan_pages),
            'link_depths': link_depths,
            'report': report
        }
    
    def _calculate_link_depths(self, homepage, all_links):
        """Calculate link depth from homepage for each page."""
        depths = {homepage: 0}
        queue = [(homepage, 0)]
        visited = {homepage}
        
        while queue:
            current_url, current_depth = queue.pop(0)
            
            # Find all pages that link from current_url
            for target_url, source_urls in all_links.items():
                if current_url in source_urls and target_url not in visited:
                    visited.add(target_url)
                    depths[target_url] = current_depth + 1
                    queue.append((target_url, current_depth + 1))
        
        return depths
    
    def _generate_report(self, seo_data, orphan_pages, link_depths):
        """Generate comprehensive SEO report."""
        total_pages = len(seo_data)
        
        # Pages with missing meta descriptions
        missing_meta = [p for p in seo_data if not p['metadata']['meta_description']]
        
        # Pages with heading issues
        heading_issues = []
        for p in seo_data:
            issues = []
            if not p['headings_analysis']['has_single_h1']:
                issues.append(f"H1 count: {p['headings_analysis']['h1_count']}")
            if p['headings_analysis']['skipped_levels']:
                issues.append(f"Skipped levels: {p['headings_analysis']['skipped_levels']}")
            if issues:
                heading_issues.append({
                    'url': p['metadata']['url'],
                    'issues': issues
                })
        
        # Average page depth
        depths = list(link_depths.values())
        avg_depth = sum(depths) / len(depths) if depths else 0
        max_depth = max(depths) if depths else 0
        
        report = {
            'summary': {
                'total_pages': total_pages,
                'pages_missing_meta_description': len(missing_meta),
                'pages_with_heading_issues': len(heading_issues),
                'orphan_pages': len(orphan_pages),
                'average_link_depth': round(avg_depth, 2),
                'max_link_depth': max_depth
            },
            'details': {
                'missing_meta_descriptions': [{'url': p['metadata']['url']} for p in missing_meta],
                'heading_issues': heading_issues,
                'orphan_pages': [{'url': url} for url in orphan_pages]
            },
            'recommendations': [
                f"Add meta descriptions to {len(missing_meta)} pages",
                f"Fix heading hierarchy issues on {len(heading_issues)} pages",
                f"Add internal links to {len(orphan_pages)} orphan pages",
                "Ensure all pages have exactly one H1 tag",
                "Maintain consistent heading hierarchy without skipped levels"
            ]
        }
        
        return report
    
    def save_report(self, analysis_data):
        """Save SEO analysis to disk."""
        import os
        output_dir = self.config['paths']['processed_metadata']
        os.makedirs(output_dir, exist_ok=True)
        
        filepath = os.path.join(output_dir, 'seo_analysis.json')
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(analysis_data, f, indent=2, ensure_ascii=False, default=str)
        
        logger.info("SEO report saved", filepath=filepath)
        return filepath
