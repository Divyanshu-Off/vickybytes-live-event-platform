"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { Search, Info, SlidersHorizontal, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function ListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24 flex flex-col gap-10">
          <div className="flex flex-col gap-6 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Experience Platform</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
            >
              Witness the <span className="text-gradient">Future</span> of <br className="hidden md:block" /> Digital Events.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl"
            >
              The most immersive live-streaming experience for tech enthusiasts, creators, and innovators. 
              Join thousands already watching.
            </motion.p>
          </div>

          {/* Search & Utility Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 w-full max-w-3xl"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search events, hosts, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-surface border border-white/5 rounded-2xl pl-14 pr-6 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-elevated transition-all placeholder:text-text-secondary/50"
              />
            </div>
            <button className="h-16 px-6 bg-surface-elevated border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95 group">
               <SlidersHorizontal className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
               <span className="font-bold text-sm tracking-wide">Filters</span>
            </button>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="mb-12">
          <FilterBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </section>

        {/* Event Grid */}
        <section className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {isLoading ? (
              <motion.div 
                key="loading"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-video rounded-[2rem]" />
                    <div className="flex gap-4 px-1">
                       <Skeleton className="w-10 h-10 rounded-2xl flex-shrink-0" />
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
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
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
