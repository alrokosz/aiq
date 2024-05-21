'use server'
import { generateImage } from '@/server/utils/generateImages'
import { generateCardsFromPDF } from '@/server/utils/generateCards'
import { btoa } from 'buffer'

type CardsContetnt = {
  question: string
  answer: string
}

type Ozymandias = {
  lines: string[]
}[]

type ResponseData = string[]

// export async function getImageBlob(url: string | undefined) {
//   console.log('url', url)
//   if (!url) return null
//   const res = await fetch(url)
//   const data = await res.blob()
//   console.log('data', data)
//   // const base64Buffer = Buffer.from(data).toString('base64')
//   // const otherBuffer = data.toString()
//   // console.log('base64Buffer', base64Buffer)
//   // console.log('otherBuffer', otherBuffer)
//   return data
// }

export async function getOzymandias() {
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = (await res.json()) as Promise<Ozymandias>
  return data
}

export async function generateAiImage(name: string) {
  const data = await generateImage(name)
  return data
}

export async function generateCards(
  url: string,
  number: number,
  question: string,
) {
  const data = await generateCardsFromPDF(url, number, question)
  if ('error' in data) return data
  // const cleanedData: CardsContetnt[] = data
  //   .map((d) => {
  //     if (d === null || d === undefined) return d
  //     try {
  //       return JSON.parse(d) as CardsContetnt
  //     } catch (e) {
  //       return null
  //     }
  //   })
  //   .filter(Boolean)
  //   .filter((data) => data && 'question' in data && 'answer' in data)

  const filteredData = data.filter(Boolean)
  const cleanedData = filteredData.map((d) => {
    if (d === null || d === undefined) return d
    try {
      return JSON.parse(d) as CardsContetnt
    } catch (e) {
      return undefined
    }
  })
  const reFilteredData = cleanedData
    .filter(Boolean)
    .filter((data) => data && Object.keys(data).length === 2)

  return reFilteredData as CardsContetnt[]
}
