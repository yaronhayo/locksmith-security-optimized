import React from 'react';
import { useLocationData, useNearbyLocations } from '@/hooks/useLocationData';
import { Link } from 'react-router-dom';

interface ServiceAreaLocalContentProps {
  locationSlug: string;
}

/**
 * ServiceAreaLocalContent component for adding location-specific content to service area pages
 * This helps improve local SEO by naturally incorporating location keywords, neighborhoods, and landmarks
 */
const ServiceAreaLocalContent: React.FC<ServiceAreaLocalContentProps> = ({
  locationSlug
}) => {
  // Get location data
  const location = useLocationData(locationSlug);
  
  // Get nearby locations
  const nearbyLocations = useNearbyLocations(locationSlug, 4);
  
  if (!location) return null;
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">
          Professional Locksmith Services in {location.name}, {location.state}
        </h2>
        
        <p className="mb-6">
          Locksmith & Security LLC provides professional locksmith and security services throughout {location.name}, {location.state}. 
          Our team of licensed and insured locksmiths offers 24/7 emergency service, residential and commercial lock solutions, 
          automotive locksmith services, and security system installation.
        </p>
        
        {location.neighborhoods && location.neighborhoods.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Neighborhoods We Serve in {location.name}</h3>
            <p className="mb-4">
              We provide locksmith services in all neighborhoods of {location.name}, including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.neighborhoods.map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{neighborhood}</h4>
                  <p className="text-sm text-gray-600">
                    24/7 locksmith service available
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {location.landmarks && location.landmarks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Serving Areas Near Popular Landmarks</h3>
            <p className="mb-4">
              Our mobile locksmith service is available near these popular {location.name} landmarks:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {location.landmarks.map((landmark, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{landmark}</h4>
                  <p className="text-sm text-gray-600">
                    Fast response times in this area
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {nearbyLocations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Also Serving Nearby Areas</h3>
            <p className="mb-4">
              In addition to {location.name}, we also provide locksmith services in these nearby areas:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyLocations.map(nearby => (
                <div key={nearby.slug} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">
                    <Link 
                      to={`/service-areas/${nearby.slug}`}
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      {nearby.name}, {nearby.state}
                    </Link>
                  </h4>
                  <p className="text-sm text-gray-600">
                    Full locksmith services available
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-10 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Contact Our {location.name} Locksmith Team</h3>
          <p className="mb-4">
            Need a locksmith in {location.name}? Our team is ready to help with any lock and key emergency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+12017482070" 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors text-center"
            >
              Call (201) 748-2070
            </a>
            <Link 
              to="/book-online" 
              className="bg-white border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaLocalContent;