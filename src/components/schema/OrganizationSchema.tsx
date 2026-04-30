import { empresaData, contactoData } from '@/data/scraped-content';

interface SchemaBase {
  '@context': string;
  '@type': string;
}

interface OrganizationSchema extends SchemaBase {
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  foundingDate: string;
}

interface LocalBusinessSchema extends SchemaBase {
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: string;
    longitude: string;
  };
  openingHours: string;
  priceRange: string;
}

type SchemaType = OrganizationSchema | LocalBusinessSchema;

const SITE_URL = 'https://nexosingenieria.com';

function createOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: empresaData.nombre,
    description: empresaData.descripcion,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-original.png`,
    sameAs: [
      contactoData.redesSociales.linkedin,
      contactoData.redesSociales.facebook,
      contactoData.redesSociales.instagram,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactoData.direccion,
      addressLocality: contactoData.ciudad,
      addressRegion: contactoData.departamento,
      addressCountry: 'CO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactoData.telefono,
      contactType: 'customer service',
      availableLanguage: ['Spanish'],
    },
    foundingDate: empresaData.fundacion.toString(),
  };
}

function createLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: empresaData.nombre,
    description: empresaData.descripcionCorta,
    url: SITE_URL,
    telephone: contactoData.telefono,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactoData.direccion,
      addressLocality: contactoData.ciudad,
      addressRegion: contactoData.departamento,
      addressCountry: 'CO',
    },
    openingHours: 'Mo-Fr 08:00-18:00',
    priceRange: '$$$',
  };
}

interface JsonLdScriptProps {
  schema: ExtendedSchemaType | ExtendedSchemaType[];
}

function JsonLdScript({ schema }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function OrganizationSchema() {
  return <JsonLdScript schema={createOrganizationSchema()} />;
}

export function LocalBusinessSchema() {
  return <JsonLdScript schema={createLocalBusinessSchema()} />;
}

interface ServiceSchema extends SchemaBase {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  areaServed: {
    '@type': 'Country';
    name: string;
  };
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: {
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
      };
    }[];
  };
}

interface ArticleSchema extends SchemaBase {
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

interface BreadcrumbListSchema extends SchemaBase {
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

type ExtendedSchemaType = SchemaType | ServiceSchema | ArticleSchema | BreadcrumbListSchema;

function createServiceSchema(serviceName: string, description: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: empresaData.nombre,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Colombia',
    },
  };
}

function createArticleSchema(title: string, description: string, slug: string, date: string): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: empresaData.nombre,
    },
    publisher: {
      '@type': 'Organization',
      name: empresaData.nombre,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-original.png`,
      },
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}

function createBreadcrumbListSchema(items: { name: string; url: string }[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function ServiceSchema({ name, description }: { name: string; description: string }) {
  return <JsonLdScript schema={createServiceSchema(name, description)} />;
}

export function ArticleSchema({ title, description, slug, date }: { title: string; description: string; slug: string; date: string }) {
  return <JsonLdScript schema={createArticleSchema(title, description, slug, date)} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return <JsonLdScript schema={createBreadcrumbListSchema(items)} />;
}

export function CombinedSchemas() {
  const schemas = [createOrganizationSchema(), createLocalBusinessSchema()];
  return <JsonLdScript schema={schemas} />;
}
