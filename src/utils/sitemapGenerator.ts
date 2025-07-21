/**
 * Enhanced sitemap generator with improved SEO and search engine indexing
 */

// Define interfaces for route types
interface SitemapRoute {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
  alternates?: { hreflang: string; href: string }[];
}

// Define static routes for the sitemap to avoid import issues
const mainRoutes: SitemapRoute[] = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/reviews', priority: 0.8, changefreq: 'daily' },
  { path: '/faq', priority: 0.7, changefreq: 'weekly' },
  { path: '/book-online', priority: 1.0, changefreq: 'daily' },
  { path: '/service-areas', priority: 0.9, changefreq: 'weekly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'monthly' },
  { path: '/terms-conditions', priority: 0.3, changefreq: 'monthly' },
  { path: '/sitemap', priority: 0.3, changefreq: 'weekly' },
];

const serviceRoutes: SitemapRoute[] = [
  // Service category pages - high priority
  { path: '/services/emergency-locksmith', priority: 0.9, changefreq: 'weekly' },
  { path: '/services/residential-locksmith', priority: 0.9, changefreq: 'weekly' },
  { path: '/services/commercial-locksmith', priority: 0.9, changefreq: 'weekly' },
  { path: '/services/auto-locksmith', priority: 0.9, changefreq: 'weekly' },
  
  // Emergency locksmith services - high priority for emergency services
  { path: '/services/emergency-locksmith/car-lockout', priority: 0.9, changefreq: 'daily' },
  { path: '/services/emergency-locksmith/house-lockout', priority: 0.9, changefreq: 'daily' },
  { path: '/services/emergency-locksmith/business-lockout', priority: 0.9, changefreq: 'daily' },
  { path: '/services/emergency-locksmith/storage-unit-lockout', priority: 0.8, changefreq: 'weekly' },
  
  // Residential locksmith services
  { path: '/services/residential-locksmith/lock-replacement', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/residential-locksmith/lock-rekey', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/residential-locksmith/lock-repair', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/residential-locksmith/gate-locks', priority: 0.8, changefreq: 'weekly' },
  
  // Commercial locksmith services
  { path: '/services/commercial-locksmith/lock-replacement', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/commercial-locksmith/lock-rekey', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/commercial-locksmith/emergency-exit-device', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/commercial-locksmith/master-key', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/commercial-locksmith/access-control', priority: 0.8, changefreq: 'weekly' },
  
  // Auto locksmith services
  { path: '/services/auto-locksmith/car-key-replacement', priority: 0.9, changefreq: 'daily' },
  { path: '/services/auto-locksmith/key-fob-programming', priority: 0.9, changefreq: 'daily' },
  { path: '/services/auto-locksmith/car-key-duplicate', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/auto-locksmith/car-key-cutting', priority: 0.8, changefreq: 'weekly' },
  { path: '/services/auto-locksmith/ignition-lock-cylinder', priority: 0.8, changefreq: 'weekly' },
];

const serviceAreaRoutes: SitemapRoute[] = [
  { path: '/service-areas', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/north-bergen', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/union-city', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/west-new-york', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/weehawken', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/jersey-city', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/hoboken', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/secaucus', priority: 0.9, changefreq: 'weekly' },
  { path: '/service-areas/guttenberg', priority: 0.9, changefreq: 'weekly' },
];

/**
 * Generate the sitemap XML content with enhanced SEO features
 */
export function generateSitemapXml(baseUrl: string = 'https://247locksmithandsecurity.com'): string {
  // Get today's date for lastmod fields that don't have a specific date
  const today = new Date().toISOString().split('T')[0];
  
  // Start XML sitemap with appropriate headers
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

  // Combined routes from all sections
  const allRoutes = [...mainRoutes, ...serviceRoutes, ...serviceAreaRoutes];

  // Generate URL entries for each route
  allRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod || today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    
    // Add alternate language versions if available
    if (route.alternates && route.alternates.length > 0) {
      route.alternates.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`;
      });
    }
    
    // Add mobile specific tag for Google
    xml += '    <mobile:mobile/>\n';
    
    xml += '  </url>\n';
  });

  // Close the XML sitemap
  xml += '</urlset>';

  return xml;
}

/**
 * Generate a separate sitemap for service pages
 */
export function generateServiceSitemapXml(baseUrl: string = 'https://247locksmithandsecurity.com'): string {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

  serviceRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod || today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    xml += '    <mobile:mobile/>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Generate a separate sitemap for location pages
 */
export function generateLocationSitemapXml(baseUrl: string = 'https://247locksmithandsecurity.com'): string {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

  serviceAreaRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod || today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    xml += '    <mobile:mobile/>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Generate a sitemap index file that references all sitemaps
 */
export function generateSitemapIndexXml(baseUrl: string = 'https://247locksmithandsecurity.com'): string {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-services.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-locations.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '</sitemapindex>';
  return xml;
}