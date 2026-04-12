"use client";

import React, { useState } from "react";
import { CATEGORIES } from "@/data/mockEvents";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Clock, Flame, ChevronDown, ListFilter } from "lucide-react";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  const [activeSort, setActiveSort] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const QUICK_FILTERS = [
    { label: "Trending", icon: TrendingUp },
    { label: "Newest", icon: Clock },
    { label: "Live Now", icon: Flame },
    { label: "Recommended", icon: Sparkles },
  ];

  const SORT_OPTIONS = ["Recommended", "Most Viewed", "Soonest", "Top Rated"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar tap-highlight-none">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-elevated/40 border border-white/5 text-[11px] font-bold text-text-secondary hover:text-text-primary hover:border-white/10 hover:bg-surface-elevated active:scale-95 transition-all whitespace-nowrap group focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
            >
              <filter.icon className="w-3.5 h-3.5 text-text-secondary group-hover:text-primary transition-colors" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface/40 border border-white/5 text-[11px] font-bold text-text-primary hover:border-primary/40 transition-all active:scale-95 group focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
          >
            <ListFilter className="w-3.5 h-3.5 text-primary" />
            <span className="text-text-secondary font-medium">Sort:</span>
            <span>{activeSort}</span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-text-secondary transition-transform duration-300", isSortOpen && "rotate-180")} />
          </button>

          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
              <div className="absolute right-0 mt-2 w-40 bg-surface-elevated border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-[11px] font-bold transition-colors hover:bg-white/5",
                      activeSort === option ? "text-primary" : "text-text-primary"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.12em] transition-all duration-300 border active:scale-90 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none",
              activeCategory === category
                ? "bg-primary text-white border-primary shadow-[0_8px_20px_rgba(124,58,237,0.25)] scale-105"
                : "bg-surface/30 text-text-secondary hover:text-text-primary hover:bg-surface-elevated border-white/5 hover:border-white/10"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

