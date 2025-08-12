const CACHE_NAME = 'avalon-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/_expo/static/js/web/AppEntry-0ec3cab817b6e20a9eb17dc6ca887058.js',
  '/manifest.json',
  '/asesino.png'
];

// Instalar Service Worker y cachear recursos
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        // Cachear archivos uno por uno para evitar fallos
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`No se pudo cachear ${url}:`, err);
              return Promise.resolve(); // Continuar aunque falle uno
            })
          )
        );
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
