import MotionLink from './MotionLink'
import SearchBar from './SearchBar'
import { getServerAuthSession } from '@/server/auth'
import LinkWithAuth from './LinkWithAuth'
// import { Josefin_Sans } from 'next/font/google'

// const josefin_sans = Josefin_Sans({
//   weight: '400',
//   subsets: ['latin'],
//   style: ['italic'],
//   variable: '--font-josefin-sans',
// })

export default async function Header() {
  const session = await getServerAuthSession()
  return (
    <header className="bg-bg-main sticky top-0 flex w-full items-center gap-8 p-4 text-white">
      <div className="mr-auto flex h-4 flex-none items-center gap-7">
        <MotionLink
          motion={false}
          href="/"
          className="text-text-main text-4xl font-bold"
        >
          AIQ
        </MotionLink>
        {/* TODO: use real href here eventually */}
        <LinkWithAuth className="text-text-main" href="/upload">
          Tools
        </LinkWithAuth>
        <LinkWithAuth className="text-text-main" href="/dashboard">
          Your Library
        </LinkWithAuth>
        <LinkWithAuth className="text-text-main" href="/upload">
          Generate
        </LinkWithAuth>
      </div>

      <MotionLink
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className="bg-button-primary text-button-primary-text rounded px-10 py-3 font-semibold no-underline transition"
      >
        {session ? 'Sign out' : 'Sign in'}
      </MotionLink>
    </header>
  )
}
