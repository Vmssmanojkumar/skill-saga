import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export type SenseiExpression = 
  | "happy" 
  | "thinking" 
  | "proud" 
  | "excited" 
  | "waving" 
  | "teaching" 
  | "celebrating" 
  | "surprised"
  | "determined";

interface SenseiProps {
  expression?: SenseiExpression;
  message?: string;
  showBubble?: boolean;
  bubbleType?: "speech" | "thought";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const sizeConfig = {
  sm: { width: 80, height: 120, scale: 0.6, fontSize: "text-xs" },
  md: { width: 120, height: 180, scale: 0.9, fontSize: "text-sm" },
  lg: { width: 160, height: 240, scale: 1.2, fontSize: "text-base" },
  xl: { width: 220, height: 320, scale: 1.6, fontSize: "text-lg" },
};

// Expression configurations
const expressionConfig: Record<SenseiExpression, {
  leftEye: string;
  rightEye: string;
  leftBrow: number;
  rightBrow: number;
  mouth: string;
  blush: boolean;
  sparkles: boolean;
}> = {
  happy: {
    leftEye: "normal",
    rightEye: "normal",
    leftBrow: 0,
    rightBrow: 0,
    mouth: "smile",
    blush: true,
    sparkles: false,
  },
  thinking: {
    leftEye: "normal",
    rightEye: "look-up",
    leftBrow: 2,
    rightBrow: -3,
    mouth: "hmm",
    blush: false,
    sparkles: false,
  },
  proud: {
    leftEye: "closed-happy",
    rightEye: "closed-happy",
    leftBrow: -2,
    rightBrow: -2,
    mouth: "big-smile",
    blush: true,
    sparkles: true,
  },
  excited: {
    leftEye: "star",
    rightEye: "star",
    leftBrow: -4,
    rightBrow: -4,
    mouth: "open-smile",
    blush: true,
    sparkles: true,
  },
  waving: {
    leftEye: "normal",
    rightEye: "wink",
    leftBrow: 0,
    rightBrow: 0,
    mouth: "smile",
    blush: true,
    sparkles: false,
  },
  teaching: {
    leftEye: "normal",
    rightEye: "normal",
    leftBrow: -2,
    rightBrow: -2,
    mouth: "explain",
    blush: false,
    sparkles: false,
  },
  celebrating: {
    leftEye: "closed-happy",
    rightEye: "closed-happy",
    leftBrow: -3,
    rightBrow: -3,
    mouth: "big-smile",
    blush: true,
    sparkles: true,
  },
  surprised: {
    leftEye: "wide",
    rightEye: "wide",
    leftBrow: -5,
    rightBrow: -5,
    mouth: "o",
    blush: false,
    sparkles: false,
  },
  determined: {
    leftEye: "determined",
    rightEye: "determined",
    leftBrow: 3,
    rightBrow: 3,
    mouth: "confident",
    blush: false,
    sparkles: false,
  },
};

export function Sensei({
  expression = "happy",
  message,
  showBubble = true,
  bubbleType = "speech",
  size = "lg",
  className,
  animate = true,
}: SenseiProps) {
  const config = sizeConfig[size];
  const expr = expressionConfig[expression];
  const armControls = useAnimation();
  const bodyControls = useAnimation();
  const sparkleControls = useAnimation();

  useEffect(() => {
    if (expression === "waving" && animate) {
      armControls.start({
        rotate: [0, 20, -15, 20, -15, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      });
    } else if (expression === "teaching" && animate) {
      armControls.start({
        rotate: [0, 10, -5, 10, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    } else if (expression === "celebrating" && animate) {
      armControls.start({
        rotate: [0, 15, -15, 15, -15, 0],
        y: [0, -5, 0, -5, 0],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
      });
      bodyControls.start({
        y: [0, -8, 0],
        transition: { duration: 0.5, repeat: Infinity, ease: "easeOut" },
      });
    } else {
      armControls.stop();
      bodyControls.stop();
    }

    if (expr.sparkles && animate) {
      sparkleControls.start({
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      sparkleControls.stop();
    }
  }, [expression, animate, armControls, bodyControls, sparkleControls, expr.sparkles]);

  const renderEye = (type: string, cx: number, cy: number, isLeft: boolean) => {
    const eyeSize = 8 * config.scale;
    const pupilSize = 4 * config.scale;

    switch (type) {
      case "normal":
        return (
          <g>
            <ellipse cx={cx} cy={cy} rx={eyeSize} ry={eyeSize * 1.1} fill="white" />
            <ellipse cx={cx} cy={cy} rx={eyeSize} ry={eyeSize * 1.1} stroke="hsl(var(--foreground))" strokeWidth={1.5} fill="none" />
            <circle cx={cx + (isLeft ? 1 : -1)} cy={cy} r={pupilSize} fill="hsl(var(--foreground))" />
            <circle cx={cx + (isLeft ? 2.5 : -0.5)} cy={cy - 2} r={pupilSize * 0.4} fill="white" />
          </g>
        );
      case "wink":
        return (
          <path
            d={`M ${cx - eyeSize} ${cy} Q ${cx} ${cy + eyeSize * 0.8} ${cx + eyeSize} ${cy}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "closed-happy":
        return (
          <path
            d={`M ${cx - eyeSize} ${cy + 2} Q ${cx} ${cy - eyeSize * 0.6} ${cx + eyeSize} ${cy + 2}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "star":
        return (
          <g transform={`translate(${cx}, ${cy})`}>
            <polygon
              points="0,-8 2.3,-2.5 8,-2.5 3.5,1.5 5.5,8 0,4 -5.5,8 -3.5,1.5 -8,-2.5 -2.3,-2.5"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--primary))"
              strokeWidth={1}
              transform={`scale(${config.scale * 0.8})`}
            />
          </g>
        );
      case "look-up":
        return (
          <g>
            <ellipse cx={cx} cy={cy} rx={eyeSize} ry={eyeSize * 1.1} fill="white" />
            <ellipse cx={cx} cy={cy} rx={eyeSize} ry={eyeSize * 1.1} stroke="hsl(var(--foreground))" strokeWidth={1.5} fill="none" />
            <circle cx={cx} cy={cy - 3} r={pupilSize} fill="hsl(var(--foreground))" />
          </g>
        );
      case "wide":
        return (
          <g>
            <ellipse cx={cx} cy={cy} rx={eyeSize * 1.2} ry={eyeSize * 1.4} fill="white" />
            <ellipse cx={cx} cy={cy} rx={eyeSize * 1.2} ry={eyeSize * 1.4} stroke="hsl(var(--foreground))" strokeWidth={1.5} fill="none" />
            <circle cx={cx} cy={cy} r={pupilSize * 0.8} fill="hsl(var(--foreground))" />
            <circle cx={cx + 2} cy={cy - 2} r={pupilSize * 0.3} fill="white" />
          </g>
        );
      case "determined":
        return (
          <g>
            <ellipse cx={cx} cy={cy} rx={eyeSize * 0.9} ry={eyeSize * 0.8} fill="white" />
            <ellipse cx={cx} cy={cy} rx={eyeSize * 0.9} ry={eyeSize * 0.8} stroke="hsl(var(--foreground))" strokeWidth={1.5} fill="none" />
            <circle cx={cx + (isLeft ? 1 : -1)} cy={cy} r={pupilSize} fill="hsl(var(--foreground))" />
            <circle cx={cx + (isLeft ? 2 : 0)} cy={cy - 1.5} r={pupilSize * 0.35} fill="white" />
          </g>
        );
      default:
        return (
          <circle cx={cx} cy={cy} r={eyeSize} fill="hsl(var(--foreground))" />
        );
    }
  };

  const renderMouth = (type: string, cx: number, cy: number) => {
    const mouthWidth = 12 * config.scale;

    switch (type) {
      case "smile":
        return (
          <path
            d={`M ${cx - mouthWidth} ${cy} Q ${cx} ${cy + mouthWidth * 0.8} ${cx + mouthWidth} ${cy}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "big-smile":
        return (
          <g>
            <path
              d={`M ${cx - mouthWidth * 1.2} ${cy - 2} Q ${cx} ${cy + mouthWidth * 1.2} ${cx + mouthWidth * 1.2} ${cy - 2}`}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              fill="hsl(346, 77%, 50%)"
              strokeLinecap="round"
            />
            <ellipse cx={cx} cy={cy + mouthWidth * 0.3} rx={mouthWidth * 0.5} ry={mouthWidth * 0.3} fill="hsl(346, 60%, 40%)" />
          </g>
        );
      case "open-smile":
        return (
          <g>
            <ellipse
              cx={cx}
              cy={cy + 2}
              rx={mouthWidth}
              ry={mouthWidth * 0.7}
              fill="hsl(346, 77%, 50%)"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
            />
            <ellipse cx={cx} cy={cy + mouthWidth * 0.4} rx={mouthWidth * 0.6} ry={mouthWidth * 0.25} fill="hsl(346, 60%, 40%)" />
          </g>
        );
      case "o":
        return (
          <ellipse
            cx={cx}
            cy={cy + 2}
            rx={mouthWidth * 0.5}
            ry={mouthWidth * 0.6}
            fill="hsl(346, 77%, 50%)"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
        );
      case "hmm":
        return (
          <path
            d={`M ${cx - mouthWidth * 0.6} ${cy} Q ${cx} ${cy + 3} ${cx + mouthWidth * 0.6} ${cy - 2}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        );
      case "explain":
        return (
          <g>
            <path
              d={`M ${cx - mouthWidth * 0.8} ${cy} Q ${cx} ${cy + mouthWidth * 0.5} ${cx + mouthWidth * 0.8} ${cy}`}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      case "confident":
        return (
          <path
            d={`M ${cx - mouthWidth * 0.8} ${cy} L ${cx + mouthWidth * 0.5} ${cy} Q ${cx + mouthWidth} ${cy} ${cx + mouthWidth} ${cy + 3}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <line
            x1={cx - mouthWidth}
            y1={cy}
            x2={cx + mouthWidth}
            y2={cy}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
        );
    }
  };

  const renderCharacter = () => {
    const baseWidth = 130;
    const baseHeight = 200;
    const scale = config.scale;

    // Key positions
    const headCx = baseWidth / 2;
    const headCy = 45;
    const headRadius = 35;

    return (
      <svg
        width={baseWidth * scale}
        height={baseHeight * scale}
        viewBox={`0 0 ${baseWidth} ${baseHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Glow effect for excited states */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hair-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(25, 95%, 20%)" />
            <stop offset="100%" stopColor="hsl(25, 90%, 10%)" />
          </linearGradient>
          <linearGradient id="hoodie-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(25, 95%, 40%)" />
          </linearGradient>
          <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(30, 60%, 80%)" />
            <stop offset="100%" stopColor="hsl(30, 55%, 70%)" />
          </linearGradient>
        </defs>

        {/* Sparkles for excited/proud expressions */}
        {expr.sparkles && (
          <g>
            {[
              { x: 15, y: 30, delay: 0 },
              { x: 115, y: 35, delay: 0.3 },
              { x: 25, y: 80, delay: 0.6 },
              { x: 105, y: 90, delay: 0.9 },
            ].map((sparkle, i) => (
              <motion.g
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={sparkleControls}
                transition={{ delay: sparkle.delay }}
              >
                <polygon
                  points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5"
                  fill="hsl(var(--primary))"
                  transform={`translate(${sparkle.x}, ${sparkle.y})`}
                />
              </motion.g>
            ))}
          </g>
        )}

        {/* Thinking cloud */}
        {expression === "thinking" && (
          <g opacity={0.6}>
            <circle cx={100} cy={20} r={4} fill="hsl(var(--muted-foreground))" />
            <circle cx={110} cy={12} r={5} fill="hsl(var(--muted-foreground))" />
            <circle cx={118} cy={5} r={6} fill="hsl(var(--muted-foreground))" />
          </g>
        )}

        <motion.g animate={bodyControls}>
          {/* Body / Hoodie */}
          <path
            d={`
              M ${headCx - 30} 85
              Q ${headCx - 35} 120 ${headCx - 28} 160
              L ${headCx + 28} 160
              Q ${headCx + 35} 120 ${headCx + 30} 85
              Q ${headCx} 75 ${headCx - 30} 85
            `}
            fill="url(#hoodie-gradient)"
            stroke="hsl(25, 95%, 35%)"
            strokeWidth={1.5}
          />

          {/* Hoodie details - front zipper */}
          <line
            x1={headCx}
            y1={85}
            x2={headCx}
            y2={160}
            stroke="hsl(25, 95%, 30%)"
            strokeWidth={2}
          />

          {/* Hoodie pocket */}
          <path
            d={`M ${headCx - 20} 130 Q ${headCx} 135 ${headCx + 20} 130`}
            stroke="hsl(25, 95%, 30%)"
            strokeWidth={1.5}
            fill="none"
          />

          {/* Left Arm */}
          <path
            d={`
              M ${headCx - 30} 90
              Q ${headCx - 45} 110 ${headCx - 40} 140
              Q ${headCx - 38} 145 ${headCx - 35} 140
              Q ${headCx - 32} 115 ${headCx - 25} 95
            `}
            fill="url(#hoodie-gradient)"
            stroke="hsl(25, 95%, 35%)"
            strokeWidth={1}
          />

          {/* Left Hand */}
          <circle cx={headCx - 38} cy={143} r={6} fill="url(#skin-gradient)" stroke="hsl(30, 40%, 60%)" strokeWidth={1} />

          {/* Right Arm (animated) */}
          <motion.g
            animate={armControls}
            style={{ originX: `${headCx + 25}px`, originY: "90px" }}
          >
            <path
              d={`
                M ${headCx + 30} 90
                Q ${headCx + 45} 100 ${headCx + 50} ${expression === "waving" || expression === "teaching" || expression === "celebrating" ? 70 : 140}
                Q ${headCx + 52} ${expression === "waving" || expression === "teaching" || expression === "celebrating" ? 65 : 145} ${headCx + 48} ${expression === "waving" || expression === "teaching" || expression === "celebrating" ? 68 : 140}
                Q ${headCx + 40} 105 ${headCx + 25} 95
              `}
              fill="url(#hoodie-gradient)"
              stroke="hsl(25, 95%, 35%)"
              strokeWidth={1}
            />

            {/* Right Hand */}
            <circle
              cx={headCx + 50}
              cy={expression === "waving" || expression === "teaching" || expression === "celebrating" ? 65 : 143}
              r={6}
              fill="url(#skin-gradient)"
              stroke="hsl(30, 40%, 60%)"
              strokeWidth={1}
            />

            {/* Waving fingers for waving expression */}
            {expression === "waving" && (
              <g fill="url(#skin-gradient)" stroke="hsl(30, 40%, 60%)" strokeWidth={0.5}>
                <ellipse cx={headCx + 48} cy={58} rx={2} ry={4} />
                <ellipse cx={headCx + 51} cy={57} rx={2} ry={5} />
                <ellipse cx={headCx + 54} cy={58} rx={2} ry={4} />
                <ellipse cx={headCx + 56} cy={60} rx={2} ry={3} />
              </g>
            )}

            {/* Teaching pointer */}
            {expression === "teaching" && (
              <g>
                <line
                  x1={headCx + 53}
                  y1={62}
                  x2={headCx + 70}
                  y2={40}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <circle cx={headCx + 70} cy={40} r={4} fill="hsl(var(--primary))" filter="url(#glow)" />
              </g>
            )}
          </motion.g>

          {/* Legs */}
          <g>
            {/* Left Leg */}
            <path
              d={`
                M ${headCx - 15} 158
                L ${headCx - 18} 195
                L ${headCx - 5} 195
                L ${headCx - 5} 160
              `}
              fill="hsl(230, 20%, 25%)"
              stroke="hsl(230, 20%, 20%)"
              strokeWidth={1}
            />
            {/* Left Shoe */}
            <ellipse cx={headCx - 12} cy={196} rx={10} ry={4} fill="hsl(0, 0%, 20%)" />

            {/* Right Leg */}
            <path
              d={`
                M ${headCx + 15} 158
                L ${headCx + 18} 195
                L ${headCx + 5} 195
                L ${headCx + 5} 160
              `}
              fill="hsl(230, 20%, 25%)"
              stroke="hsl(230, 20%, 20%)"
              strokeWidth={1}
            />
            {/* Right Shoe */}
            <ellipse cx={headCx + 12} cy={196} rx={10} ry={4} fill="hsl(0, 0%, 20%)" />
          </g>

          {/* Neck */}
          <rect
            x={headCx - 8}
            y={72}
            width={16}
            height={15}
            fill="url(#skin-gradient)"
          />

          {/* Head */}
          <circle
            cx={headCx}
            cy={headCy}
            r={headRadius}
            fill="url(#skin-gradient)"
            stroke="hsl(30, 40%, 60%)"
            strokeWidth={1.5}
          />

          {/* Hair */}
          <g fill="url(#hair-gradient)">
            {/* Main hair shape */}
            <path
              d={`
                M ${headCx - 32} ${headCy - 5}
                Q ${headCx - 35} ${headCy - 25} ${headCx - 20} ${headCy - 35}
                Q ${headCx - 10} ${headCy - 42} ${headCx} ${headCy - 40}
                Q ${headCx + 10} ${headCy - 42} ${headCx + 20} ${headCy - 35}
                Q ${headCx + 35} ${headCy - 25} ${headCx + 32} ${headCy - 5}
                Q ${headCx + 28} ${headCy - 15} ${headCx} ${headCy - 20}
                Q ${headCx - 28} ${headCy - 15} ${headCx - 32} ${headCy - 5}
              `}
            />
            {/* Spiky bangs */}
            <path d={`M ${headCx - 25} ${headCy - 25} L ${headCx - 30} ${headCy - 45} Q ${headCx - 22} ${headCy - 35} ${headCx - 18} ${headCy - 30}`} />
            <path d={`M ${headCx - 10} ${headCy - 32} L ${headCx - 8} ${headCy - 50} Q ${headCx - 5} ${headCy - 40} ${headCx} ${headCy - 35}`} />
            <path d={`M ${headCx + 5} ${headCy - 34} L ${headCx + 10} ${headCy - 52} Q ${headCx + 12} ${headCy - 42} ${headCx + 15} ${headCy - 32}`} />
            <path d={`M ${headCx + 20} ${headCy - 28} L ${headCx + 28} ${headCy - 42} Q ${headCx + 24} ${headCy - 32} ${headCx + 22} ${headCy - 25}`} />
          </g>

          {/* Face */}
          <g>
            {/* Eyebrows */}
            <path
              d={`M ${headCx - 22} ${headCy - 10 + expr.leftBrow} Q ${headCx - 15} ${headCy - 14 + expr.leftBrow} ${headCx - 8} ${headCy - 10 + expr.leftBrow}`}
              stroke="url(#hair-gradient)"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${headCx + 8} ${headCy - 10 + expr.rightBrow} Q ${headCx + 15} ${headCy - 14 + expr.rightBrow} ${headCx + 22} ${headCy - 10 + expr.rightBrow}`}
              stroke="url(#hair-gradient)"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />

            {/* Eyes */}
            {renderEye(expr.leftEye, headCx - 15, headCy, true)}
            {renderEye(expr.rightEye, headCx + 15, headCy, false)}

            {/* Blush */}
            {expr.blush && (
              <>
                <ellipse cx={headCx - 25} cy={headCy + 10} rx={8} ry={5} fill="hsl(350, 80%, 75%)" opacity={0.4} />
                <ellipse cx={headCx + 25} cy={headCy + 10} rx={8} ry={5} fill="hsl(350, 80%, 75%)" opacity={0.4} />
              </>
            )}

            {/* Mouth */}
            {renderMouth(expr.mouth, headCx, headCy + 20)}
          </g>

          {/* Headphones (optional tech accessory) */}
          <g stroke="hsl(0, 0%, 30%)" strokeWidth={2} fill="none">
            <path
              d={`M ${headCx - 33} ${headCy - 5} Q ${headCx - 38} ${headCy - 25} ${headCx} ${headCy - 38} Q ${headCx + 38} ${headCy - 25} ${headCx + 33} ${headCy - 5}`}
            />
          </g>
          <g fill="hsl(var(--primary))">
            <rect x={headCx - 40} y={headCy - 8} width={10} height={16} rx={4} />
            <rect x={headCx + 30} y={headCy - 8} width={10} height={16} rx={4} />
          </g>
        </motion.g>
      </svg>
    );
  };

  const renderBubble = () => {
    if (!showBubble || !message) return null;

    if (bubbleType === "thought") {
      return (
        <motion.div
          className="relative bg-card/95 backdrop-blur-sm border-2 border-primary/30 rounded-3xl px-5 py-4 max-w-xs shadow-xl"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className={cn("text-foreground font-medium", config.fontSize)}>{message}</p>
          <div className="absolute -bottom-3 left-8 w-5 h-5 bg-card/95 border-2 border-primary/30 rounded-full" />
          <div className="absolute -bottom-7 left-5 w-3 h-3 bg-card/95 border-2 border-primary/30 rounded-full" />
        </motion.div>
      );
    }

    return (
      <motion.div
        className="relative bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border-2 border-primary/40 rounded-2xl px-5 py-4 max-w-xs shadow-xl"
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p className={cn("text-foreground font-medium", config.fontSize)}>{message}</p>
        <div
          className="absolute -bottom-3 left-8 w-5 h-5 bg-card border-r-2 border-b-2 border-primary/40 rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        />
      </motion.div>
    );
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {renderBubble()}
      <motion.div
        className="relative"
        animate={animate && !["celebrating"].includes(expression) ? { y: [0, -6, 0] } : {}}
        transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {renderCharacter()}
      </motion.div>
    </div>
  );
}

export default Sensei;
