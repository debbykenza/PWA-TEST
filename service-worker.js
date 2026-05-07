self.addEventListener('fetch', function(event) {
    if(event.request.url.includes('articles-api.com/articles')) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(networkResponse) {
                    return caches.open('articles-cache').then(function(cache) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});