/**
 * Location data for service areas
 * This data is used for location-specific meta tags and structured data
 */

export interface LocationData {
  name: string;
  state: string;
  region: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  neighborhoods?: string[];
  landmarks?: string[];
  nearbyAreas?: string[];
  description?: string;
  slug: string;
  services?: string[];
}

export const locationData: Record<string, LocationData> = {
  'north-bergen': {
    name: 'North Bergen',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07047',
    latitude: 40.7995,
    longitude: -74.0246,
    slug: 'north-bergen',
    neighborhoods: [
      'Bergenline Avenue', 
      'Tonnelle Avenue', 
      'Kennedy Boulevard', 
      'Woodcliff'
    ],
    landmarks: [
      'James J. Braddock North Hudson Park', 
      'North Bergen High School', 
      'Palisades Medical Center'
    ],
    nearbyAreas: [
      'Union City', 
      'West New York', 
      'Guttenberg', 
      'Secaucus'
    ],
    description: 'Professional locksmith services in North Bergen, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'union-city': {
    name: 'Union City',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07087',
    latitude: 40.7795,
    longitude: -74.0246,
    slug: 'union-city',
    neighborhoods: [
      'Summit Avenue', 
      'Bergenline Avenue', 
      'Central Avenue', 
      'Park Avenue'
    ],
    landmarks: [
      'Union City High School', 
      'Firefighters Memorial Park', 
      'Washington Park'
    ],
    nearbyAreas: [
      'North Bergen', 
      'West New York', 
      'Hoboken', 
      'Jersey City'
    ],
    description: 'Professional locksmith services in Union City, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'west-new-york': {
    name: 'West New York',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07093',
    latitude: 40.7878,
    longitude: -74.0143,
    slug: 'west-new-york',
    neighborhoods: [
      'Bergenline Avenue', 
      'Boulevard East', 
      'Park Avenue', 
      'Kennedy Boulevard'
    ],
    landmarks: [
      'Donnelly Memorial Park', 
      'West New York Public Library', 
      'Miller Stadium'
    ],
    nearbyAreas: [
      'North Bergen', 
      'Union City', 
      'Guttenberg', 
      'Weehawken'
    ],
    description: 'Professional locksmith services in West New York, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'guttenberg': {
    name: 'Guttenberg',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07093',
    latitude: 40.7959,
    longitude: -74.0043,
    slug: 'guttenberg',
    neighborhoods: [
      'Bergenline Avenue', 
      'Boulevard East', 
      'Park Avenue'
    ],
    landmarks: [
      'Waterfront Park', 
      'Anna L. Klein School', 
      'Galaxy Towers'
    ],
    nearbyAreas: [
      'North Bergen', 
      'West New York', 
      'Union City', 
      'Weehawken'
    ],
    description: 'Professional locksmith services in Guttenberg, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'weehawken': {
    name: 'Weehawken',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07086',
    latitude: 40.7684,
    longitude: -74.0218,
    slug: 'weehawken',
    neighborhoods: [
      'Boulevard East', 
      'Port Imperial', 
      'The Heights', 
      'King Avenue'
    ],
    landmarks: [
      'Hamilton Park', 
      'Weehawken Waterfront Park', 
      'Lincoln Harbor'
    ],
    nearbyAreas: [
      'Hoboken', 
      'Union City', 
      'West New York', 
      'Jersey City'
    ],
    description: 'Professional locksmith services in Weehawken, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'jersey-city': {
    name: 'Jersey City',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07302',
    latitude: 40.7282,
    longitude: -74.0776,
    slug: 'jersey-city',
    neighborhoods: [
      'Downtown', 
      'Journal Square', 
      'The Heights', 
      'Newport', 
      'Greenville', 
      'West Side'
    ],
    landmarks: [
      'Liberty State Park', 
      'Newport Centre Mall', 
      'Exchange Place', 
      'Journal Square Transportation Center'
    ],
    nearbyAreas: [
      'Hoboken', 
      'Bayonne', 
      'Union City', 
      'New York City'
    ],
    description: 'Professional locksmith services in Jersey City, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'hoboken': {
    name: 'Hoboken',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07030',
    latitude: 40.7439,
    longitude: -74.0323,
    slug: 'hoboken',
    neighborhoods: [
      'Downtown', 
      'Uptown', 
      'Waterfront', 
      'Southwest'
    ],
    landmarks: [
      'Pier A Park', 
      'Stevens Institute of Technology', 
      'Hoboken Terminal', 
      'Washington Street'
    ],
    nearbyAreas: [
      'Jersey City', 
      'Weehawken', 
      'Union City', 
      'New York City'
    ],
    description: 'Professional locksmith services in Hoboken, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  },
  'secaucus': {
    name: 'Secaucus',
    state: 'NJ',
    region: 'Hudson County',
    postalCode: '07094',
    latitude: 40.7895,
    longitude: -74.0565,
    slug: 'secaucus',
    neighborhoods: [
      'Harmon Cove', 
      'Meadowlands', 
      'North End', 
      'Plaza Center'
    ],
    landmarks: [
      'Secaucus Junction', 
      'Meadowlands Exposition Center', 
      'Mill Creek Mall', 
      'Laurel Hill Park'
    ],
    nearbyAreas: [
      'North Bergen', 
      'Jersey City', 
      'Rutherford', 
      'East Rutherford'
    ],
    description: 'Professional locksmith services in Secaucus, NJ. 24/7 emergency lockout assistance, lock replacement, rekeying, and security solutions for residential and commercial properties.',
    services: [
      'Emergency Lockout Service',
      'Residential Lock Replacement',
      'Commercial Security Solutions',
      'Car Key Replacement',
      'Lock Rekeying'
    ]
  }
};