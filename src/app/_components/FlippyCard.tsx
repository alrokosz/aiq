'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import ScrollContainer from './VerticalScroll'

type FlippyCardProps = {
  frontText: string
  backText: string
}

export default function FlippyCard({ frontText, backText }: FlippyCardProps) {
  // need null here so it doesn't animate when the page loads
  const [sideofCardShowing, setSideofCardShowing] = useState<
    'front' | 'back' | null
  >(null)
  const handleCardClick = (e: any) => {
    if (sideofCardShowing === 'back') {
      setSideofCardShowing('front')
    } else {
      setSideofCardShowing('back')
    }
  }

  return (
    <div className="perspective-62 relative m-auto h-60 w-full">
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing !== 'back'}
        className={clsx(
          ' preserve-3d rotate-y-0 border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto flex h-full w-full items-center justify-center rounded-lg border bg-white  p-4 hover:cursor-pointer',
          { 'animate-flip-in z-10': sideofCardShowing === 'back' },
          { 'animate-flip-out': sideofCardShowing === 'front' },
          // { 'rotate-x-180': sideofCardShowing === null },
        )}
      >
        <ScrollContainer
          rootClassName="h-full"
          viewPortClassName="h-fit my-auto"
        >
          <p className="text-center">{backText}</p>
        </ScrollContainer>
      </div>
      <div
        onClick={handleCardClick}
        aria-hidden={sideofCardShowing === 'back' || sideofCardShowing === null}
        className={clsx(
          ' preserve-3d rotate-y-0 perspective-62 border-border-main shadow-primary backface-hidden animation-fill-forwards absolute inset-auto flex h-full w-full items-center justify-center rounded-lg border bg-white p-4 hover:cursor-pointer',
          { 'animate-flip-out': sideofCardShowing === 'back' },
          { 'animate-flip-in': sideofCardShowing === 'front' },
        )}
      >
        <ScrollContainer
          rootClassName="h-full"
          viewPortClassName="h-fit my-auto"
        >
          <h2 className="text-center text-xl font-semibold">{frontText}</h2>
        </ScrollContainer>
      </div>
    </div>
  )
}
