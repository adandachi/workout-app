// service-worker.js

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('workout-app-cache').then((cache) => {
      // *** IMPORTANT: Replace '/YOUR-REPO-NAME' with your actual repository name! ***
      // For example, if your GitHub Pages URL is https://adandachi.github.io/my-workout-app/
      // then YOUR-REPO-NAME should be 'my-workout-app'
      const repoName = '/my-workout-app'; 

      return cache.addAll([
        repoName + '/', // Caches the root of your GitHub Pages project
        repoName + '/001_Push.html', // Your main HTML file
        repoName + '/manifest.json', // Your manifest file
        // repoName + '/styles.css', // Uncomment and adjust if you have a separate CSS file
        // repoName + '/script.js', // Uncomment and adjust if you have a separate JS file
        // Add paths to any other assets like icons, other HTML pages, etc.
        repoName + '/icons/icon-192x192.png', // Example icon paths
        repoName + '/icons/icon-512x512.png', // Example icon paths
        // You might need to add other workout-related pages or images here
        // repoName + '/WIRKOUTS-WIP.html', // If this is another relevant HTML page
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If a cached response is found, return it.
      // Otherwise, fetch from the network.
      return cachedResponse || fetch(event.request);
    })
  );
});

// Optional: Add an activate event listener to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['workout-app-cache']; // List of current cache names

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});