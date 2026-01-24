/**
 * Service Worker optimizado para Vercel
 * - Caching estratégico
 * - Network-first para APIs
 * - Cache-first para assets estáticos
 */

const CACHE_NAME = 'deporty-v1.0.0';
const API_CACHE = 'deporty-api-v1';

// Assets que deben precachearse
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html',
  '/assets/css/variables.css',
  '/assets/css/main.css',
  '/assets/css/index.css',
  '/assets/css/auth.css',
  '/assets/js/main.js',
  '/site.webmanifest'
];

/**
 * Install: Precachear assets
 */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

/**
 * Activate: Limpiar caches antiguos
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return key !== CACHE_NAME && key !== API_CACHE;
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

/**
 * Fetch: Estrategias de caching
 */
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // API calls: Network-first strategy (siempre intentar red primero)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const cache = caches.open(API_CACHE);
            cache.then(c => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // HTML pages: Network-first with SPA fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
          });
          return response;
        })
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Static assets (CSS, JS, images): Cache-first strategy
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(r => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, r.clone());
          });
          return r;
        });
      })
    );
    return;
  }

  // Default: Cache-first for everything else
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});
