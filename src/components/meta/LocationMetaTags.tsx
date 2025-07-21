import React from 'react';
import { Helmet } from 'react-helmet';

interface LocationData {
  name: string;
  state: string;
  region: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  neighborhoods?: string[];
  landmarks?: string[];
  nearbyAreas?: string[];
}

interface LocationMetaTagsProps {
  location: LocationData;
  serviceType?: string;
}

/**
 * LocationMetaTags component for adding location-specific meta tags
 * This helps improve local SEO for service area pages
 */
const LocationMetaTags: React.FC<LocationMetaTagsProps> = ({
  location,
  serviceType
}) => {
  // Format geo position string
  const geoPosition = `${location.latitude};${location.longitude}`;
  
  // Format ICBM coordinates (same as geo position but with comma)
  const icbm = `${location.latitude}, ${location.longitude}`;
  
  // Format geo.region (state/province)
  const geoRegion = `US-${location.state}`;
  
  return (
    <Helmet>
      {/* Geo meta tags for location-based search */}
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={icbm} />
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={location.name} />
      
      {/* Location-specific business information */}
      <meta name="business:contact_data:locality" content={location.name} />
      <meta name="business:contact_data:region" content={location.state} />
      <meta name="business:contact_data:postal_code" content={location.postalCode} />
      <meta name="business:contact_data:country_name" content="United States" />
      
      {/* Service + location specific meta tags */}
      {serviceType && (
        <>
          <meta name="service:location" content={`${serviceType} in ${location.name}, ${location.state}`} />
          <meta name="service:area" content={location.name} />
          <meta name="service:type" content={serviceType} />
        </>
      )}
      
      {/* Add neighborhood keywords for local SEO */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <meta name="neighborhoods" content={location.neighborhoods.join(', ')} />
      )}
      
      {/* Add landmark keywords for local SEO */}
      {location.landmarks && location.landmarks.length > 0 && (
        <meta name="landmarks" content={location.landmarks.join(', ')} />
      )}
      
      {/* Add nearby areas for local SEO */}
      {location.nearbyAreas && location.nearbyAreas.length > 0 && (
        <meta name="nearby-areas" content={location.nearbyAreas.join(', ')} />
      )}
    </Helmet>
  );
};

export default LocationMetaTags;