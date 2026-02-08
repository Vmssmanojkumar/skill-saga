import { motion } from "framer-motion";

interface RoadmapPathProps {
  nodePositions: { x: number; y: number }[];
  currentLevel: number;
}

export function RoadmapPath({ nodePositions, currentLevel }: RoadmapPathProps) {
  if (nodePositions.length < 2) return null;

  // Create curved path through all nodes
  const createPath = () => {
    let d = `M ${nodePositions[0].x} ${nodePositions[0].y}`;
    
    for (let i = 1; i < nodePositions.length; i++) {
      const prev = nodePositions[i - 1];
      const curr = nodePositions[i];
      
      // Calculate control points for smooth curve
      const midY = (prev.y + curr.y) / 2;
      const cp1x = prev.x;
      const cp1y = midY;
      const cp2x = curr.x;
      const cp2y = midY;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return d;
  };

  const pathD = createPath();
  
  // Calculate path length for animation
  const completedRatio = currentLevel / nodePositions.length;

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient for the completed path */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background dashed path (locked levels) */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="4"
        strokeDasharray="12 8"
        strokeLinecap="round"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Completed path with glow */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#pathGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: completedRatio }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />

      {/* Animated particles along the path */}
      <motion.circle
        r="6"
        fill="hsl(var(--primary))"
        filter="url(#pathGlow)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          offsetPath: `path('${pathD}')`,
        }}
      />
    </svg>
  );
}

export default RoadmapPath;