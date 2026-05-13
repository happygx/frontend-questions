import { NextRequest, NextResponse } from 'next/server'
import { getQuestionKeys } from '@/lib/questions'
import type { DifficultyGroup } from '@/types'

export const dynamic = 'force-dynamic'

/**
 * 返回与列表页筛选一致、按 title 排序的全部 (id, title) 列表，
 * 供详情页「上一题 / 下一题」定位使用，不分页。
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const category   = searchParams.get('category')   ?? 'all'
  const difficulty = (searchParams.get('difficulty') ?? 'all') as DifficultyGroup
  const q          = searchParams.get('q')          ?? ''

  try {
    const keys = await getQuestionKeys({
      category:   category === 'all' ? undefined : category,
      difficulty: difficulty === 'all' ? undefined : (difficulty as Exclude<DifficultyGroup, 'all'>),
      q:          q || undefined,
    })

    return NextResponse.json({ keys })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
