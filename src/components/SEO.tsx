import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE } from '../lib/schema-helpers';

const SITE_URL = 'https://www.hotelinairport.com';
const SITE_NAME = 'HotelInAirport';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
  nofollow?: boolean;
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/hotelinairport.png`,
  sameAs: [],
  description:
    'HotelInAirport helps travelers find airside transit hotels, terminal-connected accommodations, and sleep pods at airports worldwide.',
};

function setMeta(selector: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${selector}"]`);
  if (el) {
    el.setAttribute('content', content);
  } else {
    el = document.createElement('meta');
    el.setAttribute(attr, selector);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }
}

function removeMeta(selector: string, attr: 'name' | 'property' = 'name') {
  const el = document.querySelector(`meta[${attr}="${selector}"]`);
  if (el) el.remove();
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  breadcrumbs,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    const canonicalHref = canonical || `${SITE_URL}${location.pathname}`;
    const resolvedImage = ogImage || DEFAULT_OG_IMAGE;

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (linkCanonical) {
      linkCanonical.href = canonicalHref;
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      linkCanonical.href = canonicalHref;
      document.head.appendChild(linkCanonical);
    }

    const robotsDirectives: string[] = [];
    if (noindex) robotsDirectives.push('noindex');
    else robotsDirectives.push('index');
    if (nofollow) robotsDirectives.push('nofollow');
    else robotsDirectives.push('follow');
    const robotsContent = robotsDirectives.join(', ');

    if (noindex || nofollow) {
      setMeta('robots', robotsContent);
    } else {
      removeMeta('robots');
    }

    setMeta('og:type', ogType, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonicalHref, 'property');
    setMeta('og:image', resolvedImage, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', resolvedImage);

    setJsonLd('schema-organization', organizationSchema);

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
      };
      setJsonLd('schema-breadcrumb', breadcrumbSchema);
    } else {
      removeJsonLd('schema-breadcrumb');
    }
  }, [title, description, keywords, canonical, ogImage, ogType, breadcrumbs, noindex, nofollow, location.pathname]);

  return null;
}

export default SEO;
