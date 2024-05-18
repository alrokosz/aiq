'use client'

import { useEffect } from 'react'

export default function RegisterServiceWorker({ path }: { path: string }) {
  useEffect(() => {
    navigator.serviceWorker
      .register(path)
      .then((registration) =>
        console.log(
          'Service Worker registration successful with scope: ',
          registration.scope,
        ),
      )
      .catch((err) => console.log('Service Worker registration failed: ', err))
  }, [])
  return null
}
