"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Users, Calendar, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Event } from "@/data/mockEvents";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col gap-4 rounded-3xl p-3 bg-surface border border-white/5 hover:bg-surface-elevated hover:border-white/10 transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={event.status}>{event.status === 'live' ? 'LIVE' : 'UPCOMING'}</Badge>
          <Badge variant="secondary" className="backdrop-blur-md">{event.category}</Badge>
        </div>

        {/* Action Buttons (Floating) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           <button 
             onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
             className={cn(
               "p-2.5 rounded-xl backdrop-blur-md transition-all",
               isLiked ? "bg-live text-white" : "bg-black/40 text-white hover:bg-black/60"
             )}
           >
             <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
           </button>
           <button className="p-2.5 rounded-xl bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-all">
             <Share2 className="w-4 h-4" />
           </button>
        </div>

        {/* Play Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-500">
              <PlayCircle className="w-10 h-10 text-white fill-current" />
           </div>
        </div>

        {/* Viewer count / Time overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 text-white">
           {event.status === 'live' ? (
             <div className="flex items-center gap-1.5 text-xs font-medium">
               <Users className="w-3.5 h-3.5" />
               {event.viewerCount?.toLocaleString()} watching
             </div>
           ) : (
             <div className="flex items-center gap-1.5 text-xs font-medium">
               <Calendar className="w-3.5 h-3.5" />
               {new Date(event.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
             </div>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-1 pb-1">
        <Link href={`/watch/${event.id}`} className="group/title">
          <h3 className="font-display text-lg font-bold leading-snug line-clamp-2 group-hover/title:text-primary transition-colors">
            {event.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <Image src={event.host.avatar || ''} alt={event.host.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-text-primary">{event.host.name}</span>
            <span className="text-[10px] text-text-secondary">{event.host.role}</span>
          </div>
          
          <Link href={`/watch/${event.id}`} className="ml-auto">
             <Button variant="ghost" size="sm" className="group/btn gap-2 py-0 h-8 hover:bg-transparent">
                <span className="group-hover/btn:text-primary transition-colors">View Event</span>
                <PlayCircle className="w-4 h-4 text-text-secondary group-hover/btn:text-primary group-hover/btn:scale-110 transition-all" />
             </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
