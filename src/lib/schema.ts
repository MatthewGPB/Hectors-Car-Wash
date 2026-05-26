import siteData from '../data/site.json';
import locationsData from '../data/locations.json';

type Location = (typeof locationsData.locations)[number];

const SITE_URL = 'https://hectorcarwash.com';

function locationSchema(loc: Location) {
  const fullStreet = `${loc.address.street}`;
  return {
    '@type': 'CarWash',
    '@id': `${SITE_URL}/locations/${loc.slug}#location`,
    name: `${siteData.brand.name} — ${loc.name}`,
    url: `${SITE_URL}/locations/${loc.slug}`,
    telephone: loc.phoneE164,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: fullStreet,
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

export function generateHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
      },
      ...locationsData.locations.map(locationSchema),
    ],
  };
}

export function generateLocationSchema(slug: string) {
  const loc = locationsData.locations.find((l) => l.slug === slug);
  if (!loc) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: siteData.brand.name,
        url: `${SITE_URL}/`,
      },
      locationSchema(loc),
    ],
  };
}
