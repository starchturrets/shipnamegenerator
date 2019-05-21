//With special thanks to Brad Traversy for his awesome videos
const cacheName = 'v3';
const cacheAssets = ['/', 'index.html', 'style.css', 'script.js'];
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(cacheName)
			.then((cache) => cache.addAll(cacheAssets))
			.then(() => self.skipWaiting())
			.catch(() => console.log('I have failed. Again'))
	);
});
self.addEventListener('activate', (e) => {
	e.waitUntil(caches.keys).then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cache) => {
				if (cache !== cacheName) {
					return caches.delete(cache);
				}
			})
		);
	});
});
self.addEventListener('fetch', (e) => {
	e.respondWith(
		fetch(e.request).catch(() => {
			caches.match(e.request);
		})
	);
});
