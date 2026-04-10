import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "live" | "upcoming" | "ended" | "secondary" | "outline";
}

function Badge({ className, variant = "secondary", ...props }: BadgeProps) {
  const variants = {
    live: "bg-live text-white shadow-lg shadow-live/20 animate-pulse border-none",
    upcoming: "bg-primary/20 text-primary border border-primary/30",
    ended: "bg-white/5 text-text-secondary border border-white/10",
    secondary: "bg-white/5 text-text-primary border border-white/10 backdrop-blur-sm",
    outline: "bg-transparent border border-white/10 text-text-secondary",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
