import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

async function getBlogPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at, created_at')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })

    if (error) {
      // Si la tabla no existe aún, retornar array vacío
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        return []
      }
      return []
    }

    return (data || []) as Array<{
      slug: string
      updated_at: string | null
      published_at: string | null
      created_at: string
    }>
  } catch (error) {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Usar el dominio con www para consistencia
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jvseoagency.com'
  const currentDate = new Date()

  // Obtener entradas del blog
  const blogPosts = await getBlogPosts()

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Secciones principales de la página de inicio (con hash)
  // Estas URLs permiten acceso directo a secciones específicas
  const sectionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/#inicio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#proyectos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Páginas de blog dinámicas (artículos individuales)
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const lastModified = post.updated_at 
      ? new Date(post.updated_at)
      : post.published_at 
      ? new Date(post.published_at)
      : new Date(post.created_at)

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // Combinar todas las páginas
  return [...staticPages, ...sectionPages, ...blogPages]
}

