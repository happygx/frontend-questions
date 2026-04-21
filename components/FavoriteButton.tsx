'use client'

import { useFavorites } from '@/lib/favorites'
import { HeartFilled, HeartOutline } from '@/components/HeartIcon'

interface Props {
  questionId: string
}

export default function FavoriteButton({ questionId }: Props) {
  const { isFavorite, toggleFavorite, ready } = useFavorites()
  const favorited = isFavorite(questionId)

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() => void toggleFavorite(questionId)}
      title={!ready ? '收藏同步中…' : favorited ? '取消收藏' : '加入收藏'}
      aria-label={favorited ? '取消收藏' : '加入收藏'}
      aria-pressed={favorited}
      className={[
        'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium',
        'transition-all duration-200 active:scale-95',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40',
        !ready
          ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
          : favorited
            ? 'border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 text-rose-600 hover:bg-rose-100'
            : 'border-gray-200 bg-white text-gray-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600',
      ].join(' ')}
    >
      {favorited ? (
        <HeartFilled className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <HeartOutline className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
      )}
      <span>{!ready ? '加载中…' : favorited ? '已收藏' : '收藏'}</span>
    </button>
  )
}
