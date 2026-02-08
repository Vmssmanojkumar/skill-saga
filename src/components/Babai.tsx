import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export type BabaiExpression = "happy" | "thinking" | "proud" | "warning" | "excited" | "waving" | "looking-up" | "sweating" | "teaching" | "explaining";

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
  sm: { width: 70, height: 100, strokeWidth: 2, headSize: 14, fontSize: "text-xs" },
  md: { width: 100, height: 140, strokeWidth: 2.5, headSize: 20, fontSize: "text-sm" },
  lg: { width: 140, height: 200, strokeWidth: 3, headSize: 28, fontSize: "text-base" },
  xl: { width: 200, height: 280, strokeWidth: 3.5, headSize: 40, fontSize: "text-lg" },
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
  const armControls = useAnimation();
  const pointerControls = useAnimation();
  const sweatControls = useAnimation();

  // Center and key points
  const cx = config.width / 2;
  const headY = config.headSize + 12;
  const neckY = headY + config.headSize + 4;
  const shoulderY = neckY + config.headSize * 0.5;
  const bodyEndY = config.height * 0.58;
  const legEndY = config.height - 12;

  const isOnPlatform = expression === "teaching" || expression === "explaining";
  const hasPointer = expression === "teaching" || expression === "explaining";
  const svgHeight = isOnPlatform ? config.height + 20 : config.height;

  useEffect(() => {
    if ((expression === "waving") && animate) {
      armControls.start({
        rotate: [0, 20, -10, 20, 0],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
      });
    } else if ((expression === "teaching" || expression === "explaining") && animate) {
      armControls.start({
        rotate: [0, 8, -3, 8, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
      });
      pointerControls.start({
        rotate: [-5, 5, -5],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      armControls.stop();
      pointerControls.stop();
    }

    if (expression === "sweating" && animate) {
      sweatControls.start({
        y: [0, 20],
        opacity: [1, 0],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeIn" },
      });
    } else {
      sweatControls.stop();
    }
  }, [expression, animate, armControls, pointerControls, sweatControls]);

  // Get eye style based on expression
  const getEyes = () => {
    const eyeSpacing = config.headSize * 0.35;
    const eyeY = headY - config.headSize * 0.1;
    const eyeSize = config.headSize * 0.18;

    switch (expression) {
      case "thinking":
        return (
          <>
            <circle cx={cx - eyeSpacing} cy={eyeY} r={eyeSize} fill="hsl(var(--foreground))" />
            <circle cx={cx + eyeSpacing} cy={eyeY - 2} r={eyeSize} fill="hsl(var(--foreground))" />
          </>
        );
      case "excited":
      case "proud":
        return (
          <>
            <path
              d={`M ${cx - eyeSpacing - eyeSize} ${eyeY + 2} Q ${cx - eyeSpacing} ${eyeY - eyeSize * 1.5} ${cx - eyeSpacing + eyeSize} ${eyeY + 2}`}
              stroke="hsl(var(--foreground))"
              strokeWidth={config.strokeWidth * 0.8}
              fill="none"
            />
            <path
              d={`M ${cx + eyeSpacing - eyeSize} ${eyeY + 2} Q ${cx + eyeSpacing} ${eyeY - eyeSize * 1.5} ${cx + eyeSpacing + eyeSize} ${eyeY + 2}`}
              stroke="hsl(var(--foreground))"
              strokeWidth={config.strokeWidth * 0.8}
              fill="none"
            />
          </>
        );
      case "warning":
      case "sweating":
        return (
          <>
            <circle cx={cx - eyeSpacing} cy={eyeY} r={eyeSize * 1.3} fill="none" stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.6} />
            <circle cx={cx - eyeSpacing} cy={eyeY} r={eyeSize * 0.5} fill="hsl(var(--foreground))" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={eyeSize * 1.3} fill="none" stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.6} />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={eyeSize * 0.5} fill="hsl(var(--foreground))" />
          </>
        );
      case "looking-up":
        return (
          <>
            <circle cx={cx - eyeSpacing} cy={eyeY - 3} r={eyeSize} fill="hsl(var(--foreground))" />
            <circle cx={cx + eyeSpacing} cy={eyeY - 3} r={eyeSize} fill="hsl(var(--foreground))" />
          </>
        );
      default: // happy, waving, teaching, explaining
        return (
          <>
            <circle cx={cx - eyeSpacing} cy={eyeY} r={eyeSize} fill="hsl(var(--foreground))" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={eyeSize} fill="hsl(var(--foreground))" />
          </>
        );
    }
  };

  // Get mouth based on expression
  const getMouth = () => {
    const mouthY = headY + config.headSize * 0.35;
    const mouthWidth = config.headSize * 0.4;

    switch (expression) {
      case "thinking":
        return (
          <path
            d={`M ${cx - mouthWidth * 0.5} ${mouthY} Q ${cx} ${mouthY + 3} ${cx + mouthWidth * 0.5} ${mouthY - 2}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={config.strokeWidth * 0.8}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "excited":
      case "proud":
        return (
          <path
            d={`M ${cx - mouthWidth} ${mouthY - 2} Q ${cx} ${mouthY + mouthWidth * 1.2} ${cx + mouthWidth} ${mouthY - 2}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={config.strokeWidth * 0.8}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "warning":
        return (
          <circle cx={cx} cy={mouthY + 2} r={mouthWidth * 0.35} fill="hsl(var(--foreground))" />
        );
      case "sweating":
        return (
          <path
            d={`M ${cx - mouthWidth * 0.6} ${mouthY + 2} Q ${cx} ${mouthY - 2} ${cx + mouthWidth * 0.6} ${mouthY + 2}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={config.strokeWidth * 0.8}
            fill="none"
            strokeLinecap="round"
          />
        );
      default: // happy, waving, teaching, explaining, looking-up
        return (
          <path
            d={`M ${cx - mouthWidth * 0.7} ${mouthY} Q ${cx} ${mouthY + mouthWidth * 0.8} ${cx + mouthWidth * 0.7} ${mouthY}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={config.strokeWidth * 0.8}
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

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
        <g>
          <rect
            x={config.width * 0.1}
            y={svgHeight - 16}
            width={config.width * 0.8}
            height={12}
            rx={4}
            fill="hsl(var(--primary))"
            opacity={0.3}
          />
          <rect
            x={config.width * 0.1}
            y={svgHeight - 16}
            width={config.width * 0.8}
            height={12}
            rx={4}
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            fill="none"
            opacity={0.5}
          />
        </g>
      )}

      {/* Sweat drops */}
      {expression === "sweating" && (
        <motion.g animate={sweatControls}>
          <ellipse
            cx={cx + config.headSize + 4}
            cy={headY - config.headSize * 0.3}
            rx={3}
            ry={5}
            fill="hsl(var(--primary))"
            opacity={0.7}
          />
        </motion.g>
      )}

      {/* Thinking bubbles */}
      {expression === "thinking" && (
        <g opacity={0.5}>
          <circle cx={cx + config.headSize + 8} cy={headY - config.headSize - 5} r={3} fill="hsl(var(--foreground))" />
          <circle cx={cx + config.headSize + 14} cy={headY - config.headSize - 12} r={4} fill="hsl(var(--foreground))" />
          <circle cx={cx + config.headSize + 22} cy={headY - config.headSize - 20} r={5} fill="hsl(var(--foreground))" />
        </g>
      )}

      {/* Head */}
      <motion.circle
        cx={cx}
        cy={headY}
        r={config.headSize}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        fill="none"
        animate={animate && expression === "looking-up" ? { y: -3 } : { y: 0 }}
      />

      {/* Glasses - Babai's signature accessory */}
      <g stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.7} fill="none">
        {/* Left lens */}
        <rect
          x={cx - config.headSize * 0.65}
          y={headY - config.headSize * 0.35}
          width={config.headSize * 0.5}
          height={config.headSize * 0.45}
          rx={config.headSize * 0.08}
        />
        {/* Right lens */}
        <rect
          x={cx + config.headSize * 0.15}
          y={headY - config.headSize * 0.35}
          width={config.headSize * 0.5}
          height={config.headSize * 0.45}
          rx={config.headSize * 0.08}
        />
        {/* Bridge */}
        <line
          x1={cx - config.headSize * 0.15}
          y1={headY - config.headSize * 0.12}
          x2={cx + config.headSize * 0.15}
          y2={headY - config.headSize * 0.12}
        />
        {/* Temple arms */}
        <line
          x1={cx - config.headSize * 0.65}
          y1={headY - config.headSize * 0.2}
          x2={cx - config.headSize * 0.9}
          y2={headY - config.headSize * 0.15}
        />
        <line
          x1={cx + config.headSize * 0.65}
          y1={headY - config.headSize * 0.2}
          x2={cx + config.headSize * 0.9}
          y2={headY - config.headSize * 0.15}
        />
      </g>

      {/* Eyes (inside glasses) */}
      {getEyes()}

      {/* Eyebrows */}
      <g stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.6} strokeLinecap="round">
        <line
          x1={cx - config.headSize * 0.55}
          y1={headY - config.headSize * 0.5}
          x2={cx - config.headSize * 0.2}
          y2={headY - config.headSize * (expression === "warning" ? 0.55 : 0.48)}
        />
        <line
          x1={cx + config.headSize * 0.2}
          y1={headY - config.headSize * (expression === "warning" ? 0.55 : 0.48)}
          x2={cx + config.headSize * 0.55}
          y2={headY - config.headSize * 0.5}
        />
      </g>

      {/* Mouth */}
      {getMouth()}

      {/* Hair - distinctive messy style */}
      <g stroke="hsl(var(--foreground))" strokeWidth={config.strokeWidth * 0.9} strokeLinecap="round">
        <line
          x1={cx - config.headSize * 0.5}
          y1={headY - config.headSize + 2}
          x2={cx - config.headSize * 0.6}
          y2={headY - config.headSize - 8}
        />
        <line
          x1={cx - config.headSize * 0.15}
          y1={headY - config.headSize}
          x2={cx - config.headSize * 0.2}
          y2={headY - config.headSize - 10}
        />
        <line
          x1={cx + config.headSize * 0.15}
          y1={headY - config.headSize}
          x2={cx + config.headSize * 0.15}
          y2={headY - config.headSize - 11}
        />
        <line
          x1={cx + config.headSize * 0.5}
          y1={headY - config.headSize + 2}
          x2={cx + config.headSize * 0.55}
          y2={headY - config.headSize - 7}
        />
      </g>

      {/* Neck */}
      <line
        x1={cx}
        y1={neckY}
        x2={cx}
        y2={shoulderY}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
      />

      {/* Body */}
      <line
        x1={cx}
        y1={shoulderY}
        x2={cx}
        y2={bodyEndY}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <line
        x1={cx}
        y1={shoulderY + 5}
        x2={config.width * 0.2}
        y2={bodyEndY - 10}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Right Arm with pointer (for teaching) */}
      <motion.g
        animate={armControls}
        style={{
          originX: `${cx}px`,
          originY: `${shoulderY + 5}px`,
          transformBox: "fill-box",
        }}
      >
        <line
          x1={cx}
          y1={shoulderY + 5}
          x2={hasPointer ? config.width * 0.85 : config.width * 0.8}
          y2={hasPointer ? shoulderY - 15 : bodyEndY - 10}
          stroke="hsl(var(--foreground))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Teaching pointer/stick */}
        {hasPointer && (
          <motion.g animate={pointerControls}>
            <line
              x1={config.width * 0.85}
              y1={shoulderY - 15}
              x2={config.width * 0.95}
              y2={shoulderY - 35}
              stroke="hsl(var(--primary))"
              strokeWidth={config.strokeWidth * 1.2}
              strokeLinecap="round"
            />
            {/* Pointer tip glow */}
            <circle
              cx={config.width * 0.95}
              cy={shoulderY - 35}
              r={3}
              fill="hsl(var(--primary))"
            />
          </motion.g>
        )}
      </motion.g>

      {/* Legs */}
      <line
        x1={cx}
        y1={bodyEndY}
        x2={config.width * 0.3}
        y2={isOnPlatform ? svgHeight - 18 : legEndY}
        stroke="hsl(var(--foreground))"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={bodyEndY}
        x2={config.width * 0.7}
        y2={isOnPlatform ? svgHeight - 18 : legEndY}
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
        <div
          className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-r-2 border-b-2 border-border rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        />
      </motion.div>
    );
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {renderBubble()}
      <motion.div
        className="relative"
        animate={animate ? { y: [0, -5, 0] } : {}}
        transition={animate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {renderCharacter()}
      </motion.div>
    </div>
  );
}

export default Babai;
