let staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/css.css',
    '/js/fetch.js',
    '/js/app.js'
]
self.addEventListener('change',()=>{
    staticCacheName += 1;
})
self.addEventListener('install',e=>{
    // console.log('service worker has been installed');
    e.waitUntil(

        caches.open(staticCacheName).then(cache=>{
            console.log('cashinf shell assets');
            
            cache.addAll(assets)
        })
    )
    
})

self.addEventListener('activate',e=>{
    // console.log("service worker has been activate");
    e.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys.filter(key=>key !== staticCacheName).map(key=>caches.delete()))
        })
    )
    
})

self.addEventListener('fetch',evt=>{
    // console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse =>{            
            return cacheResponse || fetch(evt.request);
        })
    )
})