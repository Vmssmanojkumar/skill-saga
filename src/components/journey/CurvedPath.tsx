import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CurvedPathProps {
  nodeCount: number;
  currentIndex: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function CurvedPath({ nodeCount, currentIndex, containerRef }: CurvedPathProps) {
  const [pathData, setPathData] = useState<string>("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll("[data-module-card]");
      if (cards.length < 2) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const points: { x: number; y: number }[] = [];

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        points.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      });

      // Build bezier curve path
      let d = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        
        // Smooth S-curve between points
        const controlY1 = prev.y + (curr.y - prev.y) * 0.5;
        const controlY2 = prev.y + (curr.y - prev.y) * 0.5;
        
        d += ` C ${prev.x} ${controlY1}, ${curr.x} ${controlY2}, ${curr.x} ${curr.y}`;
      }

      setPathData(d);
      setDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    // Delay to let cards render
    const timer = setTimeout(calculatePath, 200);
    window.addEventListener("resize", calculatePath);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePath);
    };
  }, [nodeCount, containerRef]);

  if (!pathData) return null;

  const progressRatio = (currentIndex + 1) / nodeCount;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <defs>
        {/* Gradient for active path */}
        <linearGradient id="activePathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(142, 76%, 45%)" />
          <stop offset="50%" stopColor="hsl(25, 95%, 53%)" />
          <stop offset="100%" stopColor="hsl(263, 84%, 60%)" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft glow for locked path */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background dashed path (locked sections) */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="hsl(263 84% 40% / 0.3)"
        strokeWidth="4"
        strokeDasharray="12 10"
        strokeLinecap="round"
        filter="url(#softGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Active/completed path with glow */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="url(#activePathGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glowFilter)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progressRatio }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />

      {/* Animated particle along path */}
      <motion.circle
        r="4"
        fill="hsl(25 95% 60%)"
        filter="url(#glowFilter)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={pathData}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </motion.circle>
    </svg>
  );
}

export default CurvedPath;
