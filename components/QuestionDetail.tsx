'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { HeartFilled, HeartOutline } from '@/components/HeartIcon'
import { useFavorites } from '@/lib/favorites'
import type { QuestionDetail } from '@/types'
import LevelStars from './LevelStars'

interface Props {
  questionId: string | null
  onClose: () => void
}

export default function QuestionDetail({ questionId, onClose }: Props) {
  const [detail, setDetail]   = useState<QuestionDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = questionId ? isFavorite(questionId) : false

  useEffect(() => {
    if (!questionId) { setDetail(null); return }

    setLoading(true)
    fetch(`/api/question?id=${encodeURIComponent(questionId)}`)
      .then((r) => r.json())
      .then((d) => setDetail(d))
      .finally(() => setLoading(false))
  }, [questionId])

  // Esc 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!questionId) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full sm:max-w-3xl sm:rounded-xl rounded-t-xl max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            {loading ? (
              <div className="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                    {detail?.category}
                  </span>
                  <LevelStars level={detail?.level ?? null} />
                  <span className="text-xs text-gray-400">{detail?.levelLabel}</span>
                </div>
                <h2 className="text-base font-semibold text-gray-800 leading-snug line-clamp-3">
                  {detail?.title}
                </h2>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (questionId) toggleFavorite(questionId)
              }}
              title={favorited ? '取消收藏' : '加入收藏'}
              aria-label={favorited ? '取消收藏' : '加入收藏'}
              aria-pressed={favorited}
              className={[
                'flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg transition-all active:scale-95',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40',
                favorited
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200/80'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-rose-500',
              ].join(' ')}
            >
              {favorited ? (
                <HeartFilled className="h-5 w-5 shrink-0" />
              ) : (
                <HeartOutline className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-400 hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[80, 60, 90, 50, 70].map((w, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : (
            <div className="prose prose-sm max-w-none
              prose-headings:text-gray-800 prose-headings:font-semibold
              prose-h2:text-base prose-h2:mt-5 prose-h2:mb-2
              prose-h3:text-sm prose-h3:mt-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
              prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded prose-code:text-xs
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-strong:text-gray-800
              prose-ul:my-2 prose-li:my-0.5
              prose-blockquote:border-blue-300 prose-blockquote:text-gray-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {detail?.content ?? ''}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
