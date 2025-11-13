export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://jvseoagency.com/#organization',
    name: 'JVSEOAGENCY',
    alternateName: 'JV SEO Agency',
    url: 'https://jvseoagency.com',
    logo: 'https://jvseoagency.com/logo.png',
    image: 'https://jvseoagency.com/og-image.jpg',
    description: 'Agencia de desarrollo web y aplicaciones móviles en Madrid, España. Especialistas en desarrollo web profesional, aplicaciones móviles y automatizaciones con Inteligencia Artificial. Servicios para empresas en Madrid y toda España.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Madrid',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
      addressCountryName: 'España',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Madrid',
      },
      {
        '@type': 'Country',
        name: 'España',
      },
    ],
    serviceArea: {
      '@type': 'City',
      name: 'Madrid',
    },
    telephone: '+34618967972',
    email: 'info@jvseoagency.es',
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
      timeZone: 'Europe/Madrid',
    },
    sameAs: [
      // Agrega tus redes sociales aquí cuando las tengas
      // 'https://www.linkedin.com/company/jvseoagency',
      // 'https://twitter.com/jvseoagency',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Desarrollo Web',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desarrollo Web en Madrid',
            description: 'Desarrollo web profesional para empresas en Madrid',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aplicaciones Móviles en Madrid',
            description: 'Desarrollo de apps móviles para iOS y Android en Madrid',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automatizaciones con IA',
            description: 'Automatizaciones inteligentes con Inteligencia Artificial',
          },
        },
      ],
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Desarrollo Web y Aplicaciones Móviles',
    provider: {
      '@type': 'LocalBusiness',
      name: 'JVSEOAGENCY',
    },
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
    },
    description: 'Servicios de desarrollo web profesional, aplicaciones móviles y automatizaciones con IA en Madrid, España.',
    offers: {
      '@type': 'Offer',
      areaServed: 'Madrid',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JVSEOAGENCY',
    url: 'https://jvseoagency.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://jvseoagency.com/buscar?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

