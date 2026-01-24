import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SpeechBubbleProps {
  messages: string[];
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function SpeechBubble({ messages, delay = 1500, className, onComplete }: SpeechBubbleProps) {
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
    <div className={cn("flex flex-col gap-3", className)}>
      {messages.slice(0, visibleMessages).map((message, index) => (
        <div
          key={index}
          className="speech-bubble bg-card/90 backdrop-blur-sm border border-primary/30 px-6 py-4 rounded-2xl"
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <p className="text-foreground font-game font-semibold text-lg md:text-xl text-center">
            {message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SpeechBubble;
