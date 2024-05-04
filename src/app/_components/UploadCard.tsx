import { convertBytes } from '@/utils/lib'
import Link from 'next/link'

type UploadCardProps = {
  name: string | null
  size: number | null
}

export default function UploadCard({ name, size }: UploadCardProps) {
  return (
    <Link href={`/uploads/${name}`}>
      <div className="border-border-main h-60 rounded-lg border p-4">
        <h2 className="text-lg font-semibold ">{name}</h2>
        <p className="text-sm text-gray-500">{size && convertBytes(size)}</p>
      </div>
    </Link>
  )
}
