const CACHE = 'matura-master-2-v6';
const CORE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icons/icon.svg',
  './data/curriculum.js',
  './services/groqClient.js',
  './services/aiService.js',
  './services/educationStore.js',
  './services/aiGateway.js',
  './services/notationService.js',
  './modules/visionSolver.js',
  './modules/languageLab.js',
  './modules/tutor.js',
  './modules/exams.js',
  './modules/generator.js',
  './modules/labs.js',
  './modules/appShell.js',
  './finalApp.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(name => name !== CACHE).map(name => caches.delete(name)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match('./index.html'))));
});
