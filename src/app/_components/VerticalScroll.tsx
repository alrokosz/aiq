'use client'

import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { twMerge } from 'tailwind-merge'

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)

type ScrollContainerProps = {
  rootClassName?: string
  viewPortClassName?: string
  children: React.ReactNode
}

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  rootClassName,
  viewPortClassName,
  children,
}) => (
  <ScrollArea.Root
    className={twMerge(
      'flex w-full overflow-hidden rounded bg-white',
      rootClassName,
    )}
  >
    <ScrollArea.Viewport className={twMerge('w-full', viewPortClassName)}>
      <div className="my-auto h-fit">{children}</div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-black before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-black before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-black" />
  </ScrollArea.Root>
)

export default ScrollContainer
