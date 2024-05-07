import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=" flex min-h-full flex-col items-center justify-center">
      <h1 className="text-4xl">404 - Not Found</h1>
      <p>Could not find requested resource</p>
      <Link className="text-button-alt" href="/">
        Return Home
      </Link>
    </div>
  )
}
