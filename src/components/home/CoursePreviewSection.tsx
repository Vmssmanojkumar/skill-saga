import { useNavigate } from "react-router-dom";
import GameButton from "@/components/GameButton";

const courses = [
  {
    id: "python",
    name: "Python",
    emoji: "🐍",
    difficulty: "Beginner",
    lessons: 45,
    students: "2.5k+",
    price: "₹199",
    color: "from-yellow-500/20 to-green-500/20",
    description: "Start your coding journey with the most beginner-friendly language",
  },
  {
    id: "mysql",
    name: "MySQL",
    emoji: "🗄️",
    difficulty: "Intermediate",
    lessons: 32,
    students: "1.8k+",
    price: "₹149",
    color: "from-blue-500/20 to-cyan-500/20",
    description: "Master database management and SQL queries",
  },
  {
    id: "web-design",
    name: "Web Designing",
    emoji: "🎨",
    difficulty: "Beginner",
    lessons: 38,
    students: "3.2k+",
    price: "₹99",
    color: "from-pink-500/20 to-purple-500/20",
    description: "Create beautiful websites with HTML, CSS & JavaScript",
  },
  {
    id: "django",
    name: "Django",
    emoji: "🚀",
    difficulty: "Advanced",
    lessons: 52,
    students: "1.2k+",
    price: "₹299",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Build powerful web applications with Python's best framework",
  },
];

const CoursePreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Popular </span>
            <span className="text-gradient">Skill Paths</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your adventure. Each skill is a journey with story-driven lessons, 
            challenges, and rewards waiting for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="game-card group cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/login")}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50 rounded-2xl`} />
              <div className="relative p-6">
                <div className="text-5xl mb-4">{course.emoji}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {course.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    {course.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-card text-muted-foreground text-xs rounded-full">
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{course.price}</span>
                  <span className="text-xs text-muted-foreground">{course.students} students</span>
                </div>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full py-2 text-center bg-primary/20 text-primary text-sm font-medium rounded-xl">
                    Start Learning →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <GameButton onClick={() => navigate("/courses")}>
            🎮 View All Courses
          </GameButton>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewSection;
