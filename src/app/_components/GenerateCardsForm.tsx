'use client'
import * as Form from '@radix-ui/react-form'
import { motion } from 'framer-motion'

export default function GenerateCardsForm({
  onSubmit = () => {},
}: {
  onSubmit?: () => void
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const number = formData.get('number')
    const question = formData.get('extraInfo')

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number, question }),
    })
    const { data } = await res.json()
    console.log({ data })

    onSubmit()
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
    >
      <Form.Root className="FormRoot w-80" onSubmit={handleSubmit}>
        <Form.Field className="FormField grid" name="number">
          <div className="mb-3 flex flex-col items-center justify-between">
            <div className="mb-3 flex">
              <Form.Label className="FormLabel text-button-primary-text mr-3 text-nowrap text-base font-semibold leading-8">
                How many cards do you want?
              </Form.Label>
              <Form.Control asChild>
                <input
                  className="Input flex w-full items-center justify-center rounded-md p-2 text-center text-sm hover:shadow-sm focus:shadow"
                  type="number"
                  required
                  max={100}
                  min={1}
                />
              </Form.Control>
            </div>
            <Form.Message
              className="FormMessage text-button-primary-text text-sm opacity-75"
              match="rangeOverflow"
            >
              Please enter a valid number between 1 - 100
            </Form.Message>
            <Form.Message
              className="FormMessage text-button-primary-text text-sm opacity-75"
              match="rangeUnderflow"
            >
              Please enter a valid number between 1 - 100
            </Form.Message>
            <Form.Message
              className="FormMessage text-button-primary-text text-sm opacity-75"
              match="typeMismatch"
            >
              Please enter a number
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field className="FormField mb-3 grid" name="extraInfo">
          <div className="mb-3 flex flex-col items-center justify-between gap-3">
            <Form.Label className="FormLabel text-button-primary-text text-base font-semibold leading-8">
              Anything you'd like to add?
            </Form.Label>
            <Form.Control asChild>
              <textarea
                className="Textarea inline-flex h-28 w-full resize-none items-center justify-center rounded-md p-3 text-sm leading-none hover:shadow-sm focus:shadow"
                required
              />
            </Form.Control>
            <Form.Message
              className="FormMessage text-button-primary-text text-sm opacity-75"
              match="valueMissing"
            >
              Please enter something to help make better flashcards
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <button className="Button text-button-primary-text bg-button-primary inline-flex h-9 w-full items-center justify-center rounded-sm text-base font-semibold leading-none">
            Generate flashcards
          </button>
        </Form.Submit>
      </Form.Root>
    </motion.div>
  )
}
