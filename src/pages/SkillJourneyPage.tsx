import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import { cn } from "@/lib/utils";
import { Lock, Check, Play } from "lucide-react";

interface Level {
  id: number;
  title: string;
  status: "locked" | "active" | "completed";
  isFree: boolean;
  size: "small" | "medium" | "large";
}

const generateLevels = (courseName: string): Level[] => [
  { id: 1, title: "Introduction", status: "completed", isFree: true, size: "large" },
  { id: 2, title: "Getting Started", status: "completed", isFree: true, size: "medium" },
  { id: 3, title: "Basic Concepts", status: "completed", isFree: true, size: "small" },
  { id: 4, title: "First Project", status: "active", isFree: true, size: "large" },
  { id: 5, title: "Practice Time", status: "locked", isFree: true, size: "medium" },
  { id: 6, title: "Challenge #1", status: "locked", isFree: true, size: "small" },
  { id: 7, title: "Advanced Basics", status: "locked", isFree: false, size: "large" },
  { id: 8, title: "Real Project", status: "locked", isFree: false, size: "medium" },
  { id: 9, title: "Expert Tips", status: "locked", isFree: false, size: "small" },
  { id: 10, title: "Final Boss", status: "locked", isFree: false, size: "large" },
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
  
  const courseName = courseNames[skillId || ""] || "Course";
  const levels = generateLevels(courseName);
  
  const completedCount = levels.filter(l => l.status === "completed").length;
  const progress = Math.round((completedCount / levels.length) * 100);

  const handleLevelClick = (level: Level) => {
    if (level.status === "locked" && !level.isFree) {
      setShowPaywall(true);
    } else if (level.status !== "locked") {
      navigate(`/skill/${skillId}/lesson/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4 relative">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(25 95% 53%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
              <span className="text-gradient">{courseName}</span> Journey
            </h1>
            <p className="text-muted-foreground">
              Complete levels to master {courseName}!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-secondary rounded-full p-1">
            <div className="flex items-center gap-4 px-4 py-2">
              <div className="flex-1">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <span className="text-foreground font-display font-bold">
                {progress}%
              </span>
            </div>
          </div>

          {/* Journey Map */}
          <div className="relative py-8">
            {/* Curved Path */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <line 
                x1="50%" 
                y1="0" 
                x2="50%" 
                y2="100%" 
                stroke="hsl(25 95% 53% / 0.3)" 
                strokeWidth="4"
                strokeDasharray="10 10"
              />
            </svg>

            {/* Level Nodes */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {levels.map((level, index) => {
                const isLeft = index % 2 === 0;
                const nodeSize = level.size === "large" ? "w-20 h-20" : level.size === "medium" ? "w-16 h-16" : "w-14 h-14";
                
                return (
                  <div 
                    key={level.id}
                    className={cn(
                      "flex items-center gap-4 w-full max-w-md",
                      isLeft ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    {/* Level Node */}
                    <button
                      onClick={() => handleLevelClick(level)}
                      disabled={level.status === "locked"}
                      className={cn(
                        "level-node rounded-full flex items-center justify-center font-display font-bold text-xl border-4 transition-all",
                        nodeSize,
                        level.status === "completed" && "bg-success border-success text-success-foreground glow-success",
                        level.status === "active" && "bg-primary border-primary text-primary-foreground animate-pulse-glow",
                        level.status === "locked" && !level.isFree && "bg-locked border-locked text-locked-foreground opacity-50",
                        level.status === "locked" && level.isFree && "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      {level.status === "completed" && <Check className="w-6 h-6" />}
                      {level.status === "active" && <Play className="w-6 h-6" />}
                      {level.status === "locked" && !level.isFree && <Lock className="w-5 h-5" />}
                      {level.status === "locked" && level.isFree && level.id}
                    </button>

                    {/* Level Info */}
                    <div className={cn(
                      "flex-1",
                      isLeft ? "text-left" : "text-right"
                    )}>
                      <h3 className={cn(
                        "font-display font-bold",
                        level.status === "locked" && !level.isFree && "text-muted-foreground"
                      )}>
                        Level {level.id}: {level.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {level.isFree ? (
                          <span className="text-xs text-success">FREE</span>
                        ) : (
                          <span className="text-xs text-locked-foreground flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Babai at current level */}
            <div className="absolute top-[calc(25%)] right-4 hidden lg:block">
              <Babai 
                expression="happy"
                message="Ikkade unnav ra! Keep going! 💪"
                size="sm"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="game-card max-w-md w-full p-8 text-center animate-scale-in">
            <Babai 
              expression="thinking"
              message="Nee journey almost ready ra… Ee door open cheyyali ante chinna support kavali."
              size="md"
            />
            
            <div className="mt-6 p-4 bg-secondary rounded-lg">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillJourneyPage;
