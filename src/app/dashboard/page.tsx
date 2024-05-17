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

  return (
    <main className="mx-auto min-h-full  max-w-6xl p-6">
      <h1 className="text-text-main mb-6 text-4xl font-semibold">Dashboard</h1>
      <div className="grid-cols-card grid gap-6">
        {uploads?.map(({ name, size, id, uploadedAt }) => (
          <UploadCard
            key={id}
            name={name}
            size={size}
            id={id}
            uploadedAt={uploadedAt}
          />
        ))}
      </div>
    </main>
  )
}
