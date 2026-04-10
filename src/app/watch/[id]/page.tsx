"use client";

import React, { use } from "react";
import { Header } from "@/components/layout/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LiveChat } from "@/components/LiveChat";
import { EventDetails } from "@/components/EventDetails";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const event = MOCK_EVENTS.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const recommendations = MOCK_EVENTS.filter((e) => e.id !== id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 w-full mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Breadcrumbs / Back Navigation */}
        <div className="flex items-center gap-4 mb-8">
           <Link 
             href="/" 
             className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-elevated hover:bg-primary/20 text-text-secondary hover:text-primary transition-all group"
           >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           </Link>
           <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Link href="/" className="hover:text-primary transition-colors">Discover</Link>
              <ChevronRight className="w-4 h-4 opacity-30" />
              <span className="text-text-primary capitalize">{event.category}</span>
           </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <VideoPlayer 
                thumbnail={event.thumbnail} 
                isLive={event.status === 'live'} 
                viewerCount={event.viewerCount}
              />
            </motion.div>
            
            <EventDetails event={event} />
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-8 w-full lg:sticky lg:top-[100px]">
            {/* Live Chat Section */}
            <div className="h-[600px] lg:h-[700px] w-full">
              <LiveChat />
            </div>

            {/* UP NEXT Section */}
            <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-bold">More for you</h3>
                  <Link href="/" className="text-xs font-bold text-primary hover:underline underline-offset-4 tracking-wider uppercase">View All</Link>
               </div>
               <div className="flex flex-col gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={rec.id} className="group flex gap-4 p-2 rounded-2xl bg-surface/50 border border-white/5 hover:bg-surface-elevated hover:border-white/10 transition-all cursor-pointer">
                       <div className="relative aspect-video w-32 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={rec.thumbnail} alt={rec.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          {rec.status === 'live' && (
                             <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-live rounded-md text-[8px] font-black text-white uppercase">Live</div>
                          )}
                       </div>
                       <div className="flex flex-col gap-1 justify-center py-1 overflow-hidden">
                          <h4 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{rec.title}</h4>
                          <span className="text-[10px] text-text-secondary">{rec.host.name}</span>
                          <span className="text-[10px] text-text-secondary/50 font-medium">{rec.viewerCount ? `${rec.viewerCount.toLocaleString()} watching` : `Starts in 2h`}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-surface/50 mt-20">
        <div className="container mx-auto px-4 text-center">
           <p className="text-sm text-text-secondary">© 2026 VickyStream Platform. Design-driven Event Streaming.</p>
        </div>
      </footer>
    </div>
  );
}
