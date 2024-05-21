self.addEventListener('install', async function (event) {
  console.log('Hello world from the Service Worker 🤙')
  if (!('BackgroundFetchManager' in self)) {
    // Provide fallback downloading.
    console.log(
      'Background Fetch is not supported. Fallback to normal download.',
    )
  }
})

//Service worker example in client component

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.ready.then(async (registration) => {
//     console.log(`A service worker is active: ${registration.active}`)
//     const swReg = await navigator.serviceWorker.ready
//     const bgFetch = await swReg.backgroundFetch.fetch(
//       `ozymandias${Math.random()}`,
//       '/api/ai/cards',
//     )
//     console.log(bgFetch)
//   })
// } else {
//   console.error('Service workers are not supported.')
// }
