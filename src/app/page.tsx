"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return MOCK_EVENTS;
    return MOCK_EVENTS.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-surface to-[#0B1020] border border-white/5 p-8 md:p-16"
          >
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Live Experience
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Universe of <span className="text-gradient-primary">Live Events</span> at your fingertips.
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Join thousands of others in real-time. From global tech summits to intimate acoustic sets, experience the extraordinary from anywhere.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Filters and Search Strip */}
        <section className="mb-10">
          <FilterBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </section>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-display font-bold">
              {activeCategory === "All" ? "Trending Now" : `${activeCategory} Events`}
              <span className="ml-3 text-sm font-normal text-text-secondary">({filteredEvents.length} results)</span>
            </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-elevated flex items-center justify-center mb-6">
               <Sparkles className="w-10 h-10 text-text-secondary opacity-50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-text-secondary">Try selecting a different category or adjusting your filters.</p>
          </div>
        )}
      </main>

      {/* Footer Placeholder for visual balance */}
      <footer className="border-t border-white/5 py-12 bg-surface/50">
        <div className="container mx-auto px-4 text-center">
           <p className="text-sm text-text-secondary">© 2026 VickyStream Platform. Internship Assignment Frontend.</p>
        </div>
      </footer>
    </div>
  );
}
