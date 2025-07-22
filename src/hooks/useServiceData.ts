import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { serviceData, ServiceData } from '@/data/serviceData';

/**
 * Hook to get service data based on the current route
 * @param serviceSlug Optional service slug to override the route param
 * @returns Service data for the current service
 */
export function useServiceData(serviceSlug?: string): ServiceData | null {
  const params = useParams<{ serviceSlug?: string; categorySlug?: string }>();
  const slug = serviceSlug || params.serviceSlug;
  
  return useMemo(() => {
    if (!slug) return null;
    
    // Try to find the service by slug
    const service = serviceData[slug];
    if (service) return service;
    
    // If not found by direct slug, try to find by matching the end of the path
    const matchingService = Object.values(serviceData).find(svc => 
      slug.endsWith(svc.slug)
    );
    
    return matchingService || null;
  }, [slug]);
}

/**
 * Hook to get all service data
 * @returns All service data
 */
export function useAllServiceData(): ServiceData[] {
  return useMemo(() => Object.values(serviceData), []);
}

/**
 * Hook to get services by category
 * @param category The category to filter by
 * @returns Array of services in the specified category
 */
export function useServicesByCategory(category: string): ServiceData[] {
  return useMemo(() => {
    return Object.values(serviceData).filter(
      service => service.category.toLowerCase() === category.toLowerCase()
    );
  }, [category]);
}

/**
 * Hook to get related services based on the current service
 * @param currentServiceSlug The slug of the current service
 * @param limit Maximum number of related services to return
 * @returns Array of related services
 */
export function useRelatedServices(currentServiceSlug: string, limit: number = 3): ServiceData[] {
  const currentService = useServiceData(currentServiceSlug);
  
  return useMemo(() => {
    if (!currentService || !currentService.relatedServices) return [];
    
    // Get related services based on the relatedServices array
    const related = currentService.relatedServices
      .map(slug => serviceData[slug])
      .filter(Boolean);
    
    return related.slice(0, limit);
  }, [currentService, limit]);
}

export default useServiceData;