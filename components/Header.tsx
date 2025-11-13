'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Si es un enlace externo o a otra página, no prevenir el comportamiento por defecto
    if (targetId.startsWith('/') || targetId.startsWith('http')) {
      setIsMenuOpen(false)
      return // Permitir navegación normal
    }
    
    e.preventDefault()
    
    // Cerrar menú móvil si está abierto
    setIsMenuOpen(false)
    
    // Si no estamos en la página principal, redirigir primero a la página principal con el hash
    if (!isHomePage) {
      router.push(`/${targetId}`)
      // Esperar a que la página cargue y luego hacer scroll
      setTimeout(() => {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerHeight = 80
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
      return
    }
    
    // Obtener el elemento destino
    const targetElement = document.querySelector(targetId)
    
    if (targetElement) {
      // Calcular offset para el header fijo
      const headerHeight = 80
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
      
      // Smooth scroll con animación
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const NavLink = ({ href, children, isButton = false }: { href: string; children: React.ReactNode; isButton?: boolean }) => {
    const baseClasses = isButton
      ? "bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 active:bg-primary-800 active:scale-95 transition-all duration-200 ease-out font-medium"
      : "text-gray-700 hover:text-primary-600 active:text-primary-700 relative transition-all duration-200 ease-out after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full active:scale-95"
    
    // Si el href es un hash y no estamos en la página principal, redirigir a la página principal con el hash
    const finalHref = !isHomePage && href.startsWith('#') ? `/${href}` : href
    
    return (
      <a
        href={finalHref}
        onClick={(e) => handleNavClick(e, href)}
        className={baseClasses}
      >
        {children}
      </a>
    )
  }

  const MobileNavLink = ({ href, children, isButton = false }: { href: string; children: React.ReactNode; isButton?: boolean }) => {
    const baseClasses = isButton
      ? "block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 active:bg-primary-800 active:scale-95 transition-all duration-200 ease-out text-center font-medium"
      : "block text-gray-700 hover:text-primary-600 active:text-primary-700 active:scale-95 transition-all duration-200 ease-out py-2"
    
    // Si el href es un hash y no estamos en la página principal, redirigir a la página principal con el hash
    const finalHref = !isHomePage && href.startsWith('#') ? `/${href}` : href
    
    return (
      <a
        href={finalHref}
        onClick={(e) => handleNavClick(e, href)}
        className={baseClasses}
      >
        {children}
      </a>
    )
  }

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 transition-shadow duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/#inicio" 
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                handleNavClick(e, '#inicio')
              }
            }}
            className="text-xl sm:text-2xl font-bold text-primary-600 hover:text-primary-700 active:scale-95 transition-all duration-200 ease-out cursor-pointer"
          >
            JVSEO<span className="text-primary-800">AGENCY</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#inicio">Inicio</NavLink>
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#proyectos">Proyectos</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#nosotros">Nosotros</NavLink>
            <NavLink href="#contacto" isButton>Contacto</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 active:scale-95 transition-all duration-200 ease-out p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden mt-4 pb-4 space-y-2 overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`space-y-2 ${isMenuOpen ? 'animate-in' : ''}`}>
            <MobileNavLink href="#inicio">Inicio</MobileNavLink>
            <MobileNavLink href="#servicios">Servicios</MobileNavLink>
            <MobileNavLink href="#proyectos">Proyectos</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
            <MobileNavLink href="#nosotros">Nosotros</MobileNavLink>
            <MobileNavLink href="#contacto" isButton>Contacto</MobileNavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

