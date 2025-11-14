# Sistema de Traducciones del Blog

## 📋 Resumen

El sistema de traducciones del blog permite almacenar múltiples versiones de cada post en diferentes idiomas. Los posts se mostrarán automáticamente en el idioma seleccionado por el usuario.

## 🗄️ Configuración de la Base de Datos

### Paso 1: Ejecutar el Script SQL

Ejecuta el archivo `blog-translations-setup.sql` en el SQL Editor de Supabase para agregar los campos de traducción a la tabla `blog_posts`.

Este script agregará las siguientes columnas:
- `title_en`, `excerpt_en`, `content_en`, `meta_title_en`, `meta_description_en` (Inglés)
- `title_fr`, `excerpt_fr`, `content_fr`, `meta_title_fr`, `meta_description_fr` (Francés)
- `title_de`, `excerpt_de`, `content_de`, `meta_title_de`, `meta_description_de` (Alemán)
- `title_it`, `excerpt_it`, `content_it`, `meta_title_it`, `meta_description_it` (Italiano)
- `title_pt`, `excerpt_pt`, `content_pt`, `meta_title_pt`, `meta_description_pt` (Portugués)
- `default_language` (Idioma por defecto del post)

## 📝 Cómo Funciona

### Comportamiento Automático

1. **Si el usuario está en español (`/blog/post-slug`)**: 
   - Se muestran los campos originales (`title`, `excerpt`, `content`)

2. **Si el usuario está en otro idioma (`/en/blog/post-slug`)**: 
   - El sistema busca primero los campos traducidos (ej: `title_en`, `excerpt_en`)
   - Si existen traducciones, las muestra
   - Si NO existen traducciones, muestra los campos originales en español como fallback

### Ejemplo

```sql
-- Post en español (original)
INSERT INTO blog_posts (
  title, excerpt, content, slug, published
) VALUES (
  'Guía de Desarrollo Web',
  'Descubre todo sobre desarrollo web...',
  '<p>Contenido completo...</p>',
  'guia-desarrollo-web',
  true
);

-- Agregar traducción al inglés
UPDATE blog_posts 
SET 
  title_en = 'Web Development Guide',
  excerpt_en = 'Discover everything about web development...',
  content_en = '<p>Full content...</p>'
WHERE slug = 'guia-desarrollo-web';
```

## 🎨 Uso en el Panel de Administración

Para agregar traducciones desde el panel de administración, necesitarás actualizar el formulario de edición de posts para incluir campos de traducción.

### Campos que se traducen:
- ✅ Título (`title`)
- ✅ Extracto/Resumen (`excerpt`)
- ✅ Contenido completo (`content`)
- ✅ Meta título (`meta_title`)
- ✅ Meta descripción (`meta_description`)

### Campos que NO se traducen:
- ❌ Slug (se mantiene único)
- ❌ Imagen destacada (`featured_image_url`)
- ❌ Autor (`author_name`, `author_email`)
- ❌ Keywords (se pueden traducir manualmente si es necesario)
- ❌ Fechas (`published_at`, `created_at`)

## 🔄 Flujo de Trabajo Recomendado

1. **Crear el post en español** (idioma por defecto)
2. **Publicar el post** para verificar que funciona correctamente
3. **Agregar traducciones** según sea necesario
4. **Las traducciones aparecerán automáticamente** cuando los usuarios cambien de idioma

## ⚠️ Notas Importantes

- Si un post no tiene traducción en un idioma específico, se mostrará en español (el idioma original)
- El slug del post es único y no cambia entre idiomas
- Las imágenes se comparten entre todas las versiones del post
- Los posts sin traducción seguirán funcionando normalmente, mostrándose en español

## 🚀 Próximos Pasos

Para implementar completamente el sistema de traducciones en el panel de administración:

1. Actualizar el formulario de creación/edición de posts para incluir campos de traducción
2. Agregar validación para asegurar que al menos el título y contenido en español estén presentes
3. Considerar agregar un indicador visual que muestre qué idiomas tienen traducción completa

