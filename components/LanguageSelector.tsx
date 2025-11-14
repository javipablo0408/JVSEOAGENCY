'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, Check } from 'lucide-react'

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
]

export default function LanguageSelector() {
  const locale = useLocale() as string
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (langCode: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Click en idioma:', langCode, 'Locale actual:', locale, 'Pathname:', pathname)
    
    setIsOpen(false)

    // Si ya estamos en el idioma seleccionado, no hacer nada
    if (langCode === locale) {
      console.log('Ya estás en este idioma, no hacer nada')
      return
    }

    // Obtener la ruta actual del navegador
    const currentPath = window.location.pathname
    console.log('Ruta actual:', currentPath)
    
    // Remover el locale actual si existe en la URL
    const pathParts = currentPath.split('/').filter(Boolean)
    const firstPart = pathParts[0]
    
    // Lista de locales válidos
    const validLocales = ['es', 'en', 'fr', 'de', 'it', 'pt']
    const hasLocalePrefix = validLocales.includes(firstPart)
    
    // Construir la ruta base sin locale
    let basePath = '/'
    if (hasLocalePrefix) {
      // Si tiene prefijo de locale, quitarlo
      const restOfPath = pathParts.slice(1)
      basePath = restOfPath.length > 0 ? '/' + restOfPath.join('/') : '/'
    } else {
      // No tiene prefijo, usar la ruta tal cual
      basePath = currentPath
    }

    // Construir la nueva URL
    // Español es el default, no necesita prefijo
    let targetPath = langCode === 'es' ? basePath : `/${langCode}${basePath}`
    
    // Asegurar que empiece con /
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath
    }
    
    console.log('Navegando a:', targetPath)
    
    // Forzar navegación completa
    window.location.href = targetPath
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary-600"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={18} />
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.flag}</span>
        <span className="hidden md:inline text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]">
          {languages.map((lang) => {
            const isCurrentLang = locale === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={(e) => {
                  console.log('Botón clickeado:', lang.code)
                  handleLanguageChange(lang.code, e)
                }}
                onMouseDown={(e) => {
                  // Prevenir que el dropdown se cierre antes del click
                  e.stopPropagation()
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                  isCurrentLang 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 cursor-pointer active:bg-gray-100'
                }`}
                style={{ pointerEvents: 'auto' }}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-sm font-medium">{lang.name}</span>
                {isCurrentLang && (
                  <Check size={16} className="text-primary-600" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

