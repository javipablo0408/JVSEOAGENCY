'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  published_at: string | null
  created_at: string
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

// Función helper para obtener el campo traducido (con traducción automática)
async function getTranslatedField(post: BlogPost, field: 'title' | 'excerpt', locale: string): Promise<string> {
  if (locale === 'es') {
    return post[field] || ''
  }
  
  const translatedField = `${field}_${locale}` as keyof BlogPost
  const translatedValue = post[translatedField]
  
  // Si existe traducción guardada, usarla
  if (translatedValue && (translatedValue as string).trim().length > 0) {
    return translatedValue as string
  }
  
  // Si no existe, traducir automáticamente usando la API
  const originalText = post[field] || ''
  if (!originalText || originalText.trim().length === 0) {
    return ''
  }
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: originalText,
        targetLang: locale,
        sourceLang: 'es',
      }),
    })
    
    if (!response.ok) {
      return originalText
    }
    
    const data = await response.json()
    const translated = data.translated || originalText
    
    // Guardar traducción en la base de datos (opcional, en background)
    if (translated !== originalText) {
      // Esto se puede hacer con una llamada a una API route si es necesario
      // Por ahora solo retornamos la traducción
    }
    
    return translated
  } catch (error) {
    console.error('Error traduciendo:', error)
    return originalText
  }
}

export default function Blog() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const params = useParams()
  const currentLocale = (params?.locale as string) || locale
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [translatedPosts, setTranslatedPosts] = useState<Record<string, { title: string; excerpt: string }>>({})
  const [loading, setLoading] = useState(true)
  
  const getBlogUrl = (path: string) => {
    return currentLocale === 'es' ? path : `/${currentLocale}${path}`
  }
  
  // Traducir posts cuando cambie el locale
  useEffect(() => {
    if (currentLocale !== 'es' && posts.length > 0) {
      const translatePosts = async () => {
        const translations: Record<string, { title: string; excerpt: string }> = {}
        
        for (const post of posts) {
          const title = await getTranslatedField(post, 'title', currentLocale)
          const excerpt = await getTranslatedField(post, 'excerpt', currentLocale)
          translations[post.id] = { title, excerpt }
        }
        
        setTranslatedPosts(translations)
      }
      
      translatePosts()
    }
  }, [currentLocale, posts])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image_url, published_at, created_at, featured')
        .eq('published', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        setPosts([])
      } else if (data) {
        setPosts(data as BlogPost[])
      } else {
        setPosts([])
      }
    } catch (error) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

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
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={getBlogUrl(`/blog/${post.slug}`)}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {post.featured_image_url && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar size={14} />
                  {formatDate(post.published_at || post.created_at)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition line-clamp-2">
                  {currentLocale === 'es' 
                    ? post.title 
                    : (translatedPosts[post.id]?.title || post.title)}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {currentLocale === 'es' 
                    ? post.excerpt 
                    : (translatedPosts[post.id]?.excerpt || post.excerpt)}
                </p>
                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                  {t('readMore')}
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={getBlogUrl('/blog')}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-medium group"
          >
            {t('viewAll')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

