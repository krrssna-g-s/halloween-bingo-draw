import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import './globals.css'


const comfortaa = Comfortaa({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: '::Bingo::',
  description: 'Play Bingo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className} >{children}</body>
    </html>
  )
}
