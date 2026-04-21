import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/** 未配置环境变量时立即抛错；题库相关代码一律通过此客户端访问 Supabase */
export function getSupabaseServer(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    throw new Error(
      'Supabase 未配置：请在环境变量中设置 NEXT_PUBLIC_SUPABASE_URL 与 NEXT_PUBLIC_SUPABASE_ANON_KEY',
    )
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client
}
