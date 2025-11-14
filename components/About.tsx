'use client'

import { CheckCircle, Users, Target, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('about')
  
  const features = [
    t('features.agile'),
    t('features.team'),
    t('features.tech'),
    t('features.support'),
    t('features.results'),
  ]

  const stats = [
    { icon: Users, value: '50+', label: t('stats.clients') },
    { icon: Target, value: '100+', label: t('stats.projects') },
    { icon: Award, value: '5+', label: t('stats.experience') },
  ]

  return (
    <section id="nosotros" className="py-20 px-4 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
<<<<<<< HEAD
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {t('description')}
=======
              ¿Por qué elegirnos como diseñador de páginas web en Madrid?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              En JVSEOAGENCY, somos especialistas en <strong>diseño de páginas web en Madrid</strong>. Como <strong>diseñador de páginas web en Madrid</strong>, 
              combinamos experiencia técnica con creatividad para ofrecer soluciones que realmente funcionan. Nos especializamos 
              en crear <strong>páginas web en Madrid</strong> que impulsan el crecimiento de tu negocio. 
              Trabajamos con empresas de Madrid y toda España, ofreciendo servicios de <strong>diseño de páginas web en Madrid</strong> 
              y desarrollo web profesional adaptados a las necesidades del mercado español.
>>>>>>> ff2897298794552c7d14a6d920eab91340cb573a
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 text-base sm:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-primary-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
                        <Icon className="text-primary-600" size={28} />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

