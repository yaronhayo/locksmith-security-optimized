import React from "react";
import { Helmet } from "react-helmet";

interface OpenGraphTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
  modifiedDate: string;
  baseUrl: string;
  type?: "website" | "article" | "product" | "profile" | "book";
  siteName?: string;
  locale?: string;
  publishedDate?: string;
  locationName?: string;
  serviceName?: string;
  price?: string;
  availability?: string;
}

export const OpenGraphTags: React.FC<OpenGraphTagsProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  modifiedDate,
  baseUrl,
  type = "website",
  siteName = "Locksmith & Security LLC",
  locale = "en_US",
  publishedDate,
  locationName,
  serviceName,
  price,
  availability
}: OpenGraphTagsProps) => {
  // Ensure OG description stays within recommended length (150-157 characters to be safe)
  const optimizedDescription = description.length > 157 
    ? `${description.substring(0, 157)}...` 
    : description;

  // Ensure image URL is absolute
  const absoluteImageUrl = image && !image.startsWith('http') && baseUrl 
    ? `${baseUrl}${image.startsWith('/') ? image : `/${image}`}` 
    : image || "https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/uploads//Locksmithandsecuritylogo.jpg";

  // Enhance title with location or service keywords if appropriate
  let enhancedTitle = title;
  if (serviceName && !title.includes(serviceName) && type === 'product') {
    enhancedTitle = `${serviceName} | ${title}`;
  } else if (locationName && !title.includes(locationName) && (type === 'article' || type === 'product')) {
    enhancedTitle = `${title} in ${locationName}`;
  }

  // Ensure title stays within recommended length (50-60 characters)
  const finalTitle = enhancedTitle.length > 60 
    ? `${enhancedTitle.substring(0, 57)}...` 
    : enhancedTitle;

  return (
    <Helmet>
      {/* Basic Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:alt" content={`Image for ${finalTitle}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:updated_time" content={modifiedDate} />
      
      {/* Additional article metadata */}
      {type === "article" && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === "article" && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === "article" && (
        <meta property="article:publisher" content={`${baseUrl}`} />
      )}
      {type === "article" && (
        <meta property="article:section" content="Locksmith" />
      )}
      {type === "article" && (
        <>
          <meta property="article:tag" content="Locksmith" />
          <meta property="article:tag" content="Security" />
          <meta property="article:tag" content="Lock Repair" />
          {locationName && <meta property="article:tag" content={locationName} />}
          {serviceName && <meta property="article:tag" content={serviceName} />}
        </>
      )}
      
      {/* Product metadata for service pages */}
      {type === "product" && (
        <>
          <meta property="product:brand" content="Locksmith & Security LLC" />
          {price && <meta property="product:price:amount" content={price} />}
          {price && <meta property="product:price:currency" content="USD" />}
          {availability && <meta property="product:availability" content={availability} />}
          {serviceName && <meta property="product:category" content={serviceName} />}
        </>
      )}
      
      {/* Location metadata */}
      {locationName && (
        <meta property="og:locality" content={locationName} />
      )}
    </Helmet>
  );
};

export default OpenGraphTags;