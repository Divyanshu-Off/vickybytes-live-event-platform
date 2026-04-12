"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className, size = 40 }: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Path for "V" state (tip pointing down)
  const vPath = "M 20 30 L 50 70 L 80 30";
  
  // Path for "Play Button" state (tip pointing down, will rotate to point RIGHT)
  const playPath = "M 30 30 L 70 30 L 50 70";

  return (
    <div 
      className={cn("relative cursor-pointer transition-opacity active:opacity-80 flex-shrink-0 flex items-center justify-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        <motion.g
          animate={{
            rotate: isHovered ? -90 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ 
            originX: "50%", 
            originY: "50%",
            transformOrigin: "center" 
          }}
        >
          <motion.path
            d={isHovered ? playPath : vPath}
            animate={{
              d: isHovered ? playPath : vPath,
              strokeWidth: isHovered ? 14 : 11,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            stroke="url(#logoGradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isHovered ? "url(#logoGradient)" : "none"}
            style={{ 
              filter: isHovered ? "url(#logoGlow)" : "none",
              transition: "fill 0.4s ease-out"
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
