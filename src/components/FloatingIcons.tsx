import { motion } from "framer-motion";
import { Database, Cpu, Globe, Code, Terminal, Zap } from "lucide-react";

const icons = [
  { Icon: Database, delay: 0, x: -120, y: -80 },
  { Icon: Cpu, delay: 0.5, x: 130, y: -60 },
  { Icon: Globe, delay: 1, x: -100, y: 120 },
  { Icon: Code, delay: 1.5, x: 110, y: 100 },
  { Icon: Terminal, delay: 2, x: -60, y: 0 },
  { Icon: Zap, delay: 2.5, x: 80, y: 30 },
];

interface FloatingIconsProps {
  className?: string;
}

export function FloatingIcons({ className }: FloatingIconsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1, 0.8],
            x: [x - 10, x + 10, x - 10],
            y: [y - 10, y + 10, y - 10],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div 
              className="absolute inset-0 blur-xl opacity-50"
              style={{ 
                background: index % 2 === 0 
                  ? "hsl(var(--primary))" 
                  : "hsl(var(--magic))" 
              }}
            />
            <Icon 
              className="relative z-10"
              size={32} 
              style={{ 
                color: index % 2 === 0 
                  ? "hsl(var(--primary))" 
                  : "hsl(var(--magic))" 
              }}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingIcons;