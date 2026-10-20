const CACHE = 'vortex-v1';

self.addEventListener('install', (event) => {
self.skipWaiting();
event.waitUntil(
caches.open(CACHE).then((cache) => cache.addAll(['./', './index.html']))
);
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
).then(() => self.clients.claim())
);
});

self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((cached) => cached || fetch(event.request))
);
});