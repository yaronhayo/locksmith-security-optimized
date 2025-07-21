import React from 'react';
import { cn } from '@/lib/utils';

interface BusinessHoursProps {
  className?: string;
  compact?: boolean;
}

/**
 * BusinessHours component for consistent business hours display
 * This helps improve local SEO and user experience
 */
const BusinessHours: React.FC<BusinessHoursProps> = ({
  className,
  compact = false
}) => {
  // Business hours
  const businessHours = [
    { day: 'Monday', hours: '24 Hours', isOpen: true },
    { day: 'Tuesday', hours: '24 Hours', isOpen: true },
    { day: 'Wednesday', hours: '24 Hours', isOpen: true },
    { day: 'Thursday', hours: '24 Hours', isOpen: true },
    { day: 'Friday', hours: '24 Hours', isOpen: true },
    { day: 'Saturday', hours: '24 Hours', isOpen: true },
    { day: 'Sunday', hours: '24 Hours', isOpen: true }
  ];
  
  // Get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  if (compact) {
    return (
      <div className={cn('text-gray-700', className)}>
        <h3 className="font-bold text-lg mb-2">Hours of Operation</h3>
        <p className="font-medium">Open 24/7</p>
        <p className="text-sm mt-1">
          Available for emergency service 24 hours a day, 7 days a week
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn('text-gray-700', className)}>
      <h3 className="font-bold text-lg mb-2">Hours of Operation</h3>
      <ul className="space-y-1">
        {businessHours.map((schedule) => (
          <li 
            key={schedule.day}
            className={cn(
              'flex justify-between',
              schedule.day === currentDay && 'font-medium text-primary'
            )}
          >
            <span>{schedule.day}</span>
            <span className="flex items-center">
              {schedule.isOpen && (
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              )}
              {schedule.hours}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm mt-3">
        <strong>Note:</strong> We are available for emergency locksmith services 24 hours a day, 7 days a week.
      </p>
    </div>
  );
};

export default BusinessHours;