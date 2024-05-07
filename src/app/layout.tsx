import '../styles/globals.css'

import { Inter, Josefin_Sans } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'
import Header from './_components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'AiQ',
  description: 'generate flash cards with ai from your uploads',
  icons: [{ rel: 'icon', url: '/iq.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`min-h-full font-sans ${inter.variable}`}>
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
