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
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-500 shrink-0">难度：</span>
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`px-3 py-1 rounded text-sm transition-colors cursor-pointer ${
              active === t.value
                ? "bg-blue-50 text-blue-600 border border-blue-300 font-medium"
                : "text-gray-600 border border-gray-200 hover:border-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
