import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

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
}

async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    return null
  }

  // Incrementar views (opcional, se puede hacer con un endpoint API)
  await supabase
    .from('blog_posts')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', data.id)

  return data as BlogPost
}

async function getAllSlugs() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)

  return (data || []).map(post => post.slug)
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : undefined,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const shareUrl = `https://jvseoagency.com/blog/${post.slug}`

  return (
    <main className="min-h-screen pt-24">
      {/* Back Button */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
        >
          <ArrowLeft size={20} />
          Volver al blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto max-w-4xl px-4 pb-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.published_at || post.created_at)}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.views} vistas
            </div>
            <div className="flex items-center gap-2">
              Por {post.author_name}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Compartir:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
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
              alt={post.title}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Publicado el {formatDate(post.published_at || post.created_at)}
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
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <ArrowLeft size={18} />
              Volver al blog
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}

