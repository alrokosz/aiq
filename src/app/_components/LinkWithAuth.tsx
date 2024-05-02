import { getServerAuthSession } from '@/server/auth'
import Link from 'next/link'

type LinkWithAuthProps = {
  children: React.ReactNode
  href: string
}

export default async function LinkWithAuth({
  children,
  href,
}: LinkWithAuthProps) {
  const session = await getServerAuthSession()

  return (
    <Link
      className=" text-text-main"
      href={session ? href : '/api/auth/signin'}
    >
      {children}
    </Link>
  )
}
