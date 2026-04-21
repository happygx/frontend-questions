import { NextRequest, NextResponse } from 'next/server'
import { getQuestionDetail } from '@/lib/questions'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') ?? ''
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  try {
    const detail = await getQuestionDetail(decodeURIComponent(id))
    if (!detail) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(detail)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
