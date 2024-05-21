import FlippyCard from '@/app/_components/FlippyCard'
import ButtonModal from '@/app/_components/ButtonModal'
import Cards from '@/app/_components/Cards'
import GenerateCardsForm from '@/app/_components/GenerateCardsForm'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import UploadContent from '@/app/_components/UploadContent'
import { redirect } from 'next/navigation'

type Cards = {
  id: string
  userId: string
  front: string
  back: string
  aiGenerated: boolean | null
  uploadId: string
  lastSeen: Date | null
  nextReview: Date | null
  easeFactor: number | null
  repetitions: number | null
  createdAt: Date | null
}[]

export default async function CardsPage({
  params,
}: {
  params: { uploadId: string }
}) {
  const session = await getServerAuthSession()
  const cards: Cards = await api.uploads.getFlashcards.query({
    uploadId: params.uploadId,
  })

  if (!session) {
    redirect('/')
  }

  if (!cards[0]) {
    return notFound()
  }

  return (
    <main className="mx-auto  max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Flaschcards</h1>
      <div className="grid-cols-card grid max-w-6xl gap-6">
        {cards.map(({ front, back }) => (
          <FlippyCard frontText={front} backText={back} />
        ))}
      </div>
    </main>
  )
}
