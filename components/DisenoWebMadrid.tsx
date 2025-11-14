'use client'

import { Globe, Zap, Palette, Smartphone, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Globe,
    title: 'Diseño de Páginas Web en Madrid',
    description: 'Creamos páginas web profesionales y modernas para empresas en Madrid. Diseño personalizado que refleja la identidad de tu negocio.',
  },
  {
    icon: Zap,
    title: 'Optimización SEO',
    description: 'Todas nuestras páginas web en Madrid están optimizadas para aparecer en los primeros resultados de Google.',
  },
  {
    icon: Palette,
    title: 'Diseño Responsive',
    description: 'Páginas web que se adaptan perfectamente a móviles, tablets y ordenadores. Más del 60% del tráfico viene de móviles.',
  },
  {
    icon: Smartphone,
    title: 'Velocidad y Rendimiento',
    description: 'Páginas web rápidas que cargan en menos de 3 segundos. Mejor experiencia de usuario y mejor posicionamiento.',
  },
]

const benefits = [
  'Diseño profesional y moderno',
  'Optimización para buscadores (SEO)',
  'Diseño responsive para todos los dispositivos',
  'Velocidad de carga optimizada',
  'Panel de administración fácil de usar',
  'Certificado SSL de seguridad',
  'Soporte técnico continuo',
  'Integración con redes sociales',
]

export default function DisenoWebMadrid() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Diseño de Páginas Web en Madrid
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas en <strong>diseño de páginas web en Madrid</strong>. Como <strong>diseñador de páginas web en Madrid</strong>, 
            creamos sitios web profesionales que convierten visitantes en clientes. Si buscas un <strong>diseñador de páginas web en Madrid</strong> 
            profesional, has llegado al lugar correcto.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className="bg-primary-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              ¿Por qué elegirnos para el diseño de tu página web en Madrid?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Cuando buscas <strong>diseño de páginas web en Madrid</strong>, necesitas un <strong>diseñador de páginas web en Madrid</strong> 
              que entienda las necesidades de tu negocio. En JVSEOAGENCY, cada <strong>página web en Madrid</strong> que creamos está diseñada 
              para convertir visitantes en clientes.
            </p>
            <ul className="space-y-4 mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/diseno-paginas-web-madrid"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-medium group"
            >
              Ver más sobre diseño de páginas web en Madrid
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Zonas de Servicio en Madrid
            </h4>
            <p className="text-gray-600 mb-4">
              Ofrecemos servicios de <strong>diseño de páginas web en Madrid</strong> en todas las zonas:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Centro, Chamberí, Salamanca</li>
              <li>• Retiro, Arganzuela, Usera</li>
              <li>• Carabanchel, Latina, Moncloa</li>
              <li>• Tetuán, Fuencarral, Hortaleza</li>
              <li>• Y toda la Comunidad de Madrid</li>
            </ul>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>¿Necesitas un diseñador de páginas web en Madrid?</strong> Contacta con nosotros para recibir 
                un presupuesto personalizado sin compromiso.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 rounded-xl">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Listo para crear tu página web en Madrid?
            </h3>
            <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
              Si buscas un <strong>diseñador de páginas web en Madrid</strong> profesional, contacta con nosotros. 
              Te ayudaremos a crear una <strong>página web en Madrid</strong> que haga crecer tu negocio.
            </p>
            <a
              href="#contacto"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Solicitar Presupuesto Gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

