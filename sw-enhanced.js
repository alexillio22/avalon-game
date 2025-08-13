const CACHE_NAME = 'avalon-pwa-v2.0';
const PRECACHE_URLS = [
  './',                                                               // Página principal
  './index.html',                                                     // HTML principal
  './static/js/AppEntry-0ec3cab817b6e20a9eb17dc6ca887058.js',         // JavaScript principal React Native
  './manifest-v2.json',                                               // Manifest PWA
  './asesino.png'                                                     // Icono principal
];

// INSTALACIÓN: Precaching de archivos esenciales para funcionamiento offline
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando con precaching estratégico...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Precaching archivos esenciales:', PRECACHE_URLS);
        // Cachear todos los archivos esenciales durante la instalación
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('✅ Precaching completado exitosamente');
        // Forzar activación inmediata del nuevo Service Worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Error durante precaching:', error);
        throw error;
      })
  );
});

// ACTIVACIÓN: Limpiar caches antiguos y tomar control
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        // Eliminar caches antiguos
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activado y tomando control');
        // Tomar control inmediato de todas las pestañas
        return self.clients.claim();
      })
  );
});

// FETCH: Estrategia "Network First" con fallback a caché
self.addEventListener('fetch', event => {
  // Solo manejar requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // Estrategia Network First: Intentar red primero, luego caché
    fetch(event.request)
      .then(response => {
        // Si la respuesta de red es exitosa
        if (response.status === 200) {
          // Clonar respuesta para guardar en cache (streams solo se pueden leer una vez)
          const responseToCache = response.clone();
          
          // Guardar en cache de forma asíncrona (no bloquear respuesta)
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => console.warn('⚠️ Error guardando en cache:', err));
        }
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        console.log('🌐 Network failed, trying cache for:', event.request.url);
        
        return caches.match(event.request)
          .then(response => {
            if (response) {
              console.log('📦 Sirviendo desde cache:', event.request.url);
              return response;
            }
            
            // Para navegación (páginas), servir index.html como fallback
            if (event.request.mode === 'navigate') {
              console.log('🏠 Sirviendo index.html como fallback para navegación');
              return caches.match('./index.html');
            }
            
            // Si no está en cache y no es navegación, lanzar error
            throw new Error('Recurso no disponible offline: ' + event.request.url);
          });
      })
  );
});

// MANEJO DE MENSAJES: Para comunicación con la app principal
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('📨 Recibido comando SKIP_WAITING');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      precachedUrls: PRECACHE_URLS
    });
  }
});

// LOG INICIAL
console.log('🏰 Avalon Service Worker v2.0 iniciado');
console.log('📋 Estrategia: Network First con precaching');
console.log('📦 Cache name:', CACHE_NAME);
console.log('📁 Archivos precacheados:', PRECACHE_URLS);
