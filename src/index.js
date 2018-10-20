// import important styles (global & accounts page)
import "./index.css";
import './pages/accounts/accounts'
import(/*webpackChunkName: "events"*/'./pages/events/events');
import(/*webpackChunkName: "ripple"*/"vanilla-ripplejs");


caches.open('v1-articles').then(cache => {
  cache.put('path', new Response('Hello World'))
})
