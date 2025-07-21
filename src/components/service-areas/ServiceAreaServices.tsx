import React from 'react';
import { useLocationData } from '@/hooks/useLocationData';
import { Link } from 'react-router-dom';

interface ServiceAreaServicesProps {
  locationSlug: string;
}

/**
 * ServiceAreaServices component for displaying services available in a specific location
 * This helps improve local SEO by connecting services with locations
 */
const ServiceAreaServices: React.FC<ServiceAreaServicesProps> = ({
  locationSlug
}) => {
  // Get location data
  const location = useLocationData(locationSlug);
  
  if (!location) return null;
  
  // Define services with location-specific descriptions
  const services = [
    {
      name: 'Emergency Locksmith',
      slug: 'emergency-locksmith',
      description: `24/7 emergency locksmith services in ${location.name}, NJ. Fast response for car lockouts, home lockouts, and business lockouts.`,
      icon: '🔑'
    },
    {
      name: 'Residential Locksmith',
      slug: 'residential-locksmith',
      description: `Professional residential locksmith services in ${location.name}, NJ. Lock installation, repair, rekey, and security upgrades for homes.`,
      icon: '🏠'
    },
    {
      name: 'Commercial Locksmith',
      slug: 'commercial-locksmith',
      description: `Expert commercial locksmith solutions in ${location.name}, NJ. Master key systems, access control, and high-security locks for businesses.`,
      icon: '🏢'
    },
    {
      name: 'Auto Locksmith',
      slug: 'auto-locksmith',
      description: `Professional automotive locksmith services in ${location.name}, NJ. Car key replacement, key fob programming, and car lockout assistance.`,
      icon: '🚗'
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Our Locksmith Services in {location.name}, {location.state}
        </h2>
        <p className="text-center mb-8 max-w-3xl mx-auto">
          We offer a comprehensive range of professional locksmith services throughout {location.name} and surrounding areas.
          Our licensed and insured technicians are available 24/7 for all your security needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.slug} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="text-3xl mr-4">{service.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link 
                      to={`/services/${service.slug}`}
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      {service.name} in {location.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="text-primary hover:text-secondary font-medium transition-colors flex items-center"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/book-online" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            Book a Locksmith in {location.name}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaServices;