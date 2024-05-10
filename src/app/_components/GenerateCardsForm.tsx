'use client'
import * as Form from '@radix-ui/react-form'

export default function GenerateCardsForm() {
  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField grid" name="number">
        <div className="mb-3 flex flex-col items-center justify-between">
          <div className="mb-3 flex">
            <Form.Label className="FormLabel text-button-primary-text mr-3 text-nowrap text-base font-semibold leading-8">
              How many cards do you want?
            </Form.Label>
            <Form.Control asChild>
              <input
                className="Input inline-flex w-full items-center justify-center rounded-md p-1 text-sm hover:shadow-sm focus:shadow"
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
      <Form.Field className="FormField mb-3 grid" name="question">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Form.Label className="FormLabel text-button-primary-text text-base font-semibold leading-8">
            Anything you'd like to add?
          </Form.Label>
          <Form.Message
            className="FormMessage text-button-primary-text text-sm opacity-75"
            match="valueMissing"
          >
            Please enter a question
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="Textarea inline-flex w-full items-center justify-center rounded-md p-3 text-sm leading-none hover:shadow-sm focus:shadow"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button mt-3">Post question</button>
      </Form.Submit>
    </Form.Root>
  )
}
