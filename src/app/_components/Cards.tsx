'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
}

export default function Cards() {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const func = async () => {
      const res = await fetch('/api/ai')
      const { data } = await res.json()
      setLines(data[0].lines)
    }
    func()
  }, [])

  return (
    <motion.div layout="position" transition={SPRING}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </motion.div>
  )
}
