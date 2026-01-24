import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Babai from "@/components/Babai";
import SpeechBubble from "@/components/SpeechBubble";
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
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: "radial-gradient(ellipse at center, hsl(0 0% 10%) 0%, hsl(0 0% 4%) 70%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      {/* Orange glow behind Babai */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(25 95% 53%) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg">
        {/* Speech Bubbles */}
        <SpeechBubble 
          messages={welcomeMessages} 
          delay={1200}
          onComplete={() => setShowButton(true)}
        />

        {/* Babai Character */}
        <Babai 
          expression="waving"
          size="xl"
          showBubble={false}
          animate={true}
        />

        {/* Start Button */}
        {showButton && (
          <div className="animate-fade-in mt-6">
            <GameButton 
              size="lg" 
              onClick={handleStart}
              className="text-xl px-12 py-5"
            >
              🚀 Start My Journey
            </GameButton>
          </div>
        )}
      </div>

      {/* Bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(25 95% 53% / 0.1), transparent)",
        }}
      />
    </div>
  );
}

export default WelcomeScene;
