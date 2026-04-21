import { getSupabaseBrowser } from '@/lib/supabase-browser'

/** 使用密码/换账号登录前写入，登录成功后合并到目标账号（同浏览器 sessionStorage 有效） */
export const PENDING_FAVORITES_SESSION_KEY = 'auth_pending_favorite_keys_v1'

/** 将当前会话（多为匿名）下的收藏 exercise_key 列表写入 sessionStorage，供登录后合并 */
export async function backupFavoriteKeysBeforeSignIn(): Promise<void> {
  if (typeof window === 'undefined') return
  const supabase = getSupabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    sessionStorage.removeItem(PENDING_FAVORITES_SESSION_KEY)
    return
  }
  const { data, error } = await supabase
    .from('favorites')
    .select('exercise_key')
    .eq('user_id', user.id)
  if (error) {
    sessionStorage.removeItem(PENDING_FAVORITES_SESSION_KEY)
    return
  }
  const keys = (data ?? []).map((r) => r.exercise_key as string)
  if (keys.length > 0) {
    sessionStorage.setItem(PENDING_FAVORITES_SESSION_KEY, JSON.stringify(keys))
  } else {
    sessionStorage.removeItem(PENDING_FAVORITES_SESSION_KEY)
  }
}

/** 登录成功后将备份的收藏 upsert 到当前用户（同一 auth.users 在多设备收藏一致） */
export async function mergePendingFavoriteKeysToUser(userId: string): Promise<void> {
  if (typeof window === 'undefined') return
  const raw = sessionStorage.getItem(PENDING_FAVORITES_SESSION_KEY)
  if (!raw) return
  sessionStorage.removeItem(PENDING_FAVORITES_SESSION_KEY)
  let keys: string[] = []
  try {
    const parsed = JSON.parse(raw) as unknown
    keys = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return
  }
  if (!keys.length) return
  const supabase = getSupabaseBrowser()
  const rows = keys.map((exercise_key) => ({ user_id: userId, exercise_key }))
  const { error } = await supabase.from('favorites').upsert(rows, {
    onConflict: 'user_id,exercise_key',
  })
  if (error) console.error('[favorites merge]', error.message)
}
