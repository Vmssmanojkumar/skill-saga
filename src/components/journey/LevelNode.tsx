import { motion } from "framer-motion";
import { Lock, Check, Play, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Level {
  id: number;
  title: string;
  status: "locked" | "active" | "completed";
  isFree: boolean;
}

interface LevelNodeProps {
  level: Level;
  index: number;
  isLeft: boolean;
  onClick: () => void;
}

export function LevelNode({ level, index, isLeft, onClick }: LevelNodeProps) {
  const nodeSize = 72;
  
  return (
    <motion.div
      className={cn(
        "flex items-center gap-6 w-full",
        isLeft ? "flex-row" : "flex-row-reverse"
      )}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
    >
      {/* Level Node Button */}
      <motion.button
        onClick={onClick}
        disabled={level.status === "locked"}
        className="relative group"
        whileHover={level.status !== "locked" ? { scale: 1.1 } : {}}
        whileTap={level.status !== "locked" ? { scale: 0.95 } : {}}
      >
        {/* Outer glow ring for active */}
        {level.status === "active" && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ 
              width: nodeSize, 
              height: nodeSize,
              margin: -4,
            }}
          />
        )}

        {/* Sparkles for completed */}
        {level.status === "completed" && (
          <>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-success" />
            </motion.div>
          </>
        )}

        {/* Main node */}
        <motion.div
          className={cn(
            "rounded-full flex items-center justify-center font-display font-bold text-xl border-4 transition-all relative overflow-hidden",
            level.status === "completed" && "bg-success border-success text-success-foreground shadow-[0_0_20px_hsl(var(--success)/0.5)]",
            level.status === "active" && "bg-primary border-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.6)]",
            level.status === "locked" && !level.isFree && "bg-muted/50 border-muted-foreground/30 text-muted-foreground opacity-60",
            level.status === "locked" && level.isFree && "bg-muted border-border text-muted-foreground hover:border-primary/50"
          )}
          style={{ width: nodeSize, height: nodeSize }}
        >
          {/* Inner shine effect */}
          {level.status !== "locked" && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          )}
          
          {level.status === "completed" && <Check className="w-8 h-8" strokeWidth={3} />}
          {level.status === "active" && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </motion.div>
          )}
          {level.status === "locked" && !level.isFree && <Lock className="w-6 h-6" />}
          {level.status === "locked" && level.isFree && (
            <span className="text-2xl">{level.id}</span>
          )}
        </motion.div>
      </motion.button>

      {/* Level Info Card */}
      <motion.div
        className={cn(
          "flex-1 p-4 rounded-2xl border transition-all",
          isLeft ? "text-left" : "text-right",
          level.status === "completed" && "bg-success/10 border-success/30",
          level.status === "active" && "bg-primary/10 border-primary/50 shadow-lg shadow-primary/20",
          level.status === "locked" && "bg-card/30 border-border/50"
        )}
        whileHover={level.status !== "locked" ? { scale: 1.02 } : {}}
      >
        <div className={cn(
          "flex items-center gap-2 mb-1",
          isLeft ? "justify-start" : "justify-end"
        )}>
          {level.isFree ? (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-success/20 text-success">
              FREE
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground flex items-center gap-1">
              <Star className="w-3 h-3" /> Premium
            </span>
          )}
        </div>
        <h3 className={cn(
          "font-display font-bold text-lg",
          level.status === "locked" && !level.isFree && "text-muted-foreground"
        )}>
          {level.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Level {level.id}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LevelNode;