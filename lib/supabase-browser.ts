'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

/** 浏览器端 Supabase（Auth + RLS 下的 favorites 等）；仅可在 Client Component 使用 */
export function getSupabaseBrowser(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('getSupabaseBrowser 只能在浏览器环境调用')
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    throw new Error('缺少 NEXT_PUBLIC_SUPABASE_URL 或 NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return cached
}
