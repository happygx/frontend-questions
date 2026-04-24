"use client";

import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeartFilled } from "@/components/HeartIcon";
import CategoryTabs from "@/components/CategoryTabs";
import DifficultyFilter from "@/components/DifficultyFilter";
import QuestionCard from "@/components/QuestionCard";
import Pagination from "@/components/Pagination";
import AuthBar from "@/components/AuthBar";
import { useFavorites } from "@/lib/favorites";
import {
  buildListQueryString,
  parseListSearchParams,
  persistListReturnHref,
} from "@/lib/list-query";
import type {
  Category,
  DifficultyGroup,
  Question,
  QuestionsResponse,
} from "@/types";

const PAGE_SIZE = 20;

export default function Home() {
  // useSearchParams 所在组件必须被 Suspense 包裹，否则 Next.js 会把整页退化为 CSR
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}

function HomeInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 是筛选/分页的唯一状态源；组件内所有状态从这里派生
  const { category, difficulty, q, page } = useMemo(
    () => parseListSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  // 搜索框是纯 UI 临时态（打字过程），debounce 之后才推到 URL
  const [searchInput, setSearchInput] = useState(q);
  // URL 上的 q 被外部改变（如浏览器后退）时，把输入框同步回去
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

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
    async (cat: string, diff: DifficultyGroup, query: string, p: number) => {
      setLoading(true);
      const params = new URLSearchParams({
        category: cat,
        difficulty: diff,
        q: query,
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
        if (cat === "all" && diff === "all" && !query) setTotalAll(json.total);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchData(category, difficulty, q, page);
  }, [category, difficulty, q, page, fetchData]);

  // 把当前列表 URL 快照到 sessionStorage，供详情页「返回题库」复用
  useEffect(() => {
    persistListReturnHref(
      pathname,
      new URLSearchParams(searchParams.toString()),
    );
  }, [pathname, searchParams]);

  // 合并新的筛选/分页补丁，以 URL 为载体派发；{ scroll: false } 避免自动跳顶
  const commitState = useCallback(
    (patch: {
      category?: string;
      difficulty?: DifficultyGroup;
      q?: string;
      page?: number;
    }) => {
      const next = {
        category: patch.category ?? category,
        difficulty: patch.difficulty ?? difficulty,
        q: patch.q ?? q,
        page: patch.page ?? page,
      };
      const qs = buildListQueryString(next);
      const href = qs ? `${pathname}?${qs}` : pathname;
      router.replace(href, { scroll: false });
    },
    [router, pathname, category, difficulty, q, page],
  );

  function handleCategoryChange(name: string) {
    commitState({ category: name, page: 1 });
  }

  function handleDifficultyChange(d: DifficultyGroup) {
    commitState({ difficulty: d, page: 1 });
  }

  function handleSearchInput(value: string) {
    setSearchInput(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      commitState({ q: value, page: 1 });
    }, 300);
  }

  function handlePageChange(p: number) {
    commitState({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const questions: Question[] = data?.questions ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 顶部 Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">

          {/* ── 移动端双行布局（< sm） ── */}
          <div className="sm:hidden">
            {/* 行一：Logo + 收藏入口 + AuthBar */}
            <div className="flex items-center justify-between gap-2 py-2.5">
              <h1 className="shrink-0 text-base font-bold text-gray-800">
                📚 题库
              </h1>
              <div className="flex min-w-0 items-center gap-2">
                <Link
                  href="/favorites"
                  title={favoritesError ?? undefined}
                  className="group flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50/80 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all active:bg-rose-50"
                >
                  <HeartFilled className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                  {favoritesReady && favoriteCount > 0 ? (
                    <span className="min-w-[1rem] rounded-full bg-rose-500 px-1 text-center text-[10px] font-semibold leading-tight text-white tabular-nums">
                      {favoriteCount > 99 ? "99+" : favoriteCount}
                    </span>
                  ) : (
                    <span>收藏</span>
                  )}
                </Link>
                <AuthBar />
              </div>
            </div>
            {/* 行二：全宽搜索框 */}
            <div className="pb-2.5">
              <input
                suppressHydrationWarning
                type="search"
                placeholder="按标题搜索…"
                title="仅匹配题目标题，不包含正文"
                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
              />
            </div>
          </div>

          {/* ── 桌面端三栏布局（≥ sm） ── */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
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

            {/* 中：搜索框 */}
            <input
              suppressHydrationWarning
              type="search"
              placeholder="按标题搜索…"
              title="仅匹配题目标题，不包含正文"
              className="h-8 w-56 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-blue-400 focus:bg-white sm:w-72"
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
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
              {questions.map((qItem, i) => (
                <QuestionCard
                  key={qItem.id}
                  question={qItem}
                  index={(page - 1) * PAGE_SIZE + i + 1}
                  favorited={isFavorite(qItem.id)}
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
            onChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
