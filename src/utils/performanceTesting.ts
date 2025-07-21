/**
 * Performance testing utilities
 * These functions help test and validate performance metrics
 */

/**
 * Run Lighthouse audit simulation
 * This is a simplified version of Lighthouse metrics for development testing
 * @returns Promise with audit results
 */
export const runLighthouseAudit = async (): Promise<{
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
    speedIndex: number;
    tti: number;
    tbt: number;
  };
  passed: boolean;
}> => {
  // This is a simplified simulation of Lighthouse metrics
  // In a real implementation, you would use the Lighthouse API or a service
  
  // Get performance metrics from Performance API
  const performanceEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType('paint');
  
  // Calculate metrics
  const ttfb = performanceEntries.responseStart - performanceEntries.requestStart;
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
  const domContentLoaded = performanceEntries.domContentLoadedEventEnd - performanceEntries.startTime;
  const loadComplete = performanceEntries.loadEventEnd - performanceEntries.startTime;
  
  // Estimate LCP (this is a rough estimate, real LCP requires PerformanceObserver)
  const lcp = Math.max(fcp * 1.5, loadComplete * 0.8);
  
  // Estimate FID (this is a rough estimate, real FID requires PerformanceObserver)
  const fid = Math.random() * 50 + 30; // Random value between 30-80ms
  
  // Estimate CLS (this is a rough estimate, real CLS requires PerformanceObserver)
  const cls = Math.random() * 0.15; // Random value between 0-0.15
  
  // Estimate other metrics
  const speedIndex = loadComplete * 0.7;
  const tti = domContentLoaded * 1.2;
  const tbt = Math.random() * 200 + 100; // Random value between 100-300ms
  
  // Calculate scores (simplified)
  const performanceScore = calculatePerformanceScore(lcp, fid, cls, ttfb, speedIndex);
  const accessibilityScore = 0.9 + Math.random() * 0.1; // Random value between 0.9-1.0
  const bestPracticesScore = 0.85 + Math.random() * 0.15; // Random value between 0.85-1.0
  const seoScore = 0.95 + Math.random() * 0.05; // Random value between 0.95-1.0
  
  // Check if passed (performance score >= 0.9)
  const passed = performanceScore >= 0.9;
  
  return {
    scores: {
      performance: performanceScore,
      accessibility: accessibilityScore,
      bestPractices: bestPracticesScore,
      seo: seoScore
    },
    metrics: {
      lcp,
      fid,
      cls,
      fcp,
      ttfb,
      speedIndex,
      tti,
      tbt
    },
    passed
  };
};

/**
 * Calculate performance score based on Core Web Vitals
 * @param lcp Largest Contentful Paint (ms)
 * @param fid First Input Delay (ms)
 * @param cls Cumulative Layout Shift
 * @param ttfb Time to First Byte (ms)
 * @param speedIndex Speed Index (ms)
 * @returns Performance score (0-1)
 */
const calculatePerformanceScore = (
  lcp: number,
  fid: number,
  cls: number,
  ttfb: number,
  speedIndex: number
): number => {
  // Weight factors
  const weights = {
    lcp: 0.25,
    fid: 0.25,
    cls: 0.25,
    ttfb: 0.15,
    speedIndex: 0.1
  };
  
  // Calculate individual scores
  const lcpScore = calculateMetricScore(lcp, 2500, 4000);
  const fidScore = calculateMetricScore(fid, 100, 300);
  const clsScore = calculateMetricScore(cls * 100, 10, 25) / 100; // Convert to 0-100 scale
  const ttfbScore = calculateMetricScore(ttfb, 800, 1800);
  const speedIndexScore = calculateMetricScore(speedIndex, 3000, 6000);
  
  // Calculate weighted score
  const weightedScore = 
    lcpScore * weights.lcp +
    fidScore * weights.fid +
    clsScore * weights.cls +
    ttfbScore * weights.ttfb +
    speedIndexScore * weights.speedIndex;
  
  return weightedScore;
};

/**
 * Calculate metric score based on good/poor thresholds
 * @param value Metric value
 * @param good Good threshold
 * @param poor Poor threshold
 * @returns Score (0-1)
 */
const calculateMetricScore = (value: number, good: number, poor: number): number => {
  if (value <= good) {
    return 1;
  }
  
  if (value >= poor) {
    return 0;
  }
  
  // Linear interpolation between good and poor
  return 1 - (value - good) / (poor - good);
};

export default {
  runLighthouseAudit
};