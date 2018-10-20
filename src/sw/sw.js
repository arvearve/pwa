workbox.precaching.precacheAndRoute(self.__precacheManifest)
workbox.routing.registerRoute(
  /https\:\/\/trondheim-pwa\.firebaseio\.com\/.*\.json/,
  workbox.strategies.networkFirst({
    cacheName: 'api-cache'
  })
)