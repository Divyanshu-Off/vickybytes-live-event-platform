"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, PlayCircle, Calendar, Users, Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Event } from "@/data/mockEvents";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1]
          }
        }
      }}
      className="flex flex-col gap-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Section: 16:9 Thumbnail */}
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-surface-elevated border border-white/5 group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
        <Link href={`/watch/${event.id}`} className="block h-full">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Badge variant={event.status} className="shadow-lg px-2.5 py-1">
               <div className="flex items-center gap-1.5">
                  {event.status === 'live' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  <span className="text-[10px] font-black tracking-widest">{event.status === 'live' ? 'LIVE' : 'UPCOMING'}</span>
               </div>
            </Badge>
          </div>

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
             <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 flex items-center justify-center shadow-2xl">
                <Play className="w-6 h-6 text-white fill-current ml-1" />
             </div>
          </div>

          {/* View Count Overlay */}
          <div className="absolute bottom-4 right-4 z-10" suppressHydrationWarning>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-black text-white">
                {event.status === 'live' ? (
                  <>
                    <Users className="w-3.5 h-3.5 text-primary" />
                    {event.viewerCount?.toLocaleString()}
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {new Date(event.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </>
                )}
             </div>
          </div>
        </Link>
      </div>

      {/* Content Section: Metadata Below Image */}
      <div className="flex gap-4 px-1">
        {/* Host Avatar */}
        <div className="flex-shrink-0">
          <Link href={`/watch/${event.id}`} className="relative block w-11 h-11 rounded-2xl overflow-hidden border border-white/10 bg-surface-elevated group-hover:border-primary/50 transition-colors">
            <Image src={event.host.avatar} alt={event.host.name} fill className="object-cover" />
          </Link>
        </div>

        {/* Text Details */}
        <div className="flex-1 flex flex-col min-w-0 pr-2">
            <Link href={`/watch/${event.id}`}>
              <h3 className="text-base md:text-lg font-bold text-text-primary leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
            </Link>
            
            <div className="mt-2 flex flex-col text-sm">
               <span className="font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                 {event.host.name}
               </span>
               <div className="flex items-center gap-2 text-text-secondary/60 mt-0.5">
                  <span className="hover:text-primary transition-colors cursor-pointer font-medium">{event.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{event.status === 'live' ? 'Streaming now' : 'Premiere soon'}</span>
               </div>
            </div>

            {/* Micro Actions Container */}
            <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
               <button 
                 onClick={() => setIsLiked(!isLiked)}
                 className={cn(
                   "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all active:scale-90",
                   isLiked ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/5 text-text-secondary hover:bg-white/10"
                 )}
               >
                 <Heart className={cn("w-3.5 h-3.5", isLiked && "fill-current")} />
                 <span className="text-[10px] font-black uppercase tracking-wider">{isLiked ? 'Liked' : 'Like'}</span>
               </button>
               
               <button 
                 className="p-2 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:bg-white/10 transition-all active:scale-90"
                 onClick={() => {}}
               >
                 <Share2 className="w-3.5 h-3.5" />
               </button>

               <div className="ml-auto">
                  <Link href={`/watch/${event.id}`}>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all active:scale-95 group/btn">
                       <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          Watch
                          <PlayCircle className="w-3.5 h-3.5" />
                       </span>
                    </button>
                  </Link>
               </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
