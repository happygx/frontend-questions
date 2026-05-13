"use client";

import Link from "next/link";
import { useQuestionPosition, type QuestionKey } from "@/lib/question-keys";

export default function QuestionNav({ currentId }: { currentId: string }) {
  const { ready, prev, next } = useQuestionPosition(currentId);

  if (!ready) {
    return (
      <nav className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
        <div className="h-[68px] animate-pulse rounded-xl border border-gray-200/60 bg-white" />
        <div className="h-[68px] animate-pulse rounded-xl border border-gray-200/60 bg-white" />
      </nav>
    );
  }

  if (!prev && !next) return null;

  return (
    <nav
      className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2"
      aria-label="题目导航"
    >
      <NavCard side="prev" item={prev} />
      <NavCard side="next" item={next} />
    </nav>
  );
}

function NavCard({
  side,
  item,
}: {
  side: "prev" | "next";
  item: QuestionKey | null;
}) {
  const label = side === "prev" ? "上一题" : "下一题";
  const isPrev = side === "prev";
  const alignment = isPrev ? "text-left" : "text-right sm:items-end";

  if (!item) {
    return (
      <div
        className={`flex flex-col gap-1 rounded-xl border border-dashed border-gray-200 bg-white/40 px-4 py-3 ${alignment}`}
      >
        <span
          className={`flex items-center gap-1 text-xs text-gray-300 ${
            isPrev ? "" : "justify-end"
          }`}
        >
          {isPrev ? (
            <>
              <ArrowIcon dir="left" />
              {label}
            </>
          ) : (
            <>
              {label}
              <ArrowIcon dir="right" />
            </>
          )}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {isPrev ? "已经是第一题" : "已经是最后一题"}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/question/${encodeURIComponent(item.id)}`}
      className={`group flex flex-col gap-1 rounded-xl border border-gray-200/60 bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md ${alignment}`}
    >
      <span
        className={`flex items-center gap-1 text-xs text-gray-400 transition-colors group-hover:text-blue-500 ${
          isPrev ? "" : "justify-end"
        }`}
      >
        {isPrev ? (
          <>
            <ArrowIcon dir="left" />
            {label}
          </>
        ) : (
          <>
            {label}
            <ArrowIcon dir="right" />
          </>
        )}
      </span>
      <span className="line-clamp-2 text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-700">
        {item.title}
      </span>
    </Link>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  const d =
    dir === "left"
      ? "M15.75 19.5 8.25 12l7.5-7.5"
      : "M8.25 4.5l7.5 7.5-7.5 7.5";
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
