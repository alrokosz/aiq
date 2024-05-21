import ButtonModal from '@/app/_components/ButtonModal'
import Cards from '@/app/_components/Cards'
import GenerateCardsForm from '@/app/_components/GenerateCardsForm'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import UploadContent from '@/app/_components/UploadContent'

type Upload = {
  id: string
  name: string | null
  userId: string | null
  size: number | null
  url: string | null
  uploadThingKey: string | null
  uploadedAt: Date | null
  hasFlachcards: boolean | null
}[]

export default async function UploadPage({
  params,
}: {
  params: { uploadId: string }
}) {
  const session = await getServerAuthSession()
  const upload: Upload = await api.uploads.getUpload.query({
    uploadId: params.uploadId,
  })

  if (!upload[0]) {
    return notFound()
  }

  const { name } = upload[0] || {}
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">{name}</h1>
      <UploadContent url={upload[0].url} />
    </main>
  )
}
