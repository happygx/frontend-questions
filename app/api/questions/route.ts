import { NextRequest, NextResponse } from 'next/server'
import { getCategories, getQuestions } from '@/lib/questions'
import type { DifficultyGroup } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const category   = searchParams.get('category')   ?? 'all'
  const difficulty = (searchParams.get('difficulty') ?? 'all') as DifficultyGroup
  const q          = searchParams.get('q')          ?? ''
  const page       = Math.max(1, Number(searchParams.get('page'))     || 1)
  const pageSize   = Math.min(50, Number(searchParams.get('pageSize')) || 20)

  try {
    const { questions, total } = await getQuestions({
      category:   category === 'all' ? undefined : category,
      difficulty: difficulty === 'all' ? undefined : (difficulty as Exclude<DifficultyGroup, 'all'>),
      q:          q || undefined,
      page,
      pageSize,
    })

    const categories = await getCategories()

    return NextResponse.json({ questions, total, page, pageSize, categories })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
