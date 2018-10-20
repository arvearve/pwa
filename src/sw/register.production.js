// this file is only included in production builds
// register service workere in this file

if( 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
  navigator.serviceWorker
    .register('/sw.js')
    .then(swRegistration => {
      console.log("SW registered successfully", swRegistration)
    })
    .catch(console.error)
  })
}
