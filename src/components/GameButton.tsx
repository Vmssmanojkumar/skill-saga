import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "locked";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const variants = {
  primary: "bg-gradient-to-br from-primary to-accent text-primary-foreground border-primary/50 hover:border-primary",
  secondary: "bg-secondary text-secondary-foreground border-border hover:border-primary/50",
  success: "bg-gradient-to-br from-success to-success/80 text-success-foreground border-success/50",
  locked: "bg-locked text-locked-foreground border-locked cursor-not-allowed opacity-60",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "primary", size = "md", glow = true, children, disabled, ...props }, ref) => {
    const isLocked = variant === "locked" || disabled;

    return (
      <button
        ref={ref}
        disabled={isLocked}
        className={cn(
          "relative font-display font-bold border-2 transition-all duration-300 transform",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          variants[variant],
          sizes[size],
          glow && !isLocked && "game-button",
          !isLocked && "hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100",
          className
        )}
        {...props}
      >
        {/* Inner glow effect */}
        {!isLocked && (
          <span className="absolute inset-0 rounded-inherit bg-gradient-to-t from-transparent to-white/10 pointer-events-none" />
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

GameButton.displayName = "GameButton";

export default GameButton;
