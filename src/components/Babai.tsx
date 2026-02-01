import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export type BabaiExpression = "happy" | "thinking" | "proud" | "warning" | "excited" | "waving" | "looking-up" | "sweating";

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
  sweating: { eyes: "◉", mouth: "∼", extra: "💦" },
};

const sizeClasses = {
  sm: "w-16 h-20",
  md: "w-24 h-28",
  lg: "w-32 h-40",
  xl: "w-48 h-56",
};

const sizeDimensions = {
  sm: { face: 35, body: { w: 30, h: 25 } },
  md: { face: 50, body: { w: 40, h: 35 } },
  lg: { face: 70, body: { w: 55, h: 50 } },
  xl: { face: 100, body: { w: 80, h: 70 } },
};

export function Babai({ 
  expression = "happy", 
  message, 
  showBubble = true, 
  size = "lg",
  className,
  animate = true 
}: BabaiProps) {
  const expr = expressionEmojis[expression];
  const dims = sizeDimensions[size];
  const armControls = useAnimation();
  const sweatControls = useAnimation();

  useEffect(() => {
    if (expression === "waving") {
      armControls.start({
        rotate: [0, 20, -10, 20, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
      });
    } else {
      armControls.stop();
    }

    if (expression === "sweating") {
      sweatControls.start({
        y: [0, 30],
        opacity: [1, 0],
        transition: { duration: 1, repeat: Infinity, ease: "easeIn" }
      });
    } else {
      sweatControls.stop();
    }
  }, [expression, armControls, sweatControls]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Speech Bubble */}
      {showBubble && message && (
        <motion.div 
          className="speech-bubble max-w-xs text-center"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="text-foreground font-game font-semibold text-sm md:text-base">
            {message}
          </p>
        </motion.div>
      )}

      {/* Babai Character */}
      <motion.div 
        className={cn("relative flex flex-col items-center", sizeClasses[size])}
        animate={animate ? { y: [0, -8, 0] } : {}}
        transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {/* Extra expression indicator */}
        {expr.extra && !expr.lookUp && expression !== "sweating" && (
          <motion.span 
            className="absolute -top-2 -right-2 text-2xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {expr.extra}
          </motion.span>
        )}

        {/* Sweat drops for sweating expression */}
        {expression === "sweating" && (
          <>
            <motion.span 
              className="absolute top-4 -right-1 text-lg"
              animate={sweatControls}
            >
              💧
            </motion.span>
            <motion.span 
              className="absolute top-6 right-3 text-sm"
              animate={{
                y: [0, 25],
                opacity: [1, 0],
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
            >
              💧
            </motion.span>
          </>
        )}

        {/* Head */}
        <motion.div 
          className="relative"
          animate={expr.lookUp ? { rotateZ: -10, y: -5 } : { rotateZ: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Lungi/Dhoti style headwrap */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[90%] h-3 bg-primary rounded-t-full" />
          
          {/* Face */}
          <div 
            className="rounded-full flex flex-col items-center justify-center border-4 border-primary/30"
            style={{
              width: dims.face,
              height: dims.face,
              background: "linear-gradient(145deg, hsl(30 60% 75%), hsl(30 50% 60%))",
            }}
          >
            {/* Eyes */}
            <motion.div 
              className="flex gap-2 md:gap-3 mb-1"
              animate={expr.lookUp ? { y: -3 } : { y: 0 }}
            >
              <motion.span 
                className="text-sm md:text-lg font-bold text-foreground"
                animate={expression === "excited" ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: expression === "excited" ? Infinity : 0 }}
              >
                {expr.lookUp ? "◠" : expr.eyes}
              </motion.span>
              <motion.span 
                className="text-sm md:text-lg font-bold text-foreground"
                animate={expression === "excited" ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: expression === "excited" ? Infinity : 0, delay: 0.1 }}
              >
                {expr.lookUp ? "◠" : expr.eyes}
              </motion.span>
            </motion.div>
            {/* Mustache */}
            <div className="text-xs md:text-sm text-foreground opacity-70">〰️</div>
            {/* Mouth */}
            <motion.span 
              className="text-sm md:text-lg font-bold text-foreground"
              animate={expression === "excited" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, repeat: expression === "excited" ? Infinity : 0 }}
            >
              {expr.lookUp ? "◡" : expr.mouth}
            </motion.span>
          </div>
        </motion.div>

        {/* Body with traditional shirt */}
        <div 
          className="relative -mt-2 rounded-t-lg rounded-b-2xl border-2 border-primary/40"
          style={{
            width: dims.body.w,
            height: dims.body.h,
            background: "linear-gradient(180deg, hsl(25 95% 53%), hsl(20 90% 45%))",
          }}
        >
          {/* Shirt pattern */}
          <div className="absolute inset-x-0 top-2 flex justify-center">
            <div className="w-1 h-full bg-primary-foreground/20 rounded-full" />
          </div>
        </div>

        {/* Waving arm */}
        {expression === "waving" && (
          <motion.div 
            className="absolute origin-bottom-left"
            style={{
              right: -5,
              top: "45%",
              width: size === "xl" ? 30 : size === "lg" ? 22 : 15,
              height: size === "xl" ? 12 : size === "lg" ? 9 : 6,
              background: "hsl(30 60% 70%)",
              borderRadius: "6px",
            }}
            animate={armControls}
          >
            {/* Hand */}
            <motion.div 
              className="absolute -right-2 -top-1 text-lg"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              👋
            </motion.div>
          </motion.div>
        )}

        {/* Raised hand when looking up (thinking pose) */}
        {expression === "looking-up" && (
          <motion.div 
            className="absolute -right-3 top-1/3"
            style={{
              width: 15,
              height: 15,
              background: "hsl(30 60% 70%)",
              borderRadius: "50%",
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 10px hsl(var(--primary) / 0.3)",
                "0 0 20px hsl(var(--primary) / 0.5)",
                "0 0 10px hsl(var(--primary) / 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default Babai;