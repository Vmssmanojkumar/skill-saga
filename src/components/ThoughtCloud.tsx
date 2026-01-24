import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ThoughtCloudProps {
  messages: string[];
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function ThoughtCloud({ messages, delay = 1500, className, onComplete }: ThoughtCloudProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    if (visibleMessages < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (onComplete && visibleMessages === messages.length) {
      const timer = setTimeout(onComplete, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, messages.length, delay, onComplete]);

  return (
    <div className={cn("relative", className)}>
      {/* Main thought cloud container - comic style */}
      <div 
        className="relative px-6 py-5 animate-fade-in"
        style={{
          background: "linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 90%))",
          borderRadius: "60px 60px 60px 20px",
          border: "4px solid hsl(0 0% 70%)",
          boxShadow: `
            inset 0 -8px 20px hsl(0 0% 80%),
            0 8px 30px hsl(0 0% 0% / 0.3),
            0 0 60px hsl(var(--primary) / 0.15)
          `,
        }}
      >
        {/* Wavy cloud effect overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, hsl(0 0% 100%) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(0 0% 100%) 0%, transparent 40%)",
            borderRadius: "inherit",
          }}
        />
        
        {/* Messages inside cloud */}
        <div className="relative z-10 flex flex-col gap-2 min-w-[260px] md:min-w-[320px]">
          {messages.slice(0, visibleMessages).map((message, index) => (
            <div
              key={index}
              className="animate-scale-in bg-primary/10 border-2 border-primary/30 px-4 py-2.5 rounded-full"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <p className="text-gray-800 font-game font-bold text-sm md:text-base text-center">
                {message}
              </p>
            </div>
          ))}
          
          {/* Placeholder for messages not yet visible */}
          {messages.slice(visibleMessages).map((_, index) => (
            <div key={`placeholder-${index}`} className="h-10 opacity-0" />
          ))}
        </div>
      </div>

      {/* Connector bubbles leading down to Babai - comic thought style */}
      <div className="absolute -bottom-6 left-12">
        <div 
          className="w-8 h-8 rounded-full"
          style={{ 
            background: "linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 88%))",
            border: "3px solid hsl(0 0% 70%)",
            boxShadow: "0 4px 10px hsl(0 0% 0% / 0.2)",
          }}
        />
      </div>
      <div className="absolute -bottom-14 left-6">
        <div 
          className="w-5 h-5 rounded-full"
          style={{ 
            background: "linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 88%))",
            border: "2px solid hsl(0 0% 70%)",
            boxShadow: "0 3px 8px hsl(0 0% 0% / 0.2)",
          }}
        />
      </div>
      <div className="absolute -bottom-20 left-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ 
            background: "linear-gradient(145deg, hsl(0 0% 98%), hsl(0 0% 88%))",
            border: "2px solid hsl(0 0% 70%)",
            boxShadow: "0 2px 5px hsl(0 0% 0% / 0.2)",
          }}
        />
      </div>
    </div>
  );
}

export default ThoughtCloud;
