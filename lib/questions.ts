import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Category, DifficultyGroup, Question, QuestionDetail } from '@/types'

/** 题库 markdown 根目录：优先仓库内 ./data，其次旧结构 ../data，可用 QUESTIONS_DATA_DIR 覆盖 */
function resolveDataDir(): string {
  const fromEnv = process.env.QUESTIONS_DATA_DIR?.trim()
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv)
  }
  const inRepo = path.join(process.cwd(), 'data')
  const sibling = path.join(process.cwd(), '..', 'data')
  if (fs.existsSync(inRepo)) return inRepo
  if (fs.existsSync(sibling)) return sibling
  return inRepo
}

export const DATA_DIR = resolveDataDir()

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

// ─────────────────────────────────────────────
// 简单 in-memory 缓存（dev server 生命周期内有效）
// ─────────────────────────────────────────────
let _categories: Category[] | null = null
let _questions: Question[] | null = null

export function getCategories(): Category[] {
  if (_categories) return _categories

  _categories = fs
    .readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({
      name: d.name,
      count: fs
        .readdirSync(path.join(DATA_DIR, d.name))
        .filter((f) => f.endsWith('.md')).length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count)

  return _categories
}

export function getAllQuestions(): Question[] {
  if (_questions) return _questions

  const questions: Question[] = []

  for (const cat of getCategories()) {
    const catDir = path.join(DATA_DIR, cat.name)
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.md'))

    for (const file of files) {
      const raw = fs.readFileSync(path.join(catDir, file), 'utf-8')
      const { data, content } = matter(raw)

      const level = typeof data.level === 'number' ? data.level : null
      const title = file.replace(/\.md$/, '')

      questions.push({
        id: `${cat.name}|||${file}`,
        title,
        category: cat.name,
        level,
        levelLabel: levelToLabel(level),
        levelGroup: levelToGroup(level),
        filename: file,
      })
    }
  }

  _questions = questions
  return questions
}

/** 按收藏顺序返回题目（跳过无效 id） */
export function getQuestionsByIds(ids: string[]): Question[] {
  const all = getAllQuestions()
  const map = new Map(all.map((q) => [q.id, q]))
  const out: Question[] = []
  for (const id of ids) {
    const q = map.get(id)
    if (q) out.push(q)
  }
  return out
}

// ─────────────────────────────────────────────
// 列表查询（过滤 + 分页）
// ─────────────────────────────────────────────
export interface GetQuestionsParams {
  category?: string
  difficulty?: Exclude<DifficultyGroup, 'all'>
  q?: string
  page?: number
  pageSize?: number
}

export function getQuestions(params: GetQuestionsParams) {
  const { category, difficulty, q, page = 1, pageSize = 20 } = params
  let list = getAllQuestions()

  if (category && category !== 'all') {
    list = list.filter((item) => item.category === category)
  }

  if (difficulty && difficulty !== ('all' as string)) {
    list = list.filter((item) => item.levelGroup === difficulty)
  }

  // 关键词仅匹配题目标题（由 .md 文件名推导，不查正文）
  const kw = q?.trim().toLowerCase()
  if (kw) {
    list = list.filter((item) => item.title.toLowerCase().includes(kw))
  }

  const total = list.length
  const items = list.slice((page - 1) * pageSize, page * pageSize)
  return { questions: items, total, page, pageSize }
}

// ─────────────────────────────────────────────
// 题目详情
// ─────────────────────────────────────────────
export function getQuestionDetail(id: string): QuestionDetail | null {
  const sepIdx = id.indexOf('|||')
  if (sepIdx === -1) return null

  const category = id.slice(0, sepIdx)
  const filename = id.slice(sepIdx + 3)
  const filepath = path.join(DATA_DIR, category, filename)

  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  const level = typeof data.level === 'number' ? data.level : null
  const title = filename.replace(/\.md$/, '')

  return { id, title, category, level, levelLabel: levelToLabel(level), content }
}
