"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Flame, Info, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isHost?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: "1", user: "AlexCoder", text: "This is insane! Can't wait for the reveal.", timestamp: new Date("2024-01-01T12:00:00Z") },
  { id: "2", user: "SarahDesign", text: "The lighting in this stream is perfect.", timestamp: new Date("2024-01-01T12:01:00Z") },
  { id: "3", user: "VickyHost", text: "Welcome everyone! We're starting in 5 minutes.", timestamp: new Date("2024-01-01T12:02:00Z"), isHost: true },
];

const RANDOM_NAMES = ["TechFan", "GamerPro", "MusicLover", "NextJS_Guru", "TailwindKing", "ShadowWarrior", "PixelPerfect"];
const RANDOM_MESSAGES = [
  "LFG! 🚀",
  "Anyone else getting lagg?",
  "NVM, fixed it. 1080p looks crisp.",
  "Which camera are they using?",
  "Love the energy here!",
  "Can someone link the repo?",
  "This is better than last year's event.",
  "Wooooo!! ✨",
  "Is Roger Deakins actually there?",
];

type TabType = "chat" | "info" | "schedule";

export function LiveChat() {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate incoming messages
  useEffect(() => {
    if (activeTab !== "chat") return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newMessage: Message = {
          id: Math.random().toString(36).substring(2, 9),
          user: RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)],
          text: RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev.slice(-50), newMessage]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current && activeTab === "chat") {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "You",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const TABS = [
    { id: "chat", label: "Live Chat", icon: MessageSquare },
    { id: "info", label: "Info", icon: Info },
    { id: "schedule", label: "Schedule", icon: Calendar },
  ];

  return (
    <div className="flex flex-col h-full bg-surface/20 lg:bg-transparent backdrop-blur-xl border-t lg:border-t-0 border-white/5 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-white/5 bg-background/50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
              activeTab === tab.id ? "text-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-surface-elevated flex items-center justify-center border border-white/5">
                          <Users className="w-3 h-3 text-text-secondary" />
                       </div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-wider",
                        msg.user === "You" ? "text-primary" : msg.isHost ? "text-secondary" : "text-text-secondary"
                      )}>
                        {msg.user}
                      </span>
                      <span className="text-[10px] text-white/20 font-medium" suppressHydrationWarning>
                         {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary/90 leading-relaxed pl-8">
                      {msg.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 bg-background/50 border-t border-white/5">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Say something..."
                    className="flex-1 bg-surface-elevated border border-white/10 rounded-2xl py-3.5 pl-5 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-text-secondary/40"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-30 disabled:grayscale"
                    disabled={!inputText.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="mt-3 flex items-center justify-between px-1">
                   <div className="flex items-center gap-4">
                      <button className="text-text-secondary hover:text-text-primary transition-colors text-xs filter grayscale hover:grayscale-0">😊</button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors text-[10px] font-black tracking-widest">$ GIF</button>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
                      <span className="text-[10px] font-black text-live uppercase tracking-widest italic">Live Now</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === "info" ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-6"
            >
              <div className="flex flex-col gap-2">
                 <h4 className="text-sm font-black uppercase tracking-widest text-primary">About this stream</h4>
                 <p className="text-sm text-text-secondary leading-relaxed">
                   Join world-renowned experts for a deep dive into the next generation of creative technology. This event features exclusive previews, live Q&A sessions, and interactive workshops.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-bold text-text-secondary uppercase">Level</span>
                    <p className="text-sm font-bold">Advanced</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-bold text-text-secondary uppercase">Language</span>
                    <p className="text-sm font-bold">English (US)</p>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-4"
            >
               {[
                 { time: "10:00 AM", title: "Opening Keynote" },
                 { time: "11:30 AM", title: "Product Deep Dive" },
                 { time: "1:00 PM", title: "Community Lunch" },
                 { time: "2:30 PM", title: "Technical Workshop" },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                    <span className="text-xs font-black text-primary whitespace-nowrap">{item.time}</span>
                    <span className="text-xs font-bold text-text-primary">{item.title}</span>
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

