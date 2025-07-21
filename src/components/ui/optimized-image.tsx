import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * OptimizedImage component for better image loading performance
 * Helps improve LCP and prevent CLS by setting explicit dimensions
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  sizes = '100vw',
  fallbackSrc = '/images/placeholder.jpg',
  onLoad,
  onError,
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  // Reset states when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error event
  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    if (onError) onError();
  };
  
  // Determine if WebP is supported
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };
  
  // Get WebP version of image if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (typeof window !== 'undefined' && supportsWebP() && !originalSrc.includes('.webp') && !originalSrc.includes('.svg')) {
      // Convert to WebP if supported and not already WebP or SVG
      if (originalSrc.includes('?')) {
        return `${originalSrc}&format=webp`;
      }
      return `${originalSrc}?format=webp`;
    }
    return originalSrc;
  };
  
  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      return undefined;
    }
    
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const optimizedSrc = getOptimizedSrc(src);
    
    return widths
      .map((w) => {
        if (optimizedSrc.includes('?')) {
          return `${optimizedSrc}&w=${w} ${w}w`;
        }
        return `${optimizedSrc}?w=${w} ${w}w`;
      })
      .join(', ');
  };
  
  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {placeholder === 'blur' && !isLoaded && !hasError && (
        <div 
          className="absolute inset-0 blur-lg scale-110 transform"
          style={{
            backgroundImage: `url(${blurDataURL || src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      <img
        src={getOptimizedSrc(imgSrc)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        srcSet={generateSrcSet()}
        className={cn(
          'max-w-full h-auto object-cover transition-opacity duration-500',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100'
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;