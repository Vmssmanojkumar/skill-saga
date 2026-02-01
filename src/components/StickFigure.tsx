import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export type StickFigureExpression = "happy" | "thinking" | "proud" | "excited" | "waving" | "looking-up" | "sad" | "teaching";
export type StickFigureRole = "mentor" | "student" | "group";

interface StickFigureProps {
  expression?: StickFigureExpression;
  role?: StickFigureRole;
  message?: string;
  showBubble?: boolean;
  bubbleType?: "speech" | "thought";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const sizeConfig = {
  sm: { width: 60, height: 80, strokeWidth: 2, headSize: 16, fontSize: "text-xs" },
  md: { width: 80, height: 110, strokeWidth: 2.5, headSize: 22, fontSize: "text-sm" },
  lg: { width: 120, height: 160, strokeWidth: 3, headSize: 32, fontSize: "text-base" },
  xl: { width: 160, height: 220, strokeWidth: 4, headSize: 44, fontSize: "text-lg" },
};

// Expression face configurations
const expressionFaces: Record<StickFigureExpression, { leftEye: string; rightEye: string; mouth: string; extras?: React.ReactNode }> = {
  happy: { leftEye: "•", rightEye: "•", mouth: "◡" },
  thinking: { leftEye: "•", rightEye: "◔", mouth: "～" },
  proud: { leftEye: "◠", rightEye: "◠", mouth: "▽" },
  excited: { leftEye: "★", rightEye: "★", mouth: "▽" },
  waving: { leftEye: "•", rightEye: "•", mouth: "◡" },
  "looking-up": { leftEye: "◠", rightEye: "◠", mouth: "◡" },
  sad: { leftEye: "•", rightEye: "•", mouth: "︵" },
  teaching: { leftEye: "•", rightEye: "•", mouth: "◡" },
};

export function StickFigure({
  expression = "happy",
  role = "student",
  message,
  showBubble = true,
  bubbleType = "speech",
  size = "md",
  className,
  animate = true,
}: StickFigureProps) {
  const config = sizeConfig[size];
  const face = expressionFaces[expression];
  const armControls = useAnimation();

  useEffect(() => {
    if (expression === "waving" && animate) {
      armControls.start({
        rotate: [0, 20, -10, 20, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
      });
    } else if (expression === "teaching" && animate) {
      armControls.start({
        rotate: [0, 30, 20, 30, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      armControls.stop();
    }
  }, [expression, animate, armControls]);

  const renderSingleFigure = (isStandingOnPlatform = false) => {
    const svgHeight = isStandingOnPlatform ? config.height + 20 : config.height;
    
    return (
      <svg
        width={config.width}
        height={svgHeight}
        viewBox={`0 0 ${config.width} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Platform for mentor/teaching role */}
        {isStandingOnPlatform && (
          <rect
            x={config.width * 0.2}
            y={svgHeight - 15}
            width={config.width * 0.6}
            height={12}
            rx={4}
            fill="hsl(var(--primary))"
            opacity={0.3}
          />
        )}

        {/* Head */}
        <motion.circle
          cx={config.width / 2}
          cy={config.headSize + 5}
          r={config.headSize}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          fill="none"
          animate={animate && expression === "looking-up" ? { y: -3 } : { y: 0 }}
        />

        {/* Face features */}
        <g>
          {/* Left Eye */}
          <text
            x={config.width / 2 - config.headSize * 0.35}
            y={config.headSize + 3}
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
            y={config.headSize + 3}
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
            y={config.headSize + 5 + config.headSize * 0.45}
            fontSize={config.headSize * 0.5}
            fill="hsl(var(--foreground))"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {face.mouth}
          </text>
          {/* Hair/spiky bits */}
          {expression !== "sad" && (
            <g stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.7}>
              <line
                x1={config.width / 2 - 5}
                y1={5}
                x2={config.width / 2 - 8}
                y2={-2}
              />
              <line
                x1={config.width / 2}
                y1={4}
                x2={config.width / 2}
                y2={-4}
              />
              <line
                x1={config.width / 2 + 5}
                y1={5}
                x2={config.width / 2 + 8}
                y2={-2}
              />
            </g>
          )}
        </g>

        {/* Neck */}
        <line
          x1={config.width / 2}
          y1={config.headSize * 2 + 5}
          x2={config.width / 2}
          y2={config.headSize * 2 + 15}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
        />

        {/* Body */}
        <line
          x1={config.width / 2}
          y1={config.headSize * 2 + 15}
          x2={config.width / 2}
          y2={config.height * 0.65}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />

        {/* Left Arm */}
        <line
          x1={config.width / 2}
          y1={config.headSize * 2 + 20}
          x2={config.width * 0.2}
          y2={config.height * 0.5}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />

        {/* Right Arm - animated for waving/teaching */}
        <motion.line
          x1={config.width / 2}
          y1={config.headSize * 2 + 20}
          x2={expression === "waving" || expression === "teaching" ? config.width * 0.85 : config.width * 0.8}
          y2={expression === "waving" || expression === "teaching" ? config.headSize * 2 : config.height * 0.5}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          animate={armControls}
          style={{
            originX: `${config.width / 2}px`,
            originY: `${config.headSize * 2 + 20}px`,
          }}
        />

        {/* Left Leg */}
        <line
          x1={config.width / 2}
          y1={config.height * 0.65}
          x2={config.width * 0.3}
          y2={isStandingOnPlatform ? svgHeight - 18 : config.height - 5}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />

        {/* Right Leg */}
        <line
          x1={config.width / 2}
          y1={config.height * 0.65}
          x2={config.width * 0.7}
          y2={isStandingOnPlatform ? svgHeight - 18 : config.height - 5}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const renderGroupFigures = () => {
    const smallConfig = sizeConfig.sm;
    const groupWidth = config.width * 2;
    const groupHeight = config.height;

    return (
      <svg
        width={groupWidth}
        height={groupHeight}
        viewBox={`0 0 ${groupWidth} ${groupHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Three students in a row */}
        {[0, 1, 2].map((i) => {
          const offsetX = i * (groupWidth / 3) + groupWidth / 6;
          const headY = smallConfig.headSize + 15;
          
          return (
            <g key={i} transform={`translate(${offsetX - smallConfig.width / 2}, 10)`}>
              {/* Head */}
              <circle
                cx={smallConfig.width / 2}
                cy={headY}
                r={smallConfig.headSize}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
                fill="none"
              />
              {/* Simple face - dots for eyes, curved line for expression */}
              <circle cx={smallConfig.width / 2 - 5} cy={headY - 2} r={2} fill="hsl(var(--foreground))" />
              <circle cx={smallConfig.width / 2 + 5} cy={headY - 2} r={2} fill="hsl(var(--foreground))" />
              {/* Slight frown for "confused" look */}
              <path
                d={`M ${smallConfig.width / 2 - 6} ${headY + 8} Q ${smallConfig.width / 2} ${headY + 5} ${smallConfig.width / 2 + 6} ${headY + 8}`}
                stroke="hsl(var(--foreground))"
                strokeWidth={1.5}
                fill="none"
              />
              {/* Body */}
              <line
                x1={smallConfig.width / 2}
                y1={headY + smallConfig.headSize}
                x2={smallConfig.width / 2}
                y2={groupHeight * 0.6}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
              />
              {/* Arms down */}
              <line
                x1={smallConfig.width / 2}
                y1={headY + smallConfig.headSize + 10}
                x2={smallConfig.width * 0.2}
                y2={groupHeight * 0.55}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
              />
              <line
                x1={smallConfig.width / 2}
                y1={headY + smallConfig.headSize + 10}
                x2={smallConfig.width * 0.8}
                y2={groupHeight * 0.55}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
              />
              {/* Legs */}
              <line
                x1={smallConfig.width / 2}
                y1={groupHeight * 0.6}
                x2={smallConfig.width * 0.3}
                y2={groupHeight - 10}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
              />
              <line
                x1={smallConfig.width / 2}
                y1={groupHeight * 0.6}
                x2={smallConfig.width * 0.7}
                y2={groupHeight - 10}
                stroke="hsl(var(--foreground))"
                strokeWidth={smallConfig.strokeWidth}
              />
            </g>
          );
        })}
      </svg>
    );
  };

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
        animate={animate ? { y: [0, -5, 0] } : {}}
        transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {role === "group" ? renderGroupFigures() : renderSingleFigure(role === "mentor" || expression === "teaching")}
      </motion.div>
    </div>
  );
}

export default StickFigure;
