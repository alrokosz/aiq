'use client'
import { useRef, useState } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react'
import { UploadedFileData } from 'uploadthing/types'
import { convertBytes } from '@/utils/lib'

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export default function DropBox() {
  const [files, setFiles] = useState<File[]>([])
  const [isFileTypeValid, setIsFileTypeValid] = useState<
    'noFile' | 'valid' | 'invalid'
  >('noFile')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const uploadMutation = api.uploads.uploadFile.useMutation({
    onSuccess: async (_, { name, url }) => {
      // router.push('/dashboard')
      setFiles([])
    },
    onError: (error) => {
      // TODO: pop toast with error message
      console.error(error)
      setFiles([])
    },
  })
  const { startUpload: imageUpload, isUploading: isImageUploading } =
    useUploadThing('imageUploader', {
      onClientUploadComplete: async (res) => {
        console.log('image uploaded')
      },
      onUploadError: (error) => {
        console.error(error)
      },
      onUploadBegin: () => {},
    })
  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    'fileUploader',
    {
      onClientUploadComplete: async (res) => {
        const { key, name, size, url } = res?.[0]
          ?.serverData as UploadedFileData
        uploadMutation.mutate({
          uploadThingKey: key,
          name,
          size,
          url,
        })
      },
      onUploadError: (error) => {
        console.error(error)
      },
      onUploadBegin: () => {
        console.log('uploading')
      },
    },
  )
  // const router = useRouter();

  const onBrowseClick = () => {
    inputRef.current?.click()
  }

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const drop = (e: React.DragEvent) => {
    preventDefaults(e)

    const dt = e.dataTransfer
    const files = dt.files
    files[0] && setFiles([files[0]])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!files) {
      return
    }
  }

  if (isUploading) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-6 rounded-md border-2 border-black p-6">
        <h2 className="text-xl text-black ">Uploading...</h2>
      </div>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onDragEnter={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={drop}
        className=" flex h-80 flex-col items-center justify-center gap-6 rounded-md border-2 border-black p-6"
      >
        <label className="sr-only" htmlFor="summary">
          Choose file to upload
        </label>
        <input
          ref={inputRef}
          className="peer hidden pt-5"
          type="file"
          id="summary"
          name="summary"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0]
            file && setFiles([file])
          }}
        />

        {!files[0] ? (
          <>
            <button
              type="button"
              onClick={onBrowseClick}
              className="shadow-primary hover:bg-button-alt-hover bg-button-alt rounded-full border-2 p-3 peer-invalid:bg-red-600"
            >
              <UploadIcon color="white" height={30} width={30} />
            </button>
            <p className="text-center">
              Drag and drop file or{' '}
              <button type="button" onClick={onBrowseClick}>
                <span className="text-button-alt hover:text-button-alt-hover">
                  click to browse
                </span>
              </button>
            </p>
            <p className=" text-sm">Supported file types: .pdf</p>
          </>
        ) : (
          <>
            <h2 className="text-center text-xl text-black">
              {`${files[0].name} (${convertBytes(files[0].size)})`}
            </h2>
            <div>
              <button
                onClick={() => setFiles([])}
                type="button"
                className=" mr-4 rounded-md border border-red-600 p-2 text-red-600"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  files.length && startUpload(files)
                }}
                type="submit"
                className={clsx(
                  'bg-button-alt text-button-primary-text border-bg-button-alt w-24 rounded-md p-2',
                )}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </>
  )
}
