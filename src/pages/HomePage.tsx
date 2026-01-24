import { useState } from "react";
import Header from "@/components/Header";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import InteractiveDots from "@/components/InteractiveDots";
import { useNavigate } from "react-router-dom";

const founderStory = [
  {
    emoji: "💔",
    title: "The Struggle",
    text: "I was a student from a small town. Expensive courses were never an option. YouTube videos felt endless. I wanted to learn skills, not watch entertainment.",
  },
  {
    emoji: "💡",
    title: "The Realization",
    text: "Real learning doesn't need 10-hour videos. It needs stories, challenges, and a friend who guides you. That's when SkillQuest was born.",
  },
  {
    emoji: "🎯",
    title: "Our Mission",
    text: "To make skill learning feel like playing a game. Short lessons. Telugu + English. Affordable. For students who dream big but have limited resources.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <InteractiveDots gridSpacing={35} animationSpeed={0.003} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div 
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(25 95% 53%) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left - Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                <span className="text-foreground">Learn Skills</span>
                <br />
                <span className="text-gradient">Like Playing a Game</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                No boring videos. No expensive courses. Just story-driven lessons, 
                challenges, and Babai guiding you every step of the way.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <GameButton size="lg" onClick={() => navigate("/courses")}>
                  🎮 Explore Courses
                </GameButton>
                <GameButton 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/signup")}
                >
                  ✨ Join Free
                </GameButton>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                {[
                  { value: "30-40%", label: "Free Content" },
                  { value: "₹99", label: "Starting Price" },
                  { value: "Telugu", label: "& English" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Babai */}
            <div className="flex-shrink-0">
              <Babai 
                expression="excited"
                message="Ready to level up your skills? Let's go! 🚀"
                size="xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Why We Built This
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            This isn't just another platform. It's built by students, for students.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {founderStory.map((item, index) => (
              <div
                key={index}
                className="game-card p-6 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.text}
                </p>
                {hoveredCard === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-2xl" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left - Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                <span className="text-primary">Your Guide,</span>{" "}
                <span className="text-foreground">Not Just A Teacher</span>
              </h2>
              
              <p className="text-muted-foreground italic mb-6 text-lg">
                Hey, I'm the founder of SkillQuest, formerly known as a confused student.
              </p>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I began my journey struggling with expensive courses, endless YouTube videos, and zero guidance. 
                I spent years figuring things out the hard way before choosing a different path: building something 
                that actually helps. Today, I run SkillQuest full-time, a platform born from struggle, persistence, 
                and the desire to make learning truly accessible.
              </p>
              
              <div className="mb-8">
                <p className="text-muted-foreground mb-3">Remember:</p>
                <p className="text-primary font-display text-lg mb-2">
                  You don't need a perfect background to build a great future.
                </p>
                <p className="text-primary font-display text-lg mb-2">
                  You just need direction, discipline, and the courage to start.
                </p>
              </div>
              
              <p className="text-muted-foreground italic mb-8">
                Let's move forward, one step, one skill, one leap at a time.
              </p>
              
              <GameButton 
                size="lg"
                onClick={() => navigate("/courses")}
              >
                Get Started Now →
              </GameButton>
              
              {/* Social Proof */}
              <div className="flex flex-col gap-3 mt-8">
                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border w-fit">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">SQ</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">@skillquest</span>
                      <span className="text-destructive text-sm">▶</span>
                      <span className="text-muted-foreground text-sm">Coming Soon</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Story-driven skill courses in Telugu + English</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Babai with badges */}
            <div className="flex-shrink-0 relative">
              <Babai expression="proud" size="xl" showBubble={false} />
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-primary">🎯</span>
                  <span className="text-sm font-medium text-foreground">Built for Students</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-primary">💜</span>
                  <span className="text-sm font-medium text-foreground">Telugu + English</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-primary">🚀</span>
                  <span className="text-sm font-medium text-foreground">Affordable Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Babai Quote Section */}
      <section className="py-20 px-4 relative">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(25 95% 53%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Babai expression="excited" size="lg" showBubble={false} />
          <blockquote className="mt-8 text-2xl md:text-3xl font-display text-foreground italic">
            "Nee journey maname start cheddham ra!"
          </blockquote>
          <p className="mt-4 text-muted-foreground">
            — Babai, Your Learning Companion
          </p>
          <GameButton 
            size="lg" 
            className="mt-8"
            onClick={() => navigate("/courses")}
          >
            Start Learning Now 🎯
          </GameButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>Built with ❤️ for Indian students who dream big</p>
          <p className="mt-2">© 2024 SkillQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
