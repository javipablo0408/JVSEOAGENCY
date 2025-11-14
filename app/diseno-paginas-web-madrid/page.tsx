import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import { Metadata } from 'next'
import { Globe, CheckCircle, Star, Zap, Smartphone, Palette } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Diseño de Páginas Web en Madrid | Diseñador Profesional | JVSEOAGENCY',
  description: 'Diseño profesional de páginas web en Madrid. Creamos sitios web modernos, rápidos y optimizados para SEO. Diseñador de páginas web en Madrid con experiencia. Desarrollo y creación de páginas web en Madrid.',
  keywords: [
    'diseño de pagina web en madrid',
    'diseño de paginas web madrid',
    'diseño de paginas web en madrid',
    'diseñador pagina web madrid',
    'diseño paginas web madrid',
    'diseño pagina web madrid',
    'pagina web en madrid',
    'paginas web en madrid',
    'paginas web madrid',
    'creacion paginas web madrid',
    'diseño de pagina web madrid',
    'desarrollo paginas web madrid',
    'diseñador paginas web madrid',
    'diseñadores de paginas web en madrid',
    'pagina web madrid',
    'creacion paginas web en madrid',
    'crear pagina web madrid',
    'creacion pagina web madrid'
  ],
  openGraph: {
    title: 'Diseño de Páginas Web en Madrid | JVSEOAGENCY',
    description: 'Diseño profesional de páginas web en Madrid. Sitios web modernos, rápidos y optimizados para SEO.',
    type: 'website',
  },
}

const features = [
  {
    icon: Globe,
    title: 'Diseño Web Responsive',
    description: 'Páginas web que se adaptan perfectamente a todos los dispositivos: móviles, tablets y ordenadores.',
  },
  {
    icon: Zap,
    title: 'Optimización SEO',
    description: 'Diseño optimizado para buscadores. Tu página web aparecerá en los primeros resultados de Google.',
  },
  {
    icon: Palette,
    title: 'Diseño Personalizado',
    description: 'Cada página web es única y diseñada según las necesidades específicas de tu negocio en Madrid.',
  },
  {
    icon: Smartphone,
    title: 'Experiencia de Usuario',
    description: 'Interfaces intuitivas y fáciles de usar que convierten visitantes en clientes.',
  },
]

const benefits = [
  'Diseño profesional y moderno',
  'Optimización para buscadores (SEO)',
  'Diseño responsive (móvil, tablet, desktop)',
  'Velocidad de carga optimizada',
  'Integración con redes sociales',
  'Panel de administración fácil de usar',
  'Soporte técnico continuo',
  'Certificado SSL incluido',
]

const process = [
  {
    step: '1',
    title: 'Consulta Inicial',
    description: 'Analizamos tus necesidades y objetivos para tu página web en Madrid.',
  },
  {
    step: '2',
    title: 'Diseño y Propuesta',
    description: 'Creamos un diseño personalizado y te presentamos la propuesta.',
  },
  {
    step: '3',
    title: 'Desarrollo',
    description: 'Desarrollamos tu página web con las últimas tecnologías.',
  },
  {
    step: '4',
    title: 'Lanzamiento',
    description: 'Publicamos tu página web y te enseñamos a gestionarla.',
  },
]

export default function DisenoPaginasWebMadridPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Diseño de Páginas Web en Madrid
              </h1>
              <p className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
                Diseñador profesional de páginas web en Madrid. Creamos sitios web modernos, rápidos y optimizados para que tu negocio destaque en internet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contacto"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-lg"
                >
                  Solicitar Presupuesto
                </a>
                <a
                  href="#servicios"
                  className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition text-lg border-2 border-white"
                >
                  Ver Servicios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegirnos para el diseño de tu página web en Madrid?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Somos especialistas en diseño y desarrollo de páginas web en Madrid. Cada proyecto es único y diseñado para convertir visitantes en clientes.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="bg-primary-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-primary-600" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Todo lo que incluye el diseño de tu página web en Madrid
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Cuando contratas nuestros servicios de diseño de páginas web en Madrid, obtienes una solución completa y profesional.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Proceso de Diseño
                </h3>
                <div className="space-y-6">
                  {process.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Diseño Profesional de Páginas Web en Madrid
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Si buscas un <strong>diseñador de páginas web en Madrid</strong> profesional, has llegado al lugar correcto. 
                En JVSEOAGENCY nos especializamos en el <strong>diseño de páginas web en Madrid</strong> para empresas 
                que buscan destacar en internet.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                ¿Por qué necesitas una página web profesional en Madrid?
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                En la era digital actual, tener una <strong>página web en Madrid</strong> no es opcional, es esencial. 
                Una página web profesional es tu escaparate digital las 24 horas del día, los 7 días de la semana. 
                Si tu negocio está en Madrid y aún no tienes presencia online, estás perdiendo oportunidades de negocio.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Nuestros Servicios de Diseño de Páginas Web en Madrid
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                Ofrecemos servicios completos de <strong>diseño de páginas web en Madrid</strong>:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Diseño de páginas web corporativas en Madrid:</strong> Para empresas que necesitan una presencia profesional online.</li>
                <li><strong>Diseño de páginas web para tiendas online:</strong> E-commerce optimizado para vender productos y servicios.</li>
                <li><strong>Diseño de landing pages:</strong> Páginas de aterrizaje optimizadas para conversión.</li>
                <li><strong>Rediseño de páginas web:</strong> Modernizamos tu página web existente.</li>
                <li><strong>Mantenimiento de páginas web:</strong> Soporte continuo y actualizaciones.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Características de Nuestras Páginas Web en Madrid
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                Todas nuestras <strong>páginas web en Madrid</strong> incluyen:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Diseño responsive que se adapta a móviles, tablets y ordenadores</li>
                <li>Optimización SEO para aparecer en Google</li>
                <li>Velocidad de carga optimizada</li>
                <li>Diseño moderno y profesional</li>
                <li>Panel de administración fácil de usar</li>
                <li>Certificado SSL de seguridad</li>
                <li>Integración con redes sociales</li>
                <li>Soporte técnico continuo</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                ¿Cuánto cuesta el diseño de una página web en Madrid?
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                El precio del <strong>diseño de páginas web en Madrid</strong> varía según las necesidades de cada proyecto. 
                Ofrecemos presupuestos personalizados sin compromiso. Contacta con nosotros para recibir una propuesta 
                adaptada a tu negocio en Madrid.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Zonas de Servicio en Madrid
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                Ofrecemos servicios de <strong>diseño de páginas web en Madrid</strong> en todas las zonas: 
                Centro, Chamberí, Salamanca, Retiro, Arganzuela, Usera, Carabanchel, Latina, Moncloa-Aravaca, 
                Tetuán, Fuencarral-El Pardo, Hortaleza, Villaverde, Villa de Vallecas, Vicálvaro, San Blas-Canillejas, 
                Barajas y toda la Comunidad de Madrid.
              </p>

              <div className="bg-primary-50 p-8 rounded-xl mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Listo para crear tu página web en Madrid?
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Si buscas un <strong>diseñador de páginas web en Madrid</strong> profesional, contacta con nosotros. 
                  Te ayudaremos a crear una página web que convierta visitantes en clientes y haga crecer tu negocio.
                </p>
                <a
                  href="#contacto"
                  className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Solicitar Presupuesto Gratis
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contacto" className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Necesitas un Diseñador de Páginas Web en Madrid?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contacta con nosotros y recibe un presupuesto personalizado para el diseño de tu página web en Madrid.
            </p>
            <a
              href="#contacto"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-lg inline-block"
            >
              Contactar Ahora
            </a>
          </div>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  )
}

