'use client'

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { mergePendingFavoriteKeysToUser } from '@/lib/auth-session'

/** 旧版本地收藏（迁移后删除） */
const LEGACY_STORAGE_KEY = 'question-favorites'
/** 迁移完成后写入，避免重复 upsert */
const MIGRATION_FLAG = 'favorites_cloud_v1'

type FavoritesContextValue = {
  favoriteIds: string[]
  favoriteCount: number
  isFavorite: (id: string) => boolean
  /** 与云端同步；未 ready 时调用会直接 return */
  toggleFavorite: (id: string) => Promise<void>
  /** 匿名登录 + 拉取收藏列表完成前为 false，用于禁用收藏按钮避免状态闪烁 */
  ready: boolean
  error: string | null
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

async function fetchFavoriteKeys(userId: string): Promise<string[]> {
  const supabase = getSupabaseBrowser()
  const { data, error } = await supabase
    .from('favorites')
    .select('exercise_key')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map((r) => r.exercise_key as string)
}

async function migrateLegacyIfNeeded(userId: string): Promise<void> {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(MIGRATION_FLAG) === '1') return

  const supabase = getSupabaseBrowser()
  let keys: string[] = []
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    keys = Array.isArray(parsed)
      ? parsed.filter((x: unknown): x is string => typeof x === 'string')
      : []
  } catch {
    keys = []
  }

  if (keys.length > 0) {
    const rows = keys.map((exercise_key) => ({ user_id: userId, exercise_key }))
    const { error } = await supabase.from('favorites').upsert(rows, {
      onConflict: 'user_id,exercise_key',
    })
    if (error) throw new Error(error.message)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  }
  localStorage.setItem(MIGRATION_FLAG, '1')
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** @param soft 为 true 时（如切回标签页）不将 ready 置 false，避免心形按钮整页闪烁 */
  const refresh = useCallback(async (soft = false) => {
    if (!soft) setReady(false)
    setError(null)
    try {
      const supabase = getSupabaseBrowser()
      let {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        const { error: anonErr } = await supabase.auth.signInAnonymously()
        if (anonErr) {
          setError(anonErr.message)
          if (!soft) setFavoriteIds([])
          return
        }
        ;({
          data: { session },
        } = await supabase.auth.getSession())
      }

      // getSession() 读 localStorage，避免与 AuthBar/AuthGuard 的并发请求争 Web Lock
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession()
      const user = currentSession?.user
      if (!user) {
        setError('无法建立匿名会话')
        if (!soft) setFavoriteIds([])
        return
      }

      try {
        await migrateLegacyIfNeeded(user.id)
      } catch (e) {
        setError(e instanceof Error ? e.message : '迁移本地收藏失败')
      }

      const ids = await fetchFavoriteKeys(user.id)
      setFavoriteIds(ids)
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载收藏失败')
      if (!soft) setFavoriteIds([])
    } finally {
      setReady(true)
    }
  }, [])

  const refreshRef = useRef(refresh)
  refreshRef.current = refresh

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'visible') void refreshRef.current(true)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    const supabase = getSupabaseBrowser()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') return
      if (event === 'SIGNED_IN' && session?.user) {
        await mergePendingFavoriteKeysToUser(session.user.id)
        void refreshRef.current(true)
        return
      }
      if (event === 'SIGNED_OUT') {
        void refreshRef.current(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds])

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!ready) return
      const supabase = getSupabaseBrowser()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const currently = favoriteIds.includes(id)
      if (currently) {
        const { error: delErr } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('exercise_key', id)
        if (delErr) {
          setError(delErr.message)
          return
        }
        setFavoriteIds((prev) => prev.filter((x) => x !== id))
      } else {
        const { error: insErr } = await supabase.from('favorites').insert({
          user_id: user.id,
          exercise_key: id,
        })
        if (insErr) {
          setError(insErr.message)
          return
        }
        setFavoriteIds((prev) => [id, ...prev.filter((x) => x !== id)])
      }
      setError(null)
    },
    [ready, favoriteIds],
  )

  const value = useMemo(
    () => ({
      favoriteIds,
      favoriteCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
      ready,
      error,
    }),
    [favoriteIds, isFavorite, toggleFavorite, ready, error],
  )

  return createElement(FavoritesContext.Provider, { value }, children)
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
