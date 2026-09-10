declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Analytics 4 event tracking utility
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Predefined events for common actions
export const analytics = {
  // Form submissions
  formSubmit: (formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success,
    });
  },

  // CTA clicks
  ctaClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      location: location,
    });
  },

  // Page engagement
  scrollDepth: (percentage: number) => {
    trackEvent('scroll_depth', {
      percentage: percentage,
    });
  },

  // Navigation
  navClick: (linkName: string) => {
    trackEvent('nav_click', {
      link_name: linkName,
    });
  },

  // External links
  externalLink: (url: string, label: string) => {
    trackEvent('external_link', {
      url: url,
      label: label,
    });
  },

  // Contact actions
  contactClick: (method: string) => {
    trackEvent('contact_click', {
      method: method,
    });
  },

  // Service interest
  serviceView: (serviceName: string) => {
    trackEvent('service_view', {
      service_name: serviceName,
    });
  },

  // Blog engagement
  blogRead: (articleTitle: string, readTime: number) => {
    trackEvent('blog_read', {
      article_title: articleTitle,
      read_time_seconds: readTime,
    });
  },
};
