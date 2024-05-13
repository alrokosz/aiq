'use client'

import { Drawer } from 'vaul'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import MotionLink from './MotionLink'
import { motion, useDragControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { type Session } from 'next-auth'
import usePrevious from '@/hooks/usePrevious'

export default function HeaderDrawer({ session }: { session: Session | null }) {
  const [draggableHeight, setDraggableHeight] = useState<number>(192)
  const dragControls = useDragControls()
  const contentRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)
  const previousDraggableHeight = usePrevious(
    draggableRef?.current?.clientHeight,
  )
  const vh =
    typeof window === 'undefined'
      ? 0
      : Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0,
        )

  // dynamically sets height of draggable element if drawer content changes size based on screen width or conditional rendering
  // used for drag constraints to prevent dragging off screen
  //   if (
  //     draggableRef?.current?.clientHeight &&
  //     previousDraggableHeight !== draggableRef.current.clientHeight
  //   ) {
  //     console.log('SETTING CORRECT HEIGHT')
  //     setDraggableHeight(draggableRef?.current?.clientHeight)
  //   }

  //   const handleOpenChange = () => {
  //     console.log(
  //       'handleOpenChange SETTING HEIGHT',
  //       draggableRef?.current?.clientHeight,
  //     )
  //     setDraggableHeight(draggableRef?.current?.clientHeight || 192)
  //   }

  const handleOpenAutoFocus = () => {
    console.log(
      'handleOpenAutoFocus SETTING HEIGHT',
      draggableRef?.current?.clientHeight,
    )
    setDraggableHeight(draggableRef?.current?.clientHeight || 192)
  }

  //   useEffect(() => {
  //     if (draggableRef?.current?.clientHeight) {
  //       console.log('SETTING CORRECT HEIGHT')
  //       setDraggableHeight(draggableRef?.current?.clientHeight)
  //     }
  //   }, [draggableRef?.current?.clientHeight])

  console.log('draggableHeight', draggableHeight)

  return (
    <div className="md:hidden">
      <Drawer.Root direction="right">
        <Drawer.Trigger asChild>
          <HamburgerMenuIcon height={36} width={36} color="black" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            ref={contentRef}
            className="bg-bg-main fixed bottom-0 right-0 mt-24 flex h-full w-7/12 flex-col justify-start gap-4 rounded-t-[10px] px-4 py-4 md:w-[400px]"
            onOpenAutoFocus={handleOpenAutoFocus}
          >
            <motion.div
              drag="y"
              whileDrag={{ scale: 1.05 }}
              //   dragConstraints={contentRef}
              dragConstraints={{
                top: 0,
                bottom: vh - draggableHeight - 32,
              }}
              dragTransition={{ bounceStiffness: 800, bounceDamping: 60 }}
              className="flex flex-col gap-4"
              ref={draggableRef}
            >
              <MotionLink
                href={session ? '/api/auth/signout' : '/api/auth/signin'}
                className="bg-button-primary text-button-primary-text flex items-center justify-center rounded px-10 py-3 font-semibold"
              >
                {session ? 'Sign out' : 'Sign in'}
              </MotionLink>
              <MotionLink
                motion={false}
                href="/"
                className="text-text-main text-4xl font-bold"
              >
                AIQ
              </MotionLink>
              <MotionLink className="text-text-main" href="/dashboard">
                Library
              </MotionLink>
              <MotionLink className="text-text-main" href="/upload">
                Upload
              </MotionLink>
              <Drawer.Close asChild>
                <button className="bg-button-primary text-button-primary-text w-full rounded px-10 py-3 font-semibold">
                  Close
                </button>
              </Drawer.Close>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
