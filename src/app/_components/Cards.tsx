'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getOzymandias } from '../actions'

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
}

export default function Cards() {
  const [lines, setLines] = useState<(string | undefined)[]>([])

  useEffect(() => {
    const func = async () => {
      const data = await getOzymandias()
      console.log(data)
      setLines(data?.[0]?.lines ?? [])
    }
    func()

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
  }, [])

  return (
    <motion.div layout="position" className="mt-4" transition={SPRING}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </motion.div>
  )
}
