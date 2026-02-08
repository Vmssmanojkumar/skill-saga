import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sensei from "@/components/Sensei";
import ThoughtCloud from "@/components/ThoughtCloud";
import GameButton from "@/components/GameButton";

const welcomeMessages = [
  "Hi ra 👋",
  "Nee future marchali ani vachav kada?",
  "Mana Kadha – Maname Rasukovali 🔥",
];

export function WelcomeScene() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <div 
      className={`min-h-screen flex items-end justify-start p-6 md:p-12 relative overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: "radial-gradient(ellipse at center, hsl(0 0% 10%) 0%, hsl(0 0% 4%) 70%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Orange glow - positioned at bottom left */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-40 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 95% 53%) 0%, transparent 60%)",
        }}
      />

      {/* Main content area - Babai at bottom left, thought cloud above */}
      <div className="relative z-10 flex flex-col items-start gap-4 mb-8 md:mb-16">
        {/* Thought Cloud - positioned above Babai */}
        <div className="ml-4 md:ml-8">
          <ThoughtCloud 
            messages={welcomeMessages} 
            delay={1200}
            onComplete={() => setShowButton(true)}
          />
        </div>

        {/* Sensei Character - looking up at thoughts */}
        <div className="mt-8">
          <Sensei 
            expression="excited"
            size="xl"
            showBubble={false}
            animate={true}
          />
        </div>
      </div>

      {/* Start Button - positioned on the right side */}
      {showButton && (
        <div className="absolute right-8 md:right-16 bottom-1/3 md:bottom-1/2 animate-fade-in">
          <GameButton 
            size="lg" 
            onClick={handleStart}
            className="text-lg md:text-xl px-10 md:px-14 py-4 md:py-6 shadow-2xl"
            style={{
              boxShadow: "0 0 40px hsl(25 95% 53% / 0.5), 0 0 80px hsl(25 95% 53% / 0.3)",
            }}
          >
            🚀 Start My Journey
          </GameButton>
        </div>
      )}

      {/* Bottom gradient - subtle */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(25 95% 53% / 0.08), transparent)",
        }}
      />

      {/* Top-right decorative glow */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 95% 60%) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default WelcomeScene;
