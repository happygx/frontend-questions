'use client'

interface Props {
  page: number
  pageSize: number
  total: number
  onChange: (p: number) => void
}

export default function Pagination({ page, pageSize, total, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end   = Math.min(page * pageSize, total)

  // 生成页码数组（最多显示 7 个数字，超出用省略号）
  function getPages(): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (page > 3) pages.push('...')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const btnBase = 'min-w-[32px] h-8 px-2 rounded text-sm border transition-colors'
  const active  = `${btnBase} bg-blue-600 text-white border-blue-600`
  const normal  = `${btnBase} border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600`
  const disabled = `${btnBase} border-gray-200 text-gray-300 cursor-not-allowed`

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <span className="text-xs text-gray-400">
        共 <strong>{total}</strong> 题 · 第 {start}–{end} 条
      </span>

      {/* 移动端：简化为 ‹ 当前页/总页数 › */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          className={page === 1 ? disabled : normal}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="上一页"
        >
          ‹
        </button>
        <span className="text-sm text-gray-500 tabular-nums select-none">
          {page} / {totalPages}
        </span>
        <button
          className={page === totalPages ? disabled : normal}
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="下一页"
        >
          ›
        </button>
      </div>

      {/* 桌面端：完整页码列表 */}
      <div className="hidden sm:flex items-center gap-1">
        <button
          className={page === 1 ? disabled : normal}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          ‹
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">…</span>
          ) : (
            <button
              key={p}
              className={p === page ? active : normal}
              onClick={() => onChange(p as number)}
            >
              {p}
            </button>
          ),
        )}

        <button
          className={page === totalPages ? disabled : normal}
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
