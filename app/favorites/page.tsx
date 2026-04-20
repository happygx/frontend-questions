"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartFilled, HeartOutline } from "@/components/HeartIcon";
import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import QuestionDetail from "@/components/QuestionDetail";
import { useFavorites } from "@/lib/favorites";
import type { Question } from "@/types";

const PAGE_SIZE = 20;

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite, favoriteCount } =
    useFavorites();
  const [items, setItems] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    fetch("/api/questions/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: favoriteIds }),
    })
      .then((r) => r.json())
      .then((d: { questions?: Question[] }) => {
        if (!cancelled) setItems(d.questions ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    setPage((p) => (p > totalPages ? totalPages : p));
  }, [items.length]);

  const pagedItems =
    items.length === 0
      ? []
      : items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,#fff1f2_0%,#f9fafb_45%,#f9fafb_100%)]">
      <header className="sticky top-0 z-40 border-b border-rose-100/60 bg-white/85 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </span>
            返回题库
          </Link>

          <div className="flex flex-col items-end text-right">
            <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-md shadow-rose-200/50">
                <HeartFilled className="h-4 w-4 shrink-0" />
              </span>
              我的收藏
            </h1>
            <p className="text-xs text-gray-500">
              {loading ? "同步中…" : `共 ${favoriteCount} 题 · 数据保存在本机`}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {loading ? (
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse items-center gap-3 px-4 py-3"
                >
                  <div className="h-3 w-6 rounded bg-gray-100" />
                  <div className="h-5 w-14 rounded bg-gray-100" />
                  <div className="h-4 flex-1 rounded bg-gray-100" />
                  <div className="h-4 w-16 rounded bg-gray-100" />
                  <div className="h-9 w-9 rounded-xl bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        ) : favoriteCount === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200/80 bg-white/60 px-6 py-20 text-center shadow-inner">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 text-rose-300">
              <HeartOutline className="h-9 w-9 shrink-0" strokeWidth={1.25} />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              还没有收藏题目
            </h2>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              在题库列表或题目详情中点击心形按钮，即可把题目加入这里。
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-gray-800 active:scale-[0.98]"
            >
              去逛逛题库
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-8 text-center text-sm text-amber-900">
            部分收藏可能已失效（源文件已删除）。可在题库中重新收藏。
            <div className="mt-3">
              <Link
                href="/"
                className="font-medium text-amber-800 underline-offset-2 hover:underline"
              >
                返回题库
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm ring-1 ring-black/[0.02]">
            <p className="border-b border-gray-100 bg-gradient-to-r from-rose-50/40 to-transparent px-4 py-2.5 text-xs text-gray-500">
              按收藏时间排序，最近收藏的在最前
            </p>
            <div className="divide-y divide-gray-50">
              {pagedItems.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={(page - 1) * PAGE_SIZE + i + 1}
                  favorited={isFavorite(q.id)}
                  onFavoriteToggle={toggleFavorite}
                  onClick={(q) => setActiveId(q.id)}
                />
              ))}
            </div>
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={items.length}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>

      <QuestionDetail questionId={activeId} onClose={() => setActiveId(null)} />
    </div>
  );
}
