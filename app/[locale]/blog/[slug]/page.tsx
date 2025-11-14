import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url: string | null
  author_name: string
  author_email: string
  meta_title: string | null
  meta_description: string | null
  keywords: string[]
  published_at: string | null
  created_at: string
  views: number
  // Campos de traducción
  title_en?: string | null
  excerpt_en?: string | null
  content_en?: string | null
  meta_title_en?: string | null
  meta_description_en?: string | null
  title_fr?: string | null
  excerpt_fr?: string | null
  content_fr?: string | null
  meta_title_fr?: string | null
  meta_description_fr?: string | null
  title_de?: string | null
  excerpt_de?: string | null
  content_de?: string | null
  meta_title_de?: string | null
  meta_description_de?: string | null
  title_it?: string | null
  excerpt_it?: string | null
  content_it?: string | null
  meta_title_it?: string | null
  meta_description_it?: string | null
  title_pt?: string | null
  excerpt_pt?: string | null
  content_pt?: string | null
  meta_title_pt?: string | null
  meta_description_pt?: string | null
  default_language?: string
}

async function getBlogPost(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      // Si la tabla no existe aún, retornar null
      if (error?.code === 'PGRST205' || error?.message?.includes('Could not find the table')) {
        return null
      }
      return null
    }

    // Incrementar views (opcional, se puede hacer con un endpoint API)
    try {
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id)
    } catch (updateError) {
      // Ignorar errores al actualizar views
      console.log('Could not update views:', updateError)
    }

    return data as BlogPost
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getAllSlugs() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('published', true)

    if (error) {
      // Si la tabla no existe aún, retornar array vacío
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        return []
      }
      return []
    }

    return (data || []).map(post => post.slug)
  } catch (error) {
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  const locales = ['es', 'en', 'fr', 'de', 'it', 'pt']
  return locales.flatMap(locale => 
    slugs.map((slug) => ({
      locale,
      slug: slug,
    }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    }
  }
  
  const translatedTitle = await getTranslatedField(post, 'title', locale)
  const translatedExcerpt = await getTranslatedField(post, 'excerpt', locale)
  const translatedMetaTitle = (await getTranslatedField(post, 'meta_title', locale)) || translatedTitle
  const translatedMetaDescription = (await getTranslatedField(post, 'meta_description', locale)) || translatedExcerpt

  return {
    title: translatedMetaTitle,
    description: translatedMetaDescription,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    openGraph: {
      title: translatedMetaTitle,
      description: translatedMetaDescription,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : undefined,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: translatedMetaTitle,
      description: translatedMetaDescription,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  }
}

// Función helper para obtener el campo traducido
async function getTranslatedField(
  post: BlogPost, 
  field: 'title' | 'excerpt' | 'content' | 'meta_title' | 'meta_description', 
  locale: string
): Promise<string> {
  // Si el locale es español, usar campos originales
  if (locale === 'es') {
    return post[field] || ''
  }
  
  // Intentar obtener el campo traducido de la base de datos
  const translatedField = `${field}_${locale}` as keyof BlogPost
  const translatedValue = post[translatedField]
  
  // Si existe traducción guardada, usarla
  if (translatedValue && (translatedValue as string).trim().length > 0) {
    return translatedValue as string
  }
  
  // Si no existe traducción, traducir automáticamente
  const originalText = post[field] || ''
  if (!originalText || originalText.trim().length === 0) {
    return ''
  }
  
  try {
    const { translateText } = await import('@/lib/translations')
    const translated = await translateText(originalText, locale, 'es')
    
    // Guardar la traducción en la base de datos para próximas veces (en background)
    if (translated !== originalText) {
      const { supabase } = await import('@/lib/supabase')
      const updateField = `${field}_${locale}` as keyof BlogPost
      supabase
        .from('blog_posts')
        .update({ [updateField]: translated })
        .eq('id', post.id)
        .then(() => {
          console.log(`Traducción guardada para ${field}_${locale}`)
        })
        .catch((error) => {
          console.error('Error guardando traducción:', error)
        })
    }
    
    return translated
  } catch (error) {
    console.error('Error traduciendo:', error)
    // Si falla la traducción, retornar el texto original
    return originalText
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const t = await getTranslations('blog')
  const post = await getBlogPost(slug)
  
  const getBlogUrl = (path: string) => {
    return locale === 'es' ? path : `/${locale}${path}`
  }

  if (!post) {
    notFound()
  }
  
  // Obtener campos traducidos (con traducción automática si es necesario)
  const translatedTitle = await getTranslatedField(post, 'title', locale)
  const translatedExcerpt = await getTranslatedField(post, 'excerpt', locale)
  const translatedContent = await getTranslatedField(post, 'content', locale)
  const translatedMetaTitle = (await getTranslatedField(post, 'meta_title', locale)) || translatedTitle
  const translatedMetaDescription = (await getTranslatedField(post, 'meta_description', locale)) || translatedExcerpt

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const dateFormat = t('dateFormat') || 'es-ES'
    return new Date(dateString).toLocaleDateString(dateFormat, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const shareUrl = `https://jvseoagency.com/blog/${post.slug}`

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
      {/* Back Button */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Link
          href={getBlogUrl('/blog')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
        >
          <ArrowLeft size={20} />
          {t('backToBlog')}
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto max-w-4xl px-4 pb-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {translatedTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{translatedExcerpt}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.published_at || post.created_at)}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.views} {t('views')}
            </div>
            <div className="flex items-center gap-2">
              {t('by')} {post.author_name}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{t('share')}</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(translatedTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 transition"
              aria-label="Compartir en Twitter"
            >
              <Share2 size={20} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 transition"
              aria-label="Compartir en LinkedIn"
            >
              <Share2 size={20} />
            </a>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative h-64 sm:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={translatedTitle}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-primary-600 prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: translatedContent }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">
                {t('publishedOn')} {formatDate(post.published_at || post.created_at)}
              </p>
              {post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={getBlogUrl('/blog')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <ArrowLeft size={18} />
              {t('backToBlog')}
            </Link>
          </div>
        </footer>
      </article>
    </main>
    <Contact />
    <Footer />
    </>
  )
}

