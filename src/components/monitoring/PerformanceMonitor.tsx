import React, { useEffect } from 'react';
import initWebVitals from '@/utils/webVitalsMonitoring';

interface PerformanceMonitorProps {
  enabled?: boolean;
}

/**
 * PerformanceMonitor component for tracking Core Web Vitals
 * This helps monitor and improve performance metrics
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = true
}) => {
  useEffect(() => {
    if (enabled) {
      // Initialize web vitals monitoring
      initWebVitals();
      
      // Log performance metrics to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance monitoring initialized');
      }
    }
  }, [enabled]);
  
  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;