import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "action";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-[0.98]",
      secondary: "bg-surface-elevated text-text-primary hover:bg-white/10 active:scale-[0.98]",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
      outline: "bg-transparent border border-white/10 text-text-primary hover:bg-white/5",
      action: "bg-white text-black hover:bg-white/90 shadow-xl active:scale-[0.96]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg",
      md: "h-10 px-5 text-sm font-medium rounded-xl",
      lg: "h-12 px-8 text-base font-semibold rounded-2xl",
      icon: "h-10 w-10 flex items-center justify-center rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
