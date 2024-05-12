export async function GET() {
  const res = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
  const data = await res.json()

  return Response.json({ data })
}
