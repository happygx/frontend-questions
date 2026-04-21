"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeartFilled } from "@/components/HeartIcon";
import CategoryTabs from "@/components/CategoryTabs";
import DifficultyFilter from "@/components/DifficultyFilter";
import QuestionCard from "@/components/QuestionCard";
import Pagination from "@/components/Pagination";
import AuthBar from "@/components/AuthBar";
import { useFavorites } from "@/lib/favorites";
import type {
  Category,
  DifficultyGroup,
  Question,
  QuestionsResponse,
} from "@/types";

const PAGE_SIZE = 20;

export default function Home() {
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState<DifficultyGroup>("all");
  const [searchQ, setSearchQ] = useState("");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<QuestionsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalAll, setTotalAll] = useState(0);

  const {
    isFavorite,
    toggleFavorite,
    favoriteCount,
    ready: favoritesReady,
    error: favoritesError,
  } = useFavorites();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = useCallback(
    async (cat: string, diff: DifficultyGroup, q: string, p: number) => {
      setLoading(true);
      const params = new URLSearchParams({
        category: cat,
        difficulty: diff,
        q,
        page: String(p),
        pageSize: String(PAGE_SIZE),
      });
      try {
        const res = await fetch(`/api/questions?${params}`);
        const json: QuestionsResponse = await res.json();
        if (!res.ok || !Array.isArray(json.categories)) return;
        setData(json);
        if (json.categories.length) setCategories(json.categories);
        // 只在无任何筛选时更新"全部"总数，避免切换分类/搜索后数字跳变
        if (cat === 'all' && diff === 'all' && !q) setTotalAll(json.total);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchData(category, difficulty, searchQ, page);
  }, [category, difficulty, searchQ, page, fetchData]);

  function handleCategoryChange(name: string) {
    setCategory(name);
    setPage(1);
  }

  function handleDifficultyChange(d: DifficultyGroup) {
    setDifficulty(d);
    setPage(1);
  }

  function handleSearch(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchQ(value);
      setPage(1);
    }, 300);
  }

  const questions: Question[] = data?.questions ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 顶部 Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
            {/* 左：标题 + 收藏 */}
            <div className="flex min-w-0 items-center gap-3">
              <h1 className="shrink-0 text-lg font-bold text-gray-800">
                📚 题库
              </h1>
              <Link
                href="/favorites"
                title={favoritesError ?? undefined}
                className="group relative flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-rose-200 hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50/80 hover:text-rose-700 hover:shadow-sm"
              >
                <HeartFilled className="h-3.5 w-3.5 shrink-0 text-rose-500 transition-transform group-hover:scale-110" />
                我的收藏
                {favoritesReady && favoriteCount > 0 ? (
                  <span className="min-w-[1.125rem] rounded-full bg-rose-500 px-1 text-center text-[10px] font-semibold leading-tight text-white tabular-nums">
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </span>
                ) : null}
              </Link>
            </div>

            {/* 中：搜索框（绝对居中） */}
            <input
              suppressHydrationWarning
              type="search"
              placeholder="按标题搜索…"
              title="仅匹配题目标题，不包含正文"
              className="h-8 w-56 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-blue-400 focus:bg-white sm:w-72"
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* 右：AuthBar */}
            <div className="flex justify-end">
              <AuthBar />
            </div>
          </div>

          <div className="pb-2">
            <CategoryTabs
              categories={categories}
              active={category}
              totalAll={totalAll}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
      </header>

      {/* ── 主体 ── */}
      <main className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <DifficultyFilter
            active={difficulty}
            onChange={handleDifficultyChange}
          />
          <span className="text-xs text-gray-400">
            {loading ? "加载中…" : `共 ${total} 题`}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 animate-pulse"
                >
                  <div className="w-6 h-3 bg-gray-100 rounded" />
                  <div className="w-14 h-5 bg-gray-100 rounded" />
                  <div className="flex-1 h-4 bg-gray-100 rounded" />
                  <div className="w-16 h-4 bg-gray-100 rounded" />
                  <div className="w-9 h-9 bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : questions.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">
              暂无匹配题目
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {questions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={(page - 1) * PAGE_SIZE + i + 1}
                  favorited={isFavorite(q.id)}
                  favoritesDisabled={!favoritesReady}
                  onFavoriteToggle={toggleFavorite}
                />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={total}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </main>
    </div>
  );
}
