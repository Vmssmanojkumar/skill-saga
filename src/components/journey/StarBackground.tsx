import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export function StarBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cosmic gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(263 84% 15% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(263 84% 10% / 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(280 60% 8% / 0.5) 0%, transparent 70%),
            linear-gradient(180deg, hsl(270 50% 5%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)
          `
        }}
      />
      
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Occasional shooting stars */}
      <motion.div
        className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{ top: "20%", left: "-10%" }}
        animate={{
          x: ["0vw", "120vw"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{ top: "60%", left: "-10%", transform: "rotate(-15deg)" }}
        animate={{
          x: ["0vw", "120vw"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 12,
          delay: 5,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

export default StarBackground;
