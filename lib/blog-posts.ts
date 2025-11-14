// Posts del blog definidos manualmente en código
// Para agregar un nuevo post, añádelo a este array

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image_url?: string
  author_name: string
  author_email: string
  meta_title?: string
  meta_description?: string
  keywords: string[]
  published_at: string
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  // Ejemplo de post - puedes agregar más posts aquí
  // {
  //   slug: 'ejemplo-post',
  //   title: 'Título del Post',
  //   excerpt: 'Descripción breve del post...',
  //   content: '<h2>Contenido HTML del post</h2><p>Aquí va el contenido...</p>',
  //   featured_image_url: '/images/blog/ejemplo.jpg',
  //   author_name: 'JVSEOAGENCY',
  //   author_email: 'info@jvseoagency.es',
  //   meta_title: 'Título SEO del Post',
  //   meta_description: 'Descripción SEO del post',
  //   keywords: ['palabra1', 'palabra2'],
  //   published_at: '2025-01-15T00:00:00Z',
  //   featured: true,
  // },
]

// Función helper para obtener todos los posts
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )
}

// Función helper para obtener un post por slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

// Función helper para obtener posts destacados
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured)
}

// Función helper para obtener posts regulares (no destacados)
export function getRegularPosts(): BlogPost[] {
  return blogPosts.filter(post => !post.featured)
}

