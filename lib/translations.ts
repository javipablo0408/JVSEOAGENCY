/**
 * Sistema de traducción automática de posts del blog
 * Usa múltiples métodos gratuitos y de pago para traducir contenido
 */

interface TranslationOptions {
  text: string
  targetLang: string
  sourceLang?: string
}

/**
 * Traduce texto usando Google Translate GRATIS (sin API key)
 * Usa @vitalets/google-translate-api que hace scraping de Google Translate
 */
async function translateWithGoogleFree({ text, targetLang, sourceLang = 'es' }: TranslationOptions): Promise<string> {
  try {
    // Importar dinámicamente para evitar errores en build
    const translateModule = await import('@vitalets/google-translate-api')
    
    // La librería exporta 'translate' como propiedad nombrada
    const translate = translateModule.translate || translateModule.default?.translate || translateModule.default
    
    if (typeof translate !== 'function') {
      console.warn('Google Translate free: translate is not a function, returning original text')
      return text
    }
    
    // Mapear códigos de idioma
    const langMap: Record<string, string> = {
      'en': 'en',
      'fr': 'fr',
      'de': 'de',
      'it': 'it',
      'pt': 'pt',
      'es': 'es',
    }

    const from = langMap[sourceLang] || sourceLang
    const to = langMap[targetLang] || targetLang

    // Si el idioma origen y destino son iguales, no traducir
    if (from === to) {
      return text
    }

    // Intentar traducir con retry en caso de rate limiting
    let lastError: any = null
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        if (attempt > 0) {
          // Esperar 2 segundos antes de reintentar
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        
        const result = await translate(text, { from, to })
        return result?.text || text
      } catch (error: any) {
        lastError = error
        // Si es error de rate limiting, esperar y reintentar
        if (error?.message?.includes('Too Many Requests') || error?.message?.includes('TooManyRequestsError')) {
          if (attempt < 1) {
            // Esperar más tiempo antes del siguiente intento
            await new Promise(resolve => setTimeout(resolve, 3000))
            continue
          }
        }
        // Si no es rate limiting o ya intentamos, salir del loop
        break
      }
    }
    
    // Si llegamos aquí, la traducción falló
    console.warn('Google Translate free: Failed to translate, returning original text. Error:', lastError?.message || lastError)
    return text
  } catch (error: any) {
    console.error('Error translating with Google Translate (free):', error?.message || error)
    // Si falla, retornar texto original
    return text
  }
}

/**
 * Traduce texto usando Google Translate API (de pago)
 * Requiere: NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY en variables de entorno
 */
async function translateWithGoogleAPI({ text, targetLang, sourceLang = 'es' }: TranslationOptions): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY
  
  if (!apiKey) {
    return text
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'html',
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data.translations[0].translatedText || text
  } catch (error) {
    console.error('Error translating with Google Translate API:', error)
    return text
  }
}

/**
 * Traduce texto usando DeepL API (de pago)
 * Requiere: DEEPL_API_KEY en variables de entorno
 */
async function translateWithDeepL({ text, targetLang, sourceLang = 'ES' }: TranslationOptions): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY
  
  if (!apiKey) {
    return text
  }

  const deeplLangMap: Record<string, string> = {
    'en': 'EN',
    'fr': 'FR',
    'de': 'DE',
    'it': 'IT',
    'pt': 'PT',
    'es': 'ES',
  }

  const targetLangUpper = deeplLangMap[targetLang] || targetLang.toUpperCase()
  const sourceLangUpper = deeplLangMap[sourceLang] || sourceLang.toUpperCase()

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        source_lang: sourceLangUpper,
        target_lang: targetLangUpper,
        tag_handling: 'html',
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translations[0].text || text
  } catch (error) {
    console.error('Error translating with DeepL:', error)
    return text
  }
}

/**
 * Traduce texto automáticamente usando el método disponible
 * Prioridad: DeepL (si está configurado) > Google API (si está configurado) > Google Free (siempre disponible)
 */
export async function translateText(text: string, targetLang: string, sourceLang: string = 'es'): Promise<string> {
  // Si el idioma objetivo es el mismo que el origen, no traducir
  if (targetLang === sourceLang || targetLang === 'es') {
    return text
  }

  // Si el texto está vacío, retornar vacío
  if (!text || text.trim().length === 0) {
    return text
  }

  // Intentar métodos en orden de prioridad:
  // 1. DeepL (mejor calidad, requiere API key)
  if (process.env.DEEPL_API_KEY) {
    try {
      return await translateWithDeepL({ text, targetLang, sourceLang })
    } catch (error) {
      console.warn('DeepL failed, trying next method:', error)
    }
  }

  // 2. Google Translate API (requiere API key)
  if (process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY) {
    try {
      return await translateWithGoogleAPI({ text, targetLang, sourceLang })
    } catch (error) {
      console.warn('Google Translate API failed, trying free method:', error)
    }
  }

  // 3. Google Translate GRATIS (siempre disponible, sin API key)
  // Esta es la opción por defecto y es completamente gratuita
  return await translateWithGoogleFree({ text, targetLang, sourceLang })
}

/**
 * Traduce múltiples campos de un post y los guarda en la base de datos
 */
export async function translateAndSavePost(
  postId: string,
  fields: { title: string; excerpt: string; content: string; meta_title?: string; meta_description?: string },
  targetLang: string,
  supabase: any
): Promise<void> {
  try {
    const translations: Record<string, string> = {}

    // Traducir cada campo
    if (fields.title) {
      translations[`title_${targetLang}`] = await translateText(fields.title, targetLang)
    }
    if (fields.excerpt) {
      translations[`excerpt_${targetLang}`] = await translateText(fields.excerpt, targetLang)
    }
    if (fields.content) {
      translations[`content_${targetLang}`] = await translateText(fields.content, targetLang)
    }
    if (fields.meta_title) {
      translations[`meta_title_${targetLang}`] = await translateText(fields.meta_title, targetLang)
    }
    if (fields.meta_description) {
      translations[`meta_description_${targetLang}`] = await translateText(fields.meta_description, targetLang)
    }

    // Guardar traducciones en la base de datos
    const { error } = await supabase
      .from('blog_posts')
      .update(translations)
      .eq('id', postId)

    if (error) {
      console.error('Error saving translations:', error)
    }
  } catch (error) {
    console.error('Error translating post:', error)
  }
}

