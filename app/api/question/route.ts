import { NextRequest, NextResponse } from 'next/server'
import { getQuestionDetail } from '@/lib/questions'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') ?? ''
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const detail = getQuestionDetail(decodeURIComponent(id))
  if (!detail) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(detail)
}
