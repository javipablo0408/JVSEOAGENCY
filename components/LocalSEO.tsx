'use client'

import { MapPin, Clock, Phone, Mail } from 'lucide-react'

export default function LocalSEO() {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-900">Ubicación</h3>
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Madrid, España</strong>
            </p>
            <p className="text-sm text-gray-500">
              Servicios de desarrollo web para empresas en Madrid y toda España
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
              <Clock className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-900">Horario</h3>
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Lunes - Viernes</strong>
            </p>
            <p className="text-sm text-gray-500">
              09:00 - 18:00 (GMT+1)
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
              <Phone className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-900">Contacto</h3>
            </div>
            <p className="text-gray-600 mb-2">
              <a href="tel:+34618967972" className="hover:text-primary-600 transition">
                <strong>+34 618 967 972</strong>
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <a href="mailto:info@jvseoagency.es" className="hover:text-primary-600 transition">
                info@jvseoagency.es
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            <strong>Áreas de servicio:</strong> Madrid, Barcelona, Valencia, Sevilla, Bilbao y toda España. 
            Desarrollo web profesional para empresas españolas.
          </p>
        </div>
      </div>
    </section>
  )
}

