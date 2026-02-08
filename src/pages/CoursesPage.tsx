import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sensei from "@/components/Sensei";
import GameButton from "@/components/GameButton";
import { cn } from "@/lib/utils";
import { Lock, Star, Zap, Code, Database, Globe, Server } from "lucide-react";

interface Course {
  id: string;
  name: string;
  icon: React.ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  freePercent: number;
  babaiTip: string;
  color: string;
}

const courses: Course[] = [
  {
    id: "python",
    name: "Python",
    icon: <Code className="w-8 h-8" />,
    difficulty: "Beginner",
    price: "₹149",
    freePercent: 35,
    babaiTip: "Coding start cheyyali ante idhe best ra!",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: <Database className="w-8 h-8" />,
    difficulty: "Beginner",
    price: "₹99",
    freePercent: 40,
    babaiTip: "Data manage cheyyadam nerchukundam!",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "web-design",
    name: "Web Designing",
    icon: <Globe className="w-8 h-8" />,
    difficulty: "Beginner",
    price: "₹199",
    freePercent: 30,
    babaiTip: "Beautiful websites create cheyyali ra!",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "django",
    name: "Django",
    icon: <Server className="w-8 h-8" />,
    difficulty: "Intermediate",
    price: "₹249",
    freePercent: 30,
    babaiTip: "Python tho powerful apps build cheyyali!",
    color: "from-green-500 to-emerald-500",
  },
];

const difficultyColors = {
  Beginner: "bg-success/20 text-success",
  Intermediate: "bg-progress/20 text-progress",
  Advanced: "bg-destructive/20 text-destructive",
};

export function CoursesPage() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    // Navigate to course landing page
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-foreground">Choose Your</span>{" "}
              <span className="text-gradient">Skill Quest</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Pick a skill, complete levels, earn badges. Each course is a game waiting to be played!
            </p>
          </div>

          {/* Sensei Guide */}
          <div className="flex justify-center mb-12">
            <Sensei 
              expression="happy"
              message="Ee skills nerchukunte job guarantee ra! 💪"
              size="md"
            />
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="game-card group cursor-pointer relative overflow-hidden"
              >
                {/* Gradient top bar */}
                <div className={cn(
                  "h-2 w-full bg-gradient-to-r",
                  course.color
                )} />

                <div className="p-6">
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br text-white transition-transform group-hover:scale-110",
                    course.color
                  )}>
                    {course.icon}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {course.name}
                  </h3>

                  {/* Difficulty Badge */}
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3",
                    difficultyColors[course.difficulty]
                  )}>
                    {course.difficulty}
                  </span>

                  {/* Price & Free Content */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-bold text-primary">
                      {course.price}
                    </span>
                    <span className="text-sm text-success flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {course.freePercent}% Free
                    </span>
                  </div>

                  {/* Babai Tip */}
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground italic">
                    💬 "{course.babaiTip}"
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              More courses coming soon! 🚀
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <GameButton variant="secondary" onClick={() => navigate("/signup")}>
                Create Free Account
              </GameButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursesPage;
