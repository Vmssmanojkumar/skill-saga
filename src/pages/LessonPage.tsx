import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sensei from "@/components/Sensei";
import GameButton from "@/components/GameButton";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";

interface LessonSection {
  id: number;
  type: "story" | "explanation" | "code" | "challenge" | "babai";
  title?: string;
  content: string;
  code?: string;
}

const lessonContent: LessonSection[] = [
  {
    id: 1,
    type: "story",
    title: "Scene 1: The Beginning",
    content: "Imagine you're in a world where computers only understand numbers. But you want to talk to them in a language they understand. That language... is Python. 🐍",
  },
  {
    id: 2,
    type: "babai",
    content: "Python ante snake kaadu ra! Idi programming language. Simple ga, powerful ga untundi!",
  },
  {
    id: 3,
    type: "explanation",
    title: "What is Python?",
    content: "Python is a programming language created to be easy to read and write. Unlike other languages that look like alien code, Python looks almost like English!",
  },
  {
    id: 4,
    type: "code",
    title: "Your First Code",
    content: "Let's write your very first line of Python code. We'll make the computer say 'Hello!'",
    code: 'print("Hello, World!")\n\n# Output: Hello, World!',
  },
  {
    id: 5,
    type: "babai",
    content: "Chusava? Single line tho computer matladthundi! Magic kaadu, idi Python power! 🔥",
  },
  {
    id: 6,
    type: "challenge",
    title: "🎯 Mini Challenge",
    content: "Now it's your turn! Try to make the computer say your name. What would you change in the code above?",
  },
  {
    id: 7,
    type: "story",
    title: "Scene 2: Variables - The Memory Boxes",
    content: "Every program needs to remember things. Think of variables as labeled boxes where you can store information.",
  },
  {
    id: 8,
    type: "code",
    title: "Creating Variables",
    content: "Here's how you create a variable in Python:",
    code: 'name = "Raju"\nage = 20\nprint(name)\nprint(age)\n\n# Output:\n# Raju\n# 20',
  },
];

const courseNames: Record<string, string> = {
  python: "Python",
  mysql: "MySQL",
  "web-design": "Web Designing",
  django: "Django",
};

export function LessonPage() {
  const { skillId, lessonId } = useParams<{ skillId: string; lessonId: string }>();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const courseName = courseNames[skillId || ""] || "Course";
  const progress = Math.round(((currentSection + 1) / lessonContent.length) * 100);

  useEffect(() => {
    // Mark section as completed when viewed
    if (!completedSections.includes(currentSection)) {
      setCompletedSections(prev => [...prev, currentSection]);
    }
  }, [currentSection]);

  const handleNext = () => {
    if (currentSection < lessonContent.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete!
      setShowConfetti(true);
      setTimeout(() => {
        navigate(`/skill/${skillId}`);
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const section = lessonContent[currentSection];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {courseName} - Level {lessonId}
              </span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Section indicators */}
            <div className="flex gap-1 mt-2">
              {lessonContent.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 h-1 rounded-full transition-all",
                    index === currentSection && "bg-primary",
                    index < currentSection && "bg-success",
                    index > currentSection && "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="animate-fade-in" key={currentSection}>
            {section.type === "story" && (
              <div className="game-card p-8">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            )}

            {section.type === "babai" && (
              <div className="flex flex-col items-center py-8">
                <Sensei 
                  expression="excited"
                  message={section.content}
                  size="lg"
                />
              </div>
            )}

            {section.type === "explanation" && (
              <div className="game-card p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            )}

            {section.type === "code" && (
              <div className="game-card p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {section.content}
                </p>
                <pre className="bg-background border border-border rounded-xl p-6 overflow-x-auto">
                  <code className="text-sm text-primary font-mono">
                    {section.code}
                  </code>
                </pre>
              </div>
            )}

            {section.type === "challenge" && (
              <div className="game-card p-8 border-2 border-primary">
                <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                  {section.title}
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {section.content}
                </p>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Hint: Think about what part of the code controls what gets displayed...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-4">
        <div className="container mx-auto max-w-3xl flex items-center justify-between">
          <GameButton
            variant="secondary"
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </GameButton>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{currentSection + 1}</span>
            <span>/</span>
            <span>{lessonContent.length}</span>
          </div>

          <GameButton
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            {currentSection === lessonContent.length - 1 ? (
              <>
                Complete <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                Next <ChevronRight className="w-5 h-5" />
              </>
            )}
          </GameButton>
        </div>
      </div>

      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="text-center animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <Sensei 
              expression="proud"
              message="Super ra! Level complete chesav! Next level unlock ayindi!"
              size="lg"
            />
            <p className="mt-6 text-muted-foreground">
              Returning to journey map...
            </p>
          </div>
          
          {/* Confetti particles */}
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["hsl(25, 95%, 53%)", "hsl(142, 76%, 40%)", "hsl(35, 100%, 50%)"][Math.floor(Math.random() * 3)],
                  animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;
