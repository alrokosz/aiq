import '../styles/globals.css'

import { Inter, Josefin_Sans, Work_Sans } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'
import Header from './_components/Header'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'AiQ',
  description: 'generate flash cards with ai from pdfs or whatever',
  icons: [{ rel: 'icon', url: '/iq.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`min-h-full font-sans ${josefinSans.variable}`}>
        <TRPCReactProvider>
          <>
            <Header />
            {children}
          </>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
