# Configuración de Supabase Storage para Subida de Imágenes

## Problema Común
Si al intentar subir imágenes recibes un error, es probable que el bucket de Storage no esté configurado correctamente.

## Solución Paso a Paso

### 1. Crear el Bucket en Supabase

1. Ve al panel de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. Haz clic en **"New bucket"** o **"Create a new bucket"**
5. Configura el bucket:
   - **Name**: `project-images` (debe ser exactamente este nombre)
   - **Public bucket**: ✅ **MARCAR COMO PÚBLICO** (muy importante)
   - **File size limit**: 5 MB (opcional)
   - **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp` (opcional)

### 2. Configurar Políticas de Storage

Después de crear el bucket, ve a **Storage > Policies** y ejecuta estas políticas SQL:

```sql
-- Política para permitir subida de archivos a usuarios autenticados
CREATE POLICY "Allow authenticated upload to project-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

-- Política para permitir lectura pública de imágenes
CREATE POLICY "Allow public read from project-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Política para permitir actualización a usuarios autenticados
CREATE POLICY "Allow authenticated update to project-images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

-- Política para permitir eliminación a usuarios autenticados
CREATE POLICY "Allow authenticated delete from project-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');
```

### 3. Verificar la Configuración

1. Asegúrate de que el bucket esté marcado como **Público**
2. Verifica que las políticas estén activas en **Storage > Policies**
3. Intenta subir una imagen desde el panel de administración

## Solución de Problemas

### Error: "Bucket not found"
- **Solución**: Crea el bucket `project-images` en Supabase Storage y márcalo como público

### Error: "new row violates row-level security"
- **Solución**: Ejecuta las políticas SQL anteriores en Storage > Policies

### Error: "The resource already exists"
- **Solución**: El archivo ya existe. El sistema intentará actualizarlo automáticamente

### Error: "Debes estar autenticado"
- **Solución**: Asegúrate de estar logueado en el panel de administración (`/admin/login`)

## Notas Importantes

- El bucket **DEBE** ser público para que las imágenes se muestren en el sitio web
- Solo usuarios autenticados pueden subir imágenes
- El tamaño máximo de archivo es 5MB
- Los formatos soportados son: JPEG, PNG, GIF, WebP

## Verificación Rápida

Para verificar que todo está configurado correctamente:

1. ✅ Bucket `project-images` existe
2. ✅ Bucket está marcado como público
3. ✅ Políticas de Storage están configuradas
4. ✅ Estás autenticado en el panel admin
5. ✅ Intentas subir una imagen < 5MB

Si todos estos puntos están correctos, la subida de imágenes debería funcionar.

