//Thank God for Brad Traversy Media
const cacheName = 'v1';
const cacheAssets = [
  //Stuff to cache
  './',
  './index.html',
  // 'sw.js',
  './manifest.json',
  './src/assets/browserconfig.xml',
  './src/css/style.css', //All this time and it was the f***ing path!
  './src/js/script.js',
  './src/assets/apple-touch-icon.png',
  './src/assets/favicon-32x32.png',
  './src/assets/favicon-16x16.png',
  './src/assets/safari-pinned-tab.svg',
  './src/assets/favicon.ico',
  './src/assets/android-chrome-192x192.png',
  './src/assets/android-chrome-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheAssets);
    })
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
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
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    ajax(e.request).catch(() => {
      console.log(e.request);
      return caches.match(e.request);
    })
  );
});
//TODO: wrap the fetch request in another promise, and abort it after ~5 seconds
function ajax(url, timeout = 300) {
  return new Promise((resolve, reject) => {
    fetch(url).then(resolve);
    setTimeout(() => reject('Request failed'), timeout);
  });
}
