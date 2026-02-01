import { useNavigate } from "react-router-dom";
import Babai from "./Babai";
import StickFigure from "./StickFigure";
import GameButton from "./GameButton";
import ElectricBorder from "./ElectricBorder";

const floatingBadges = [
  { text: "Founder & CEO", position: "top-4 right-8", delay: "0s" },
  { text: "Self-made", position: "top-20 -right-4", delay: "0.5s" },
  { text: "Built from struggle", position: "bottom-20 right-0", delay: "1s" },
  { text: "Built for students", position: "bottom-4 right-12", delay: "1.5s" },
];

const FounderSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-background">
      
      {/* Animated grain overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Story */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              <span className="text-foreground">Your Coach,</span>
              <br />
              <span className="text-gradient">Not Just A Creator</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I didn't come from money.
                <br />
                I didn't have mentors.
                <br />
                I learned everything the hard way.
              </p>
              <p>
                Late nights with free YouTube tutorials.
                <br />
                Confusing documentation. No guidance.
                <br />
                But I kept going — because I had no other choice.
              </p>
              <p className="text-foreground font-medium">
                That's why I built this platform —
                <br />
                for people like you and me.
              </p>
            </div>

            {/* Babai Quote */}
            <div className="flex items-start gap-4 bg-card/50 p-4 rounded-2xl border border-border/50">
              <Babai expression="proud" size="sm" showBubble={false} />
              <div className="pt-2">
                <p className="text-foreground italic font-medium">
                  "Ee story nee kosame ra…
                </p>
                <p className="text-muted-foreground text-sm">
                  Ee platform struggle nundi puttindi."
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <GameButton 
              size="lg" 
              onClick={() => navigate("/courses")}
              className="mt-6 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              Start My Journey →
            </GameButton>
          </div>

          {/* Right Side - Founder Visual with Stick Figure teaching students */}
          <div className="relative flex justify-center lg:justify-end">
            <ElectricBorder 
              color="#f97316" 
              speed={0.8} 
              chaos={0.08} 
              borderRadius={24}
            >
              {/* Founder illustration with stick figures */}
              <div className="relative p-8">
                {/* Main visual area */}
                <div className="w-64 h-80 md:w-72 md:h-96 rounded-3xl bg-gradient-to-b from-card to-background flex items-center justify-center overflow-hidden relative">
                  
                  {/* Teaching scene - Babai on platform teaching students */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                    {/* Mentor Babai at top, teaching */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <Babai expression="teaching" size="md" showBubble={false} />
                    </div>
                    
                    {/* Students watching (group of stick figures) */}
                    <div className="mt-auto">
                      <StickFigure role="group" size="sm" expression="looking-up" showBubble={false} animate={false} />
                    </div>
                    
                    {/* Label */}
                    <p className="text-xs text-muted-foreground mt-4 text-center">Your Mentor & Students</p>
                  </div>
                </div>

                {/* Floating Achievement Badges */}
                {floatingBadges.map((badge, index) => (
                  <div
                    key={index}
                    className={`absolute ${badge.position} px-3 py-1.5 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full text-xs font-medium text-foreground shadow-lg animate-float`}
                    style={{
                      animationDelay: badge.delay,
                      animationDuration: "3s",
                    }}
                  >
                    <span className="text-primary mr-1">✦</span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </ElectricBorder>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
