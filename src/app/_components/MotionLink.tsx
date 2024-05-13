'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type MotionLinkProps = {
  children: React.ReactNode
  href: string
  motion?: boolean
  className?: string
}

const LinkWithMotion = motion(Link)

export default function MotionLink({
  href,
  children,
  motion = true,
  className,
}: MotionLinkProps) {
  const Tag = motion ? LinkWithMotion : Link

  const props = {
    href,
    className: clsx(className),
    ...(motion
      ? {
          whileHover: { scale: 1.05, transition: { duration: 0.1 } },
          whileTap: { scale: 0.95, transition: { duration: 0.1 } },
          whileDrag: { scale: 1 },
        }
      : {}),
  }
  return <Tag {...props}>{children}</Tag>
}
