import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-6306643748957162',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QJJ015HJL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QJJ015HJL');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6306643748957162"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
