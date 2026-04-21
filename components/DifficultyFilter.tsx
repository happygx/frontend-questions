"use client";

import type { DifficultyGroup } from "@/types";

const TABS: { value: DifficultyGroup; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "beginner", label: "初级" },
  { value: "intermediate", label: "中级" },
  { value: "advanced", label: "高级" },
];

interface Props {
  active: DifficultyGroup;
  onChange: (v: DifficultyGroup) => void;
}

export default function DifficultyFilter({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 shrink-0 sm:text-sm">难度：</span>
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`min-h-[36px] px-3 py-1.5 rounded text-xs sm:text-sm transition-colors cursor-pointer ${
              active === t.value
                ? "bg-blue-50 text-blue-600 border border-blue-300 font-medium"
                : "text-gray-600 border border-gray-200 hover:border-gray-300 active:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
