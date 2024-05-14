export async function GET(request: Request) {
  //   console.log(process.env.OPENAI_API_KEY)
  console.log(request)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  //   console.log(process.env.OPENAI_API_KEY)
  const body = await request.json()
  console.log(body)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}
