import Link from 'next/link'
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
        <Link href="/" className="text-text-main text-4xl font-bold">
          AIQ
        </Link>
        {/* TODO: use real href here eventually */}
        <LinkWithAuth href="/upload">Tools</LinkWithAuth>
        <LinkWithAuth href="/upload">Your Library</LinkWithAuth>
      </div>
      <div className="flex flex-none gap-4">
        <LinkWithAuth href="/upload">Generate</LinkWithAuth>

        <Link
          href={session ? '/api/auth/signout' : '/api/auth/signin'}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </header>
  )
}
