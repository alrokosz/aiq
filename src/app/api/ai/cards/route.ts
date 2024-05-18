import { generateCardsFromPDF } from '@/server/utils/generateCards'
import { sleep } from '@/utils/lib'

export async function GET(request: Request) {
  console.log('IN SERVER FROM THING')
  await sleep(3000)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { number, question, url } = body
  const data = await generateCardsFromPDF(url, number, question)

  return Response.json({ data })
}
