import { generateImage } from '@/server/utils/generateImages'

export async function GET(request: Request) {
  console.log(request)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title } = body
  const data = await generateImage(title)

  return Response.json({ data })
}
