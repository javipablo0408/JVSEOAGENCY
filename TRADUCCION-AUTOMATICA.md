# 🌍 Sistema de Traducción Automática de Posts

## ✨ Características

El sistema ahora traduce **automáticamente** los posts del blog cuando un usuario cambia de idioma. Las traducciones se guardan en la base de datos para mejorar el rendimiento en futuras visitas.

### 🎉 ¡COMPLETAMENTE GRATIS!

**El sistema funciona SIN necesidad de API keys** usando Google Translate de forma gratuita. No necesitas configurar nada, funciona inmediatamente.

### Cómo Funciona

1. **Primera vez**: Cuando un usuario visita un post en otro idioma, el sistema traduce automáticamente el contenido usando Google Translate (gratis)
2. **Guardado automático**: La traducción se guarda en la base de datos para no tener que traducir de nuevo
3. **Siguientes visitas**: Si ya existe traducción guardada, se usa directamente (más rápido)

## 🔧 Configuración (Opcional)

### ✅ Opción por Defecto: Google Translate GRATIS (Sin configuración)

**No necesitas hacer nada**. El sistema funciona automáticamente usando Google Translate de forma gratuita.

### Opción 1: DeepL API (Mejor Calidad - Opcional)

Si quieres mejor calidad de traducción, puedes usar DeepL:

1. Ve a [DeepL API](https://www.deepl.com/pro-api) y crea una cuenta
2. Obtén tu API Key gratuita (500,000 caracteres/mes gratis)
3. Agrega la variable de entorno:

```bash
# En tu archivo .env.local
DEEPL_API_KEY=tu_api_key_aqui
```

### Opción 2: Google Translate API (Opcional)

Si prefieres usar la API oficial de Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto y habilita la API de Translate
3. Crea una API Key
4. Agrega la variable de entorno:

```bash
# En tu archivo .env.local
GOOGLE_TRANSLATE_API_KEY=tu_api_key_aqui
```

## 📋 Pasos de Configuración

### 1. Ejecutar el Script SQL

Primero, ejecuta el script `blog-translations-setup.sql` en Supabase para agregar los campos de traducción:

```sql
-- Este script ya está creado en blog-translations-setup.sql
-- Ejecútalo en el SQL Editor de Supabase
```

### 2. ¡Listo! (Opcional: Configurar API keys)

**No necesitas configurar nada más**. El sistema funciona automáticamente con Google Translate gratis.

Si quieres mejor calidad, puedes agregar variables de entorno opcionales (ver arriba).

### 3. Reiniciar el Servidor

Reinicia el servidor de desarrollo:

```bash
npm run dev
```

## 🚀 Uso

Una vez configurado, el sistema funciona automáticamente:

1. **Crea un post en español** normalmente
2. **Cuando un usuario cambie a otro idioma**, el post se traducirá automáticamente
3. **La traducción se guardará** en la base de datos para futuras visitas

### Ejemplo

- Post original (español): "Guía de Desarrollo Web en Madrid"
- Usuario cambia a inglés → Se traduce automáticamente a: "Web Development Guide in Madrid"
- La traducción se guarda en `title_en` en la base de datos
- Próxima vez que alguien visite en inglés, se carga directamente sin traducir

## 💰 Costos

### ✅ Google Translate (Gratis) - OPCIÓN POR DEFECTO
- **100% GRATIS**: Sin límites, sin API keys, sin configuración
- **Ilimitado**: Puedes traducir todos los posts que quieras
- **Calidad**: Buena calidad de traducción

### DeepL API (Opcional - Mejor Calidad)
- **Gratis**: 500,000 caracteres/mes
- **Pago**: Desde €4.99/mes por 1M de caracteres

### Google Translate API (Opcional)
- **Gratis**: $15 créditos mensuales (aprox. 500,000 caracteres)
- **Pago**: $20 por 1M de caracteres

## ⚠️ Notas Importantes

1. **Funciona sin configuración**: El sistema funciona automáticamente sin necesidad de API keys
2. **Primera carga**: La primera traducción puede tardar unos segundos mientras se traduce
3. **Traducciones guardadas**: Una vez traducido, las siguientes cargas son instantáneas
4. **HTML preservado**: El sistema preserva el formato HTML del contenido
5. **Rate limiting**: Google Translate gratis puede tener límites de velocidad, pero normalmente no es un problema
6. **Fallback automático**: Si falla la traducción gratis, puedes configurar DeepL o Google API como respaldo

## 🔍 Verificación

Para verificar que funciona:

1. Crea un post en español
2. Cambia el idioma a inglés (`/en/blog/tu-post`)
3. El post debería traducirse automáticamente
4. Revisa la consola del servidor para ver los logs de traducción

## 🐛 Solución de Problemas

### Los posts no se traducen

1. Verifica que las variables de entorno estén configuradas correctamente
2. Reinicia el servidor después de agregar las variables
3. Revisa la consola para ver errores de la API
4. Verifica que tengas créditos disponibles en tu cuenta de la API

### Error: "Translation API key not found"

- Asegúrate de haber agregado la variable de entorno correcta
- Verifica que el archivo `.env.local` esté en la raíz del proyecto
- Reinicia el servidor

### Las traducciones no se guardan

- Verifica que el script SQL se haya ejecutado correctamente
- Revisa los permisos de la tabla `blog_posts` en Supabase
- Verifica los logs del servidor para ver errores

