export async function GET() {
  //   console.log(process.env.OPENAI_API_KEY)
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}
