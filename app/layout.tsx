import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Gitart - Terminal-style AI Website Builder on Base',
  description: 'Build websites like you run commands. AI-powered website builder with terminal interface on Base blockchain.',
  generator: 'Gitart',
  keywords: ['AI', 'website builder', 'terminal', 'Base', 'blockchain', 'Web3'],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Gitart - Terminal-style AI Website Builder on Base',
    description: 'Build websites like you run commands.',
    type: 'website',
    url: 'https://gitart-eth.vercel.app',
    siteName: 'Gitart',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gitart - Terminal-style AI Website Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gitart - Terminal-style AI Website Builder on Base',
    description: 'Build websites like you run commands.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://gitart-eth.vercel.app'),
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
