import { notFound } from 'next/navigation'
import { getQuestionDetail } from '@/lib/questions'
import LevelStars from '@/components/LevelStars'
import MarkdownContent from '@/components/MarkdownContent'
import FavoriteButton from '@/components/FavoriteButton'
import AuthGuard from '@/components/AuthGuard'
import BackToQuestions from '@/components/BackToQuestions'
import QuestionNav from '@/components/QuestionNav'

const CATEGORY_BADGE: Record<string, string> = {
  JavaScript:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  'React.js':  'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Vue.js':    'bg-green-50 text-green-700 border-green-200',
  CSS:         'bg-purple-50 text-purple-700 border-purple-200',
  HTML:        'bg-orange-50 text-orange-700 border-orange-200',
  TypeScript:  'bg-blue-50 text-blue-700 border-blue-200',
  'Node.js':   'bg-emerald-50 text-emerald-700 border-emerald-200',
  算法:        'bg-red-50 text-red-700 border-red-200',
  leetcode:    'bg-red-50 text-red-700 border-red-200',
  编程题:      'bg-rose-50 text-rose-700 border-rose-200',
}

const CATEGORY_ACCENT: Record<string, string> = {
  JavaScript:  'from-yellow-400 via-amber-400 to-orange-400',
  'React.js':  'from-cyan-400 via-sky-400 to-blue-400',
  'Vue.js':    'from-green-400 via-emerald-400 to-teal-400',
  CSS:         'from-purple-400 via-violet-400 to-indigo-400',
  HTML:        'from-orange-400 via-red-400 to-rose-400',
  TypeScript:  'from-blue-500 via-blue-400 to-indigo-400',
  'Node.js':   'from-emerald-400 via-green-400 to-teal-400',
  算法:        'from-red-400 via-rose-400 to-pink-400',
  leetcode:    'from-red-400 via-rose-400 to-pink-400',
  编程题:      'from-rose-400 via-pink-400 to-fuchsia-400',
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = await getQuestionDetail(decodeURIComponent(id))
  if (!detail) return { title: '题目不存在' }
  return { title: `${detail.title} · 前端题库` }
}

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = await getQuestionDetail(decodeURIComponent(id))
  if (!detail) notFound()

  const badgeClass = CATEGORY_BADGE[detail.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'
  const accentGradient = CATEGORY_ACCENT[detail.category] ?? 'from-blue-400 via-indigo-400 to-violet-400'

  // 去掉 markdownBodyFromRow 拼入的首行 "# 题目标题"（页面已单独渲染 h1）
  const markdownBody = detail.content.replace(/^# [^\n]*\n+/, '')

  return (
    <AuthGuard redirectTo={`/question/${encodeURIComponent(id)}`}>
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* 顶部色块 */}
      <div className={`h-0.5 bg-gradient-to-r ${accentGradient}`} />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
          <BackToQuestions />

          <FavoriteButton questionId={detail.id} />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-3 py-5 pb-24 sm:px-4 sm:py-8 sm:pb-20">
        {/* 题目 Meta + 标题 */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
              {detail.category}
            </span>
            <LevelStars level={detail.level} />
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {detail.levelLabel}
            </span>
          </div>

          <h1 className="text-lg font-bold leading-snug text-gray-900 sm:text-2xl">
            {detail.title}
          </h1>
        </div>

        {/* 分割线 */}
        <div className="mb-6 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent sm:mb-8" />

        {/* Markdown 正文 */}
        <div className="rounded-xl border border-gray-200/60 bg-white px-4 py-5 shadow-sm sm:rounded-2xl sm:px-8 sm:py-8">
          <MarkdownContent content={markdownBody} />
        </div>

        {/* 上一题 / 下一题 */}
        <QuestionNav currentId={detail.id} />
      </main>
    </div>
    </AuthGuard>
  )
}
