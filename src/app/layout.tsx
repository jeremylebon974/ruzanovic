import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'RUZANOVIC — Maison de Mode',
  description: 'Collection Printemps-Été 2025. Pièces signature. Architecture textile. Paris.',
  keywords: ['Ruzanovic', 'mode', 'fashion', 'luxe', 'collection', 'Paris'],
  openGraph: {
    title: 'RUZANOVIC',
    description: 'Architecture textile. Collection Printemps-Été 2025.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-rz-white text-rz-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
