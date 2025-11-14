import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

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

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  author_name: string
  published_at: string | null
  created_at: string
  views: number
  featured: boolean
  // Campos de traducción
  title_en?: string | null
  excerpt_en?: string | null
  title_fr?: string | null
  excerpt_fr?: string | null
  title_de?: string | null
  excerpt_de?: string | null
  title_it?: string | null
  excerpt_it?: string | null
  title_pt?: string | null
  excerpt_pt?: string | null
}

// Función helper para obtener el campo traducido (solo usa traducciones guardadas)
function getTranslatedField(post: BlogPost, field: 'title' | 'excerpt', locale: string): string {
  if (locale === 'es') {
    return post[field] || ''
  }
  
  const translatedField = `${field}_${locale}` as keyof BlogPost
  const translatedValue = post[translatedField]
  
  // Si existe traducción guardada, usarla
  if (translatedValue && (translatedValue as string).trim().length > 0) {
    return translatedValue as string
  }
  
  // Si no existe traducción guardada, usar el texto original
  return post[field] || ''
}

async function getBlogPosts() {
  try {
    // Primero intentar obtener todos los campos incluyendo traducciones
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(100)

    const { data, error } = await query

    if (error) {
      console.error('[getBlogPosts] Error obteniendo posts:', error)
      // Si la tabla no existe aún o hay error con campos de traducción, intentar sin ellos
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table') || error.message?.includes('column')) {
        console.log('[getBlogPosts] Intentando sin campos de traducción...')
        const { data: simpleData, error: simpleError } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image_url, author_name, published_at, created_at, views, featured')
          .eq('published', true)
          .order('published_at', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false })
          .limit(100)
        
        if (simpleError) {
          console.error('[getBlogPosts] Error con consulta simple:', simpleError)
          return []
        }
        
        return (simpleData || []) as BlogPost[]
      }
      return []
    }

    console.log(`[getBlogPosts] Posts obtenidos: ${data?.length || 0}`)
    return (data || []) as BlogPost[]
  } catch (error) {
    console.error('[getBlogPosts] Excepción:', error)
    return []
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('blog')
  
  // Obtener posts
  const posts = await getBlogPosts()
  
  // Debug: verificar que los posts se obtienen
  console.log(`[BlogPage] Locale: ${locale}, Total posts: ${posts.length}`)
  
  if (posts.length === 0) {
    console.warn('[BlogPage] No hay posts disponibles')
  }
  
  const featuredPosts = posts.filter(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)
  
  console.log(`[BlogPage] Featured: ${featuredPosts.length}, Regular: ${regularPosts.length}`)
  
  const getBlogUrl = (path: string) => {
    return locale === 'es' ? path : `/${locale}${path}`
  }

  // Función para obtener traducciones guardadas (sin traducción automática)
  const translatePosts = (postsList: BlogPost[]) => {
    if (locale === 'es') {
      return postsList
    }
    
    return postsList.map(post => {
      const translatedPost = { ...post }
      
      // Usar traducciones guardadas si existen
      const titleField = `title_${locale}` as keyof BlogPost
      const titleValue = post[titleField]
      if (titleValue && (titleValue as string).trim().length > 0) {
        translatedPost.title = titleValue as string
      }
      
      const excerptField = `excerpt_${locale}` as keyof BlogPost
      const excerptValue = post[excerptField]
      if (excerptValue && (excerptValue as string).trim().length > 0) {
        translatedPost.excerpt = excerptValue as string
      }
      
      return translatedPost
    })
  }

  // Obtener traducciones guardadas (sin traducción automática)
  const translatedFeaturedPosts = translatePosts(featuredPosts)
  const translatedRegularPosts = translatePosts(regularPosts)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const dateFormat = t('dateFormat') || 'es-ES'
    return new Date(dateString).toLocaleDateString(dateFormat, {
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
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl mx-auto">
            {t('subtitlePage')}
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {translatedFeaturedPosts.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{t('featured')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {translatedFeaturedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getBlogUrl(`/blog/${post.slug}`)}
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
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.views} {t('views')}
                      </div>
                    </div>
                    <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                      {t('readMore')}
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{t('allArticles')}</h2>
          {translatedRegularPosts.length === 0 && translatedFeaturedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t('noPosts')}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translatedRegularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getBlogUrl(`/blog/${post.slug}`)}
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
                        {formatDate(post.published_at || post.created_at)}
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

