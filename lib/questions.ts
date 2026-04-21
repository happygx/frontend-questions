import type { Category, DifficultyGroup, Question, QuestionDetail } from '@/types'
import { getSupabaseServer } from '@/lib/supabase-server'

// ─────────────────────────────────────────────
// Level 映射工具
// ─────────────────────────────────────────────
export function levelToLabel(level: number | null): string {
  if (!level) return '未知'
  if (level <= 2) return '初级'
  if (level === 3) return '中级'
  return '高级'
}

export function levelToGroup(level: number | null): Question['levelGroup'] {
  if (!level) return 'unknown'
  if (level <= 2) return 'beginner'
  if (level === 3) return 'intermediate'
  return 'advanced'
}

/** 去掉 LIKE 通配符，避免用户输入干扰 ilike 匹配 */
function sanitizeSearchKw(s: string): string {
  return s.replace(/%/g, '').replace(/_/g, '').trim()
}

function tagNameFromJoin(tags: unknown): string {
  if (!tags) return ''
  if (Array.isArray(tags)) return (tags[0] as { tag_name?: string })?.tag_name ?? ''
  return (tags as { tag_name?: string }).tag_name ?? ''
}

function markdownBodyFromRow(r: {
  title: string
  pivot: string | null
  explanation: string | null
}): string {
  let md = `# ${r.title}\n\n`
  if (r.pivot) md += `## 题目要点\n\n${r.pivot}\n\n`
  md += `## 参考答案\n\n${r.explanation ?? '（暂无答案）'}\n`
  return md
}

type QuestionRowDb = {
  exercise_key: string
  title: string
  level: number | null
  pivot: string | null
  explanation: string | null
  tag_id: number
  tags: { tag_name: string } | { tag_name: string }[] | null
}

function rowToQuestion(row: QuestionRowDb): Question {
  const category = tagNameFromJoin(row.tags)
  return {
    id: row.exercise_key,
    title: row.title,
    category,
    level: row.level,
    levelLabel: levelToLabel(row.level),
    levelGroup: levelToGroup(row.level),
    filename: `${row.exercise_key}.md`,
  }
}

// ═════════════════════════════════════════════
// Supabase（唯一数据源）
// ═════════════════════════════════════════════

/** PostgREST 单次查询默认最多 1000 行；全表 tag_id 必须分页累加，否则分类计数与 Tab 会缺项 */
const QUESTION_TAG_CHUNK = 1000

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseServer()
  const cnt = new Map<number, number>()
  let from = 0
  for (;;) {
    const { data: chunk, error: e1 } = await supabase
      .from('questions')
      .select('tag_id')
      .range(from, from + QUESTION_TAG_CHUNK - 1)
    if (e1) throw new Error(e1.message)
    const rows = chunk ?? []
    if (rows.length === 0) break
    for (const r of rows) {
      const tid = (r as { tag_id: number | null }).tag_id
      if (tid == null) continue
      cnt.set(tid, (cnt.get(tid) ?? 0) + 1)
    }
    if (rows.length < QUESTION_TAG_CHUNK) break
    from += QUESTION_TAG_CHUNK
  }
  const { data: tags, error: e2 } = await supabase
    .from('tags')
    .select('id, tag_name')
    .order('tag_name')
  if (e2) throw new Error(e2.message)
  return (tags ?? [])
    .map((t) => ({ name: t.tag_name as string, count: cnt.get(t.id as number) ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
}

export interface GetQuestionsParams {
  category?: string
  difficulty?: Exclude<DifficultyGroup, 'all'>
  q?: string
  page?: number
  pageSize?: number
}

export async function getQuestions(params: GetQuestionsParams) {
  const { category, difficulty, q, page = 1, pageSize = 20 } = params
  const supabase = getSupabaseServer()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let tagId: number | undefined
  if (category && category !== 'all') {
    const { data: tag, error: te } = await supabase
      .from('tags')
      .select('id')
      .eq('tag_name', category)
      .maybeSingle()
    if (te) throw new Error(te.message)
    if (!tag) return { questions: [] as Question[], total: 0, page, pageSize }
    tagId = tag.id as number
  }

  const buildFiltered = () => {
    let qb = supabase.from('questions').select('exercise_key, title, level, tag_id, tags(tag_name)', {
      count: 'exact',
    })
    if (tagId !== undefined) qb = qb.eq('tag_id', tagId)
    if (difficulty && difficulty !== ('all' as string)) {
      if (difficulty === 'beginner') qb = qb.in('level', [1, 2])
      else if (difficulty === 'intermediate') qb = qb.eq('level', 3)
      else if (difficulty === 'advanced') qb = qb.in('level', [4, 5])
      else if (difficulty === 'unknown') qb = qb.is('level', null)
    }
    const kw = q ? sanitizeSearchKw(q) : ''
    if (kw) qb = qb.ilike('title', `%${kw}%`)
    return qb
  }

  const { data, error, count } = await buildFiltered()
    .order('title')
    .range(from, to)

  if (error) throw new Error(error.message)

  const questions = (data ?? []).map((row) => rowToQuestion(row as QuestionRowDb))
  return { questions, total: count ?? 0, page, pageSize }
}

export async function getAllQuestions(): Promise<Question[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('questions')
    .select('exercise_key, title, level, tag_id, tags(tag_name)')
    .order('title')
  if (error) throw new Error(error.message)
  return (data ?? []).map((row) => rowToQuestion(row as QuestionRowDb))
}

export async function getQuestionsByIds(ids: string[]): Promise<Question[]> {
  if (ids.length === 0) return []
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('questions')
    .select('exercise_key, title, level, tag_id, tags(tag_name)')
    .in('exercise_key', ids)
  if (error) throw new Error(error.message)
  const map = new Map(
    (data ?? []).map((row) => [row.exercise_key as string, rowToQuestion(row as QuestionRowDb)]),
  )
  return ids.map((id) => map.get(id)).filter((q): q is Question => q != null)
}

export async function getQuestionDetail(id: string): Promise<QuestionDetail | null> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('questions')
    .select('exercise_key, title, level, pivot, explanation, tags(tag_name)')
    .eq('exercise_key', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) return null
  const row = data as QuestionRowDb & { pivot: string | null; explanation: string | null }
  const category = tagNameFromJoin(row.tags)
  return {
    id: row.exercise_key,
    title: row.title,
    category,
    level: row.level,
    levelLabel: levelToLabel(row.level),
    content: markdownBodyFromRow(row),
  }
}
