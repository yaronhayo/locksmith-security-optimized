import React from 'react';
import { cn } from '@/lib/utils';

interface AspectRatioContainerProps {
  ratio?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  children: React.ReactNode;
}

/**
 * AspectRatioContainer component for preventing layout shift
 * This helps improve CLS by maintaining aspect ratio during image loading
 */
const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({
  ratio = 16 / 9,
  width = '100%',
  height,
  className,
  children
}) => {
  // Calculate padding-top based on aspect ratio
  const paddingTop = height ? undefined : `${(1 / ratio) * 100}%`;
  
  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
      }}
    >
      <div 
        style={{ paddingTop }}
        className={cn(
          'w-full',
          !height && 'h-0'
        )}
      />
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

export default AspectRatioContainer;