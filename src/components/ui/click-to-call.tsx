import React from 'react';
import { cn } from '@/lib/utils';
import { getPhoneNumber } from '@/utils/phoneUtils';

interface ClickToCallProps {
  phoneNumber?: string;
  className?: string;
  buttonText?: string;
  showIcon?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * ClickToCall component for mobile-friendly phone number links
 * This helps improve mobile UX and conversion rates
 */
const ClickToCall: React.FC<ClickToCallProps> = ({
  phoneNumber = getPhoneNumber(),
  className,
  buttonText = 'Call Now',
  showIcon = true,
  variant = 'primary',
  size = 'md',
  fullWidth = false
}) => {
  // Format phone number for display
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Get button variant classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-primary/10 text-primary',
    link: 'text-primary underline-offset-4 hover:underline'
  };
  
  // Get button size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  return (
    <a
      href={`tel:${formattedPhone}`}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {showIcon && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      )}
      {buttonText}
    </a>
  );
};

export default ClickToCall;