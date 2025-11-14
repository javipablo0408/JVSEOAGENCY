import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import StructuredData from '@/components/StructuredData'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jvseoagency.com'),
  title: {
    default: 'JVSEOAGENCY - Desarrollo Web y Apps en Madrid | Agencia Digital',
    template: '%s | JVSEOAGENCY Madrid'
  },
  description: 'Agencia de desarrollo web y aplicaciones móviles en Madrid. Especialistas en Next.js, React, WordPress y automatizaciones con IA. Servicios de desarrollo web profesional en España.',
  keywords: [
    'desarrollo web madrid',
    'agencia web madrid',
    'desarrollo aplicaciones madrid',
    'creación páginas web madrid',
    'desarrollo web españa',
    'agencia digital madrid',
    'desarrollo web nextjs madrid',
    'apps móviles madrid',
    'automatizaciones IA madrid',
    'desarrollo web profesional madrid',
    'diseño web madrid',
    'programación web madrid',
    'desarrollador web madrid',
    'empresa desarrollo web madrid'
  ],
  authors: [{ name: 'JVSEOAGENCY' }],
  creator: 'JVSEOAGENCY',
  publisher: 'JVSEOAGENCY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://jvseoagency.com',
    siteName: 'JVSEOAGENCY',
    title: 'JVSEOAGENCY - Desarrollo Web y Apps en Madrid | Agencia Digital',
    description: 'Agencia de desarrollo web y aplicaciones móviles en Madrid. Especialistas en Next.js, React, WordPress y automatizaciones con IA.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JVSEOAGENCY - Desarrollo Web Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JVSEOAGENCY - Desarrollo Web y Apps en Madrid',
    description: 'Agencia de desarrollo web y aplicaciones móviles en Madrid. Especialistas en Next.js, React, WordPress y automatizaciones con IA.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'tu-codigo-verificacion-google',
    // yandex: 'tu-codigo-verificacion-yandex',
    // bing: 'tu-codigo-verificacion-bing',
  },
  alternates: {
    canonical: 'https://jvseoagency.com',
    languages: {
      'es-ES': 'https://jvseoagency.com',
      'en': 'https://jvseoagency.com/en',
      'fr': 'https://jvseoagency.com/fr',
      'de': 'https://jvseoagency.com/de',
      'it': 'https://jvseoagency.com/it',
      'pt': 'https://jvseoagency.com/pt',
    },
  },
  category: 'Tecnología',
  classification: 'Agencia de Desarrollo Web',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <StructuredData />
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

