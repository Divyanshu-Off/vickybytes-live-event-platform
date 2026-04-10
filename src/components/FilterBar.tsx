"use client";

import React from "react";
import { CATEGORIES } from "@/data/mockEvents";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Clock, Flame } from "lucide-react";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  const QUICK_FILTERS = [
    { label: "Trending", icon: TrendingUp },
    { label: "Newest", icon: Clock },
    { label: "Live Now", icon: Flame },
    { label: "Recommended", icon: Sparkles },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter.label}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-elevated border border-white/5 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-white/10 transition-all whitespace-nowrap group"
          >
            <filter.icon className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-surface text-text-secondary hover:bg-surface-elevated border border-white/5"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
