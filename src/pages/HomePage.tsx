import Header from "@/components/Header";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import FounderSection from "@/components/FounderSection";
import CoursePreviewSection from "@/components/home/CoursePreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Background glow - subtle */}
        <div 
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 30%) 0%, transparent 70%)",
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
                    <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
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

      {/* Founder's Journey Section */}
      <FounderSection />

      {/* Course Previews */}
      <CoursePreviewSection />

      {/* How It Works & Comparison */}
      <HowItWorksSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">SkillQuest</h4>
              <p className="text-sm text-muted-foreground">
                Learn skills like playing a game. Built for Indian students who dream big.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Python</li>
                <li className="hover:text-primary cursor-pointer">MySQL</li>
                <li className="hover:text-primary cursor-pointer">Web Design</li>
                <li className="hover:text-primary cursor-pointer">Django</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">About Us</li>
                <li className="hover:text-primary cursor-pointer">Careers</li>
                <li className="hover:text-primary cursor-pointer">Blog</li>
                <li className="hover:text-primary cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Help Center</li>
                <li className="hover:text-primary cursor-pointer">Community</li>
                <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
            <p>Built with ❤️ for Indian students who dream big</p>
            <p className="mt-2">© 2024 SkillQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
