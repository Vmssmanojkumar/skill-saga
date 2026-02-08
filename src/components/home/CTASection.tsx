import { useNavigate } from "react-router-dom";
import Sensei from "@/components/Sensei";
import GameButton from "@/components/GameButton";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="game-card p-8 md:p-12 text-center relative">
          {/* Sensei celebrating */}
          <Sensei expression="celebrating" size="lg" showBubble={false} />
          
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-foreground">Ready to Start Your </span>
            <span className="text-gradient">Journey?</span>
          </h2>
          
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who are already leveling up their skills. 
            Your future self will thank you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <GameButton 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="shadow-[0_0_40px_rgba(249,115,22,0.4)]"
            >
              🚀 Start Free Today
            </GameButton>
            <GameButton 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/courses")}
            >
              🎮 Explore Courses
            </GameButton>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✨ 30-40% content FREE • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
