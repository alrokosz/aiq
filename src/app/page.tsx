import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { CreatePost } from '@/app/_components/create-post'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import type { Metadata } from 'next'
import HomePageHero from './_components/HomePageHero'

export const metadata: Metadata = {
  title: 'AIQ',
  description: 'really really really smart notes',
}

export default async function Home() {
  noStore()
  const hello = await api.uploads.hello.query({ text: 'from tRPC' })
  // const file = await api.uploads.uploadFile.query({
  //   file: new File(["hello"], "hello.txt"),
  // });
  const session = await getServerAuthSession()

  return (
    <main className="min-h-full">
      <HomePageHero />
    </main>
  )
}
