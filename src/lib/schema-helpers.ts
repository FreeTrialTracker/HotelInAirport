const SITE_URL = 'https://www.hotelinairport.com';
const SITE_NAME = 'HotelInAirport';
const DEFAULT_OG_IMAGE = `${SITE_URL}/WORDRING_OG.png`;

export { DEFAULT_OG_IMAGE };

export function resolveImage(primary?: string | null, fallback?: string | null): string {
  if (primary && primary.trim()) return primary.trim();
  if (fallback && fallback.trim()) return fallback.trim();
  return DEFAULT_OG_IMAGE;
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  author?: string | null;
  datePublished: string;
  dateModified?: string | null;
}

export function buildArticleSchema(input: ArticleSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
    },
    headline: input.title,
    description: input.description,
    image: resolveImage(input.image),
    author: {
      '@type': 'Person',
      name: input.author || SITE_NAME,
      url: 'https://www.linkedin.com/in/matthew-lin-profilepage/',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/hotelinairport.png`,
      },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    url: input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
  };
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export function buildFaqPageSchema(items: FaqSchemaItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface ItemListSchemaItem {
  name: string;
  url: string;
}

export function buildItemListSchema(listName: string, items: ItemListSchemaItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export interface LodgingBusinessInput {
  name: string;
  url?: string | null;
  description?: string | null;
  city?: string | null;
  country?: string | null;
  airportName?: string | null;
}

export function buildLodgingBusinessSchema(input: LodgingBusinessInput): object | null {
  if (!input.name) return null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: input.name,
  };

  if (input.url) schema.url = input.url;
  if (input.description) schema.description = input.description;

  const addressParts: Record<string, unknown> = {
    '@type': 'PostalAddress',
  };
  let hasAddress = false;
  if (input.city) {
    addressParts.addressLocality = input.city;
    hasAddress = true;
  }
  if (input.country) {
    addressParts.addressCountry = input.country;
    hasAddress = true;
  }
  if (hasAddress) schema.address = addressParts;

  if (input.airportName) {
    schema.containedInPlace = {
      '@type': 'Airport',
      name: input.airportName,
    };
  }

  return schema;
}
