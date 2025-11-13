'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  published_at: string | null
  created_at: string
  featured: boolean
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

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
    return new Date(dateString).toLocaleDateString('es-ES', {
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
            Blog de Desarrollo Web
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Artículos sobre desarrollo web, aplicaciones móviles y automatizaciones con IA en Madrid
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
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
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Leer más
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-medium group"
          >
            Ver todos los artículos
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

