self.addEventListener('install', (event) => {
event.waitUntil(
  caches.open('workout-app-cache').then((cache) => {
    const repoName = '/workout-app'; // <<< Replace with your actual repository name!
    return cache.addAll([
      repoName + '/', // Caches the root of your project
      repoName + '/001_Push.html', // Assuming this is your main page now
      repoName + '/WIRKOUTS-WIP.html', // If this page exists
      repoName + '/styles.css',
      repoName + '/script.js',
      repoName + '/icons/icon-192x192.png',
      repoName + '/icons/icon-512x512.png',
    ]);
  })
);
}
);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
