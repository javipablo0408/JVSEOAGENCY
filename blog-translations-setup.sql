-- ============================================
-- SCRIPT SQL PARA AGREGAR CAMPOS DE TRADUCCIÓN A BLOG_POSTS
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================

-- Agregar columnas de traducción para inglés
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS meta_title_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT;

-- Agregar columnas de traducción para francés
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS excerpt_fr TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS meta_title_fr TEXT,
ADD COLUMN IF NOT EXISTS meta_description_fr TEXT;

-- Agregar columnas de traducción para alemán
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_de TEXT,
ADD COLUMN IF NOT EXISTS excerpt_de TEXT,
ADD COLUMN IF NOT EXISTS content_de TEXT,
ADD COLUMN IF NOT EXISTS meta_title_de TEXT,
ADD COLUMN IF NOT EXISTS meta_description_de TEXT;

-- Agregar columnas de traducción para italiano
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_it TEXT,
ADD COLUMN IF NOT EXISTS excerpt_it TEXT,
ADD COLUMN IF NOT EXISTS content_it TEXT,
ADD COLUMN IF NOT EXISTS meta_title_it TEXT,
ADD COLUMN IF NOT EXISTS meta_description_it TEXT;

-- Agregar columnas de traducción para portugués
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_pt TEXT,
ADD COLUMN IF NOT EXISTS excerpt_pt TEXT,
ADD COLUMN IF NOT EXISTS content_pt TEXT,
ADD COLUMN IF NOT EXISTS meta_title_pt TEXT,
ADD COLUMN IF NOT EXISTS meta_description_pt TEXT;

-- Agregar columna para el idioma del post original
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS default_language TEXT DEFAULT 'es';

-- Comentarios para documentación
COMMENT ON COLUMN blog_posts.title_en IS 'Título del post en inglés';
COMMENT ON COLUMN blog_posts.title_fr IS 'Título del post en francés';
COMMENT ON COLUMN blog_posts.title_de IS 'Título del post en alemán';
COMMENT ON COLUMN blog_posts.title_it IS 'Título del post en italiano';
COMMENT ON COLUMN blog_posts.title_pt IS 'Título del post en portugués';
COMMENT ON COLUMN blog_posts.default_language IS 'Idioma por defecto del post (es, en, fr, de, it, pt)';

