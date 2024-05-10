'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function FlippyCard() {
  // need null here so it doesn't animate when the page loads
  const [sideofCardShowing, setSideofCardShowing] = useState<
    'front' | 'back' | null
  >(null)
  console.log({ sideofCardShowing })
  const handleCardClick = (e: any) => {
    if (sideofCardShowing === 'back') {
      setSideofCardShowing('front')
    } else {
      setSideofCardShowing('back')
    }
  }

  return (
    <div className="perspective-62 relative m-auto h-60 w-60">
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing === 'back'}
        className={clsx(
          'perspective-origin-top preserve-3d border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto h-60 w-60 rounded-lg border bg-red-500 p-4 hover:cursor-pointer',
          { 'animate-flip-in z-10': sideofCardShowing === 'back' },
          { 'animate-flip-out': sideofCardShowing === 'front' },
        )}
      >
        <h2>back</h2>
      </div>
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing === 'front'}
        className={clsx(
          'perspective-origin-top preserve-3d perspective-62 border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto h-60 w-60 rounded-lg border bg-green-400 p-4 hover:cursor-pointer',
          { 'animate-flip-out': sideofCardShowing === 'back' },
          { 'animate-flip-in': sideofCardShowing === 'front' },
        )}
      >
        <h2>front</h2>
      </div>
    </div>
  )
}
