'use client'

import { useEffect, useState } from 'react'
import {
  QUESTIONS_LIST_RETURN_KEY,
  parseListSearchParams,
} from '@/lib/list-query'

export interface QuestionKey {
  id: string
  title: string
}

interface FilterState {
  category?: string
  difficulty?: string
  q?: string
}

const SS_CACHE_PREFIX = 'questionKeys:'

/**
 * 模块级 in-flight Map：同一筛选键并发请求会复用同一个 Promise，
 * 避免详情页同时挂载的 QuestionNav / QuestionIndexBadge 各发一次请求。
 */
const inflight = new Map<string, Promise<QuestionKey[]>>()

function readFilterFromSession(): FilterState {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem(QUESTIONS_LIST_RETURN_KEY)
    if (!stored) return {}
    const url = new URL(stored, window.location.origin)
    const parsed = parseListSearchParams(url.searchParams)
    const f: FilterState = {}
    if (parsed.category !== 'all') f.category = parsed.category
    if (parsed.difficulty !== 'all') f.difficulty = parsed.difficulty
    if (parsed.q) f.q = parsed.q
    return f
  } catch {
    return {}
  }
}

function filterToParams(filter: FilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filter.category) params.set('category', filter.category)
  if (filter.difficulty) params.set('difficulty', filter.difficulty)
  if (filter.q) params.set('q', filter.q)
  return params
}

async function loadKeys(filter: FilterState): Promise<QuestionKey[]> {
  const params = filterToParams(filter)
  const cacheKey = SS_CACHE_PREFIX + params.toString()

  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) return parsed as QuestionKey[]
      }
    } catch {
      /* ignore */
    }
  }

  const existing = inflight.get(cacheKey)
  if (existing) return existing

  const task = (async () => {
    const qs = params.toString()
    const res = await fetch(`/api/questions/keys${qs ? `?${qs}` : ''}`)
    if (!res.ok) throw new Error('failed to load question keys')
    const json = (await res.json()) as { keys?: QuestionKey[] }
    const keys = json.keys ?? []
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(keys))
      } catch {
        /* ignore quota / private mode */
      }
    }
    return keys
  })()

  inflight.set(cacheKey, task)
  try {
    return await task
  } finally {
    inflight.delete(cacheKey)
  }
}

export interface QuestionPosition {
  /** 异步加载完成与否；false 时 idx/total 不可用 */
  ready: boolean
  /** 0-based 索引，未找到时为 -1 */
  idx: number
  /** 当前筛选下题目总数 */
  total: number
  prev: QuestionKey | null
  next: QuestionKey | null
}

/**
 * 基于「列表页快照到 sessionStorage 的筛选条件」定位当前题目所在序号与上下题。
 * 当前题目不在筛选集合时（直链/筛选已失效），自动回退到全量列表。
 */
export function useQuestionPosition(currentId: string): QuestionPosition {
  const [state, setState] = useState<QuestionPosition>({
    ready: false,
    idx: -1,
    total: 0,
    prev: null,
    next: null,
  })

  useEffect(() => {
    let cancelled = false
    setState((prev) => (prev.ready ? { ...prev, ready: false } : prev))

    ;(async () => {
      const filter = readFilterFromSession()
      let keys: QuestionKey[] = []
      try {
        keys = await loadKeys(filter)
      } catch {
        if (!cancelled) {
          setState({ ready: true, idx: -1, total: 0, prev: null, next: null })
        }
        return
      }

      let idx = keys.findIndex((k) => k.id === currentId)

      if (idx === -1 && Object.keys(filter).length > 0) {
        try {
          keys = await loadKeys({})
          idx = keys.findIndex((k) => k.id === currentId)
        } catch {
          /* ignore */
        }
      }

      if (cancelled) return
      setState({
        ready: true,
        idx,
        total: keys.length,
        prev: idx > 0 ? keys[idx - 1] : null,
        next: idx >= 0 && idx < keys.length - 1 ? keys[idx + 1] : null,
      })
    })()

    return () => {
      cancelled = true
    }
  }, [currentId])

  return state
}
