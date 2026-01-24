import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type BabaiExpression = "happy" | "thinking" | "proud" | "warning" | "excited" | "waving" | "looking-up";

interface BabaiProps {
  expression?: BabaiExpression;
  message?: string;
  showBubble?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const expressionEmojis: Record<BabaiExpression, { eyes: string; mouth: string; extra?: string; lookUp?: boolean }> = {
  happy: { eyes: "◡", mouth: "◡", extra: "" },
  thinking: { eyes: "◔", mouth: "∼", extra: "🤔" },
  proud: { eyes: "◠", mouth: "▽", extra: "⭐" },
  warning: { eyes: "◉", mouth: "△", extra: "⚠️" },
  excited: { eyes: "★", mouth: "▽", extra: "✨" },
  waving: { eyes: "◡", mouth: "◡", extra: "👋" },
  "looking-up": { eyes: "◠", mouth: "◡", extra: "💭", lookUp: true },
};

const sizeClasses = {
  sm: "w-16 h-20",
  md: "w-24 h-28",
  lg: "w-32 h-40",
  xl: "w-48 h-56",
};

export function Babai({ 
  expression = "happy", 
  message, 
  showBubble = true, 
  size = "lg",
  className,
  animate = true 
}: BabaiProps) {
  const [currentExpression, setCurrentExpression] = useState(expression);
  const expr = expressionEmojis[currentExpression];

  useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Speech Bubble */}
      {showBubble && message && (
        <div className="speech-bubble max-w-xs text-center animate-fade-in">
          <p className="text-foreground font-game font-semibold text-sm md:text-base">
            {message}
          </p>
        </div>
      )}

      {/* Babai Character */}
      <div 
        className={cn(
          "relative flex flex-col items-center",
          sizeClasses[size],
          animate && "animate-float"
        )}
      >
        {/* Extra expression indicator */}
        {expr.extra && !expr.lookUp && (
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce-gentle">
            {expr.extra}
          </span>
        )}

        {/* Head */}
        <div 
          className="relative transition-transform duration-300"
          style={{
            transform: expr.lookUp ? "rotate(-10deg) translateY(-5px)" : "none",
          }}
        >
          {/* Lungi/Dhoti style headwrap */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[90%] h-3 bg-primary rounded-t-full" />
          
          {/* Face */}
          <div 
            className="rounded-full flex flex-col items-center justify-center border-4 border-primary/30"
            style={{
              width: size === "xl" ? "100px" : size === "lg" ? "70px" : size === "md" ? "50px" : "35px",
              height: size === "xl" ? "100px" : size === "lg" ? "70px" : size === "md" ? "50px" : "35px",
              background: "linear-gradient(145deg, hsl(30 60% 75%), hsl(30 50% 60%))",
            }}
          >
            {/* Eyes - looking up when lookUp is true */}
            <div 
              className="flex gap-2 md:gap-3 mb-1 transition-transform duration-300"
              style={{
                transform: expr.lookUp ? "translateY(-3px)" : "none",
              }}
            >
              <span className="text-sm md:text-lg font-bold text-foreground">
                {expr.lookUp ? "◠" : expr.eyes}
              </span>
              <span className="text-sm md:text-lg font-bold text-foreground">
                {expr.lookUp ? "◠" : expr.eyes}
              </span>
            </div>
            {/* Mustache */}
            <div className="text-xs md:text-sm text-foreground opacity-70">〰️</div>
            {/* Mouth - gentle smile when looking up */}
            <span className="text-sm md:text-lg font-bold text-foreground">
              {expr.lookUp ? "◡" : expr.mouth}
            </span>
          </div>
        </div>

        {/* Body with traditional shirt */}
        <div 
          className="relative -mt-2 rounded-t-lg rounded-b-2xl border-2 border-primary/40"
          style={{
            width: size === "xl" ? "80px" : size === "lg" ? "55px" : size === "md" ? "40px" : "30px",
            height: size === "xl" ? "70px" : size === "lg" ? "50px" : size === "md" ? "35px" : "25px",
            background: "linear-gradient(180deg, hsl(25 95% 53%), hsl(20 90% 45%))",
          }}
        >
          {/* Shirt pattern */}
          <div className="absolute inset-x-0 top-2 flex justify-center">
            <div className="w-1 h-full bg-primary-foreground/20 rounded-full" />
          </div>
        </div>

        {/* Arms (when waving) */}
        {currentExpression === "waving" && (
          <div 
            className="absolute right-0 top-1/2 origin-bottom-left animate-wiggle"
            style={{
              width: "20px",
              height: "8px",
              background: "hsl(30 60% 70%)",
              borderRadius: "4px",
              transform: "rotate(-45deg)",
            }}
          />
        )}

        {/* Raised hand when looking up (thinking pose) */}
        {currentExpression === "looking-up" && (
          <div 
            className="absolute -right-3 top-1/3 animate-pulse"
            style={{
              width: "15px",
              height: "15px",
              background: "hsl(30 60% 70%)",
              borderRadius: "50%",
              boxShadow: "0 0 10px hsl(var(--primary) / 0.3)",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Babai;
