import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'

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
      <body className="bgWk">
        <Header />
        {children}</body>
    </html>
  )
}
