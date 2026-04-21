'use client'

import Link from 'next/link'
import type { Question } from '@/types'
import { HeartFilled, HeartOutline } from '@/components/HeartIcon'
import LevelStars from './LevelStars'

const CATEGORY_COLORS: Record<string, string> = {
  JavaScript: 'bg-yellow-100 text-yellow-700',
  'React.js':  'bg-cyan-100 text-cyan-700',
  'Vue.js':    'bg-green-100 text-green-700',
  CSS:         'bg-purple-100 text-purple-700',
  HTML:        'bg-orange-100 text-orange-700',
  TypeScript:  'bg-blue-100 text-blue-700',
  'Node.js':   'bg-emerald-100 text-emerald-700',
  算法:        'bg-red-100 text-red-700',
  leetcode:    'bg-red-100 text-red-700',
  编程题:      'bg-rose-100 text-rose-700',
}

function getBadgeClass(category: string) {
  return CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600'
}

interface Props {
  question: Question
  index: number
  favorited: boolean
  favoritesDisabled?: boolean
  onFavoriteToggle: (id: string) => void | Promise<void>
}

export default function QuestionCard({
  question,
  index,
  favorited,
  favoritesDisabled = false,
  onFavoriteToggle,
}: Props) {
  const onFavClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favoritesDisabled) return
    void onFavoriteToggle(question.id)
  }

  return (
    <div className="group flex items-center border-b border-gray-100 bg-white transition-colors last:border-b-0 hover:bg-blue-50/40">
      {/* 主体链接区：序号 + 分类 + 标题 + 难度 */}
      <Link
        href={`/question/${encodeURIComponent(question.id)}`}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3"
        prefetch={false}
      >
        <span className="w-6 shrink-0 text-right text-xs text-gray-400">
          {index}
        </span>

        <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${getBadgeClass(question.category)}`}>
          {question.category}
        </span>

        <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-gray-800 line-clamp-2 group-hover:text-blue-600">
          {question.title}
        </p>

        <div className="shrink-0 pt-0.5">
          <LevelStars level={question.level} />
        </div>
      </Link>

      {/* 收藏按钮：独立于链接之外，避免嵌套交互元素 */}
      <div className="shrink-0 px-3">
        <button
          type="button"
          disabled={favoritesDisabled}
          onClick={onFavClick}
          title={favoritesDisabled ? '收藏同步中…' : favorited ? '取消收藏' : '加入收藏'}
          aria-label={favorited ? '取消收藏' : '加入收藏'}
          aria-pressed={favorited}
          className={[
            'flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border transition-all duration-200',
            'active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 focus-visible:ring-offset-1',
            favoritesDisabled
              ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 opacity-40'
              : favorited
                ? 'border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50/80 text-rose-600 hover:bg-rose-100'
                : 'border-gray-200/90 bg-white text-gray-400 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-500',
          ].join(' ')}
        >
          {favorited ? (
            <HeartFilled className="h-4 w-4 shrink-0" />
          ) : (
            <HeartOutline className="h-4 w-4 shrink-0" />
          )}
        </button>
      </div>
    </div>
  )
}
