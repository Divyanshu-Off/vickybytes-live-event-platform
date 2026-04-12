"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <BrandLogo size={32} />
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block leading-none">
                Vicky<span className="text-primary">Stream</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">Discover</Link>
            <Link href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Browse</Link>
            <Link href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Following</Link>
            <Link href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Schedules</Link>
          </nav>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for events, hosts, categories..."
              className="w-full bg-surface-elevated/50 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-surface-elevated transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-live rounded-full border-2 border-background" />
            </Button>
            <Button variant="secondary" size="md" className="hidden xl:flex">Go Live</Button>
          </div>
          
          <Button variant="action" size="md" className="hidden sm:flex">
            Login
          </Button>

          <button 
            className="lg:hidden p-2 text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          <div className="md:hidden">
             <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface-elevated border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
           <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-medium">Discover</Link>
              <Link href="#" className="text-lg font-medium text-text-secondary">Browse</Link>
              <Link href="#" className="text-lg font-medium text-text-secondary">Following</Link>
              <Link href="#" className="text-lg font-medium text-text-secondary">Schedules</Link>
           </nav>
           <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full">Sign In</Button>
              <Button variant="outline" className="w-full">Go Live</Button>
           </div>
        </div>
      )}
    </header>
  );
}
