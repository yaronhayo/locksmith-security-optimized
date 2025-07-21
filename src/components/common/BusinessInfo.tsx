import React from 'react';
import { cn } from '@/lib/utils';
import { getPhoneNumber } from '@/utils/phoneUtils';

interface BusinessInfoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
  showLicense?: boolean;
  showAddress?: boolean;
  showHours?: boolean;
  showPhone?: boolean;
  showEmail?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

/**
 * BusinessInfo component for consistent business information display
 * This helps improve local SEO and user experience
 */
const BusinessInfo: React.FC<BusinessInfoProps> = ({
  className,
  variant = 'full',
  showLicense = true,
  showAddress = true,
  showHours = true,
  showPhone = true,
  showEmail = true,
  alignment = 'left'
}) => {
  // Business information
  const businessInfo = {
    name: 'Locksmith & Security LLC',
    phone: getPhoneNumber(),
    formattedPhone: '(201) 748-2070',
    email: 'info@247locksmithandsecurity.com',
    address: {
      street: '104 Harrison St',
      city: 'Hoboken',
      state: 'NJ',
      zip: '07030',
      country: 'USA'
    },
    license: '13VH13153100',
    hours: [
      { day: 'Monday-Sunday', hours: '24 Hours' }
    ]
  };
  
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <div className={cn('text-gray-700', alignmentClasses[alignment], className)}>
      {/* Business name */}
      <h3 className="font-bold text-lg text-primary">
        {businessInfo.name}
      </h3>
      
      {/* License information */}
      {showLicense && variant !== 'minimal' && (
        <p className="text-sm mt-1">
          NJ License #{businessInfo.license}
        </p>
      )}
      
      {/* Address */}
      {showAddress && (
        <address className="not-italic mt-2">
          <p>{businessInfo.address.street}</p>
          <p>{businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}</p>
        </address>
      )}
      
      {/* Phone number */}
      {showPhone && (
        <p className="mt-2">
          <a 
            href={`tel:${businessInfo.phone}`}
            className="text-primary hover:text-secondary transition-colors"
          >
            {businessInfo.formattedPhone}
          </a>
        </p>
      )}
      
      {/* Email */}
      {showEmail && variant === 'full' && (
        <p className="mt-1">
          <a 
            href={`mailto:${businessInfo.email}`}
            className="text-primary hover:text-secondary transition-colors"
          >
            {businessInfo.email}
          </a>
        </p>
      )}
      
      {/* Business hours */}
      {showHours && variant === 'full' && (
        <div className="mt-3">
          <p className="font-medium">Hours of Operation:</p>
          <ul className="mt-1">
            {businessInfo.hours.map((schedule, index) => (
              <li key={index}>
                <span className="font-medium">{schedule.day}:</span> {schedule.hours}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessInfo;