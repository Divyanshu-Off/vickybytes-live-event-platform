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
  const [volume] = useState(80);

  return (
    <div className="relative w-full h-full bg-black group/player cursor-pointer overflow-hidden lg:rounded-b-[2.5rem]">
      {/* Thumbnail / Video Placeholder */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-all duration-1000",
          isPlaying ? "scale-105 opacity-40 blur-sm" : "scale-100 opacity-100 group-hover/player:scale-105"
        )}
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent opacity-60 group-hover/player:opacity-100 transition-opacity" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover/player:opacity-100 transition-opacity" />

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 opacity-0 group-hover/player:opacity-100 translate-y-[-10px] group-hover/player:translate-y-0 transition-all duration-500">
         <div className="flex items-center gap-4">
            {isLive ? (
              <Badge variant="live" className="shadow-lg h-7 px-4">LIVE</Badge>
            ) : (
              <Badge variant="upcoming" className="h-7 px-4">PREMIERE</Badge>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black tracking-widest text-white uppercase">
               <Users className="w-3 h-3 text-primary" />
               {viewerCount?.toLocaleString() || '1.2k'}
            </div>
         </div>
         
         <div className="flex items-center gap-3">
             <button className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                <Settings className="w-4 h-4" />
             </button>
             <button className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                <Heart className="w-4 h-4" />
             </button>
         </div>
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <button 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center z-20 group/play"
        >
          <div className="w-24 h-24 bg-primary/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-primary/30 transform group-hover/play:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <Play className="w-10 h-10 text-white fill-current translate-x-1" />
          </div>
        </button>
      )}

      {/* Bottom Controls Shell */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-4 z-10 opacity-0 group-hover/player:opacity-100 translate-y-[20px] group-hover/player:translate-y-0 transition-all duration-500">
         {/* Custom Progress Bar (Simulation) */}
         <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden group/bar cursor-pointer">
            <div className="absolute left-0 top-0 h-full w-2/3 bg-primary rounded-full relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover/bar:scale-100 transition-transform shadow-xl" />
            </div>
         </div>

         <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="text-white hover:text-primary transition-colors transform active:scale-90"
               >
                 {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
               </button>
               
               <button className="text-white hover:text-primary transition-colors">
                  <SkipForward className="w-5 h-5 fill-current" />
               </button>

               <div className="flex items-center gap-3 group/volume">
                  <button className="text-white">
                     <Volume2 className="w-5 h-5" />
                  </button>
                  <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-white transition-all" 
                       style={{ width: `${volume}%` }} 
                     />
                  </div>
               </div>

               <div className="text-xs font-bold text-white tracking-widest tabular-nums">
                  {isLive ? '01:24:50' : '00:00 / 45:00'}
                  <span className="mx-2 text-white/40">|</span>
                  <span className="text-primary">1080p60</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-2 text-white/60 hover:text-white transition-colors">
                  <span className="text-[10px] font-black tracking-widest uppercase border border-white/20 rounded px-1.5 py-0.5">CC</span>
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

