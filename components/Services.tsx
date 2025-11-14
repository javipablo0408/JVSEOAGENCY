'use client'

<<<<<<< HEAD
import { Code, Globe, Zap, Smartphone, Database, Bot } from 'lucide-react'
import { useTranslations } from 'next-intl'
=======
import { Code, Globe, Zap, Smartphone, Database, Bot, Palette } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Palette,
    title: 'Diseño de Páginas Web en Madrid',
    description: 'Diseñador profesional de páginas web en Madrid. Creamos sitios web modernos, rápidos y optimizados para SEO. Diseño de páginas web en Madrid para empresas que buscan destacar online.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    link: '/diseno-paginas-web-madrid',
  },
  {
    icon: Globe,
    title: 'Desarrollo Web en Madrid',
    description: 'Sitios web modernos, rápidos y optimizados para SEO. Desarrollo web profesional en Madrid para empresas españolas. Desde landing pages hasta aplicaciones web complejas.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Smartphone,
    title: 'Apps Móviles en Madrid',
    description: 'Desarrollo de aplicaciones móviles para iOS y Android en Madrid. Apps nativas e híbridas con diseño intuitivo y experiencia de usuario excepcional para empresas españolas.',
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
>>>>>>> ff2897298794552c7d14a6d920eab91340cb573a

export default function Services() {
  const t = useTranslations('services')
  
  const services = [
    {
      icon: Globe,
      title: t('web.title'),
      description: t('web.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Smartphone,
      title: t('mobile.title'),
      description: t('mobile.description'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Bot,
      title: t('ai.title'),
      description: t('ai.description'),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Code,
      title: t('custom.title'),
      description: t('custom.description'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Database,
      title: t('backend.title'),
      description: t('backend.description'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Zap,
      title: t('optimization.title'),
      description: t('optimization.description'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <section id="servicios" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
<<<<<<< HEAD
            {t('subtitle')}
=======
            Soluciones tecnológicas completas para empresas en Madrid y toda España. 
            Diseño de páginas web en Madrid, desarrollo web profesional, aplicaciones móviles y automatizaciones con IA.
>>>>>>> ff2897298794552c7d14a6d920eab91340cb573a
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const content = (
              <>
                <div className={`${service.bgColor} w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
                  <Icon className={service.color} size={28} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </>
            )
            
            if (service.link) {
              return (
                <Link
                  key={index}
                  href={service.link}
                  className="p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white block"
                >
                  {content}
                </Link>
              )
            }
            
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

