-- Script SQL completo para configurar Supabase
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase

-- ============================================
-- TABLA DE CONTACTOS
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción pública (para el formulario de contacto)
CREATE POLICY "Allow public insert on contacts"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados
CREATE POLICY "Allow authenticated read on contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Índices para contacts
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- ============================================
-- TABLA DE PROYECTOS
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (para mostrar proyectos en el sitio)
CREATE POLICY "Allow public read on projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Allow authenticated insert on projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Allow authenticated update on projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Allow authenticated delete on projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Índices para projects
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CONFIGURACIÓN DE STORAGE PARA IMÁGENES
-- ============================================
-- IMPORTANTE: Primero debes crear el bucket manualmente en Supabase
-- 
-- PASOS MANUALES REQUERIDOS:
-- 1. Ve a Storage en el panel de Supabase
-- 2. Haz clic en "New bucket" o "Create a new bucket"
-- 3. Nombre: "project-images" (exactamente así)
-- 4. Marca "Public bucket" como ON (MUY IMPORTANTE)
-- 5. Opcional: File size limit: 5 MB
-- 6. Opcional: Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
-- 7. Haz clic en "Create bucket"
--
-- DESPUÉS ejecuta las políticas SQL siguientes:

-- Política para permitir subida de archivos a usuarios autenticados
-- NOTA: Si la política ya existe, elimínala primero o usa CREATE POLICY IF NOT EXISTS
DROP POLICY IF EXISTS "Allow authenticated upload to project-images" ON storage.objects;
CREATE POLICY "Allow authenticated upload to project-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

-- Política para permitir lectura pública de imágenes
DROP POLICY IF EXISTS "Allow public read from project-images" ON storage.objects;
CREATE POLICY "Allow public read from project-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Política para permitir actualización a usuarios autenticados
DROP POLICY IF EXISTS "Allow authenticated update to project-images" ON storage.objects;
CREATE POLICY "Allow authenticated update to project-images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

-- Política para permitir eliminación a usuarios autenticados
DROP POLICY IF EXISTS "Allow authenticated delete from project-images" ON storage.objects;
CREATE POLICY "Allow authenticated delete from project-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');

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

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar slug automáticamente (opcional, se puede hacer en el frontend)
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- NOTAS IMPORTANTES
-- ============================================
-- 1. Para crear un usuario administrador:
--    - Ve a Authentication > Users en el panel de Supabase
--    - Crea un nuevo usuario con email y contraseña
--    - Este usuario podrá iniciar sesión en /admin/login
--
-- 2. Configuración de Storage:
--    - Ve a Storage > Create a new bucket
--    - Nombre: project-images
--    - Marca como público (Public bucket: ON)
--    - Ejecuta las políticas de Storage anteriores
--
-- 3. Si quieres restringir el acceso solo a ciertos usuarios:
--    - Puedes crear una tabla de admins y verificar en las políticas
--    - O usar roles personalizados en Supabase
--
-- 4. Las políticas RLS están configuradas para:
--    - contacts: inserción pública, lectura solo autenticados
--    - projects: lectura pública, CRUD solo autenticados
--    - Storage: subida solo autenticados, lectura pública
