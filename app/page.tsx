import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

