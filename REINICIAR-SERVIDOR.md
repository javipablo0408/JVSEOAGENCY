# ⚠️ IMPORTANTE: REINICIAR SERVIDOR

## El archivo `next.config.js` ha sido modificado

Los cambios en `next.config.js` **NO se aplican automáticamente**.

### Pasos para aplicar los cambios:

1. Ve a la terminal donde está corriendo el servidor de desarrollo
2. Presiona `Ctrl + C` para detener el servidor
3. Ejecuta de nuevo:
   ```bash
   npm run dev
   ```

### ✅ Cambios realizados:

- ✅ Agregado dominio de Supabase a `images.domains`
- ✅ Agregado dominio de Supabase a `images.remotePatterns`
- ✅ Limpiado caché de Next.js (carpeta `.next`)

### 🔍 Configuración actual:

```javascript
images: {
  domains: [
    'tonuvghrtfiihwslcpze.supabase.co',  // ← Dominio de Supabase
    'cdn.jsdelivr.net',
    'supabase.com',
    'avatars.githubusercontent.com',
    'raw.githubusercontent.com',
  ],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'tonuvghrtfiihwslcpze.supabase.co',  // ← Dominio de Supabase
    },
    // ... otros dominios
  ],
}
```

Después de reiniciar el servidor, las imágenes de Supabase deberían funcionar correctamente.

