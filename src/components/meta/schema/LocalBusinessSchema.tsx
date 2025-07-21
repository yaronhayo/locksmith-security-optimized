import React from "react";
import { getPhoneNumber } from "@/utils/phoneUtils";

export interface LocalBusinessSchemaProps {
  name?: string;
  telephone?: string;
  priceRange?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  image?: string;
  sameAs?: string[];
  description?: string;
  openingHours?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  serviceAreas?: string[];
  services?: {
    name: string;
    description: string;
    url: string;
  }[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  url?: string;
  email?: string;
  paymentAccepted?: string[];
  areaServed?: {
    name: string;
    url: string;
  }[];
  hasOfferCatalog?: {
    name: string;
    itemListElement: {
      name: string;
      description: string;
    }[];
  };
}

const defaultProps: LocalBusinessSchemaProps = {
  name: "247 Locksmith & Security",
  telephone: getPhoneNumber(),
  priceRange: "$",
  streetAddress: "104 Harrison St",
  addressLocality: "Hoboken",
  addressRegion: "NJ",
  postalCode: "07030",
  addressCountry: "US",
  image: "/lovable-uploads/1bbeb1e6-5581-4e09-9600-7d1859bb17c5.png",
  sameAs: [
    "https://www.facebook.com/247locksmithandsecurity",
    "https://twitter.com/247locksmith",
    "https://www.instagram.com/247locksmithandsecurity"
  ],
  description: "Professional locksmith services for residential, commercial, and automotive needs. 24/7 emergency service available.",
  openingHours: [
    "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday 00:00-23:59"
  ],
  url: "https://247locksmithandsecurity.com",
  email: "info@247locksmithandsecurity.com",
  paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 50
  },
  serviceAreas: [
    "North Bergen, NJ",
    "Union City, NJ",
    "West New York, NJ",
    "Guttenberg, NJ",
    "Weehawken, NJ",
    "Jersey City, NJ",
    "Hoboken, NJ",
    "Secaucus, NJ"
  ],
  areaServed: [
    { name: "North Bergen, NJ", url: "https://247locksmithandsecurity.com/service-areas/north-bergen" },
    { name: "Union City, NJ", url: "https://247locksmithandsecurity.com/service-areas/union-city" },
    { name: "West New York, NJ", url: "https://247locksmithandsecurity.com/service-areas/west-new-york" },
    { name: "Guttenberg, NJ", url: "https://247locksmithandsecurity.com/service-areas/guttenberg" },
    { name: "Weehawken, NJ", url: "https://247locksmithandsecurity.com/service-areas/weehawken" },
    { name: "Jersey City, NJ", url: "https://247locksmithandsecurity.com/service-areas/jersey-city" },
    { name: "Hoboken, NJ", url: "https://247locksmithandsecurity.com/service-areas/hoboken" },
    { name: "Secaucus, NJ", url: "https://247locksmithandsecurity.com/service-areas/secaucus" }
  ],
  services: [
    { 
      name: "Emergency Lockout Service", 
      description: "24/7 emergency lockout services for homes, businesses, and vehicles", 
      url: "https://247locksmithandsecurity.com/services/emergency-locksmith" 
    },
    { 
      name: "Car Key Replacement", 
      description: "Professional car key cutting and programming services", 
      url: "https://247locksmithandsecurity.com/services/auto-locksmith/car-key-replacement" 
    },
    { 
      name: "Residential Lock Replacement", 
      description: "Expert lock replacement services for homes", 
      url: "https://247locksmithandsecurity.com/services/residential-locksmith/lock-replacement" 
    },
    { 
      name: "Commercial Security Solutions", 
      description: "Business security system installation and maintenance", 
      url: "https://247locksmithandsecurity.com/services/commercial-locksmith" 
    }
  ],
  hasOfferCatalog: {
    name: "Locksmith Services",
    itemListElement: [
      {
        name: "Emergency Lockout Service",
        description: "24/7 emergency lockout services for homes, businesses, and vehicles"
      },
      {
        name: "Car Key Replacement",
        description: "Professional car key cutting and programming services"
      },
      {
        name: "Business Security Solutions",
        description: "Commercial security system installation and maintenance"
      }
    ]
  }
};

export const createLocalBusinessSchema = (props: LocalBusinessSchemaProps = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  
  return {
    type: 'LocalBusiness',
    data: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://247locksmithandsecurity.com/#localbusiness",
      "name": mergedProps.name,
      "telephone": mergedProps.telephone || getPhoneNumber(),
      "priceRange": mergedProps.priceRange,
      "url": mergedProps.url,
      "email": mergedProps.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": mergedProps.streetAddress,
        "addressLocality": mergedProps.addressLocality,
        "addressRegion": mergedProps.addressRegion,
        "postalCode": mergedProps.postalCode,
        "addressCountry": mergedProps.addressCountry
      },
      ...(mergedProps.image && { "image": mergedProps.image }),
      ...(mergedProps.sameAs && { "sameAs": mergedProps.sameAs }),
      ...(mergedProps.description && { "description": mergedProps.description }),
      ...(mergedProps.paymentAccepted && { "paymentAccepted": mergedProps.paymentAccepted }),
      
      // Opening hours specification
      ...(mergedProps.openingHours && { "openingHoursSpecification": mergedProps.openingHours.map(hours => {
        const [days, time] = hours.split(" ");
        const [opens, closes] = time.split("-");
        return {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": days.split(","),
          "opens": `${opens.slice(0, 2)}:${opens.slice(2)}`,
          "closes": `${closes.slice(0, 2)}:${closes.slice(2)}`
        };
      })}),
      
      // Geo coordinates
      ...(mergedProps.geo && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": mergedProps.geo.latitude,
          "longitude": mergedProps.geo.longitude
        }
      }),
      
      // Service areas
      ...(mergedProps.serviceAreas && { "serviceArea": mergedProps.serviceAreas.map(area => ({
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": mergedProps.geo?.latitude || 40.7995,
          "longitude": mergedProps.geo?.longitude || -74.0246
        },
        "geoRadius": "15000",
        "description": area
      }))}),
      
      // Areas served with links
      ...(mergedProps.areaServed && { "areaServed": mergedProps.areaServed.map(area => ({
        "@type": "City",
        "name": area.name,
        "url": area.url
      }))}),
      
      // Services offered
      ...(mergedProps.services && { "makesOffer": mergedProps.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": service.url
        }
      }))}),
      
      // Aggregate rating
      ...(mergedProps.aggregateRating && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": mergedProps.aggregateRating.ratingValue,
          "reviewCount": mergedProps.aggregateRating.reviewCount
        }
      }),
      
      // Service catalog
      ...(mergedProps.hasOfferCatalog && {
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": mergedProps.hasOfferCatalog.name,
          "itemListElement": mergedProps.hasOfferCatalog.itemListElement.map(item => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": item.name,
              "description": item.description
            }
          }))
        }
      })
    }
  };
};