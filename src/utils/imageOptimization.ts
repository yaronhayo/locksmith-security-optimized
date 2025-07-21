/**
 * Image optimization utilities
 * These functions help optimize images for better performance and Core Web Vitals
 */

/**
 * Get WebP version of an image URL if supported
 * @param src Original image URL
 * @returns Optimized image URL (WebP if supported)
 */
export const getOptimizedImageUrl = (src: string): string => {
  // Skip optimization for data URLs, SVGs, and already optimized images
  if (!src || 
      src.startsWith('data:') || 
      src.startsWith('blob:') || 
      src.includes('.svg') || 
      src.includes('.webp') || 
      src.includes('format=webp')) {
    return src;
  }
  
  // Add WebP format parameter
  if (src.includes('?')) {
    return `${src}&format=webp`;
  }
  return `${src}?format=webp`;
};

/**
 * Generate srcSet for responsive images
 * @param src Original image URL
 * @param widths Array of widths to generate
 * @returns srcSet string for responsive images
 */
export const generateSrcSet = (src: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048]): string => {
  // Skip srcSet generation for data URLs and SVGs
  if (!src || src.startsWith('data:') || src.startsWith('blob:') || src.includes('.svg')) {
    return '';
  }
  
  const optimizedSrc = getOptimizedImageUrl(src);
  
  return widths
    .map((w) => {
      if (optimizedSrc.includes('?')) {
        return `${optimizedSrc}&w=${w} ${w}w`;
      }
      return `${optimizedSrc}?w=${w} ${w}w`;
    })
    .join(', ');
};

/**
 * Calculate image dimensions to prevent layout shift
 * @param width Original width
 * @param height Original height
 * @param maxWidth Maximum width constraint
 * @returns Calculated dimensions that maintain aspect ratio
 */
export const calculateImageDimensions = (
  width: number,
  height: number,
  maxWidth: number = 1200
): { width: number; height: number } => {
  if (width <= maxWidth) {
    return { width, height };
  }
  
  const aspectRatio = width / height;
  const calculatedHeight = Math.round(maxWidth / aspectRatio);
  
  return {
    width: maxWidth,
    height: calculatedHeight
  };
};

/**
 * Get image dimensions from URL (for images hosted on our CDN)
 * @param url Image URL
 * @returns Promise with image dimensions
 */
export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
};

/**
 * Preload critical images
 * @param urls Array of image URLs to preload
 */
export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported in the current browser
 * @returns Boolean indicating WebP support
 */
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};