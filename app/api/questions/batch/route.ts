import { NextRequest, NextResponse } from 'next/server'
import { getQuestionsByIds } from '@/lib/questions'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const ids = (body as { ids?: unknown })?.ids
  if (!Array.isArray(ids) || !ids.every((x) => typeof x === 'string')) {
    return NextResponse.json({ error: 'Expected { ids: string[] }' }, { status: 400 })
  }

  try {
    const questions = await getQuestionsByIds(ids as string[])
    return NextResponse.json({ questions })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
