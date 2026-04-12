"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, PlayCircle, Play, Clock, TrendingUp, MoreVertical, Bookmark, Link2, PlusCircle } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Event } from "@/data/mockEvents";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Spotlight tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: shouldReduceMotion ? 1 : 0.98, filter: "blur(4px)" },
    show: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }
    }
  };

  const menuItems = [
    { label: isLiked ? "Saved to Profile" : "Save for Later", icon: Heart, active: isLiked, onClick: () => setIsLiked(!isLiked) },
    { label: "Add to Watchlist", icon: PlusCircle },
    { label: "Share with Friends", icon: Share2 },
    { label: "Copy Stream Link", icon: Link2 },
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="group relative flex flex-col gap-4"
    >
      {/* Media Section: 16:9 Thumbnail */}
      <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-surface-elevated border border-white/5 group-hover:border-white/10 transition-all duration-700 shadow-2xl">
        <Link href={`/watch/${event.id}`} className="block h-full overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
            transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
          </div>

          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)` }}
          />
          
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {event.status === 'live' && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-live/10 backdrop-blur-md border border-live/30 text-live shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-live"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] font-black tracking-[0.15em]">LIVE</span>
              </div>
            )}
          </div>

          {/* Live Chat Loop Preview (Only for LIVE events) */}
          {event.status === 'live' && (
             <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                <div className="flex flex-col gap-1.5 max-w-[80%]">
                   {[
                      { user: "Alex", text: "this is insane! 🔥" },
                      { user: "Sarah", text: "Loving the vibe right now" },
                      { user: "Mike", text: "Woooow" }
                   ].map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                           opacity: [0, 1, 1, 0],
                           y: [10, 0, -5, -10],
                        }}
                        transition={{ 
                           duration: 4, 
                           repeat: Infinity, 
                           delay: i * 1.2,
                           ease: "easeInOut"
                        }}
                        className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/5 w-fit"
                      >
                         <span className="text-[9px] font-bold text-primary">{msg.user}</span>
                         <span className="text-[9px] font-medium text-white/90 line-clamp-1">{msg.text}</span>
                      </motion.div>
                   ))}
                </div>
             </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl transition-all duration-500"
             >
                <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
             </motion.div>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex gap-4 px-1">
        <div className="flex-shrink-0 pt-1">
          <Link href={`/watch/${event.id}`} className="block relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500" />
            <div className="h-full w-full rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-all duration-700">
               <Image src={event.host.avatar} alt={event.host.name} fill className="object-cover" />
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <Link href={`/watch/${event.id}`} className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {event.title}
              </h3>
            </Link>
            
            <div className="relative" ref={menuRef}>
              <button 
                onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu); }}
                className={cn(
                  "p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-white/10 transition-all active:scale-90",
                  showMenu && "bg-white/10 text-white"
                )}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 bottom-full mb-3 w-48 bg-surface-elevated/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5"
                  >
                    {menuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.preventDefault(); item.onClick?.(); setShowMenu(false); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/5 group/item",
                          item.active ? "text-primary" : "text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <item.icon className={cn("w-3.5 h-3.5", item.active && "fill-current")} />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-2 flex flex-col gap-0.5">
            <span className="text-xs font-bold text-text-secondary hover:text-white transition-colors cursor-pointer w-fit">
              {event.host.name}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-text-secondary/50">
              <span className="uppercase tracking-wider">{event.category}</span>
              {event.status === 'live' && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                  <span>{(event.viewerCount || 0).toLocaleString()} watching</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
