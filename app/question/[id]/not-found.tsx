import Link from 'next/link'

export default function QuestionNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8f9fb] px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
        🔍
      </div>
      <h1 className="text-lg font-semibold text-gray-800">题目不存在</h1>
      <p className="max-w-xs text-sm text-gray-500">
        该题目可能已下架或链接有误。
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-gray-700 active:scale-[0.98]"
      >
        返回题库
      </Link>
    </div>
  )
}
