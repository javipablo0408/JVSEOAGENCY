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
    default: 'Diseño de Páginas Web en Madrid | Diseñador Profesional | JVSEOAGENCY',
    template: '%s | JVSEOAGENCY Madrid'
  },
  description: 'Diseñador profesional de páginas web en Madrid. Diseño de páginas web en Madrid, desarrollo web profesional, aplicaciones móviles y automatizaciones con IA. Especialistas en diseño de páginas web en Madrid.',
  keywords: [
    'diseño de pagina web en madrid',
    'diseño de paginas web madrid',
    'diseño de paginas web en madrid',
    'diseñador pagina web madrid',
    'diseño paginas web madrid',
    'diseño pagina web madrid',
    'pagina web en madrid',
    'paginas web en madrid',
    'paginas web madrid',
    'creacion paginas web madrid',
    'diseño de pagina web madrid',
    'desarrollo paginas web madrid',
    'diseñador paginas web madrid',
    'diseñadores de paginas web en madrid',
    'pagina web madrid',
    'creacion paginas web en madrid',
    'crear pagina web madrid',
    'creacion pagina web madrid',
    'desarrollo web madrid',
    'agencia web madrid',
    'desarrollo aplicaciones madrid',
    'desarrollo web españa',
    'agencia digital madrid',
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
    title: 'Diseño de Páginas Web en Madrid | Diseñador Profesional | JVSEOAGENCY',
    description: 'Diseñador profesional de páginas web en Madrid. Diseño de páginas web en Madrid, desarrollo web profesional y aplicaciones móviles.',
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
    title: 'Diseño de Páginas Web en Madrid | Diseñador Profesional | JVSEOAGENCY',
    description: 'Diseñador profesional de páginas web en Madrid. Diseño de páginas web en Madrid, desarrollo web profesional y aplicaciones móviles.',
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

