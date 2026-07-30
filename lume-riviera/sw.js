const CACHE_PREFIX = 'lume-riviera-';
const CACHE = `${CACHE_PREFIX}v5`;
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './site.config.json',
  './assets/favicon.svg',
  './assets/lume-camellia.webp',
  './assets/hero.webp',
  './assets/hair.webp',
  './assets/nails.webp'
];
const ASSET_URLS = new Set(ASSETS.map(asset => new URL(asset, self.registration.scope).href));
const SCOPE_PATH = new URL(self.registration.scope).pathname;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function navigationResponse(request) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(CACHE);
      await cache.put(new URL('./index.html', self.registration.scope), response.clone());
    }
    return response;
  } catch {
    return caches.match(new URL('./index.html', self.registration.scope));
  }
}

async function assetResponse(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

async function configurationResponse(request) {
  try {
    const response = await fetch(request, { cache: 'no-cache' });
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
      return response;
    }
    return (await caches.match(request)) || response;
  } catch {
    return caches.match(request);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const isInScope = url.origin === self.location.origin && url.pathname.startsWith(SCOPE_PATH);

  if (request.method !== 'GET' || !isInScope) return;

  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }

  if (url.href === new URL('./site.config.json', self.registration.scope).href) {
    event.respondWith(configurationResponse(request));
    return;
  }

  if (ASSET_URLS.has(url.href)) {
    event.respondWith(assetResponse(request));
  }
});
