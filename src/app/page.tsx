"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { Search, Info, SlidersHorizontal, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const QUOTES = [
    { prefix: "Witness the", highlight: "Future", suffix: "of Digital Events." },
    { prefix: "Experience the", highlight: "Moment", suffix: "in Real-Time." },
    { prefix: "Join the", highlight: "Revolution", suffix: "of Live Content." },
    { prefix: "Unlock the", highlight: "Premium", suffix: "Streaming Era." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Simulate initial load for skeletons
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const matchesCategory = activeCategory === "All" || event.category === activeCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.host.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleReset = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-text-primary">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-10 flex flex-col items-start text-left">
          <div className="flex items-center overflow-hidden min-h-[160px] md:min-h-[220px] py-4">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={quoteIndex}
                className="font-display text-4xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-6xl flex flex-wrap gap-x-[0.2em] gap-y-1 select-none cursor-default"
                style={{ perspective: "1000px" }}
              >
                {[
                  ...QUOTES[quoteIndex].prefix.split(" "),
                  QUOTES[quoteIndex].highlight,
                  ...QUOTES[quoteIndex].suffix.split(" ")
                ].map((word, wordIdx, array) => {
                  // Calculate cumulative character index for highlighting
                  const isHighlight = word === QUOTES[quoteIndex].highlight;
                  
                  return (
                    <span key={wordIdx} className="inline-flex whitespace-nowrap">
                      {word.split("").map((char, charIdx) => (
                        <motion.span
                          key={charIdx}
                          initial={{ opacity: 0, rotateX: -90, y: 20 }}
                          animate={{ opacity: 1, rotateX: 0, y: 0 }}
                          exit={{ opacity: 0, rotateX: 90, y: -20 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: (wordIdx * 0.1) + (charIdx * 0.02),
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className={cn(
                            "inline-block",
                            isHighlight ? "text-gradient" : ""
                          )}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-2 w-full max-w-3xl"
          >
            <FilterBar 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </motion.div>
        </section>

        {/* Event Grid */}
        <section className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-16"
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <Skeleton className="aspect-video rounded-[2rem]" />
                    <div className="flex gap-4 px-1">
                       <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                       <div className="flex-1 space-y-3">
                          <Skeleton className="h-5 w-full rounded-lg" />
                          <Skeleton className="h-4 w-2/3 rounded-lg" />
                       </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : filteredEvents.length > 0 ? (
              <motion.div 
                key="grid"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-16"
              >
                {filteredEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    index={index} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-surface-elevated flex items-center justify-center mb-8 border border-white/5">
                   <Info className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No events match your criteria</h3>
                <p className="text-text-secondary max-w-sm mb-10 leading-relaxed">
                  We couldn&apos;t find anything matching &quot;{searchQuery || activeCategory}&quot;. Try adjusting your search or filters.
                </p>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20"
                >
                   <RefreshCw className="w-5 h-5" />
                   Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-surface/50 mt-20">
        <div className="container mx-auto px-4 text-center">
           <p className="text-sm text-text-secondary">© 2026 VickyStream Platform. Design-driven Event Streaming.</p>
        </div>
      </footer>
    </div>
  );
}
