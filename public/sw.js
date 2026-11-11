// Preserve browser HTTP caching, not stale application HTML or third-party tiles.
// Old cache-first HTML could refer to hashed assets removed by a new deployment.
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith('fez-'))await caches.delete(key)}await self.clients.claim()})())});
// No fetch interception: navigation and assets follow normal HTTP cache headers.
