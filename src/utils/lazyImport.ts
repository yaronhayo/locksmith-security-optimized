import React, { lazy } from 'react';

/**
 * Enhanced lazy loading utility with retry mechanism
 * This helps improve code splitting and error handling for lazy-loaded components
 * 
 * @param factory Import factory function
 * @param retries Number of retries on failure
 * @returns Lazy-loaded component with retry mechanism
 */
export function lazyImport<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries: number = 3
): React.LazyExoticComponent<T> {
  return lazy(() => {
    let attemptCount = 0;
    
    const attempt = (): Promise<{ default: T }> => {
      return factory()
        .catch((error: Error) => {
          // If we've reached max retries, throw the error
          if (attemptCount >= retries) {
            console.error(`Failed to load module after ${retries} attempts:`, error);
            throw error;
          }
          
          // Increment attempt count and retry with exponential backoff
          attemptCount++;
          const delay = Math.min(1000 * Math.pow(2, attemptCount - 1), 10000);
          
          return new Promise(resolve => {
            console.warn(`Retry attempt ${attemptCount} after ${delay}ms`);
            setTimeout(() => resolve(attempt()), delay);
          });
        });
    };
    
    return attempt();
  });
}

/**
 * Create a lazy-loaded route component with loading fallback
 * 
 * @param factory Import factory function
 * @param LoadingComponent Optional loading component
 * @returns Lazy-loaded route component with loading fallback
 */
export function lazyRoute<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  LoadingComponent?: React.ComponentType
): React.LazyExoticComponent<T> {
  const LazyComponent = lazyImport(factory);
  
  if (LoadingComponent) {
    // Return a wrapped component that shows the loading component while loading
    return lazy(() => 
      factory().then(module => ({
        default: (props: any) => (
          <React.Suspense fallback={<LoadingComponent />}>
            <LazyComponent {...props} />
          </React.Suspense>
        )
      }))
    ) as unknown as React.LazyExoticComponent<T>;
  }
  
  return LazyComponent;
}