import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import OpenAI from 'openai'
import { pdf } from './openAIChatOptions'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const createStore = (input: any) =>
  MemoryVectorStore.fromDocuments(input, new OpenAIEmbeddings())

export const docsFromYTVideo = async (video: any) => {
  const loader = YoutubeLoader.createFromUrl(video, {
    language: 'en',
    addVideoInfo: true,
  })
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ' ',
      chunkSize: 2500,
      chunkOverlap: 100,
    }),
  )
}

export const docsFromPDF = async (input: Blob) => {
  const loader = new PDFLoader(input)
  const load = await loader.load()
  return loader.load()
  //   return loader.loadAndSplit(
  //     new CharacterTextSplitter({
  //       separator: '. ',
  //       chunkSize: 3000,
  //       chunkOverlap: 0,
  //     }),
  //   )
}

const createFlashCardsChat = async (input: string) => {
  return await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content:
          'You will be creating flashcards for a user based on the input they provide. Please generate 5 questions with 5 answers. Proide the response in JSON format. Similiar to this example [{"question": "...", "answer": "..."}]}',
      },
      {
        role: 'user',
        content: `I have a document I would like to create flashcards from. Please create 5 questions and 5 answers from the document provided. Focus on Names and dates. Ignore the table of contents and the anything about the author of the document.
          Here is the document:${input}
          `,
      },
    ],
  })
}

export const generateCardsFromPDF = async (url: string) => {
  const fileResponse = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/pdf' },
  })
  const blob = await fileResponse.blob()
  const docs = await docsFromPDF(blob)
  const allPages = docs.reduce((acc, cur) => acc + cur.pageContent, '')
  const firstStart = 0
  const firstEnd = allPages.length / 3 + 1000
  const secondStart = allPages.length / 3
  const secondEnd = (allPages.length / 3) * 2 + 1000
  const thirdStart = (allPages.length / 3) * 2
  const thirdEnd = allPages.length - 1

  if (allPages.length > 10000) {
    const response = await Promise.all([
      createFlashCardsChat(allPages.slice(firstStart, firstEnd)),
      createFlashCardsChat(allPages.slice(secondStart, secondEnd)),
      createFlashCardsChat(allPages.slice(thirdStart, thirdEnd)),
    ])

    console.log('RESPONSE', response)
    return [
      response[0].choices?.[0],
      response[1].choices?.[0],
      response[2].choices?.[0],
    ] //?.message.content
  } else {
    const response = await createFlashCardsChat(allPages)
    return response.choices?.[0]
  }
}
