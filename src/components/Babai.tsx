import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export type BabaiExpression = "happy" | "thinking" | "proud" | "warning" | "excited" | "waving" | "looking-up" | "sweating" | "teaching";

interface BabaiProps {
  expression?: BabaiExpression;
  message?: string;
  showBubble?: boolean;
  bubbleType?: "speech" | "thought";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const sizeConfig = {
  sm: { width: 60, height: 90, strokeWidth: 2, headSize: 16, fontSize: "text-xs" },
  md: { width: 90, height: 130, strokeWidth: 2.5, headSize: 24, fontSize: "text-sm" },
  lg: { width: 130, height: 180, strokeWidth: 3, headSize: 36, fontSize: "text-base" },
  xl: { width: 180, height: 250, strokeWidth: 4, headSize: 50, fontSize: "text-lg" },
};

// Expression face configurations
const expressionFaces: Record<BabaiExpression, { leftEye: string; rightEye: string; mouth: string }> = {
  happy: { leftEye: "•", rightEye: "•", mouth: "◡" },
  thinking: { leftEye: "•", rightEye: "◔", mouth: "～" },
  proud: { leftEye: "◠", rightEye: "◠", mouth: "▽" },
  warning: { leftEye: "◉", rightEye: "◉", mouth: "△" },
  excited: { leftEye: "★", rightEye: "★", mouth: "▽" },
  waving: { leftEye: "•", rightEye: "•", mouth: "◡" },
  "looking-up": { leftEye: "◠", rightEye: "◠", mouth: "◡" },
  sweating: { leftEye: "◉", rightEye: "◉", mouth: "～" },
  teaching: { leftEye: "•", rightEye: "•", mouth: "◡" },
};

export function Babai({
  expression = "happy",
  message,
  showBubble = true,
  bubbleType = "speech",
  size = "lg",
  className,
  animate = true,
}: BabaiProps) {
  const config = sizeConfig[size];
  const face = expressionFaces[expression];
  const armControls = useAnimation();
  const sweatControls = useAnimation();

  useEffect(() => {
    if (expression === "waving" && animate) {
      armControls.start({
        rotate: [0, 25, -5, 25, 0],
        transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
      });
    } else if (expression === "teaching" && animate) {
      armControls.start({
        rotate: [0, 35, 25, 35, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      armControls.stop();
    }

    if (expression === "sweating" && animate) {
      sweatControls.start({
        y: [0, 30],
        opacity: [1, 0],
        transition: { duration: 1, repeat: Infinity, ease: "easeIn" },
      });
    } else {
      sweatControls.stop();
    }
  }, [expression, animate, armControls, sweatControls]);

  const isOnPlatform = expression === "teaching";
  const svgHeight = isOnPlatform ? config.height + 25 : config.height;

  const renderCharacter = () => (
    <svg
      width={config.width}
      height={svgHeight}
      viewBox={`0 0 ${config.width} ${svgHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Platform for teaching */}
      {isOnPlatform && (
        <rect
          x={config.width * 0.15}
          y={svgHeight - 18}
          width={config.width * 0.7}
          height={15}
          rx={5}
          fill="hsl(var(--primary))"
          opacity={0.4}
        />
      )}

      {/* Sweat drops */}
      {expression === "sweating" && (
        <motion.g animate={sweatControls}>
          <text
            x={config.width * 0.85}
            y={config.headSize}
            fontSize={config.headSize * 0.4}
          >
            💧
          </text>
        </motion.g>
      )}

      {/* Head - larger circle */}
      <motion.circle
        cx={config.width / 2}
        cy={config.headSize + 8}
        r={config.headSize}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        fill="none"
        animate={animate && expression === "looking-up" ? { y: -4 } : { y: 0 }}
      />

      {/* Hair spikes */}
      <g stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.8} strokeLinecap="round">
        <line
          x1={config.width / 2 - config.headSize * 0.4}
          y1={8}
          x2={config.width / 2 - config.headSize * 0.5}
          y2={0}
        />
        <line
          x1={config.width / 2}
          y1={6}
          x2={config.width / 2}
          y2={-3}
        />
        <line
          x1={config.width / 2 + config.headSize * 0.4}
          y1={8}
          x2={config.width / 2 + config.headSize * 0.5}
          y2={0}
        />
      </g>

      {/* Face */}
      <g>
        {/* Left Eye */}
        <text
          x={config.width / 2 - config.headSize * 0.35}
          y={config.headSize + 5}
          fontSize={config.headSize * 0.45}
          fill="hsl(var(--foreground))"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {face.leftEye}
        </text>
        {/* Right Eye */}
        <text
          x={config.width / 2 + config.headSize * 0.35}
          y={config.headSize + 5}
          fontSize={config.headSize * 0.45}
          fill="hsl(var(--foreground))"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {face.rightEye}
        </text>
        {/* Mouth */}
        <text
          x={config.width / 2}
          y={config.headSize + 8 + config.headSize * 0.5}
          fontSize={config.headSize * 0.55}
          fill="hsl(var(--foreground))"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {face.mouth}
        </text>
      </g>

      {/* Neck */}
      <line
        x1={config.width / 2}
        y1={config.headSize * 2 + 8}
        x2={config.width / 2}
        y2={config.headSize * 2 + 20}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
      />

      {/* Body */}
      <line
        x1={config.width / 2}
        y1={config.headSize * 2 + 20}
        x2={config.width / 2}
        y2={config.height * 0.62}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <line
        x1={config.width / 2}
        y1={config.headSize * 2 + 25}
        x2={config.width * 0.18}
        y2={config.height * 0.48}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Right Arm - animated for waving/teaching */}
      <motion.line
        x1={config.width / 2}
        y1={config.headSize * 2 + 25}
        x2={expression === "waving" || expression === "teaching" ? config.width * 0.88 : config.width * 0.82}
        y2={expression === "waving" || expression === "teaching" ? config.headSize * 1.8 : config.height * 0.48}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        animate={armControls}
        style={{
          originX: `${config.width / 2}px`,
          originY: `${config.headSize * 2 + 25}px`,
        }}
      />

      {/* Left Leg */}
      <line
        x1={config.width / 2}
        y1={config.height * 0.62}
        x2={config.width * 0.28}
        y2={isOnPlatform ? svgHeight - 20 : config.height - 8}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Right Leg */}
      <line
        x1={config.width / 2}
        y1={config.height * 0.62}
        x2={config.width * 0.72}
        y2={isOnPlatform ? svgHeight - 20 : config.height - 8}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );

  const renderBubble = () => {
    if (!showBubble || !message) return null;

    if (bubbleType === "thought") {
      return (
        <motion.div
          className="relative bg-card border-2 border-border rounded-3xl px-4 py-3 max-w-xs shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className={cn("text-foreground font-medium", config.fontSize)}>{message}</p>
          {/* Thought bubbles */}
          <div className="absolute -bottom-3 left-6 w-4 h-4 bg-card border-2 border-border rounded-full" />
          <div className="absolute -bottom-6 left-3 w-2.5 h-2.5 bg-card border-2 border-border rounded-full" />
        </motion.div>
      );
    }

    return (
      <motion.div
        className="relative bg-card border-2 border-border rounded-2xl px-4 py-3 max-w-xs shadow-lg"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p className={cn("text-foreground font-medium", config.fontSize)}>{message}</p>
        {/* Speech bubble pointer */}
        <div
          className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-r-2 border-b-2 border-border rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        />
      </motion.div>
    );
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Bubble */}
      {renderBubble()}

      {/* Character */}
      <motion.div
        className="relative"
        animate={animate ? { y: [0, -6, 0] } : {}}
        transition={animate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {renderCharacter()}
      </motion.div>
    </div>
  );
}

export default Babai;
