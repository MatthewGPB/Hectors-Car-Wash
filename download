import siteData from '../data/site.json';
import locationsData from '../data/locations.json';

type Location = (typeof locationsData.locations)[number];

const SITE_URL = 'https://hectorcarwash.com';

function locationSchema(loc: Location) {
  return {
    '@type': 'CarWash',
    '@id': `${SITE_URL}/locations/${loc.slug}#location`,
    name: `${siteData.brand.name} — ${loc.name}`,
    url: `${SITE_URL}/locations/${loc.slug}`,
    telephone: loc.phoneE164,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: loc.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: loc.areaServed.map((city) => ({ '@type': 'City', name: city })),
  };
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: siteData.brand.name,
    url: `${SITE_URL}/`,
    description: siteData.brand.tagline,
    founder: { '@type': 'Person', name: siteData.brand.founder },
    foundingDate: siteData.brand.founded,
    sameAs: [
      siteData.social.facebook,
      siteData.social.instagram,
      siteData.social.tiktok,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteData.primary.phoneE164,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.brand.rating,
      reviewCount: siteData.brand.reviewCount,
    },
  };
}

export function generateHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      ...locationsData.locations.map(locationSchema),
    ],
  };
}

export function generateLocationPageSchema(slug: string) {
  const loc = locationsData.locations.find((l) => l.slug === slug);
  if (!loc) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), locationSchema(loc)],
  };
}

interface ServiceSchemaArgs {
  name: string;
  description: string;
  url: string;
  priceFrom: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function generateServiceSchema({
  name,
  description,
  url,
  priceFrom,
  faqs = [],
}: ServiceSchemaArgs) {
  const graph: object[] = [
    organizationSchema(),
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: 'North Palm Beach' },
        { '@type': 'City', name: 'Jupiter' },
        { '@type': 'City', name: 'Riviera Beach' },
        { '@type': 'City', name: 'Palm Beach Gardens' },
        { '@type': 'City', name: 'West Palm Beach' },
        { '@type': 'City', name: 'Palm Beach' },
      ],
      offers: {
        '@type': 'Offer',
        price: priceFrom,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: priceFrom,
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        },
      },
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about#aboutpage`,
        name: 'About Hector David Ramirez and Hector\'s Car Wash',
        url: `${SITE_URL}/about`,
        mainEntity: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
