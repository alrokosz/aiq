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
      setLines(data?.[0]?.lines ?? [])
    }
    void func()
  }, [])

  return (
    <motion.div layout="position" className="mt-4" transition={SPRING}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </motion.div>
  )
}
