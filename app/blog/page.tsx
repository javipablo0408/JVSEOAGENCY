import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import { getAllPosts, getFeaturedPosts, getRegularPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog - Desarrollo Web Madrid | JVSEOAGENCY',
  description: 'Artículos sobre desarrollo web, aplicaciones móviles, automatizaciones con IA y tecnología en Madrid. Consejos, tutoriales y noticias del sector.',
  keywords: [
    'blog desarrollo web madrid',
    'artículos desarrollo web',
    'tutoriales desarrollo web',
    'noticias tecnología madrid',
    'blog programación madrid'
  ],
}

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  const regularPosts = getRegularPosts()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-center">
            Blog de Desarrollo Web
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Artículos sobre desarrollo web, aplicaciones móviles, automatizaciones con IA y tecnología en Madrid
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Artículos Destacados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {post.featured_image_url && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {formatDate(post.published_at)}
                      </div>
                    </div>
                    <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                      Leer más
                      <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Todos los Artículos</h2>
          {regularPosts.length === 0 && featuredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay artículos publicados aún.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {post.featured_image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.published_at)}
                      </div>
                    </div>
                    <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                      Leer más
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>
      <Contact />
      <Footer />
    </>
  )
}

