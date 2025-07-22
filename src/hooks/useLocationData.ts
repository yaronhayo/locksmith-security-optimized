import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { locationData, LocationData } from '@/data/locationData';

/**
 * Hook to get location data based on the current route
 * @param locationSlug Optional location slug to override the route param
 * @returns Location data for the current location
 */
export function useLocationData(locationSlug?: string): LocationData | null {
  const params = useParams<{ locationSlug?: string }>();
  const slug = locationSlug || params.locationSlug;
  
  return useMemo(() => {
    if (!slug) return null;
    
    // Try to find the location by slug
    const location = locationData[slug];
    if (location) return location;
    
    // If not found by direct slug, try to find by matching the end of the path
    const matchingLocation = Object.values(locationData).find(loc => 
      slug.endsWith(loc.slug)
    );
    
    return matchingLocation || null;
  }, [slug]);
}

/**
 * Hook to get all location data
 * @returns All location data
 */
export function useAllLocationData(): LocationData[] {
  return useMemo(() => Object.values(locationData), []);
}

/**
 * Hook to get nearby locations based on the current location
 * @param currentLocationSlug The slug of the current location
 * @param limit Maximum number of nearby locations to return
 * @returns Array of nearby locations
 */
export function useNearbyLocations(currentLocationSlug: string, limit: number = 3): LocationData[] {
  const currentLocation = useLocationData(currentLocationSlug);
  
  return useMemo(() => {
    if (!currentLocation || !currentLocation.nearbyAreas) return [];
    
    // Get nearby locations based on the nearbyAreas array
    const nearby = currentLocation.nearbyAreas
      .map(area => {
        // Find the location data that matches this nearby area name
        return Object.values(locationData).find(loc => 
          loc.name.toLowerCase() === area.toLowerCase()
        );
      })
      .filter(Boolean) as LocationData[];
    
    return nearby.slice(0, limit);
  }, [currentLocation, limit]);
}

export default useLocationData;