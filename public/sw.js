const CACHE = "brave-blocks-wrap-review-v5";
const BASE = "/brave-blocks";
const CORE = [`${BASE}/`, `${BASE}/manifest.webmanifest`, `${BASE}/favicon.svg`, `${BASE}/icon-192.png`, `${BASE}/icon-512.png`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(async (cache) => {
    await cache.addAll(CORE);
    try {
      const response = await fetch(`${BASE}/pixel-icons/index.json`);
      if (response.ok) {
        const indexResponse = response.clone();
        const icons = await response.json();
        await Promise.allSettled(icons.map((icon) => cache.add(`${BASE}/pixel-icons/${icon}.png`)));
        await cache.put(`${BASE}/pixel-icons/index.json`, indexResponse);
      }
    } catch {
      // Pixel sprites enhance the look but should never block installation.
    }
    try {
      const response = await fetch(`${BASE}/audio/narration/index.json`);
      if (!response.ok) return;
      const indexResponse = response.clone();
      const files = Object.values(await response.json());
      await Promise.allSettled(files.map((file) => cache.add(`${BASE}/audio/narration/${file}`)));
      await cache.put(`${BASE}/audio/narration/index.json`, indexResponse);
    } catch {
      // Narration is helpful but should never prevent the core game from installing.
    }
  }));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) caches.open(CACHE).then((cache) => cache.put(`${BASE}/`, response.clone()));
          return response;
        })
        .catch(() => caches.match(`${BASE}/`))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
        return response;
      })
    )
  );
});
