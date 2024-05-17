import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateImage = async (title: string) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: title,
    n: 1,
    size: '1024x1024',
  })
  return response
}
