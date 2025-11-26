import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { locales, defaultLocale } from '@/i18n'

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

// Función auxiliar para construir URLs con locale
function buildUrl(baseUrl: string, path: string, locale?: string): string {
  // El español es el idioma por defecto, no necesita prefijo
  if (locale && locale !== defaultLocale) {
    return `${baseUrl}/${locale}${path}`
  }
  return `${baseUrl}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Usar el dominio con www para consistencia
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jvseoagency.com'
  const currentDate = new Date()

  // Obtener entradas del blog
  const blogPosts = await getBlogPosts()

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generar páginas estáticas para todos los idiomas
  for (const locale of locales) {
    // Página principal (home)
    sitemapEntries.push({
      url: buildUrl(baseUrl, '', locale),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: locale === defaultLocale ? 1.0 : 0.9,
    })

    // Página de blog
    sitemapEntries.push({
      url: buildUrl(baseUrl, '/blog', locale),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: locale === defaultLocale ? 0.9 : 0.8,
    })

    // Página de diseño de páginas web en Madrid
    sitemapEntries.push({
      url: buildUrl(baseUrl, '/diseno-paginas-web-madrid', locale),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: locale === defaultLocale ? 0.9 : 0.8,
    })

    // Páginas de blog dinámicas (artículos individuales) para cada idioma
    for (const post of blogPosts) {
      const lastModified = post.updated_at 
        ? new Date(post.updated_at)
        : post.published_at 
        ? new Date(post.published_at)
        : new Date(post.created_at)

      sitemapEntries.push({
        url: buildUrl(baseUrl, `/blog/${post.slug}`, locale),
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: locale === defaultLocale ? 0.7 : 0.6,
      })
    }
  }

  return sitemapEntries
}

