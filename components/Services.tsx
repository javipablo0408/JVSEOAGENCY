'use client'

import { Code, Globe, Zap, Smartphone, Database, Bot } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Services() {
  const t = useTranslations('services')
  
  const services: Array<{
    icon: typeof Globe
    title: string
    description: string
    color: string
    bgColor: string
    link?: string
  }> = [
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
            {t('subtitle')}
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

