import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocationData } from '@/hooks/useLocationData';
import { createLocalBusinessSchema } from './schema/LocalBusinessSchema';
import { createBreadcrumbSchema } from './schema/BreadcrumbSchema';

interface LocationStructuredDataProps {
  locationSlug: string;
  serviceSlug?: string;
  url?: string;
  image?: string;
}

/**
 * LocationStructuredData component for adding location-specific structured data
 * This helps improve local SEO for service area pages
 */
const LocationStructuredData: React.FC<LocationStructuredDataProps> = ({
  locationSlug,
  serviceSlug,
  url,
  image
}) => {
  // Get location data
  const location = useLocationData(locationSlug);
  
  if (!location) return null;
  
  // Create local business schema
  const localBusinessSchema = createLocalBusinessSchema({
    name: "Locksmith & Security LLC",
    description: `Professional locksmith services in ${location.name}, ${location.state}. 24/7 emergency service available.`,
    streetAddress: "104 Harrison St",
    addressLocality: location.name,
    addressRegion: location.state,
    postalCode: location.postalCode,
    geo: {
      latitude: location.latitude,
      longitude: location.longitude
    },
    serviceAreas: [
      `${location.name}, ${location.state}`
    ],
    areaServed: [
      { name: `${location.name}, ${location.state}`, url: `https://247locksmithandsecurity.com/service-areas/${location.slug}` }
    ],
    image: image || "/lovable-uploads/1bbeb1e6-5581-4e09-9600-7d1859bb17c5.png"
  });
  
  // Create breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Service Areas', item: '/service-areas' },
    { name: location.name, item: `/service-areas/${location.slug}` }
  ];
  
  // Add service if exists
  if (serviceSlug) {
    breadcrumbItems.push({
      name: serviceSlug.replace(/-/g, ' '),
      item: `/services/${serviceSlug}`
    });
  }
  
  const breadcrumbSchema = createBreadcrumbSchema({
    breadcrumbs: breadcrumbItems
  });
  
  // Combine all schemas
  const schemas = [localBusinessSchema, breadcrumbSchema];
  
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script 
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.data) }}
        />
      ))}
    </Helmet>
  );
};

export default LocationStructuredData;