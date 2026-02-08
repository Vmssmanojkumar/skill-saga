import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import LevelNode, { Level } from "@/components/journey/LevelNode";
import { Trophy, Flame, Zap } from "lucide-react";

const generateLevels = (): Level[] => [
  { id: 1, title: "Introduction", status: "completed", isFree: true },
  { id: 2, title: "Getting Started", status: "completed", isFree: true },
  { id: 3, title: "Basic Concepts", status: "completed", isFree: true },
  { id: 4, title: "First Project", status: "active", isFree: true },
  { id: 5, title: "Practice Time", status: "locked", isFree: true },
  { id: 6, title: "Challenge #1", status: "locked", isFree: true },
  { id: 7, title: "Advanced Basics", status: "locked", isFree: false },
  { id: 8, title: "Real Project", status: "locked", isFree: false },
  { id: 9, title: "Expert Tips", status: "locked", isFree: false },
  { id: 10, title: "Final Boss", status: "locked", isFree: false },
];

const courseNames: Record<string, string> = {
  python: "Python",
  mysql: "MySQL",
  "web-design": "Web Designing",
  django: "Django",
};

export function SkillJourneyPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [showPaywall, setShowPaywall] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("");
  
  const courseName = courseNames[skillId || ""] || "Course";
  const levels = generateLevels();
  
  const completedCount = levels.filter(l => l.status === "completed").length;
  const activeIndex = levels.findIndex(l => l.status === "active");
  const progress = Math.round((completedCount / levels.length) * 100);

  // Calculate SVG path based on level positions
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      
      const nodes = containerRef.current.querySelectorAll('[data-level-node]');
      if (nodes.length < 2) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const positions: { x: number; y: number }[] = [];
      
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        positions.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      });

      // Create smooth curved path
      let d = `M ${positions[0].x} ${positions[0].y}`;
      
      for (let i = 1; i < positions.length; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
      
      setPathD(d);
    };

    // Wait for layout to settle
    const timer = setTimeout(updatePath, 100);
    window.addEventListener('resize', updatePath);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePath);
    };
  }, [levels]);

  const handleLevelClick = (level: Level) => {
    if (level.status === "locked" && !level.isFree) {
      setShowPaywall(true);
    } else if (level.status !== "locked") {
      navigate(`/skill/${skillId}/lesson/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />

      <main className="pt-24 pb-16 px-4 relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
              <span className="text-gradient">{courseName}</span>
              <span className="text-foreground"> Journey</span>
            </h1>
            <p className="text-muted-foreground">
              Complete levels to master {courseName}!
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="game-card p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-display font-bold text-foreground">{completedCount}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="game-card p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-display font-bold text-foreground">3</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="game-card p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-display font-bold text-foreground">{progress}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            className="mb-12 bg-secondary/50 rounded-2xl p-4 border border-border/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-4 bg-muted rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-80, 300] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </div>
              </div>
              <span className="text-foreground font-display font-bold text-lg min-w-[50px] text-right">
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* Journey Map */}
          <div className="relative" ref={containerRef}>
            {/* SVG Path connecting nodes */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background path (dashed) */}
              {pathD && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity={0.25}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              )}

              {/* Completed path (solid with glow) */}
              {pathD && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (activeIndex + 1) / levels.length }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                />
              )}
            </svg>

            {/* Level Nodes */}
            <div className="relative z-10 flex flex-col gap-8 py-4">
              {levels.map((level, index) => {
                const isLeft = index % 2 === 0;
                const isActive = level.status === "active";
                
                return (
                  <div key={level.id} className="relative">
                    {/* Babai appears at active level */}
                    {isActive && (
                      <motion.div
                        className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        <Babai 
                          expression="teaching"
                          message="Ikkade unnav ra! Keep going! 💪"
                          size="sm"
                        />
                      </motion.div>
                    )}
                    
                    <div 
                      data-level-node
                      className={`flex ${isLeft ? 'justify-start pl-4 md:pl-8' : 'justify-end pr-4 md:pr-8'}`}
                    >
                      <div className="w-full max-w-sm">
                        <LevelNode
                          level={level}
                          index={index}
                          isLeft={isLeft}
                          onClick={() => handleLevelClick(level)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* End Trophy */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Complete all levels to earn your {courseName} certificate!
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Paywall Modal */}
      {showPaywall && (
        <motion.div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="game-card max-w-md w-full p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Babai 
              expression="thinking"
              message="Nee journey almost ready ra… Ee door open cheyyali ante chinna support kavali."
              size="md"
            />
            
            <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border/50">
              <p className="text-muted-foreground text-sm mb-2">Your Progress</p>
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-foreground font-bold">{progress}% Complete</p>
            </div>

            <p className="mt-6 text-foreground">
              Unlock all remaining levels and complete your {courseName} mastery!
            </p>

            <div className="mt-6 space-y-3">
              <GameButton size="lg" className="w-full">
                🔓 Unlock Full Course - ₹149
              </GameButton>
              <GameButton 
                variant="secondary" 
                size="md" 
                className="w-full"
                onClick={() => setShowPaywall(false)}
              >
                Continue Free Levels
              </GameButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default SkillJourneyPage;