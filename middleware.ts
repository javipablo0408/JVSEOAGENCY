import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'
import { NextRequest } from 'next/server'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false // Desactivar detección automática del idioma del navegador
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)']
}

