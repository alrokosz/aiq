'use client'

import { useEffect, useState } from 'react'

export default function Cards() {
  const [lines, setLines] = useState([])
  useEffect(() => {
    const func = async () => {
      const res = await fetch('/api/ai')
      const { data } = await res.json()
      setLines(data[0].lines)
    }
    func()
  })
  return (
    <div>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}
