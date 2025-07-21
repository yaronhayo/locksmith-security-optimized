import React from 'react';
import { useAllLocationData } from '@/hooks/useLocationData';
import { Link } from 'react-router-dom';

interface ServiceLocationEnhancerProps {
  serviceSlug: string;
  parentServiceSlug?: string;
  limit?: number;
}

/**
 * ServiceLocationEnhancer component for adding location-specific content to service pages
 * This helps improve local SEO by naturally incorporating location keywords
 */
const ServiceLocationEnhancer: React.FC<ServiceLocationEnhancerProps> = ({
  serviceSlug,
  parentServiceSlug,
  limit = 8
}) => {
  // Get all location data
  const locations = useAllLocationData();
  
  // Limit the number of locations shown
  const displayLocations = locations.slice(0, limit);
  
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Service Areas</h2>
        <p className="text-center mb-6">
          We provide professional {serviceSlug.replace(/-/g, ' ')} services throughout Hudson County, NJ including:
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayLocations.map(location => (
            <div key={location.slug} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">
                <Link 
                  to={`/service-areas/${location.slug}`}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  {location.name}, {location.state}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">
                Professional {serviceSlug.replace(/-/g, ' ')} services in {location.name}. Fast response times and competitive rates.
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/service-areas" 
            className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            View All Service Areas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocationEnhancer;