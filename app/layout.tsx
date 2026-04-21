import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SynapseTime — World Clock Comparison',
  description:
    'Minimalist timezone comparison tool. Drag a cursor to sync all clocks instantly. Built for remote teams.',
  keywords: ['timezone', 'world clock', 'time comparison', 'remote work', 'UTC'],
  openGraph: {
    title: 'SynapseTime',
    description: 'Minimalist timezone comparison tool for remote teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'SynapseTime',
    description: 'Minimalist timezone comparison tool for remote teams.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-black text-white font-mono min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
