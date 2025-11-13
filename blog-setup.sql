-- ============================================
-- SCRIPT SQL PARA CREAR LA TABLA DE BLOG POSTS
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================

-- Primero, crear la función si no existe
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TABLA DE BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'JVSEOAGENCY',
  author_email TEXT DEFAULT 'info@jvseoagency.es',
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar Row Level Security (RLS) para blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay (para evitar errores)
DROP POLICY IF EXISTS "Allow public read on published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated read all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated insert on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated update on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated delete on blog_posts" ON blog_posts;

-- Política para permitir lectura pública solo de posts publicados
CREATE POLICY "Allow public read on published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Política para permitir lectura completa a usuarios autenticados
CREATE POLICY "Allow authenticated read all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Allow authenticated insert on blog_posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Allow authenticated update on blog_posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Allow authenticated delete on blog_posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Índices para blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Eliminar trigger existente si existe
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar slug automáticamente (opcional)
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

