import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ClickToCall from '@/components/ui/click-to-call';

interface MobileNavigationProps {
  className?: string;
}

/**
 * MobileNavigation component for mobile-friendly navigation
 * This helps improve mobile UX and accessibility
 */
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };
  
  // Main navigation items
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' }
  ];
  
  // Service navigation items
  const serviceNavItems = [
    { name: 'Emergency Locksmith', path: '/services/emergency-locksmith' },
    { name: 'Residential Locksmith', path: '/services/residential-locksmith' },
    { name: 'Commercial Locksmith', path: '/services/commercial-locksmith' },
    { name: 'Auto Locksmith', path: '/services/auto-locksmith' }
  ];
  
  return (
    <div className={cn('lg:hidden', className)}>
      {/* Mobile menu button */}
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {isOpen ? (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      
      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-white transform transition-transform ease-in-out duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img
              src="https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/uploads//Locksmithandsecuritylogo.jpg"
              alt="Locksmith & Security"
              className="h-10"
            />
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={closeMenu}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-32">
          {/* Emergency call button */}
          <div className="mb-6">
            <ClickToCall
              buttonText="Call (201) 748-2070"
              variant="primary"
              size="lg"
              fullWidth
            />
          </div>
          
          {/* Main navigation */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Navigation
            </h3>
            <ul className="space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services navigation */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Book online button */}
          <div className="mt-6">
            <Link
              to="/book-online"
              className="block w-full bg-primary text-white text-center px-4 py-3 rounded-md font-medium hover:bg-primary/90"
              onClick={closeMenu}
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;