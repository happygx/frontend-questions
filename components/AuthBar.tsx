'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function AuthBar() {
  const [email, setEmail] = useState<string | null | undefined>(undefined)

  const sync = useCallback(async () => {
    const supabase = getSupabaseBrowser()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setEmail(user?.email ?? null)
  }, [])

  useEffect(() => {
    void sync()
    const supabase = getSupabaseBrowser()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void sync()
    })
    return () => subscription.unsubscribe()
  }, [sync])

  const signOut = async () => {
    await getSupabaseBrowser().auth.signOut()
  }

  if (email === undefined) {
    return <span className="text-xs text-gray-300 tabular-nums">…</span>
  }

  if (email) {
    return (
      <div className="flex max-w-[200px] flex-col items-end gap-0.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-2">
        <span className="truncate text-xs text-gray-500" title={email}>
          {email}
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          className="shrink-0 text-xs font-medium text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline"
        >
          退出
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="shrink-0 text-xs font-medium text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline"
    >
      登录
    </Link>
  )
}
