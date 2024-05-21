import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { generateCardsFromPDF } from '@/server/utils/generateCards'
import { api } from '@/trpc/server'
import { generateImage } from '@/server/utils/generateImages'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
//https://docs.uploadthing.com/getting-started/appdir
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '32GB' } })
    // auth stuff could go here
    // .middleware(async ({ req }) => {
    .onUploadComplete(async ({ metadata, file }) => {
      return { ...file, metadata }
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { hello: 'hello' }
    }),
  fileUploader: f({
    pdf: { maxFileSize: '32MB' },
  }).onUploadComplete(async ({ file }) => {
    const cleanedName = file.name.replace('.pdf', '').trim()
    return { ...file, name: cleanedName }
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
