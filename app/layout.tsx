import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Walking Dead Api',
  description: 'The Walking Dead Api made by a fan for developpers can train their fetch request',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/characters">Tout les personnages</Link></li>
          <li><Link href="/about">About</Link></li>
        </nav>
        {children}</body>
    </html>
  )
}
