import { motion } from "framer-motion";
import { Lock, Check, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModuleStatus = "locked" | "current" | "completed";

export interface Module {
  id: number;
  title: string;
  subtitle?: string;
  status: ModuleStatus;
  isFree?: boolean;
}

interface ModuleCardProps {
  module: Module;
  index: number;
  isLeft: boolean;
  onClick: () => void;
  onLockedClick?: () => void;
}

export function ModuleCard({ module, index, isLeft, onClick, onLockedClick }: ModuleCardProps) {
  const handleClick = () => {
    if (module.status === "locked") {
      onLockedClick?.();
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      className={cn(
        "w-full max-w-xs mx-auto",
        isLeft ? "mr-auto ml-8 md:ml-16" : "ml-auto mr-8 md:mr-16"
      )}
      initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.button
        onClick={handleClick}
        className="relative w-full text-left group"
        whileHover={module.status !== "locked" ? { scale: 1.03 } : {}}
        whileTap={module.status !== "locked" ? { scale: 0.98 } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Status icon floating above */}
        <motion.div
          className={cn(
            "absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border-2",
            module.status === "completed" && "bg-success border-success text-success-foreground",
            module.status === "current" && "bg-primary border-primary text-primary-foreground",
            module.status === "locked" && "bg-muted border-muted-foreground/30 text-muted-foreground"
          )}
          animate={
            module.status === "completed"
              ? { scale: [1, 1.1, 1] }
              : module.status === "current"
              ? { y: [0, -4, 0] }
              : {}
          }
          transition={{
            duration: module.status === "completed" ? 3 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {module.status === "completed" && <Check className="w-5 h-5" strokeWidth={3} />}
          {module.status === "current" && <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
          {module.status === "locked" && <Lock className="w-4 h-4" />}
        </motion.div>

        {/* Sparkle effects for completed */}
        {module.status === "completed" && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 z-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-success" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 z-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3 text-success/70" />
            </motion.div>
          </>
        )}

        {/* Glow effect */}
        {module.status === "current" && (
          <motion.div
            className="absolute -inset-1 rounded-3xl bg-primary/30 blur-xl z-0"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {module.status === "completed" && (
          <motion.div
            className="absolute -inset-0.5 rounded-3xl bg-success/20 blur-lg z-0"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Main card */}
        <div
          className={cn(
            "relative rounded-3xl p-5 pt-8 border-2 backdrop-blur-sm transition-all duration-300 z-[1]",
            // Completed state
            module.status === "completed" &&
              "bg-gradient-to-br from-success/20 via-success/10 to-success/5 border-success/50 shadow-[0_0_30px_hsl(142_76%_40%/0.2)]",
            // Current state
            module.status === "current" &&
              "bg-gradient-to-br from-primary/25 via-primary/15 to-primary/5 border-primary/60 shadow-[0_0_40px_hsl(25_95%_53%/0.3)]",
            // Locked state
            module.status === "locked" &&
              "bg-gradient-to-br from-muted/40 via-muted/20 to-muted/10 border-border/30 opacity-70 blur-[0.5px]",
            // Glassmorphism base
            "shadow-xl"
          )}
          style={{
            boxShadow:
              module.status === "current"
                ? "0 8px 32px hsl(25 95% 53% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.1)"
                : module.status === "completed"
                ? "0 8px 32px hsl(142 76% 40% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.1)"
                : "0 8px 24px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
          }}
        >
          {/* Inner glass highlight */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Free badge */}
          {module.isFree && module.status !== "locked" && (
            <span className="absolute top-2 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/30 text-success border border-success/30">
              FREE
            </span>
          )}

          {/* Content */}
          <div className="relative z-10">
            <h3
              className={cn(
                "font-display font-bold text-lg mb-1",
                module.status === "completed" && "text-success",
                module.status === "current" && "text-primary",
                module.status === "locked" && "text-muted-foreground"
              )}
            >
              {module.title}
            </h3>
            {module.subtitle && (
              <p className="text-sm text-muted-foreground/80">{module.subtitle}</p>
            )}
            <div className="mt-3 flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg",
                  module.status === "completed" && "bg-success/20 text-success",
                  module.status === "current" && "bg-primary/20 text-primary",
                  module.status === "locked" && "bg-muted text-muted-foreground"
                )}
              >
                {module.status === "completed" && "✓ Completed"}
                {module.status === "current" && "▶ Continue"}
                {module.status === "locked" && "🔒 Locked"}
              </span>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default ModuleCard;
