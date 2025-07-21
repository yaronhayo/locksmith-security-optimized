import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initSessionTracking } from './utils/sessionTracker.ts'
import initWebVitals from './utils/webVitalsMonitoring.ts'
import { initPolyfills } from './utils/polyfills.ts'

// Initialize polyfills first
initPolyfills();

// Detect and handle iframes in quirks mode
const handleThirdPartyIframes = () => {
  try {
    // Monitor for iframes that might be loaded in quirks mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            // Check if node is an Element before accessing Element-specific methods
            if (node.nodeName === 'IFRAME' && node instanceof HTMLElement) {
              // Add proper attributes to help with standards mode
              node.setAttribute('loading', 'lazy');
              node.setAttribute('frameBorder', '0');
              if (!node.hasAttribute('title')) {
                node.setAttribute('title', 'Third-party content');
              }
              
              // Add sandbox attribute to improve security
              if (!node.hasAttribute('sandbox')) {
                node.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
              }
            }
          });
        }
      });
    });
    
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  } catch (error) {
    console.error('Error setting up iframe observer:', error);
  }
};

// Save UTM parameters to localStorage for tracking throughout the session
const saveUtmParams = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmTerm = urlParams.get('utm_term');
    
    if (utmSource) localStorage.setItem('utm_source', utmSource);
    if (utmMedium) localStorage.setItem('utm_medium', utmMedium);
    if (utmCampaign) localStorage.setItem('utm_campaign', utmCampaign);
    if (utmTerm) localStorage.setItem('utm_term', utmTerm);
  }
};

// Execute performance optimizations immediately
handleThirdPartyIframes();
saveUtmParams();

// Initialize web vitals monitoring to gather performance metrics
initWebVitals();

// Initialize session tracking once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSessionTracking);
} else {
  initSessionTracking();
}

// Configure React Query for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Disable refetching on window focus for better performance
      refetchOnMount: false, // Only fetch when needed
      gcTime: 1000 * 60 * 30, // Cache for 30 minutes (previously cacheTime)
    },
  },
})

// Use createRoot for better hydration performance
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)