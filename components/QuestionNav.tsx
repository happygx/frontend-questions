"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  QUESTIONS_LIST_RETURN_KEY,
  parseListSearchParams,
} from "@/lib/list-query";

interface QuestionKey {
  id: string;
  title: string;
}

interface NavState {
  prev: QuestionKey | null;
  next: QuestionKey | null;
}

const KEYS_CACHE_PREFIX = "questionKeys:";

interface FilterState {
  category?: string;
  difficulty?: string;
  q?: string;
}

/** 从 sessionStorage 中保存的列表 URL 还原筛选条件，无记录则视作"全部" */
function readFilterFromSession(): FilterState {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(QUESTIONS_LIST_RETURN_KEY);
    if (!stored) return {};
    const url = new URL(stored, window.location.origin);
    const parsed = parseListSearchParams(url.searchParams);
    const f: FilterState = {};
    if (parsed.category !== "all") f.category = parsed.category;
    if (parsed.difficulty !== "all") f.difficulty = parsed.difficulty;
    if (parsed.q) f.q = parsed.q;
    return f;
  } catch {
    return {};
  }
}

function filterToParams(filter: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.category) params.set("category", filter.category);
  if (filter.difficulty) params.set("difficulty", filter.difficulty);
  if (filter.q) params.set("q", filter.q);
  return params;
}

async function loadKeys(filter: FilterState): Promise<QuestionKey[]> {
  const params = filterToParams(filter);
  const cacheKey = KEYS_CACHE_PREFIX + params.toString();

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed as QuestionKey[];
    }
  } catch {
    /* ignore */
  }

  const qs = params.toString();
  const res = await fetch(`/api/questions/keys${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("failed to load question keys");
  const json = (await res.json()) as { keys?: QuestionKey[] };
  const keys = json.keys ?? [];

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(keys));
  } catch {
    /* ignore quota / private mode */
  }
  return keys;
}

export default function QuestionNav({ currentId }: { currentId: string }) {
  const [nav, setNav] = useState<NavState | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const filter = readFilterFromSession();
      let keys: QuestionKey[] = [];
      try {
        keys = await loadKeys(filter);
      } catch {
        if (!cancelled) setNav({ prev: null, next: null });
        return;
      }

      let idx = keys.findIndex((k) => k.id === currentId);

      // 当前题目不在筛选集合中（如直接打开链接、或筛选状态已过期），回退到全量
      if (idx === -1 && Object.keys(filter).length > 0) {
        try {
          keys = await loadKeys({});
          idx = keys.findIndex((k) => k.id === currentId);
        } catch {
          /* ignore */
        }
      }

      if (cancelled) return;
      if (idx === -1) {
        setNav({ prev: null, next: null });
        return;
      }
      setNav({
        prev: idx > 0 ? keys[idx - 1] : null,
        next: idx < keys.length - 1 ? keys[idx + 1] : null,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [currentId]);

  if (nav === null) {
    return (
      <nav className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
        <div className="h-[68px] animate-pulse rounded-xl border border-gray-200/60 bg-white" />
        <div className="h-[68px] animate-pulse rounded-xl border border-gray-200/60 bg-white" />
      </nav>
    );
  }

  if (!nav.prev && !nav.next) return null;

  return (
    <nav
      className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2"
      aria-label="题目导航"
    >
      <NavCard side="prev" item={nav.prev} />
      <NavCard side="next" item={nav.next} />
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
