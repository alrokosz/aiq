'use client'
import { useRef, useState } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react'
import { getServerSession } from 'next-auth'
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
  const cardMutation = api.uploads.uploadFile.useMutation({
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      // TODO: pop toast with error message
      console.error(error)
    },
  })
  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    'fileUploader',
    {
      onClientUploadComplete: async (res) => {
        const { key, name, size, url } = res?.[0]
          ?.serverData as UploadedFileData
        cardMutation.mutate({
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
          accept=".pdf,.doc,.docx"
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
              className="rounded-full border-2 border-black p-3 peer-invalid:bg-red-600"
            >
              <UploadIcon height={30} width={30} />
            </button>
            <p>
              Drag and drop file or{' '}
              <button type="button" onClick={onBrowseClick}>
                <span className="text-purple-600">click to browse</span>
              </button>
            </p>
            <p className=" text-sm">Supported file types: .docx, .pdf, .pptx</p>
          </>
        ) : (
          <>
            <h2 className="text-xl text-black ">
              {`${files[0].name} (${convertBytes(files[0].size)})`}
            </h2>
            <button
              onClick={() => setFiles([])}
              type="button"
              className=" rounded-md border border-red-600 p-2 text-red-600"
            >
              Clear
            </button>
            <button
              onClick={() => {
                files.length && startUpload(files)
              }}
              type="submit"
              className={clsx(
                'mr-16 rounded-md border border-purple-600 bg-purple-600 p-2 text-white hover:bg-purple-400 active:shadow-md',
              )}
            >
              Submit
            </button>
          </>
        )}
        {/* <div
          className={clsx(
            'absolute bottom-0 left-0 flex min-h-24 w-full items-center justify-end gap-5 bg-purple-400',
            {
              // hidden: !files.length && !isUploading,
              'animate-slide-up': files.length,
              'bg-green-500': files.length,
              'bg-yellow-500': isUploading,
            },
          )}
        >
          {files[0] && (
            <h2 className="text-xl text-white ">
              {`${files[0].name} (${convertBytes(files[0].size)})`}
            </h2>
          )}
          <button
            onClick={() => setFiles([])}
            type="button"
            className=" rounded-md border border-red-600 p-2 text-red-600"
          >
            Clear
          </button>
          <button
            onClick={() => {
              files.length && startUpload(files)
            }}
            type="submit"
            className={clsx(
              'mr-16 rounded-md border border-purple-600 bg-purple-600 p-2 text-white hover:bg-purple-400 active:shadow-md',
            )}
          >
            Submit
          </button>
        </div> */}
      </form>
    </>
  )
}

/* 
        
*/
