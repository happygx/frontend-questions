"use client";

import { useQuestionPosition } from "@/lib/question-keys";

/**
 * 题目序号 pill：「第 N 题 / 共 M 题」。
 * - 与 QuestionNav 共享同一份 keys 缓存（lib/question-keys 内部去重），不会多发请求。
 * - 加载阶段渲染骨架占位，避免标题区横向跳动。
 * - 当前题目无法在筛选/全量列表中定位时不显示。
 */
export default function QuestionIndexBadge({ currentId }: { currentId: string }) {
  const { ready, idx, total } = useQuestionPosition(currentId);

  if (!ready) {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-[22px] w-20 animate-pulse rounded-full bg-gray-100"
      />
    );
  }

  if (idx < 0 || total <= 0) return null;

  return (
    <span
      title="按当前列表筛选条件计算的序号"
      className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 tabular-nums"
    >
      <span>第 {idx + 1} 题</span>
      <span className="text-blue-300">/</span>
      <span className="text-blue-400">共 {total} 题</span>
    </span>
  );
}
