'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function FlippyCard() {
  // need null here so it doesn't animate when the page loads
  const [sideofCardShowing, setSideofCardShowing] = useState<
    'front' | 'back' | null
  >(null)

  const handleCardClick = (e: any) => {
    if (sideofCardShowing === 'front') {
      setSideofCardShowing('back')
    } else {
      setSideofCardShowing('front')
    }
  }

  return (
    <div className="relative m-auto h-60 w-60">
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing === 'back'}
        className={clsx(
          'perspective-origin-top preserve-3d perspective-62 border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto h-60 w-60 rounded-lg border bg-red-500 p-4 hover:cursor-pointer',
          { 'animate-flip-in z-10': sideofCardShowing === 'front' },
          { 'animate-flip-out': sideofCardShowing === 'back' },
        )}
      >
        <h2>back</h2>
      </div>
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing === 'front'}
        className={clsx(
          'perspective-origin-top preserve-3d perspective-62 border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto h-60 w-60 rounded-lg border bg-green-400 p-4 hover:cursor-pointer',
          { 'animate-flip-out': sideofCardShowing === 'front' },
          { 'animate-flip-in': sideofCardShowing === 'back' },
        )}
      >
        <h2>front</h2>
      </div>
    </div>
  )
}
