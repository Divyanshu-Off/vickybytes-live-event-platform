"use client";

import React, { useState } from "react";
import { Play, Pause, Volume2, Settings, Maximize, SkipForward, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface VideoPlayerProps {
  thumbnail: string;
  isLive?: boolean;
  viewerCount?: number;
}

export function VideoPlayer({ thumbnail, isLive, viewerCount }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <div 
      className="relative aspect-video w-full bg-black rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Placeholder Content */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-transform duration-1000",
          isPlaying ? "scale-105 opacity-40 blur-sm" : "scale-100 opacity-100"
        )}
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            onClick={() => setIsPlaying(true)}
            className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <Play className="w-10 h-10 fill-current translate-x-1" />
          </button>
        </div>
      )}

      {/* Live Indicator Overlay */}
      {isLive && (
        <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
          <Badge variant="live" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border-none shadow-xl shadow-live/20">
             Live
          </Badge>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-xl">
            <Users className="w-3.5 h-3.5 text-text-secondary" />
            {viewerCount?.toLocaleString()}
          </div>
        </div>
      )}

      {/* Quality Badge */}
      <div className="absolute top-6 right-6 z-20">
         <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black text-white/50 tracking-tighter uppercase">
            Ultra HD 4K
         </div>
      </div>

      {/* Interaction Prompts */}
      <div className="absolute bottom-24 right-6 z-20 flex flex-col gap-3">
         <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-live transition-all group/heart scale-0 group-hover:scale-100 delay-100 duration-300">
            <Heart className="w-5 h-5 group-hover/heart:fill-current" />
         </button>
         <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all scale-0 group-hover:scale-100 delay-200 duration-300">
            <Users className="w-5 h-5" />
         </button>
      </div>

      {/* Controls Overlay */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 z-20",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 relative group/progress cursor-pointer">
           <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-lg border-2 border-primary" />
           </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
              {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
            </button>
            <button className="text-white hover:text-primary transition-colors">
              <SkipForward />
            </button>
            <div className="flex items-center gap-3 group/vol cursor-pointer">
               <Volume2 className="text-white group-hover/vol:text-primary transition-colors" />
               <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white group-hover/vol:bg-primary transition-colors" />
               </div>
            </div>
            <span className="text-sm font-medium text-white/70 tabular-nums">00:34 / 2:30:00</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-primary transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
