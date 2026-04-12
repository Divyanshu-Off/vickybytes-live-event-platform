"use client";

import React, { use } from "react";
import { Header } from "@/components/layout/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LiveChat } from "@/components/LiveChat";
import { EventDetails } from "@/components/EventDetails";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EventCard } from "@/components/EventCard";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const event = MOCK_EVENTS.find((e) => e.id === id);
  const [isChatVisible, setIsChatVisible] = React.useState(true);

  if (!event) {
    notFound();
  }

  const recommendations = MOCK_EVENTS.filter((e) => e.id !== id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30 selection:text-text-primary">
      <Header />

      <main className="flex-1 w-full mx-auto max-w-[1700px]">
        {/* Navigation Area */}
        <div className="px-4 md:px-8 pt-8 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link 
                 href="/" 
                 className="flex items-center justify-center w-12 h-12 rounded-2xl bg-surface-elevated hover:bg-primary/20 text-text-secondary hover:text-primary transition-all group border border-white/5 active:scale-90"
               >
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
               </Link>
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-secondary tracking-widest uppercase">
                     <span>Discover</span>
                     <ChevronRight className="w-3 h-3 text-white/20" />
                     <span className="text-primary">{event.category}</span>
                  </div>
                  <h2 className="text-sm font-bold text-text-primary line-clamp-1 hidden md:block">{event.title}</h2>
               </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-elevated overflow-hidden">
                        <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="" width={32} height={32} />
                     </div>
                  ))}
               </div>
               <span className="text-xs font-bold text-text-secondary tracking-tight">+3,412 watching now</span>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
          {/* Video & Info Section (Main) */}
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-video bg-black shadow-2xl overflow-hidden"
            >
              <VideoPlayer 
                thumbnail={event.thumbnail} 
                isLive={event.status === 'live'} 
                viewerCount={event.viewerCount}
              />
            </motion.div>
            
            <div className="px-4 md:px-12 py-8 md:py-16 max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <EventDetails event={event} />
              </motion.div>
              
              {/* Related Content Rail (Large Screens) */}
              <div className="mt-20 hidden xl:block">
                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="flex items-center justify-between mb-10"
                 >
                    <h3 className="text-2xl font-black tracking-tight">Similar Streams</h3>
                    <Link href="/" className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline underline-offset-8 transition-all">Explore All</Link>
                 </motion.div>
                 <div className="grid grid-cols-2 gap-6">
                    {recommendations.slice(0, 2).map((rec, idx) => (
                       <EventCard key={rec.id} event={rec} index={idx} />
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Interaction & Recommendations (Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-[400px] xl:w-[450px] border-l border-white/5 bg-surface/30 flex flex-col lg:h-[calc(100vh-140px)] sticky top-[140px]"
          >
             {/* Chat container - Collapsible and independently scrollable */}
             <div className={cn(
                "transition-all duration-500 ease-[0.22,1,0.36,1] flex flex-col overflow-hidden border-b border-white/5",
                isChatVisible ? "flex-[1.5] min-h-[400px]" : "h-14 min-h-[56px]"
             )}>
                <div className="flex items-center justify-between px-6 py-4 bg-background/50 border-b border-white/5 flex-shrink-0">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-live animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Interaction</span>
                   </div>
                   <button 
                    onClick={() => setIsChatVisible(!isChatVisible)}
                    className="text-[10px] font-bold text-primary hover:text-white transition-colors"
                   >
                    {isChatVisible ? "HIDE CHAT" : "SHOW CHAT"}
                   </button>
                </div>
                <div className={cn("flex-1 overflow-hidden", !isChatVisible && "hidden")}>
                   <LiveChat />
                </div>
             </div>
             
             {/* Recommendations container - Independent scroll rail */}
             <div className="flex-1 p-6 md:p-8 bg-black/20 overflow-y-auto no-scrollbar scroll-smooth">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary">Up Next</h3>
                </div>
                <div className="flex flex-col gap-8">
                   {recommendations.slice(0, 4).map((rec, idx) => (
                      <EventCard key={rec.id} event={rec} index={idx} />
                   ))}
                </div>
             </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
