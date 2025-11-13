'use client'

import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              JVSEO<span className="text-primary-400">AGENCY</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Expertos en desarrollo web, aplicaciones y automatizaciones con IA.
              Transformamos ideas en soluciones digitales.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="hover:text-primary-400 transition">
                  Desarrollo Web
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-primary-400 transition">
                  Apps Móviles
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-primary-400 transition">
                  Automatizaciones IA
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#nosotros" className="hover:text-primary-400 transition">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-primary-400 transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@jvseoagency.es" className="hover:text-primary-400 transition">
                  info@jvseoagency.es
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+34618967972" className="hover:text-primary-400 transition">
                  +34 618 967 972
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-primary-400 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} JVSEOAGENCY. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

