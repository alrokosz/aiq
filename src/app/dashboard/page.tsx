import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'your uploads',
}

export default async function Home() {
  const session = await getServerAuthSession()
  const uploads = await api.uploads.getUploads.query()

  return (
    <main className="min-h-full p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="rounded-lg bg-white p-4">
            <h2 className="text-lg font-semibold">{upload.name}</h2>
            <p className="text-sm text-gray-500">{upload.size}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
