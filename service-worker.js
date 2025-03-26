self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('workout-app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/WIRKOUTS-WIP.html',
        '/styles.css', // Include any CSS files you need to cache
        '/script.js', // Include your JavaScript files
        '/icons/icon-192x192.png', // Include icons
        '/icons/icon-512x512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
