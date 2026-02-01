import { useRef, useState, useCallback, MouseEvent, TouchEvent } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTilt3DOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
}

export function useTilt3D(options: UseTilt3DOptions = {}) {
  const { maxTilt = 15, scale = 1.02, speed = 400 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;
    
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
    
    setTilt({ rotateX, rotateY, scale });
  }, [maxTilt, scale]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleMove]);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  };

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleLeave,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleLeave,
    },
  };
}