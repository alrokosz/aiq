'use client'

import { Drawer } from 'vaul'
import { ThickArrowDownIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import MotionLink from './MotionLink'
import { motion, useDragControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { type Session } from 'next-auth'

const FloatingDownArrow = motion(ThickArrowDownIcon)

export default function HeaderDrawer({ session }: { session: Session | null }) {
  const [draggableHeight, setDraggableHeight] = useState<number>(192)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showSwipeInstructions, setShowSwipeInstructions] = useState(true)
  const dragControls = useDragControls()
  const contentRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)
  const vh =
    typeof window === 'undefined'
      ? 0
      : Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0,
        )

  const handleOpenAutoFocus = () => {
    setDraggableHeight(draggableRef?.current?.clientHeight || 192)
  }

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event)
  }

  return (
    <div className="md:hidden">
      <Drawer.Root
        shouldScaleBackground
        disablePreventScroll={!isDrawerOpen}
        open={isDrawerOpen}
        direction="right"
      >
        <Drawer.Trigger asChild>
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <HamburgerMenuIcon height={36} width={36} color="black" />
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Handle className=" bg-gray-400 " />
          <Drawer.Overlay
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/40"
          />
          <Drawer.Content
            onPointerDown={startDrag}
            ref={contentRef}
            className="bg-bg-main fixed bottom-0 right-0 mt-24 flex h-full w-7/12 flex-col justify-start gap-4 px-4 py-4 md:w-[400px]"
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
              onDrag={() => setShowSwipeInstructions(false)}
              dragTransition={{ bounceStiffness: 800, bounceDamping: 60 }}
              className="flex flex-col gap-4"
              dragControls={dragControls}
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
                className="text-text-main"
                onClick={() => setIsDrawerOpen(false)}
              >
                Home
              </MotionLink>
              <MotionLink
                onClick={() => setIsDrawerOpen(false)}
                className="text-text-main"
                href="/dashboard"
              >
                Library
              </MotionLink>
              <MotionLink
                onClick={() => setIsDrawerOpen(false)}
                className="text-text-main"
                href="/upload"
              >
                Upload
              </MotionLink>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-text-main w-fit text-left"
              >
                Close
              </button>
            </motion.div>
            {showSwipeInstructions && (
              <div className="mt-auto">
                <p className="text-text-main text-center opacity-60">
                  <FloatingDownArrow
                    animate={{
                      y: 15,
                    }}
                    initial={{ y: 0 }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="mx-auto mb-4"
                    color="#888888"
                    width={36}
                    height={36}
                  />
                  Swipe down if you have tiny thumbs
                </p>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
