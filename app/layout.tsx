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
  openGraph: {
    title: 'Gitart - Terminal-style AI Website Builder on Base',
    description: 'Build websites like you run commands.',
    type: 'website',
  },
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
