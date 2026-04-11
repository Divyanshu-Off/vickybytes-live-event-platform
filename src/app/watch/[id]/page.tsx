"use client";

import React, { use } from "react";
import { Header } from "@/components/layout/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LiveChat } from "@/components/LiveChat";
import { EventDetails } from "@/components/EventDetails";
import { Badge } from "@/components/ui/Badge";
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
            <div className="relative w-full aspect-video bg-black shadow-2xl">
              <VideoPlayer 
                thumbnail={event.thumbnail} 
                isLive={event.status === 'live'} 
                viewerCount={event.viewerCount}
              />
            </div>
            
            <div className="px-4 md:px-12 py-8 md:py-16 max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <EventDetails event={event} />
              </motion.div>
              
              {/* Related Content Rail (Large Screens) */}
              <div className="mt-20 hidden xl:block">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black tracking-tight">Similar Streams</h3>
                    <Link href="/" className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline underline-offset-8 transition-all">Explore All</Link>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {recommendations.slice(0, 2).map(rec => (
                       <Link key={rec.id} href={`/watch/${rec.id}`} className="group space-y-4">
                          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-surface cursor-pointer">
                             <Image src={rec.thumbnail} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                                <Badge variant={rec.status} className="w-fit mb-3">{rec.status.toUpperCase()}</Badge>
                             </div>
                          </div>
                          <div className="px-2">
                             <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{rec.title}</h4>
                             <p className="text-sm text-text-secondary font-medium">{rec.host.name} • {rec.viewerCount?.toLocaleString()} watching</p>
                          </div>
                       </Link>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Interaction & Recommendations (Sidebar) */}
          <div className="w-full lg:w-[400px] xl:w-[450px] border-l border-white/5 bg-surface/30 flex flex-col min-h-[600px] lg:h-full">
             {/* Chat remains sticky if on large screens, or moves if mobile */}
             <div className="flex-1 min-h-[400px] lg:min-h-0">
                <LiveChat />
             </div>
             
             {/* Simple Sidebar Rail for Other viewports */}
             <div className="p-8 border-t border-white/5 bg-black/20">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary">Related Content</h3>
                </div>
                <div className="flex flex-col gap-6">
                   {recommendations.slice(0, 4).map((rec) => (
                     <Link key={rec.id} href={`/watch/${rec.id}`} className="group flex gap-5 items-start">
                        <div className="relative aspect-video w-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/5 shadow-xl">
                           <Image src={rec.thumbnail} alt={rec.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                           {rec.status === 'live' && (
                              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-live shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                           )}
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden min-w-0">
                           <h4 className="text-xs font-bold leading-tight line-clamp-2 text-text-primary group-hover:text-primary transition-colors">{rec.title}</h4>
                           <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{rec.host.name}</span>
                        </div>
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
