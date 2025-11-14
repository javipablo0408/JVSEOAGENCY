import { getRequestConfig } from 'next-intl/server'

export const locales = ['es', 'en', 'fr', 'de', 'it', 'pt'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale = 'es' as const

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale de la request
  let locale = await requestLocale
  
  // Si no hay locale o no es válido, usar español por defecto
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }
  
  // Asegurar que siempre sea español si no hay prefijo en la URL
  // Esto previene que se use el idioma del navegador
  if (!locale || locale === undefined) {
    locale = defaultLocale
  }

  return {
    locale: locale as Locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})

