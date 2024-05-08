import { convertBytes } from '@/utils/lib'
import Link from 'next/link'
import dayjs from 'dayjs'

type UploadCardProps = {
  name: string | null
  size: number | null
  id: string | null
  uploadedAt: Date | null
}

export default function UploadCard({
  name,
  size,
  id,
  uploadedAt,
}: UploadCardProps) {
  return (
    <Link href={`/dashboard/${id}`}>
      <div className="border-border-main h-60 rounded-lg border p-4">
        <h2 className="text-lg font-semibold ">{name}</h2>
        <p className="text-sm text-gray-500">{size && convertBytes(size)}</p>
        <p className="text-sm text-gray-500">
          {dayjs(uploadedAt).format('MMM D YYYY')}
        </p>
      </div>
    </Link>
  )
}
