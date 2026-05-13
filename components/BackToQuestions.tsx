"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QUESTIONS_LIST_RETURN_KEY } from "@/lib/list-query";

/**
 * 返回题库：优先使用列表页写入 sessionStorage 的完整路径（含筛选 query），
 * 避免详情页写死 `/` 导致分类/分页丢失；无记录时回退到 `/`。
 */
export default function BackToQuestions() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(QUESTIONS_LIST_RETURN_KEY);
      if (stored && stored.startsWith("/")) setHref(stored);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </span>
      <span className="hidden sm:inline">返回题库</span>
    </Link>
  );
}
