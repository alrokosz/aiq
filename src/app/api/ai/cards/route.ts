import { generateCardsFromPDF } from '@/server/utils/generateCards'
import { sleep } from '@/utils/lib'

type CardsContent = {
  question: string
  answer: string
}

export async function GET(request: Request) {
  await sleep(3000)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { number, question, url } = body
  const data = await generateCardsFromPDF(url, number, question)
  if ('error' in data) return data
  const cleanedData: CardsContent[] = data
    .map((d) => {
      if (d === null || d === undefined) return d
      try {
        return JSON.parse(d)
      } catch (e) {
        return null
      }
    })
    .filter(Boolean)

  return Response.json({ data: cleanedData })
}
