const CACHE_NAME = 'avalon-v1.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Instalar Service Worker y cachear recursos
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Instalado correctamente');
        return self.skipWaiting(); // Activar inmediatamente
      })
  );
});

// Activar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando cache antigua', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activado');
      return self.clients.claim(); // Controlar páginas inmediatamente
    })
  );
});

// Interceptar peticiones y servir desde cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en cache, devolverlo
        if (response) {
          console.log('Service Worker: Sirviendo desde cache', event.request.url);
          return response;
        }
        
        // Si no está en cache y hay conexión, hacer fetch
        console.log('Service Worker: Haciendo fetch', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Si la respuesta es válida, cachearla
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Si no hay conexión y no está en cache
            console.log('Service Worker: Sin conexión y no en cache');
            
            // Para páginas HTML, mostrar página principal
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            
            // Para otros recursos, retornar error
            return new Response('Offline - Recurso no disponible', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});
