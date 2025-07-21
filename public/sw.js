// Service Worker for 247 Locksmith & Security
// Improves performance and enables offline functionality

const CACHE_NAME = 'locksmith-cache-v1';
const RUNTIME_CACHE = 'locksmith-runtime-v1';

// Resources to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index-*.js',
  '/assets/index-*.css',
  '/assets/vendor-*.js',
  '/assets/ui-*.js',
  '/assets/utils-*.js',
  '/assets/forms-*.js',
  '/assets/animations-*.js',
  '/assets/maps-*.js',
  '/website-uploads/1bbeb1e6-5581-4e09-9600-7d1859bb17c5.png', // Logo
  '/website-uploads/950b5c4c-f0b8-4d22-beb0-66a7d7554476.png', // Main image
  '/website-uploads/308ce2b0-551b-48b6-b078-c7e793fa2153.png', // Emergency locksmith image
  '/website-uploads/5769d20e-e251-4e5f-a743-870d5c267bd1.png', // Residential locksmith image
  '/website-uploads/88d354ba-8149-4bb1-9347-d5d0ff65dfe5.png', // Auto locksmith image
  '/offline.html'
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Pre-caching assets');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch(error => console.error('Pre-cache failed:', error))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request should be cached
const shouldCache = (url) => {
  // Cache static assets
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    return true;
  }
  
  // Cache main HTML routes
  if (
    url.pathname === '/' ||
    url.pathname === '/index.html' ||
    url.pathname === '/about' ||
    url.pathname === '/services' ||
    url.pathname === '/contact' ||
    url.pathname === '/service-areas'
  ) {
    return true;
  }
  
  return false;
};

// Fetch event - network first with cache fallback for HTML, cache first for assets
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Network-first strategy for HTML pages
  if (url.pathname.endsWith('.html') || url.pathname === '/' || !url.pathname.includes('.')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, clone and cache
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache, serve offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // Cache-first strategy for static assets
  if (shouldCache(url)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If not in cache, fetch from network and cache
          return fetch(event.request)
            .then(response => {
              // Cache valid responses
              if (response.status === 200) {
                const responseToCache = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            });
        })
    );
    return;
  }
  
  // Network-only for everything else
  event.respondWith(fetch(event.request));
});