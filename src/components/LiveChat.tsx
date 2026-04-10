"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Users, MessageSquare, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
  { id: "1", user: "AlexCoder", text: "This is insane! Can't wait for the reveal.", timestamp: new Date() },
  { id: "2", user: "SarahDesign", text: "The lighting in this stream is perfect.", timestamp: new Date() },
  { id: "3", user: "VickyHost", text: "Welcome everyone! We're starting in 5 minutes.", timestamp: new Date(), isHost: true },
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

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          user: RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)],
          text: RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev.slice(-50), newMessage]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <div className="flex flex-col h-full bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-sm uppercase tracking-wider">Live Chat</h3>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-live/10 border border-live/20">
           <Flame className="w-3 h-3 text-live" />
           <span className="text-[10px] font-bold text-live">TOP CHAT</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-bold",
                  msg.user === "You" ? "text-primary" : msg.isHost ? "text-secondary" : "text-text-secondary"
                )}>
                  {msg.user}
                </span>
                {msg.isHost && (
                  <span className="px-1.5 py-0.5 rounded-md bg-secondary/10 text-secondary text-[8px] font-bold uppercase border border-secondary/20">
                    Host
                  </span>
                )}
                <span className="text-[10px] text-white/20">
                   {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-text-primary/90 leading-relaxed bg-white/5 px-3 py-2 rounded-2xl rounded-tl-none border border-white/5 inline-block max-w-[90%]">
                {msg.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/5">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 bg-background/50 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50"
            disabled={!inputText.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-3 flex items-center justify-between px-1">
           <div className="flex items-center gap-4">
              <button className="text-text-secondary hover:text-text-primary transition-colors text-xs">😊</button>
              <button className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold">$ GIF</button>
           </div>
           <span className="text-[10px] text-text-secondary italic">Remaining: 200</span>
        </div>
      </div>
    </div>
  );
}
