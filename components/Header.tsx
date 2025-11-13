'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">
            JVSEO<span className="text-primary-800">AGENCY</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-primary-600 transition">
              Inicio
            </a>
            <a href="#servicios" className="text-gray-700 hover:text-primary-600 transition">
              Servicios
            </a>
            <a href="#proyectos" className="text-gray-700 hover:text-primary-600 transition">
              Proyectos
            </a>
            <a href="#nosotros" className="text-gray-700 hover:text-primary-600 transition">
              Nosotros
            </a>
            <a href="#contacto" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#inicio" className="block text-gray-700 hover:text-primary-600 transition">
              Inicio
            </a>
            <a href="#servicios" className="block text-gray-700 hover:text-primary-600 transition">
              Servicios
            </a>
            <a href="#proyectos" className="block text-gray-700 hover:text-primary-600 transition">
              Proyectos
            </a>
            <a href="#nosotros" className="block text-gray-700 hover:text-primary-600 transition">
              Nosotros
            </a>
            <a href="#contacto" className="block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition text-center">
              Contacto
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

