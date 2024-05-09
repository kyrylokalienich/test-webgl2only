const cacheName = "DefaultCompany-Webgl-Test-1.0";
const contentToCache = [
    "Build/b4ffb41359460cecabe701fb993b5bbc.loader.js",
    "Build/3829a87cb56be37eec88c993a369cf2a.framework.js",
    "Build/b7a8ed42e6eb31b0cb878486924e97cf.data",
    "Build/49bcb8d4e18645503cd57402ecf65c4f.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
