'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ScrollToHash() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Esperar a que el DOM esté completamente cargado
    const handleScroll = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const headerHeight = 80
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    // Pequeño delay para asegurar que todos los componentes estén renderizados
    const timeout = setTimeout(() => {
      handleScroll()
    }, 300)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return null
}

