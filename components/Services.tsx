'use client'

import { Code, Globe, Zap, Smartphone, Database, Bot } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Desarrollo Web',
    description: 'Sitios web modernos, rápidos y optimizados para SEO. Desde landing pages hasta aplicaciones web complejas.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Smartphone,
    title: 'Aplicaciones Móviles',
    description: 'Apps nativas e híbridas para iOS y Android. Diseño intuitivo y experiencia de usuario excepcional.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Bot,
    title: 'Automatizaciones IA',
    description: 'Integración de inteligencia artificial para automatizar procesos, chatbots inteligentes y análisis predictivo.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Code,
    title: 'Desarrollo a Medida',
    description: 'Soluciones personalizadas adaptadas a tus necesidades específicas. Arquitectura escalable y mantenible.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description: 'Desarrollo de APIs robustas, bases de datos optimizadas y arquitectura de servidores escalables.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Optimización',
    description: 'Mejora de rendimiento, velocidad y conversión. Análisis y optimización continua de tus proyectos.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones tecnológicas completas para impulsar tu negocio digital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className={`${service.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className={service.color} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

