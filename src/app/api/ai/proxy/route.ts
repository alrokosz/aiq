export async function POST(request: Request) {
  const body = await request.json()
  const { url } = body
  console.log('url', url)
  const res = await fetch(url)
  const data = await res.json()
  console.log('data', data)

  return Response.json({ data: Buffer.from(data.blob()).toString('base64') })
}
