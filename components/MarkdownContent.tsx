'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Markdown 里图片的防御式渲染：
 *   - referrerPolicy="no-referrer"：少数外链图床做 Referer 防盗链，
 *     带上我们自己域名的 Referer 反而会 403；不带 Referer 通常能放行。
 *   - lazy + async decoding：长题 + 多图时避免一次性拉满。
 *   - onError：CDN 抽风或链接失效时降级为占位块，并暴露原链接给用户手动打开。
 */
function MarkdownImage({
  src,
  alt,
}: { src?: string; alt?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src) return null
  if (failed) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="my-3 inline-flex items-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500 no-underline hover:bg-gray-100"
      >
        <span>图片加载失败，点击尝试在新窗口打开</span>
        <span className="truncate max-w-[18rem] text-gray-400">{src}</span>
      </a>
    )
  }
  return (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-sm max-w-none

        prose-headings:font-semibold prose-headings:text-gray-800 prose-headings:tracking-tight
        prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-base prose-h2:pb-2
        prose-h2:border-b prose-h2:border-gray-100
        prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-sm prose-h3:text-gray-700

        prose-p:text-gray-700 prose-p:leading-7 prose-p:my-3

        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline

        prose-strong:text-gray-900 prose-strong:font-semibold

        prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5
        prose-code:text-[0.8em] prose-code:text-rose-600 prose-code:font-normal
        prose-code:before:content-none prose-code:after:content-none

        prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:shadow-md
        prose-pre:overflow-x-auto prose-pre:text-sm
        prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0
        prose-pre:prose-code:text-gray-100 prose-pre:prose-code:text-sm

        prose-ul:my-3 prose-ul:pl-5
        prose-ol:my-3 prose-ol:pl-5
        prose-li:my-1 prose-li:text-gray-700 prose-li:leading-6

        prose-blockquote:border-l-4 prose-blockquote:border-blue-300
        prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg
        prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:text-gray-600
        prose-blockquote:not-italic prose-blockquote:my-4

        prose-table:text-sm prose-table:border-collapse
        prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:text-left
        prose-th:font-semibold prose-th:text-gray-700 prose-th:border prose-th:border-gray-200
        prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700

        prose-hr:border-gray-200 prose-hr:my-6
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ img: MarkdownImage }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
