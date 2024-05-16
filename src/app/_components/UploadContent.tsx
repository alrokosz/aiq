'use client'

import ButtonModal from '@/app/_components/ButtonModal'
import Cards from '@/app/_components/Cards'
import GenerateCardsForm from '@/app/_components/GenerateCardsForm'
import { LayoutGroup } from 'framer-motion'

export default function UploadContent({ url }: { url: string | null }) {
  return (
    <LayoutGroup>
      <ButtonModal buttonText="Create Flashcards">
        <GenerateCardsForm url={url} />
      </ButtonModal>
      <Cards />
    </LayoutGroup>
  )
}
