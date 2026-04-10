"use client";

import React from "react";
import Image from "next/image";
import { Heart, Share2, Info, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Event } from "@/data/mockEvents";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Title and Primary Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
             <Badge variant={event.status} className="uppercase font-bold tracking-widest">{event.status}</Badge>
             <span className="text-sm font-medium text-text-secondary">{event.category} • {event.duration} </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight">{event.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex-1 lg:flex-none gap-2 px-6">
            <Heart className="w-4 h-4" />
            <span>8.4k Likes</span>
          </Button>
          <Button variant="secondary" className="flex-1 lg:flex-none gap-2 px-6">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
          <Button variant="action" className="flex-1 lg:flex-none px-8 font-bold">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Host / Speaker Strip */}
      <div className="p-6 rounded-3xl bg-surface border border-white/5 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 p-0.5">
             <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                <Image src={event.host.avatar} alt={event.host.name} fill className="object-cover" />
             </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-display font-bold text-lg leading-tight">{event.host.name}</h4>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
               <span>{event.host.role}</span>
               <span className="w-1 h-1 rounded-full bg-white/20" />
               <span className="text-primary font-semibold">Verified Host</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block h-10 w-px bg-white/5 mx-4" />
        
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary">
                 <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Date</span>
                 <span className="text-sm font-semibold">{new Date(event.scheduledAt).toLocaleDateString()}</span>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary">
                 <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Time</span>
                 <span className="text-sm font-semibold">{new Date(event.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
           </div>
           <div className="hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary">
                 <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Location</span>
                 <span className="text-sm font-semibold">Starbase, TX (Live)</span>
              </div>
           </div>
        </div>
      </div>

      {/* Description / Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8 border-b border-white/5">
           <button className="px-1 py-3 border-b-2 border-primary text-sm font-bold tracking-wide">About Event</button>
           <button className="px-1 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Schedule</button>
           <button className="px-1 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Resources</button>
           <button className="px-1 py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors">Q&A</button>
        </div>
        
        <div className="relative group">
           <p className="text-text-secondary leading-relaxed text-lg max-w-4xl">
             {event.description}
           </p>
           <div className="mt-6 flex flex-wrap gap-2">
             {event.tags.map(tag => (
               <Badge key={tag} variant="secondary" className="px-4 py-1.5 text-xs font-medium bg-white/5 group-hover:bg-white/10 transition-colors">#{tag}</Badge>
             ))}
           </div>
        </div>
      </div>

      {/* Live Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Viewers", val: event.viewerCount?.toLocaleString() || "0", color: "text-primary" },
           { label: "Likes", val: event.likes.toLocaleString(), color: "text-live" },
           { label: "Comments", val: "1.2k", color: "text-secondary" },
           { label: "Shares", val: "340", color: "text-text-primary" },
         ].map(stat => (
           <div key={stat.label} className="p-4 rounded-2xl bg-surface border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">{stat.label}</span>
              <span className={cn("text-xl font-display font-black", stat.color)}>{stat.val}</span>
           </div>
         ))}
      </div>
    </div>
  );
}
