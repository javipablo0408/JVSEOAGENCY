import { NextRequest, NextResponse } from 'next/server'
import { translateText } from '@/lib/translations'

/**
 * API Route para traducir texto desde el cliente
 * POST /api/translate
 * Body: { text: string, targetLang: string, sourceLang?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, targetLang, sourceLang = 'es' } = body

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'text and targetLang are required' },
        { status: 400 }
      )
    }

    const translated = await translateText(text, targetLang, sourceLang)

    return NextResponse.json({ translated })
  } catch (error) {
    console.error('Error in translate API:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}

