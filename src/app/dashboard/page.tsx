import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import type { Metadata } from 'next'
import UploadCard from '../_components/UploadCard'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'your uploads',
}

export default async function Home() {
  const session = await getServerAuthSession()
  const uploads = await api.uploads.getUploads.query()
  console.log(uploads)

  return (
    <main className="min-h-full p-6">
      <h1 className="text-text-main mb-6 text-4xl font-semibold">Dashboard</h1>
      <div className="grid-cols-card grid gap-6">
        {uploads?.map(({ name, size }) => (
          <UploadCard name={name} size={size} />
        ))}
      </div>
    </main>
  )
}
