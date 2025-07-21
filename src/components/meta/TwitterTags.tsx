import React from "react";
import { Helmet } from "react-helmet";

interface TwitterTagsProps {
  title: string;
  description: string;
  image: string;
  baseUrl: string;
  twitterHandle?: string;
  cardType?: "summary" | "summary_large_image" | "app" | "player";
  locationName?: string;
  serviceName?: string;
}

export const TwitterTags: React.FC<TwitterTagsProps> = ({ 
  title, 
  description, 
  image,
  baseUrl,
  twitterHandle = "@LocksmithSecurity",
  cardType = "summary_large_image",
  locationName,
  serviceName
}: TwitterTagsProps) => {
  // Ensure Twitter description stays within recommended length (150-157 characters to be safe)
  const optimizedDescription = description.length > 157 
    ? `${description.substring(0, 157)}...` 
    : description;

  // Ensure image URL is absolute
  const absoluteImageUrl = image && !image.startsWith('http') && baseUrl 
    ? `${baseUrl}${image.startsWith('/') ? image : `/${image}`}` 
    : image || "https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/uploads//Locksmithandsecuritylogo.jpg";

  // Enhance title with location or service keywords if appropriate
  let enhancedTitle = title;
  if (serviceName && !title.includes(serviceName)) {
    enhancedTitle = `${serviceName} | ${title}`;
  } else if (locationName && !title.includes(locationName)) {
    enhancedTitle = `${title} in ${locationName}`;
  }

  // Ensure title stays within recommended length (50-60 characters)
  const finalTitle = enhancedTitle.length > 60 
    ? `${enhancedTitle.substring(0, 57)}...` 
    : enhancedTitle;

  return (
    <Helmet>
      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={`Image for ${finalTitle}`} />
      
      {/* Add location and service data for better Twitter card display */}
      {locationName && <meta name="twitter:label1" content="Location" />}
      {locationName && <meta name="twitter:data1" content={locationName} />}
      
      {serviceName && <meta name="twitter:label2" content="Service" />}
      {serviceName && <meta name="twitter:data2" content={serviceName} />}
      
      {/* Add domain verification for Twitter */}
      <meta name="twitter:domain" content="247locksmithandsecurity.com" />
    </Helmet>
  );
};

export default TwitterTags;