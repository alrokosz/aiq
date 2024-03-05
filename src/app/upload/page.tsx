import DropBox from '@/app/_components/DropBox'

export default function UploadPage() {
  return (
    <div className=" flex flex-col justify-center gap-6 px-8 py-8">
      <h1 className="text-4xl font-bold">Generate instant study materials</h1>
      <h2>Upload class notes, lecture slides, or readings</h2>
      <DropBox />
      <p>This can do cool stuff</p>
    </div>
  )
}
