import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

const BASE_URL = 'https://www.atc-taxi-vtc.com';
const LOGO_OG_IMAGE = `${BASE_URL}/atc-taxi-narbonne-og-image.jpg`;

export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes('ATC')
    ? title
    : `${title} | ATC TAXI VTC Narbonne`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const imageUrl = ogImage ?? LOGO_OG_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('googlebot', 'index, follow');
    setMeta('theme-color', '#3AB4B1');
    setMeta('geo.region', 'FR-11');
    setMeta('geo.placename', 'Narbonne');
    setMeta('geo.position', '43.1837;3.0029');
    setMeta('ICBM', '43.1837, 3.0029');

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', imageUrl, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:locale', 'fr_FR', 'property');
    setMeta('og:site_name', 'ATC TAXI VTC Narbonne', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    setLink('canonical', canonicalUrl);

    // Schema JSON-LD
    if (schema) {
      const existing = document.querySelector('script[data-seo="true"]');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, canonicalUrl, imageUrl, keywords, schema]);

  return null;
}
