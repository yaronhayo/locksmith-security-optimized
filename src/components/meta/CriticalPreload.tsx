import React from 'react';
import { Helmet } from 'react-helmet';

interface CriticalPreloadProps {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
  styles?: string[];
  domains?: string[];
}

/**
 * CriticalPreload component for preloading critical resources
 * This helps improve LCP and other Core Web Vitals metrics
 */
const CriticalPreload: React.FC<CriticalPreloadProps> = ({
  images = [],
  fonts = [],
  scripts = [],
  styles = [],
  domains = []
}) => {
  // Default critical resources
  const defaultImages = [
    'https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/uploads//Locksmithandsecuritylogo.jpg'
  ];
  
  const defaultFonts = [
    'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&display=swap'
  ];
  
  const defaultDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'mtbgayqzjrxjjmsjikcg.supabase.co',
    'maps.googleapis.com',
    'static.cloudflareinsights.com'
  ];
  
  // Combine default and custom resources
  const allImages = [...defaultImages, ...images];
  const allFonts = [...defaultFonts, ...fonts];
  const allScripts = [...scripts];
  const allStyles = [...styles];
  const allDomains = [...defaultDomains, ...domains];
  
  return (
    <Helmet>
      {/* Preload critical images */}
      {allImages.map((image, index) => (
        <link 
          key={`preload-image-${index}`}
          rel="preload" 
          href={image} 
          as="image" 
          fetchPriority="high"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Preload critical fonts */}
      {allFonts.map((font, index) => (
        <link 
          key={`preload-font-${index}`}
          rel="preload" 
          href={font} 
          as="style"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Preload critical scripts */}
      {allScripts.map((script, index) => (
        <link 
          key={`preload-script-${index}`}
          rel="preload" 
          href={script} 
          as="script"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Preload critical styles */}
      {allStyles.map((style, index) => (
        <link 
          key={`preload-style-${index}`}
          rel="preload" 
          href={style} 
          as="style"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* DNS prefetch and preconnect for critical domains */}
      {allDomains.map((domain, index) => (
        <React.Fragment key={`domain-${index}`}>
          <link rel="dns-prefetch" href={`https://${domain}`} />
          <link rel="preconnect" href={`https://${domain}`} crossOrigin="anonymous" />
        </React.Fragment>
      ))}
    </Helmet>
  );
};

export default CriticalPreload;