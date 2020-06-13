var AppVersion = '0062';

self.addEventListener('install', event => {
	self.skipWaiting();
	event.waitUntil(caches.open(AppVersion).then(cache => {
		return cache.addAll([
			'./', './index.html',
			'./index.css',
			'./Common.js',
			'./Home.js',
			'./Fonts/Bold.ttf',
			'./Fonts/Semibold.ttf',
			'./Assets/LightIcon.ico',
			'./Assets/DarkIcon.ico',
		]);
	}));
});

self.addEventListener('activate', event => {
	event.waitUntil(caches.keys().then(versions => {
		return Promise.all(versions.filter(ver => {
			return AppVersion != ver;
		}).map(ver => { return caches.delete(ver) }));
	}));
	return self.clients.claim();
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(cacheItem => {
				return cacheItem || fetch(event.request);
			}
		)
	);
});
