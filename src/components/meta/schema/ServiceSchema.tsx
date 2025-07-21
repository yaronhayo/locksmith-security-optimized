import React from "react";
import { getPhoneNumber } from "@/utils/phoneUtils";

export interface ServiceSchemaProps {
  name: string;
  description: string;
  url?: string;
  image?: string;
  provider?: {
    name: string;
    url: string;
  };
  serviceArea?: string[];
  serviceType?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
  areaServed?: {
    name: string;
    url?: string;
  }[];
  sameAs?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

const defaultProps: Partial<ServiceSchemaProps> = {
  provider: {
    name: "Locksmith & Security LLC",
    url: "https://247locksmithandsecurity.com"
  },
  serviceArea: [
    "North Bergen, NJ",
    "Union City, NJ",
    "West New York, NJ",
    "Guttenberg, NJ",
    "Weehawken, NJ",
    "Jersey City, NJ",
    "Hoboken, NJ",
    "Secaucus, NJ"
  ],
  offers: {
    priceCurrency: "USD",
    availability: "InStock"
  },
  sameAs: [
    "https://www.facebook.com/247locksmithandsecurity",
    "https://twitter.com/247locksmith",
    "https://www.instagram.com/247locksmithandsecurity"
  ],
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 50
  }
};

export const createServiceSchema = (props: ServiceSchemaProps) => {
  const mergedProps = { ...defaultProps, ...props };
  
  // Ensure provider has required properties
  const provider = {
    ...defaultProps.provider,
    ...mergedProps.provider
  };
  
  // Ensure offers has required properties
  const offers = {
    ...defaultProps.offers,
    ...mergedProps.offers
  };
  
  return {
    type: 'Service',
    data: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${provider.url}#service-${mergedProps.name.toLowerCase().replace(/\s+/g, '-')}`,
      "name": mergedProps.name,
      "description": mergedProps.description,
      "url": mergedProps.url || `${provider.url}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": provider.name,
        "url": provider.url,
        "telephone": getPhoneNumber()
      },
      ...(mergedProps.image && { "image": mergedProps.image }),
      ...(mergedProps.serviceType && { "serviceType": mergedProps.serviceType }),
      ...(mergedProps.sameAs && { "sameAs": mergedProps.sameAs }),
      
      // Service areas
      ...(mergedProps.serviceArea && { 
        "serviceArea": mergedProps.serviceArea.map(area => ({
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 40.7995,
            "longitude": -74.0246
          },
          "geoRadius": "15000",
          "description": area
        }))
      }),
      
      // Areas served with links
      ...(mergedProps.areaServed && { 
        "areaServed": mergedProps.areaServed.map(area => ({
          "@type": "City",
          "name": area.name,
          ...(area.url && { "url": area.url })
        }))
      }),
      
      // Offers
      ...(offers && {
        "offers": {
          "@type": "Offer",
          ...(offers.price && { "price": offers.price }),
          "priceCurrency": offers.priceCurrency,
          "availability": `https://schema.org/${offers.availability}`
        }
      }),
      
      // Aggregate rating
      ...(mergedProps.aggregateRating && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": mergedProps.aggregateRating.ratingValue,
          "reviewCount": mergedProps.aggregateRating.reviewCount
        }
      })
    }
  };
};

export default createServiceSchema;