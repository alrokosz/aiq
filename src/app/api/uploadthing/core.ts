import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { generateCardsFromPDF } from '@/server/utils/generateCards'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
//https://docs.uploadthing.com/getting-started/appdir
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // auth stuff could go here
    // .middleware(async ({ req }) => {
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { hello: 'hello' }
    }),
  fileUploader: f({
    pdf: { maxFileSize: '32MB' },
  }).onUploadComplete(async ({ metadata, file }) => {
    // console.log('metadata', metadata)
    // const fileResponse = await fetch(
    //   'https://utfs.io/f/bf01ba6c-949a-4130-8a86-1160894236cc-r8cook.pdf',
    //   { method: 'GET', headers: { 'Content-Type': 'application/pdf' } },
    // )
    // const blob = await fileResponse.blob()
    const cards = await generateCardsFromPDF(file.url)
    // const readFile = await pdf(blob)
    // console.log({ blob })
    return { cards: cards }
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
