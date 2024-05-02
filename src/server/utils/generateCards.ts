import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import OpenAI from 'openai'
import { pdf } from './openAIChatOptions'
import Anthropic from '@anthropic-ai/sdk'
import { UploadThingError } from 'uploadthing/server'

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

export const generateCardsFromPDF = async (url: string) => {
  const fileResponse = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/pdf' },
  })
  const blob = await fileResponse.blob()
  const docs = await docsFromPDF(blob)
  const allPages = docs.reduce((acc, cur) => acc + cur.pageContent, '')

  const response = await openai.chat.completions.create({
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
          Here is the document:${allPages}
          `,
      },
    ],
  })
  console.log('RESPONSE', response)
  //   console.log('FINISH REASON', response.choices[0]?.finish_reason)
  //   console.log(response.choices?.[0]?.message.content)
  return response.choices?.[0] //?.message.content
}
