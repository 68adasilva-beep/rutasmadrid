const CACHE_NAME = 'rutamadrid-v1';
const OFFLINE_URLS = [
  '/rutasmadrid/',
  '/rutasmadrid/index.html',
  '/rutasmadrid/manifest.webmanifest',
  '/rutasmadrid/icon-192.png',
  '/rutasmadrid/icon-512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Instalar: precargar recursos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

// Activar: limpiar cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
});

// Fetch: servir desde caché si existe, si no desde red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
