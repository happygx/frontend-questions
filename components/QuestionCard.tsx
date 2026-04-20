"use client";

import type { Question } from "@/types";
import { HeartFilled, HeartOutline } from "@/components/HeartIcon";
import LevelStars from "./LevelStars";

const CATEGORY_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-100 text-yellow-700",
  "React.js": "bg-cyan-100 text-cyan-700",
  "Vue.js": "bg-green-100 text-green-700",
  CSS: "bg-purple-100 text-purple-700",
  HTML: "bg-orange-100 text-orange-700",
  TypeScript: "bg-blue-100 text-blue-700",
  "Node.js": "bg-emerald-100 text-emerald-700",
  算法: "bg-red-100 text-red-700",
  leetcode: "bg-red-100 text-red-700",
  编程题: "bg-rose-100 text-rose-700",
};

function getBadgeClass(category: string) {
  return CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-600";
}

interface Props {
  question: Question;
  index: number;
  favorited: boolean;
  onFavoriteToggle: (id: string) => void;
  onClick: (q: Question) => void;
}

export default function QuestionCard({
  question,
  index,
  favorited,
  onFavoriteToggle,
  onClick,
}: Props) {
  const onFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(question.id);
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50/40 cursor-pointer border-b border-gray-100 transition-colors group"
      onClick={() => onClick(question)}
    >
      <span className="text-xs text-gray-400 pt-0.5 w-6 shrink-0 text-right">
        {index}
      </span>

      <span
        className={`text-xs px-2 py-0.5 rounded shrink-0 font-medium ${getBadgeClass(question.category)}`}
      >
        {question.category}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
          {question.title}
        </p>
      </div>

      <div className="shrink-0 pt-0.5">
        <LevelStars level={question.level} />
      </div>

      <button
        type="button"
        onClick={onFavClick}
        title={favorited ? "取消收藏" : "加入收藏"}
        aria-label={favorited ? "取消收藏" : "加入收藏"}
        aria-pressed={favorited}
        className={[
          "shrink-0 flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border transition-all duration-200",
          "active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 focus-visible:ring-offset-1 cursor-pointer",
          favorited
            ? "border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50/80 text-rose-600"
            : "border-gray-200/90 bg-white text-gray-400 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-500",
        ].join(" ")}
      >
        {favorited ? (
          <HeartFilled className="h-4 w-4 shrink-0" />
        ) : (
          <HeartOutline className="h-4 w-4 shrink-0" />
        )}
      </button>
    </div>
  );
}
