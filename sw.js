//Thank God for Brad Traversy Media
const cacheName = 'v1';
const cacheAssets = [
  //Stuff to cache
  '/',
  '/src',
  '/src/favicons',
  '/src/css',
  '/src/js',
  './index.html',
  '/sw.js',
  '/manifest.json',
  '/src/css/style.css', //All this time and it was the f***ing path!
  '/src/js/script.js',
  '/src/favicons/apple-touch-icon.png',
  '/src/favicons/favicon-32x32.png',
  '/src/favicons/favicon-16x16.png',
  '/src/favicons/site.webmanifest',
  '/src/favicons/safari-pinned-tab.svg',
  '/src/favicons/favicon.ico',
  '/src/favicons/android-chrome-192x192.png',
  '/src/favicons/android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheAssets);
    })
  );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    ajax(e.request).catch(() => {
      caches.match(e.request);
      console.log('Responding from cache');
    })
  );
});
//TODO: wrap the fetch request in another promise, and abort it after ~5 seconds
function ajax(url, timeout = 1000) {
  return new Promise((resolve, reject) => {
    fetch(url)
      // .then((res) => res.json())
      .then((data) => resolve(data));
    setTimeout(() => reject('Request failed'), timeout);
  });
}
