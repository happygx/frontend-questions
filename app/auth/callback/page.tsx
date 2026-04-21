'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [hint, setHint] = useState('正在完成登录…')

  useEffect(() => {
    let cancelled = false
    const supabase = getSupabaseBrowser()
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return
        if (session) {
          router.replace('/')
          return
        }
        setHint('未能建立会话，将跳转到登录页…')
        setTimeout(() => {
          if (!cancelled) router.replace('/login')
        }, 2000)
      })
      .catch(() => {
        if (cancelled) return
        setHint('登录出错')
        setTimeout(() => {
          if (!cancelled) router.replace('/login')
        }, 2000)
      })
    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <p className="text-sm text-gray-600">{hint}</p>
    </div>
  )
}
