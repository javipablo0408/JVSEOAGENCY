import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import LocalSEO from '@/components/LocalSEO'
import Footer from '@/components/Footer'

const ScrollToHash = dynamic(() => import('@/components/ScrollToHash'), {
  ssr: false
})

// Lazy load componentes pesados que no están en el viewport inicial
const Technologies = dynamic(() => import('@/components/Technologies'), {
  loading: () => (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    </section>
  ),
  ssr: true,
})

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => (
    <section id="proyectos" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        </div>
      </div>
    </section>
  ),
  ssr: true,
})

const Blog = dynamic(() => import('@/components/Blog'), {
  loading: () => (
    <section id="blog" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        </div>
      </div>
    </section>
  ),
  ssr: false, // Client-side only para evitar problemas con SSR
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToHash />
      <Header />
      <Hero />
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Blog />
      <Contact />
      <LocalSEO />
      <Footer />
    </main>
  )
}

