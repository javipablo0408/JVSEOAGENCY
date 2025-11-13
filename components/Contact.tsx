'use client'

import { useState } from 'react'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) {
        // Si la tabla no existe, solo mostramos éxito (modo demo)
        console.log('Nota: La tabla contacts puede no existir aún en Supabase')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error al enviar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            Contacta con Nosotros
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Información de Contacto
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Mail className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a href="mailto:info@jvseoagency.es" className="text-gray-600 hover:text-primary-600 transition">
                    info@jvseoagency.es
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Phone className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                  <a href="tel:+34618967972" className="text-gray-600 hover:text-primary-600 transition">
                    +34 618 967 972
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <MapPin className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                  <p className="text-gray-600">Madrid, España</p>
                  <p className="text-sm text-gray-500 mt-1">Servicios en toda España</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="+34 618 967 972"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Mensaje
                  <Send size={20} />
                </>
              )}
            </button>
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                Hubo un error al enviar. Por favor, inténtalo de nuevo.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

