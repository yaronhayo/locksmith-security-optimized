import React from 'react';
import { Helmet } from 'react-helmet';
import { useServiceData } from '@/hooks/useServiceData';
import { useLocationData } from '@/hooks/useLocationData';
import { createServiceSchema } from './schema/ServiceSchema';
import { createFAQSchema } from './schema/FAQSchema';
import { createLocalBusinessSchema } from './schema/LocalBusinessSchema';
import { createBreadcrumbSchema } from './schema/BreadcrumbSchema';

interface ServiceStructuredDataProps {
  serviceSlug: string;
  locationSlug?: string;
  url?: string;
  image?: string;
}

/**
 * ServiceStructuredData component for adding service-specific structured data
 * This helps improve SEO for service pages
 */
const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({
  serviceSlug,
  locationSlug,
  url,
  image
}) => {
  // Get service and location data
  const service = useServiceData(serviceSlug);
  const location = locationSlug ? useLocationData(locationSlug) : null;
  
  if (!service) return null;
  
  // Create service schema
  const serviceSchema = createServiceSchema({
    name: service.name,
    description: service.description,
    url: url || `https://247locksmithandsecurity.com/services/${service.parentSlug || service.slug}/${service.slug}`,
    image: image,
    serviceType: service.category,
    offers: {
      price: service.price,
      priceCurrency: 'USD',
      availability: service.availability || 'InStock'
    },
    areaServed: location ? [
      { name: `${location.name}, ${location.state}`, url: `https://247locksmithandsecurity.com/service-areas/${location.slug}` }
    ] : undefined
  });
  
  // Create FAQ schema if FAQs exist
  const faqSchema = service.faqs ? createFAQSchema({
    faqs: service.faqs
  }) : null;
  
  // Create breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' }
  ];
  
  // Add parent category if exists
  if (service.parentSlug) {
    const parentService = useServiceData(service.parentSlug);
    if (parentService) {
      breadcrumbItems.push({
        name: parentService.name,
        item: `/services/${parentService.slug}`
      });
    }
  }
  
  // Add current service
  breadcrumbItems.push({
    name: service.name,
    item: `/services/${service.parentSlug || service.slug}/${service.slug}`
  });
  
  // Add location if exists
  if (location) {
    breadcrumbItems.push({
      name: location.name,
      item: `/service-areas/${location.slug}`
    });
  }
  
  const breadcrumbSchema = createBreadcrumbSchema({
    breadcrumbs: breadcrumbItems
  });
  
  // Create local business schema
  const localBusinessSchema = createLocalBusinessSchema({
    name: "Locksmith & Security LLC",
    description: `Professional ${service.name.toLowerCase()} in ${location ? location.name + ', ' + location.state : 'New Jersey'}. Licensed and insured locksmith services.`,
    ...(location && {
      geo: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
  });
  
  // Combine all schemas
  const schemas = [serviceSchema];
  if (faqSchema) schemas.push(faqSchema);
  schemas.push(breadcrumbSchema);
  schemas.push(localBusinessSchema);
  
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

export default ServiceStructuredData;