self.addEventListener('install', async function (event) {
  console.log('Hello world from the Service Worker 🤙')
  if (!('BackgroundFetchManager' in self)) {
    // Provide fallback downloading.
    console.log(
      'Background Fetch is not supported. Fallback to normal download.',
    )
  }

  const swReg = await navigator.serviceWorker.ready
  // @ts-ignore
  const bgFetch = await swReg.backgroundFetch.fetch(
    'https://poetrydb.org/title/Ozymandias/lines.json',
  )
  console.log(bgFetch)
})
