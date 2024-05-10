'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
}

export default function ButtonModal({
  children,
  onClick,
  className,
  buttonText,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  buttonText: string
}) {
  const [isMaximized, setIsMaximized] = useState(false)
  //   const [buttonCoordinates, setButtonCoordinates] = useState<null | {}>({})
  const buttonRef = useRef<HTMLButtonElement>(null)

  //   useEffect(() => {
  //     if (buttonRef.current && !buttonCoordinates) {
  //       const { top, left, width, height } =
  //         buttonRef.current.getBoundingClientRect()
  //       setButtonCoordinates({ top, left, width, height })
  //     }
  //   })

  const onButtonClick = () => {
    if (isMaximized) {
      setIsMaximized(false)
    } else {
      setIsMaximized(true)
    }
  }

  return (
    <motion.div
      // onClick={() => setIsMaximized(!isMaximized)}
      layout={true}
      transition={SPRING}
      onAnimationEnd={() => console.log('ENDED')}
      // className={`wrapper ${isMaximized ? 'maximized' : ''}`}
      // might need will-change-auto or something like that
      className={clsx(
        'bg-button-alt flex h-fit w-fit flex-col items-center justify-start rounded text-black',
        {
          'width-revert height-revert absolute inset-8 rounded p-6':
            isMaximized,
        },
      )}
    >
      <motion.button
        layout="position"
        transition={SPRING}
        ref={buttonRef}
        onClick={onButtonClick}
        className={clsx(
          'bg-button-alt text-button-primary-text mr-auto self-start rounded p-3',
          className,
          { 'border-button-text border-2': isMaximized },
        )}
      >
        {isMaximized ? 'Go back' : buttonText}
      </motion.button>
      {isMaximized && children}
    </motion.div>
  )
}