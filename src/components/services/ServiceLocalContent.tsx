import React from 'react';
import { useServiceData } from '@/hooks/useServiceData';
import { useLocationData, useNearbyLocations } from '@/hooks/useLocationData';
import { Link } from 'react-router-dom';

interface ServiceLocalContentProps {
  serviceSlug: string;
  locationSlug?: string;
}

/**
 * ServiceLocalContent component for adding location-specific content to service pages
 * This helps improve local SEO by naturally incorporating location keywords and nearby areas
 */
const ServiceLocalContent: React.FC<ServiceLocalContentProps> = ({
  serviceSlug,
  locationSlug
}) => {
  // Get service data
  const service = useServiceData(serviceSlug);
  
  // Get location data if provided
  const location = locationSlug ? useLocationData(locationSlug) : null;
  
  // Get nearby locations if current location is provided
  const nearbyLocations = locationSlug ? useNearbyLocations(locationSlug, 4) : [];
  
  if (!service) return null;
  
  // Format service name for display
  const serviceName = service.name;
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {location ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {serviceName} in {location.name}, {location.state}
            </h2>
            <p className="mb-4">
              Our professional {serviceName.toLowerCase()} services are available throughout {location.name} and surrounding areas. 
              We provide fast, reliable service with competitive rates and experienced technicians.
            </p>
            
            {location.neighborhoods && location.neighborhoods.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Neighborhoods We Serve in {location.name}</h3>
                <p className="mb-2">
                  We provide {serviceName.toLowerCase()} services in all neighborhoods of {location.name}, including:
                </p>
                <div className="flex flex-wrap gap-2">
                  {location.neighborhoods.map((neighborhood, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {nearbyLocations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Also Serving Nearby Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
                        {serviceName} services also available in {nearby.name}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {serviceName} Services Throughout Hudson County, NJ
            </h2>
            <p className="mb-4">
              Our professional {serviceName.toLowerCase()} services are available throughout Hudson County, NJ. 
              We provide fast, reliable service with competitive rates and experienced technicians in North Bergen, 
              Union City, West New York, Guttenberg, Weehawken, Jersey City, Hoboken, Secaucus, and surrounding areas.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Find {serviceName} Services Near You</h3>
              <p className="mb-4">
                Click on your location below to learn more about our {serviceName.toLowerCase()} services in your area:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">
                    <Link 
                      to="/service-areas/north-bergen"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      North Bergen, NJ
                    </Link>
                  </h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">
                    <Link 
                      to="/service-areas/union-city"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      Union City, NJ
                    </Link>
                  </h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">
                    <Link 
                      to="/service-areas/jersey-city"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      Jersey City, NJ
                    </Link>
                  </h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">
                    <Link 
                      to="/service-areas/hoboken"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      Hoboken, NJ
                    </Link>
                  </h4>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  to="/service-areas" 
                  className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  View All Service Areas
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceLocalContent;