import React from "react";
import { Helmet } from "react-helmet";

interface BasicMetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  noindex: boolean;
  nofollow: boolean;
  canonicalUrl: string;
  modifiedDate: string;
  language?: string;
  viewport?: string;
  themeColor?: string;
  pageType?: 'home' | 'service' | 'location' | 'contact' | 'about' | 'other';
  locationName?: string;
  serviceName?: string;
}

export const BasicMetaTags: React.FC<BasicMetaTagsProps> = ({
  title,
  description,
  keywords,
  noindex,
  nofollow,
  canonicalUrl,
  modifiedDate,
  language = "en",
  viewport = "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  themeColor = "#0F4C81",
  pageType = 'other',
  locationName,
  serviceName
}) => {
  // Ensure description stays within recommended length (150-157 characters to be safe)
  const optimizedDescription = description.length > 157 
    ? `${description.substring(0, 157)}...` 
    : description;

  // Create robots content based on props
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${!noindex ? ',max-image-preview:large,max-snippet:-1,max-video-preview:-1' : ''}`;

  // Enhance title with location or service keywords if appropriate
  let enhancedTitle = title;
  if (pageType === 'service' && serviceName && !title.includes(serviceName)) {
    enhancedTitle = `${serviceName} | ${title}`;
  } else if (pageType === 'location' && locationName && !title.includes(locationName)) {
    enhancedTitle = `${title} in ${locationName}`;
  }

  // Ensure title stays within recommended length (50-60 characters)
  const finalTitle = enhancedTitle.length > 60 
    ? `${enhancedTitle.substring(0, 57)}...` 
    : enhancedTitle;

  // Add current year to copyright
  const currentYear = new Date().getFullYear();

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content={viewport} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content={themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="author" content="Locksmith & Security LLC" />
      <meta name="copyright" content={`© ${currentYear} Locksmith & Security LLC. All rights reserved.`} />
      <meta name="last-modified" content={modifiedDate} />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="application-name" content="Locksmith & Security" />
      <meta name="apple-mobile-web-app-title" content="Locksmith & Security" />
      
      {/* Page-specific meta tags */}
      {pageType === 'home' && (
        <>
          <meta name="og:site_name" content="Locksmith & Security LLC" />
          <meta name="og:locale" content="en_US" />
        </>
      )}
      
      {pageType === 'service' && serviceName && (
        <meta name="service_type" content={serviceName} />
      )}
      
      {pageType === 'location' && locationName && (
        <meta name="geo.placename" content={locationName} />
      )}
      
      {pageType === 'contact' && (
        <meta name="format-detection" content="telephone=yes,address=yes,email=yes" />
      )}
    </Helmet>
  );
};

export default BasicMetaTags;