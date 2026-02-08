import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Sensei from "@/components/Sensei";
import GameButton from "@/components/GameButton";
import { cn } from "@/lib/utils";
import { 
  Star, 
  Users, 
  Clock, 
  Play, 
  Lock, 
  CheckCircle2, 
  Zap,
  BookOpen,
  Trophy,
  Target
} from "lucide-react";

interface CourseData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  originalPrice: string;
  rating: number;
  reviewCount: number;
  studentCount: string;
  duration: string;
  lessonsCount: number;
  freePercent: number;
  gradient: string;
  modules: { title: string; lessons: number; duration: string; isFree: boolean }[];
  features: string[];
}

const courseDatabase: Record<string, CourseData> = {
  python: {
    id: "python",
    name: "Python Full Stack",
    subtitle: "YOUR LEGEND BEGINS",
    description: "Master Python from zero to hero with hands-on projects. Learn variables, functions, OOP, and build real-world applications with our gamified approach.",
    difficulty: "Beginner",
    price: "₹479",
    originalPrice: "₹3,099",
    rating: 4.8,
    reviewCount: 12450,
    studentCount: "15,000+",
    duration: "12 hours",
    lessonsCount: 45,
    freePercent: 35,
    gradient: "from-blue-500 to-cyan-500",
    modules: [
      { title: "Opening Credits – Python", lessons: 3, duration: "30 min", isFree: true },
      { title: "Input / Output – Python", lessons: 4, duration: "45 min", isFree: true },
      { title: "Variables in Python", lessons: 5, duration: "1 hr", isFree: true },
      { title: "Datatypes in Python", lessons: 6, duration: "1.5 hr", isFree: false },
      { title: "Control Flow & Loops", lessons: 8, duration: "2 hr", isFree: false },
      { title: "Functions & Modules", lessons: 7, duration: "2 hr", isFree: false },
      { title: "Object Oriented Python", lessons: 6, duration: "2 hr", isFree: false },
      { title: "Final Boss Project", lessons: 6, duration: "3 hr", isFree: false },
    ],
    features: [
      "45+ Interactive Lessons",
      "Real-world Projects",
      "Certificate of Completion",
      "Lifetime Access",
      "Community Support",
      "Telugu + English Content"
    ],
  },
  mysql: {
    id: "mysql",
    name: "MySQL Mystery: Zero to Hero",
    subtitle: "UNLOCK THE DATA",
    description: "Become a database wizard! Learn SQL queries, joins, optimization, and design databases like a pro. Perfect for aspiring developers.",
    difficulty: "Beginner",
    price: "₹399",
    originalPrice: "₹2,499",
    rating: 4.6,
    reviewCount: 8920,
    studentCount: "8,000+",
    duration: "8 hours",
    lessonsCount: 32,
    freePercent: 40,
    gradient: "from-orange-500 to-yellow-500",
    modules: [
      { title: "Database Basics", lessons: 4, duration: "40 min", isFree: true },
      { title: "Your First Queries", lessons: 5, duration: "1 hr", isFree: true },
      { title: "Filtering & Sorting", lessons: 4, duration: "45 min", isFree: true },
      { title: "Joins & Relations", lessons: 6, duration: "1.5 hr", isFree: false },
      { title: "Advanced Queries", lessons: 5, duration: "1.5 hr", isFree: false },
      { title: "Database Design", lessons: 4, duration: "1 hr", isFree: false },
      { title: "Real Project", lessons: 4, duration: "1.5 hr", isFree: false },
    ],
    features: [
      "32+ Interactive Lessons",
      "Practice Database Included",
      "Certificate of Completion",
      "Lifetime Access",
      "Query Playground",
      "Telugu + English Content"
    ],
  },
  "web-design": {
    id: "web-design",
    name: "Web Wizardry: HTML, CSS & JS",
    subtitle: "CREATE BEAUTIFUL WEBSITES",
    description: "Transform your ideas into stunning websites! Master HTML, CSS, and JavaScript with project-based learning.",
    difficulty: "Beginner",
    price: "₹459",
    originalPrice: "₹2,999",
    rating: 4.7,
    reviewCount: 15100,
    studentCount: "20,000+",
    duration: "15 hours",
    lessonsCount: 55,
    freePercent: 30,
    gradient: "from-pink-500 to-rose-500",
    modules: [
      { title: "HTML Foundations", lessons: 6, duration: "1 hr", isFree: true },
      { title: "CSS Styling Magic", lessons: 8, duration: "1.5 hr", isFree: true },
      { title: "Responsive Design", lessons: 5, duration: "1 hr", isFree: false },
      { title: "JavaScript Basics", lessons: 8, duration: "2 hr", isFree: false },
      { title: "DOM Manipulation", lessons: 6, duration: "1.5 hr", isFree: false },
      { title: "Build a Portfolio", lessons: 10, duration: "3 hr", isFree: false },
      { title: "Final Website Project", lessons: 12, duration: "5 hr", isFree: false },
    ],
    features: [
      "55+ Interactive Lessons",
      "5 Complete Projects",
      "Certificate of Completion",
      "Lifetime Access",
      "Live Code Editor",
      "Telugu + English Content"
    ],
  },
  django: {
    id: "django",
    name: "Django Dungeon: Backend Master",
    subtitle: "BUILD POWERFUL APPS",
    description: "Level up from Python to building powerful web applications! Learn Django framework, REST APIs, and deployment.",
    difficulty: "Intermediate",
    price: "₹599",
    originalPrice: "₹3,999",
    rating: 4.9,
    reviewCount: 5340,
    studentCount: "5,000+",
    duration: "18 hours",
    lessonsCount: 48,
    freePercent: 30,
    gradient: "from-green-500 to-emerald-500",
    modules: [
      { title: "Django Setup & Basics", lessons: 4, duration: "45 min", isFree: true },
      { title: "Models & Database", lessons: 6, duration: "1.5 hr", isFree: true },
      { title: "Views & Templates", lessons: 6, duration: "1.5 hr", isFree: false },
      { title: "Forms & Validation", lessons: 5, duration: "1 hr", isFree: false },
      { title: "User Authentication", lessons: 6, duration: "2 hr", isFree: false },
      { title: "REST API with DRF", lessons: 8, duration: "3 hr", isFree: false },
      { title: "Deployment & Production", lessons: 6, duration: "2 hr", isFree: false },
      { title: "Full Stack Project", lessons: 7, duration: "6 hr", isFree: false },
    ],
    features: [
      "48+ Interactive Lessons",
      "3 Complete Web Apps",
      "Certificate of Completion",
      "Lifetime Access",
      "REST API Mastery",
      "Telugu + English Content"
    ],
  },
};

const reviews = [
  { name: "Ravi K.", rating: 5, text: "Best Telugu course ever! Babai's explanations are 🔥" },
  { name: "Priya R.", rating: 5, text: "Got placed after completing this. Worth every rupee!" },
  { name: "Venkat S.", rating: 5, text: "Game-like experience made learning so fun!" },
  { name: "Lakshmi D.", rating: 4, text: "Very practical and hands-on. Highly recommend!" },
];

const difficultyColors = {
  Beginner: "bg-success/20 text-success border-success/30",
  Intermediate: "bg-magic/20 text-magic border-magic/30",
  Advanced: "bg-destructive/20 text-destructive border-destructive/30",
};

export function CourseLandingPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const course = courseDatabase[courseId || "python"] || courseDatabase.python;

  const handleStartQuest = () => {
    navigate(`/skill/${course.id}`);
  };

  const handleLogin = () => {
    navigate(`/login?redirect=/skill/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          {/* Background Effects */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magic/20 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className={cn(
                  "inline-block px-4 py-1.5 rounded-full text-sm font-semibold border mb-4",
                  difficultyColors[course.difficulty]
                )}>
                  {course.difficulty}
                </span>

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                  <span className="text-gradient">{course.name}</span>
                </h1>
                <p className="text-muted-foreground tracking-widest text-sm mb-6">
                  {course.subtitle}
                </p>

                <p className="text-foreground/80 text-lg mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-bold text-foreground">{course.rating}</span>
                    <span className="text-muted-foreground text-sm">({course.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span>{course.studentCount} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-primary">{course.price}</span>
                    <span className="text-xl text-muted-foreground line-through">{course.originalPrice}</span>
                  </div>
                  <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-semibold">
                    {Math.round((1 - parseInt(course.price.slice(1)) / parseInt(course.originalPrice.slice(1))) * 100)}% OFF
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <GameButton size="lg" onClick={handleStartQuest} className="gap-2">
                    <Play className="w-5 h-5" /> Start Quest
                  </GameButton>
                  <GameButton variant="secondary" size="lg" onClick={handleLogin}>
                    Login to Continue
                  </GameButton>
                </div>

                <p className="text-sm text-success mt-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {course.freePercent}% content is FREE — No credit card required!
                </p>
              </motion.div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className={cn(
                  "aspect-video rounded-2xl bg-gradient-to-br p-1",
                  course.gradient
                )}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-lg shadow-primary/30"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </motion.div>
                    
                    {/* Sensei */}
                    <div className="absolute bottom-4 left-4">
                      <Sensei expression="teaching" size="sm" showBubble={false} />
                    </div>
                  </div>
                </div>

                {/* Premium Badge */}
                <div className="absolute -top-3 -right-3 px-4 py-2 bg-magic rounded-full text-white font-bold text-sm flex items-center gap-1 shadow-lg shadow-magic/30">
                  <CheckCircle2 className="w-4 h-4" /> PREMIUM
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {course.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="text-foreground">Course </span>
                <span className="text-gradient">Curriculum</span>
              </h2>
              <p className="text-muted-foreground">
                {course.modules.length} modules • {course.lessonsCount} lessons • {course.duration} total
              </p>
            </div>

            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "game-card p-4 flex items-center gap-4 transition-all",
                    module.isFree ? "border-success/30" : "border-border/30"
                  )}
                >
                  {/* Module Number */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg",
                    module.isFree 
                      ? "bg-success/20 text-success border border-success/30" 
                      : "bg-muted text-muted-foreground border border-border"
                  )}>
                    {module.isFree ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>

                  {/* Module Info */}
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-foreground">
                      {index + 1}. {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {module.lessons} lessons • {module.duration}
                    </p>
                  </div>

                  {/* Free Badge */}
                  {module.isFree && (
                    <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                      FREE
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="text-foreground">Meet Your </span>
                <span className="text-gradient">Guide</span>
              </h2>
            </div>

            <div className="game-card p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <Sensei expression="teaching" size="lg" showBubble={false} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Sensei</h3>
                <p className="text-primary font-semibold mb-4">Your Telugu Tech Mentor</p>
                <p className="text-muted-foreground leading-relaxed">
                  "Nenu coding nerchukunna journey lo struggle chala chesanu ra. Anduke mee journey easy cheyyataniki 
                  ee courses design chesanu. Every concept ni simple ga, Telugu lo explain chesta. Let's learn together! 💪"
                </p>
                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="w-5 h-5 text-warning" />
                    <span>50,000+ Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-5 h-5 text-success" />
                    <span>95% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="text-foreground">Student </span>
                <span className="text-gradient">Reviews</span>
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-6 h-6 text-warning fill-warning" />
                  ))}
                </div>
                <span className="text-xl font-bold text-foreground">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="game-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sensei 
                      expression={index % 2 === 0 ? "happy" : "excited"} 
                      size="sm" 
                      showBubble={false}
                      animate={false}
                    />
                    <div>
                      <h4 className="font-display font-bold text-foreground">{review.name}</h4>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-primary/10">
          <div className="container mx-auto max-w-2xl text-center">
            <Sensei expression="excited" message="Inka wait enduku ra? Let's start! 🚀" size="md" />
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-primary">{course.price}</span>
                <span className="text-xl text-muted-foreground line-through">{course.originalPrice}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <GameButton size="lg" onClick={handleStartQuest} className="gap-2">
                <Play className="w-5 h-5" /> Start Quest Now
              </GameButton>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              30-day money-back guarantee • Lifetime access
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CourseLandingPage;
