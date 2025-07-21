/**
 * Web Vitals monitoring utility for tracking Core Web Vitals metrics
 * This helps track and improve LCP, FID, CLS, and other performance metrics
 */

type MetricName = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB' | 'INP';

interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Thresholds for Core Web Vitals metrics
const thresholds = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 },   // milliseconds
  CLS: { good: 0.1, poor: 0.25 },  // unitless
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  TTFB: { good: 800, poor: 1800 }, // milliseconds
  INP: { good: 200, poor: 500 }    // milliseconds
};

// Get rating based on metric value and thresholds
const getRating = (name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = thresholds[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Report metrics to analytics or monitoring service
const reportMetric = (metric: WebVitalMetric) => {
  // Send to Google Analytics if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      metric_id: metric.id
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
  }
};

// Initialize web vitals monitoring
const initWebVitals = async () => {
  if (typeof window !== 'undefined') {
    try {
      // Dynamically import web-vitals library
      const { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');
      
      // Monitor CLS
      onCLS((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'CLS',
          value: metric.value,
          rating: getRating('CLS', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
      
      // Monitor FID
      onFID((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'FID',
          value: metric.value,
          rating: getRating('FID', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
      
      // Monitor LCP
      onLCP((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'LCP',
          value: metric.value,
          rating: getRating('LCP', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
      
      // Monitor FCP
      onFCP((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'FCP',
          value: metric.value,
          rating: getRating('FCP', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
      
      // Monitor TTFB
      onTTFB((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'TTFB',
          value: metric.value,
          rating: getRating('TTFB', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
      
      // Monitor INP (Interaction to Next Paint)
      onINP((metric) => {
        const vitalsMetric: WebVitalMetric = {
          name: 'INP',
          value: metric.value,
          rating: getRating('INP', metric.value),
          delta: metric.delta,
          id: metric.id
        };
        reportMetric(vitalsMetric);
      });
    } catch (error) {
      console.error('[Web Vitals] Failed to initialize:', error);
    }
  }
};

export default initWebVitals;