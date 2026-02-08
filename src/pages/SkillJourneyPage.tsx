import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import StarBackground from "@/components/journey/StarBackground";
import ModuleCard, { Module } from "@/components/journey/ModuleCard";
import CurvedPath from "@/components/journey/CurvedPath";
import { Trophy, Flame, Zap, X } from "lucide-react";

const generateModules = (): Module[] => [
  { id: 1, title: "Opening Credits", subtitle: "Welcome to Python", status: "completed", isFree: true },
  { id: 2, title: "Input/Output", subtitle: "Print & Read data", status: "completed", isFree: true },
  { id: 3, title: "Variables in Python", subtitle: "Store your data", status: "completed", isFree: true },
  { id: 4, title: "Datatypes in Python", subtitle: "Numbers, strings & more", status: "current", isFree: true },
  { id: 5, title: "Conditional Statements", subtitle: "If, elif, else", status: "locked", isFree: true },
  { id: 6, title: "Loops in Python", subtitle: "For & while loops", status: "locked", isFree: true },
  { id: 7, title: "Functions", subtitle: "Write reusable code", status: "locked", isFree: false },
  { id: 8, title: "Lists & Tuples", subtitle: "Collection types", status: "locked", isFree: false },
  { id: 9, title: "Dictionaries", subtitle: "Key-value pairs", status: "locked", isFree: false },
  { id: 10, title: "Final Project", subtitle: "Build something cool!", status: "locked", isFree: false },
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
  const [showLockedMessage, setShowLockedMessage] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const courseName = courseNames[skillId || ""] || "Course";
  const modules = generateModules();

  const completedCount = modules.filter((m) => m.status === "completed").length;
  const currentIndex = modules.findIndex((m) => m.status === "current");
  const progress = Math.round(((completedCount + (currentIndex >= 0 ? 0.5 : 0)) / modules.length) * 100);

  const handleModuleClick = (module: Module) => {
    if (module.status === "locked" && !module.isFree) {
      setShowPaywall(true);
    } else if (module.status !== "locked") {
      navigate(`/skill/${skillId}/lesson/${module.id}`);
    }
  };

  const handleLockedClick = () => {
    setShowLockedMessage(true);
    setTimeout(() => setShowLockedMessage(false), 2500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <Header />

      <main className="relative z-10 pt-24 pb-32 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              <span className="text-gradient">{courseName}</span>
              <span className="text-foreground"> Quest</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete all modules to become a {courseName} master!
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-display font-bold text-foreground">{completedCount}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-display font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-display font-bold text-foreground">{progress}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-12 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-muted/50 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(142 76% 40%), hsl(25 95% 53%), hsl(263 84% 60%))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  />
                  {/* Shine */}
                  <motion.div
                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: [-64, 400] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                  />
                </div>
              </div>
              <span className="text-foreground font-display font-bold text-lg">{progress}%</span>
            </div>
          </motion.div>

          {/* Roadmap */}
          <div className="relative" ref={roadmapRef}>
            {/* Curved path connecting cards */}
            <CurvedPath
              nodeCount={modules.length}
              currentIndex={currentIndex >= 0 ? currentIndex : completedCount}
              containerRef={roadmapRef}
            />

            {/* Module cards */}
            <div className="relative z-10 flex flex-col gap-12 py-8">
              {modules.map((module, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={module.id} data-module-card>
                    <ModuleCard
                      module={module}
                      index={index}
                      isLeft={isLeft}
                      onClick={() => handleModuleClick(module)}
                      onLockedClick={handleLockedClick}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* End message */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-accent/30">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                Finish all modules to earn your <span className="text-accent font-bold">{courseName} Certificate</span>!
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Babai - Fixed bottom right */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Babai
            expression="teaching"
            message="Baagundhi ra! Munde module yedhi? 💪"
            size="md"
          />
        </motion.div>
      </motion.div>

      {/* Locked message toast */}
      <AnimatePresence>
        {showLockedMessage && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-card/95 backdrop-blur-sm border border-primary/50 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <p className="text-foreground text-sm font-medium">
              🔒 Complete the previous module first!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md w-full rounded-3xl bg-gradient-to-br from-card via-card to-muted/30 border border-border/50 p-8 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <Babai
                expression="thinking"
                message="Nee journey baagundhi ra… Ee door open cheyyali ante chinna support kavali."
                size="md"
              />

              <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <p className="text-muted-foreground text-sm mb-2">Your Progress</p>
                <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(142 76% 40%), hsl(25 95% 53%))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="text-foreground font-bold">{progress}% Complete</p>
              </div>

              <p className="mt-6 text-foreground">
                Unlock all remaining modules and complete your{" "}
                <span className="text-primary font-bold">{courseName}</span> mastery!
              </p>

              <div className="mt-6 space-y-3">
                <GameButton size="lg" className="w-full">
                  🔓 Unlock Full Course - ₹149
                </GameButton>
                <GameButton variant="secondary" size="md" className="w-full" onClick={() => setShowPaywall(false)}>
                  Continue Free Modules
                </GameButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillJourneyPage;
