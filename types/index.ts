export type DifficultyGroup = 'all' | 'beginner' | 'intermediate' | 'advanced'

export interface Question {
  id: string
  title: string
  category: string
  level: number | null
  levelLabel: string
  levelGroup: Exclude<DifficultyGroup, 'all'> | 'unknown'
  filename: string
}

export interface Category {
  name: string
  count: number
}

export interface QuestionsResponse {
  questions: Question[]
  total: number
  page: number
  pageSize: number
  categories: Category[]
}

export interface QuestionDetail {
  id: string
  title: string
  category: string
  level: number | null
  levelLabel: string
  content: string
}
