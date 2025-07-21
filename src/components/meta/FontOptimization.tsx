import React from 'react';
import { Helmet } from 'react-helmet';

interface FontOptimizationProps {
  fontFamily?: string;
  weights?: number[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

/**
 * FontOptimization component for optimizing font loading performance
 * This component helps reduce Cumulative Layout Shift (CLS) and improves LCP
 */
const FontOptimization: React.FC<FontOptimizationProps> = ({
  fontFamily = 'Outfit',
  weights = [300, 400, 500, 600, 700],
  display = 'swap',
  preload = true
}) => {
  // Create the font URL
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weights.join(';')}&display=${display}`;
  
  return (
    <Helmet>
      {/* Preconnect to Google Fonts domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical font weights if enabled */}
      {preload && (
        <>
          {weights.includes(400) && (
            <link 
              rel="preload" 
              href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400&display=${display}`}
              as="style" 
            />
          )}
          {weights.includes(700) && (
            <link 
              rel="preload" 
              href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@700&display=${display}`}
              as="style" 
            />
          )}
        </>
      )}
      
      {/* Load the full font family */}
      <link rel="stylesheet" href={fontUrl} />
      
      {/* Font-display CSS fallback */}
      <style type="text/css">{`
        @font-face {
          font-family: '${fontFamily}';
          font-style: normal;
          font-weight: 400;
          font-display: ${display};
          src: local('${fontFamily}');
        }
        
        /* Prevent invisible text during font loading */
        html {
          font-display: ${display};
        }
      `}</style>
    </Helmet>
  );
};

export default FontOptimization;