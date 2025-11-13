'use client'

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tonuvghrtfiihwslcpze.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvbnV2Z2hydGZpaWh3c2xjcHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2OTcyNjcsImV4cCI6MjA3ODI3MzI2N30.ZsiVznlhtMdwC-xVvsksj8F7jh-Cff_yy4R4FVlMorc'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

