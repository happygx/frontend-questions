import type { DifficultyGroup } from "@/types";

const DIFFICULTY_SET = new Set<DifficultyGroup>([
  "all",
  "beginner",
  "intermediate",
  "advanced",
]);

export const QUESTIONS_LIST_RETURN_KEY = "questionsListHref";

export function parseListSearchParams(
  params: URLSearchParams,
): {
  category: string;
  difficulty: DifficultyGroup;
  q: string;
  page: number;
} {
  const category = params.get("category")?.trim() || "all";
  const rawDiff = params.get("difficulty")?.trim() || "all";
  const difficulty: DifficultyGroup = DIFFICULTY_SET.has(rawDiff as DifficultyGroup)
    ? (rawDiff as DifficultyGroup)
    : "all";
  const q = params.get("q")?.trim() ?? "";
  const rawPage = Number.parseInt(params.get("page") ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  return { category, difficulty, q, page };
}

/** 写入与当前列表 URL 一致的返回地址，供详情页「返回题库」使用 */
export function persistListReturnHref(pathname: string, params: URLSearchParams) {
  if (typeof window === "undefined") return;
  const qs = params.toString();
  const href = qs ? `${pathname}?${qs}` : pathname;
  try {
    sessionStorage.setItem(QUESTIONS_LIST_RETURN_KEY, href);
  } catch {
    /* ignore quota / private mode */
  }
}

export function buildListQueryString(state: {
  category: string;
  difficulty: DifficultyGroup;
  q: string;
  page: number;
}): string {
  const p = new URLSearchParams();
  if (state.category && state.category !== "all") p.set("category", state.category);
  if (state.difficulty && state.difficulty !== "all") p.set("difficulty", state.difficulty);
  if (state.q) p.set("q", state.q);
  if (state.page > 1) p.set("page", String(state.page));
  return p.toString();
}

export function listHrefFromState(
  pathname: string,
  state: { category: string; difficulty: DifficultyGroup; q: string; page: number },
) {
  const qs = buildListQueryString(state);
  return qs ? `${pathname}?${qs}` : pathname;
}
