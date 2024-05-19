import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import OpenAI from 'openai'
import { pdf } from './openAIChatOptions'

const exampleJSONResponse = [
  {
    question: 'Who was the first President of the United States?',
    answer: 'George Washington',
  },
  {
    question: 'What event marked the beginning of World War II?',
    answer: 'The invasion of Poland by Nazi Germany in 1939',
  },
  {
    question: 'What was the result of the Battle of Hastings?',
    answer: 'The Norman conquest of England in 1066',
  },
  {
    question: 'What event led to the start of the American Revolutionary War?',
    answer: 'The Battles of Lexington and Concord in 1775',
  },
  {
    question: 'What was the significance of the Berlin Wall?',
    answer: 'It divided East and West Berlin during the Cold War',
  },
  {
    question: 'Which ancient civilization built the Great Pyramid of Giza?',
    answer: 'Ancient Egyptians',
  },
  {
    question: "Who is known as the 'Father of Physics'?",
    answer: 'Isaac Newton',
  },
]

const MAX_GPT_3_TURBO_CHARACTERS = 40000

function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

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
  return load
  //   return loader.loadAndSplit(
  //     new CharacterTextSplitter({
  //       separator: '. ',
  //       chunkSize: 3000,
  //       chunkOverlap: 0,
  //     }),
  //   )
}

const createFlashCardsChat = async (
  input: string,
  numCards: number,
  extraInfo: string,
) => {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `Your task is to generate flashcards tailored to users' inputs, focusing specifically on important historical figures and events. Please create ${numCards} questions along with ${numCards} corresponding answers, formatted in JSON. Ensure that each question pertains to a significant person or event, providing detailed information. The document may contain information about the author or lecturer of the document, and may include a table of contents. Please ignore anythinf relating to the lecturer, author, or table of contents Your output should follow this structure: [{"question": "...", "answer": "..."}]
        Here are some examples to guide you: ${JSON.stringify(exampleJSONResponse)}
        These examples demonstrate the types of questions and answers we're looking for in the flashcards. Please ensure your output aligns with this format and provides informative content.`,
      },
      {
        role: 'user',
        content: `I have a document I would like to create flashcards from. Please create ${numCards} questions and ${numCards} answers from the document provided. Focus on Names and dates. Ignore the table of contents and the anything about the author of the document. ${extraInfo ? `If the following extra information is relevant please keep it in mind as well: ${extraInfo}` : ''}
          Here is the document: ${input}
          `,
      },
    ],
  })
}

export const generateCardsFromPDF = async (
  url: string,
  numCards: number,
  extraInfo: string,
) => {
  const fileResponse = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/pdf' },
  })
  const blob = await fileResponse.blob()
  const docs = await docsFromPDF(blob)
  const allPages = docs.reduce((acc, cur) => acc + cur.pageContent, '')

  const numCalls = Math.ceil(allPages.length / MAX_GPT_3_TURBO_CHARACTERS)
  const allResponses: (string | null | undefined)[] = []
  try {
    for (let i = 0; i < numCalls; i++) {
      if ((i + 1) % 3 === 0) await sleep(20000)
      const start = Math.floor(
        i === 0 ? 0 : (allPages.length / numCalls) * i - 1000,
      )
      const last = Math.floor((allPages.length / numCalls) * (i + 1))
      const end = last > allPages.length - 1 ? allPages.length - 1 : last
      const res = await createFlashCardsChat(
        allPages.slice(start, end),
        Math.ceil(numCards / numCalls),
        extraInfo,
      )
      allResponses.push(res?.choices[0]?.message?.content)
    }
    return allResponses
  } catch (error) {
    return { error }
  }
}
