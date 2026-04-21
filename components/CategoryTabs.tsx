"use client";

import type { Category } from "@/types";

interface Props {
  categories: Category[];
  active: string;
  totalAll: number;
  onChange: (name: string) => void;
}

export default function CategoryTabs({ categories, active, totalAll, onChange }: Props) {
  const tabs = [
    { name: "all", count: totalAll, label: "全部" },
    ...categories.map((c) => ({ name: c.name, count: c.count, label: c.name })),
  ];

  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onChange(tab.name)}
          className={`shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
            active === tab.name
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
          <span
            className={`ml-1 text-xs ${active === tab.name ? "text-blue-100" : "text-gray-400"}`}
          >
            ({tab.count})
          </span>
        </button>
      ))}
    </div>
  );
}
