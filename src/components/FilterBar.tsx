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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 no-scrollbar tap-highlight-none">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter.label}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-surface-elevated/50 border border-white/5 text-sm font-bold text-text-secondary hover:text-text-primary hover:border-white/10 hover:bg-surface-elevated active:scale-95 transition-all whitespace-nowrap group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <filter.icon className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-surface border border-white/10 text-sm font-bold text-text-primary hover:border-primary/50 transition-all active:scale-95 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <ListFilter className="w-4 h-4 text-primary" />
            <span className="text-text-secondary font-medium">Sort by:</span>
            <span>{activeSort}</span>
            <ChevronDown className={cn("w-4 h-4 text-text-secondary transition-transform duration-300", isSortOpen && "rotate-180")} />
          </button>

          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
              <div className="absolute right-0 mt-3 w-48 bg-surface-elevated border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-5 py-2.5 text-sm font-bold transition-colors hover:bg-white/5",
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
      <div className="flex flex-wrap items-center gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
              activeCategory === category
                ? "bg-primary text-white border-primary shadow-[0_10px_30px_rgba(124,58,237,0.3)] scale-105"
                : "bg-surface/50 text-text-secondary hover:text-text-primary hover:bg-surface-elevated border-white/5 hover:border-white/10"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

