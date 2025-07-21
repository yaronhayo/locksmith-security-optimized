import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  animate?: boolean;
}

/**
 * SkeletonLoader component for preventing layout shift during content loading
 * This helps improve CLS by reserving space for content that's still loading
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  width,
  height,
  rounded = false,
  animate = true
}) => {
  return (
    <div 
      className={cn(
        'bg-gray-200',
        animate && 'animate-pulse',
        rounded === true && 'rounded-md',
        typeof rounded === 'string' && rounded,
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
      aria-hidden="true"
    />
  );
};

/**
 * ImageSkeleton component specifically for image placeholders
 */
export const ImageSkeleton: React.FC<SkeletonLoaderProps & { aspectRatio?: number }> = ({
  className,
  width = '100%',
  height,
  rounded = 'rounded-md',
  animate = true,
  aspectRatio = 16 / 9
}) => {
  // Calculate height based on aspect ratio if not provided
  const calculatedHeight = height || (typeof width === 'number' ? width / aspectRatio : undefined);
  
  return (
    <div 
      className={cn(
        'bg-gray-200',
        animate && 'animate-pulse',
        typeof rounded === 'boolean' && rounded && 'rounded-md',
        typeof rounded === 'string' && rounded,
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: calculatedHeight ? (typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight) : '0',
        paddingTop: !calculatedHeight ? `${(1 / aspectRatio) * 100}%` : undefined
      }}
      aria-hidden="true"
    />
  );
};

/**
 * TextSkeleton component for text content placeholders
 */
export const TextSkeleton: React.FC<SkeletonLoaderProps & { lines?: number }> = ({
  className,
  width = '100%',
  height = 16,
  rounded = 'rounded-full',
  animate = true,
  lines = 1
}) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={cn(
            'bg-gray-200 mb-2',
            animate && 'animate-pulse',
            typeof rounded === 'boolean' && rounded && 'rounded-full',
            typeof rounded === 'string' && rounded,
            className
          )}
          style={{
            width: index === lines - 1 && lines > 1 ? (typeof width === 'number' ? `${width * 0.8}px` : '80%') : (typeof width === 'number' ? `${width}px` : width),
            height: typeof height === 'number' ? `${height}px` : height
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default SkeletonLoader;