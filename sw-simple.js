const CACHE_NAME = 'avalon-simple-v1.2';

// Service Worker simplificado que no bloquea la carga inicial
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando (modo simple)');
  self.skipWaiting(); // Activar inmediatamente sin esperar cache
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Limpiando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Estrategia de cache: Network First con fallback a cache
self.addEventListener('fetch', event => {
  // Solo manejar requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, guardar en cache
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => console.warn('Error cacheando:', err));
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              console.log('📦 Sirviendo desde cache:', event.request.url);
              return response;
            }
            // Si no está en cache y es la página principal, servir index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html') || caches.match('/');
            }
            throw new Error('No disponible offline');
          });
      })
  );
});

console.log('🏰 Avalon Service Worker cargado - Modo Network First');
