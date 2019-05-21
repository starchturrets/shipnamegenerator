//With special thanks to Brad Traversy for his awesome videos

self.addEventListener('install', (event) => {
	console.log('Service worker activated.');
	event.waitUntil(
		caches
			.open('v1')
			.then((cache) => {
				return cache.addAll([
					'/',
					'index.html',
					'style.css',
					'script.js',
					'/src/favicons/apple-touch-icon.png',
					'/src/favicons/favicon-32x32.png',
					'/src/favicons/favicon-16x16.png',
					'/src/favicons/site.webmanifest',
					'/src/favicons/safari-pinned-tab.svg',
					'/src/favicons/favicon.ico'
				]);
			})
			.then(() => self.skipWaiting())
			.catch(() => console.log('I have failed. Again'))
	);
});
/*self.addEventListener('activate', (e) => {
	e.waitUntil(caches.keys).then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cache) => {
				if (cache !== cacheName) {
					return caches.delete(cache);
				}
			})
		);
	});
});*/
// Call Activate Event
self.addEventListener('activate', (e) => {
	console.log('Service Worker: Activated');
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== 'v1') {
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
	e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
