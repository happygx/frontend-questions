'use client'

import { useEffect, useState } from 'react'

interface Props {
  page: number
  pageSize: number
  total: number
  onChange: (p: number) => void
}

export default function Pagination({ page, pageSize, total, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize)
  const [jumpInput, setJumpInput] = useState('')

  // 父组件切页时清空跳转输入框
  useEffect(() => {
    setJumpInput('')
  }, [page])

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

  function commitJump() {
    const n = Number(jumpInput)
    if (!Number.isFinite(n)) return
    const target = Math.min(totalPages, Math.max(1, Math.floor(n)))
    if (target !== page) onChange(target)
    setJumpInput('')
  }

  function handleJumpKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitJump()
    }
  }

  const btnBase = 'min-w-[32px] h-8 px-2 rounded text-sm border transition-colors'
  const active  = `${btnBase} bg-blue-600 text-white border-blue-600`
  const normal  = `${btnBase} border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600`
  const disabled = `${btnBase} border-gray-200 text-gray-300 cursor-not-allowed`

  // 跳转输入框（共用样式 + 受控）
  const jumpBox = (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
      <span>跳至</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={jumpInput}
        onChange={(e) => setJumpInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
        onKeyDown={handleJumpKeyDown}
        onBlur={() => jumpInput && commitJump()}
        aria-label={`跳转到指定页（共 ${totalPages} 页）`}
        className="h-8 w-12 rounded border border-gray-300 bg-white px-1.5 text-center text-sm tabular-nums outline-none transition-colors focus:border-blue-400"
      />
      <span>页</span>
    </div>
  )

  return (
    <div className="border-t border-gray-100 px-4 py-3">
      {/* ── 桌面端：单行三段（信息 / 页码 / 跳转） ── */}
      <div className="hidden items-center justify-between gap-3 sm:flex">
        <span className="text-xs text-gray-400">
          共 <strong>{total}</strong> 题 · 第 {start}–{end} 条
        </span>

        <div className="flex items-center gap-1">
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

        {jumpBox}
      </div>

      {/* ── 移动端：双行（信息 / 翻页+跳转） ── */}
      <div className="sm:hidden">
        <div className="mb-2 text-xs text-gray-400">
          共 <strong>{total}</strong> 题 · 第 {start}–{end} 条
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
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
          {jumpBox}
        </div>
      </div>
    </div>
  )
}
