import { getServerAuthSession } from '@/server/auth'
import Link from 'next/link'
import MotionLink from './MotionLink'

type LinkWithAuthProps = {
  children: React.ReactNode
  href: string
  motion?: boolean
  className?: string
}

export default async function LinkWithAuth({
  children,
  href,
  motion = true,
  className,
}: LinkWithAuthProps) {
  const session = await getServerAuthSession()

  return (
    <MotionLink
      className={className}
      motion={motion}
      href={session ? href : '/api/auth/signin'}
    >
      {children}
    </MotionLink>
  )
}
