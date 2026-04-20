"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeartFilled } from "@/components/HeartIcon";
import CategoryTabs from "@/components/CategoryTabs";
import DifficultyFilter from "@/components/DifficultyFilter";
import QuestionCard from "@/components/QuestionCard";
import QuestionDetail from "@/components/QuestionDetail";
import Pagination from "@/components/Pagination";
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

  const [activeId, setActiveId] = useState<string | null>(null);

  const { isFavorite, toggleFavorite, favoriteCount } = useFavorites();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 拉取数据 ──
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
        setData(json);
        if (json.categories.length) setCategories(json.categories);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // 任何过滤条件变化时重置到第 1 页
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
          {/* Title + 搜索 */}
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3 shrink-0">
              <h1 className="text-lg font-bold text-gray-800">📚 题库</h1>
              <Link
                href="/favorites"
                className="group relative flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-rose-200 hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50/80 hover:text-rose-700 hover:shadow-sm"
              >
                <HeartFilled className="h-3.5 w-3.5 shrink-0 text-rose-500 transition-transform group-hover:scale-110" />
                我的收藏
                {favoriteCount > 0 ? (
                  <span className="min-w-[1.125rem] rounded-full bg-rose-500 px-1 text-center text-[10px] font-semibold leading-tight text-white tabular-nums">
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </span>
                ) : null}
              </Link>
            </div>
            <input
              type="search"
              placeholder="按标题搜索…"
              title="仅匹配题目标题，不包含正文"
              className="flex-1 max-w-md h-8 px-3 text-sm rounded-lg border border-gray-200 outline-none focus:border-blue-400 bg-gray-50"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* 分类 tabs */}
          <div className="pb-2">
            <CategoryTabs
              categories={categories}
              active={category}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
      </header>

      {/* ── 主体 ── */}
      <main className="max-w-5xl mx-auto px-4 py-4">
        {/* 难度过滤 + 统计 */}
        <div className="flex items-center justify-between mb-3">
          <DifficultyFilter
            active={difficulty}
            onChange={handleDifficultyChange}
          />
          <span className="text-xs text-gray-400">
            {loading ? "加载中…" : `共 ${total} 题`}
          </span>
        </div>

        {/* 题目列表 */}
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
                  onFavoriteToggle={toggleFavorite}
                  onClick={(q) => setActiveId(q.id)}
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

      {/* ── 题目详情 Modal ── */}
      <QuestionDetail questionId={activeId} onClose={() => setActiveId(null)} />
    </div>
  );
}
