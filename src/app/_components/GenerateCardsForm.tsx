'use client'
import * as Form from '@radix-ui/react-form'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { api } from '@/trpc/react'
import { generateCards } from '../actions'

type GeneratedCards = {
  question: string
  answer: string
}[]

export default function GenerateCardsForm({
  onSubmit,
  url,
}: {
  onSubmit?: () => void
  url: string | null
}) {
  const [isLoadingFlashcards, setIsLoadingFlashcards] = useState(false)
  const cardMutation = api.uploads.createCards.useMutation({
    onSuccess: () => {
      console.log('cards created')
      // TODO: show toast at some point
    },
    onError: (error) => {
      // TODO: pop toast with error message
      console.error(error)
    },
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form as HTMLFormElement)
    const number = formData.get('number')
    const question = formData.get('extraInfo')
    setIsLoadingFlashcards(true)
    if (url) {
      const data = await generateCards(url, Number(number), String(question))
      console.log(data)
      const uploadId = window.location.href.split('/').pop()
      if ('error' in data) return null
      if (!uploadId) return null
      cardMutation.mutate(
        data
          .flat()
          .map(
            ({ question, answer }: { question: string; answer: string }) => ({
              front: question,
              back: answer,
              uploadId,
            }),
          ),
      )
    }
    setIsLoadingFlashcards(false)
    onSubmit?.()
  }

  if (isLoadingFlashcards) {
    return (
      <div className="flex w-80 items-center justify-center">
        <h2 className="text-white">Generating Cards</h2>
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
    >
      <Form.Root
        className="xs:w-80 w-full pb-9 pt-6 md:py-9"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid" name="number">
          <div className="mb-3 flex flex-col items-center justify-between">
            <div className="mb-3 flex">
              <Form.Label className="text-button-primary-text xs:text-base mr-3 text-nowrap text-sm font-semibold leading-8">
                How many cards do you want?
              </Form.Label>
              <Form.Control asChild>
                <input
                  className="flex w-full items-center justify-center rounded-md p-2 text-center text-sm hover:shadow-sm focus:shadow"
                  type="number"
                  required
                  max={100}
                  min={1}
                />
              </Form.Control>
            </div>
            <Form.Message
              className="text-button-primary-text text-sm opacity-75"
              match="rangeOverflow"
            >
              Please enter a valid number between 1 - 100
            </Form.Message>
            <Form.Message
              className="text-button-primary-text text-sm opacity-75"
              match="rangeUnderflow"
            >
              Please enter a valid number between 1 - 100
            </Form.Message>
            <Form.Message
              className="text-button-primary-text text-sm opacity-75"
              match="typeMismatch"
            >
              Please enter a number
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field className="mb-3 grid" name="extraInfo">
          <div className="mb-3 flex flex-col items-center justify-between gap-3">
            <Form.Label className="FormLabel text-button-primary-text xs:text-base text-sm font-semibold leading-8">
              Anything you want to add?
            </Form.Label>
            <Form.Control asChild>
              <textarea className="inline-flex h-28 w-full resize-none items-center justify-center rounded-md p-3 text-sm leading-none hover:shadow-sm focus:shadow" />
            </Form.Control>
            <Form.Message
              className="text-button-primary-text text-sm opacity-75"
              match="valueMissing"
            >
              Please enter something to help make better flashcards
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <button className="text-button-primary-text bg-button-primary inline-flex h-9 w-full items-center justify-center rounded-sm text-base font-semibold leading-none">
            Generate flashcards
          </button>
        </Form.Submit>
      </Form.Root>
    </motion.div>
  )
}
