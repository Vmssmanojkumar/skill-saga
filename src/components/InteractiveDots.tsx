import { useEffect, useRef, useCallback } from 'react';

interface InteractiveDotsProps {
  gridSpacing?: number;
  animationSpeed?: number;
  removeWaveLine?: boolean;
}

const InteractiveDots = ({
  gridSpacing = 30,
  animationSpeed = 0.005,
  removeWaveLine = true
}: InteractiveDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const ripples = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([]);
  const dotsRef = useRef<Array<{ x: number; y: number; originalX: number; originalY: number; phase: number }>>([]);
  const dprRef = useRef<number>(1);

  // Using theme colors: transparent background, orange dots
  const dotColor = { r: 249, g: 115, b: 22 }; // orange-500 (primary)

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getRippleInfluence = (x: number, y: number, currentTime: number): number => {
    let totalInfluence = 0;
    ripples.current.forEach((ripple) => {
      const age = currentTime - ripple.time;
      const maxAge = 3000;
      if (age < maxAge) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = (age / maxAge) * 300;
        const rippleWidth = 60;
        if (Math.abs(distance - rippleRadius) < rippleWidth) {
          const rippleStrength = (1 - age / maxAge) * ripple.intensity;
          const proximityToRipple = 1 - Math.abs(distance - rippleRadius) / rippleWidth;
          totalInfluence += rippleStrength * proximityToRipple;
        }
      }
    });
    return Math.min(totalInfluence, 2);
  };

  const initializeDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const dots: Array<{ x: number; y: number; originalX: number; originalY: number; phase: number }> = [];

    for (let x = gridSpacing / 2; x < canvasWidth; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < canvasHeight; y += gridSpacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    initializeDots();
  }, [initializeDots]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripples.current.push({ x, y, time: Date.now(), intensity: 2 });
    ripples.current = ripples.current.filter((ripple) => Date.now() - ripple.time < 3000);
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed;
    const currentTime = Date.now();

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    dotsRef.current.forEach((dot) => {
      const mouseInfluence = getMouseInfluence(dot.originalX, dot.originalY);
      const rippleInfluence = getRippleInfluence(dot.originalX, dot.originalY, currentTime);
      const totalInfluence = mouseInfluence + rippleInfluence;

      dot.x = dot.originalX;
      dot.y = dot.originalY;

      const baseDotSize = 2;
      const dotSize = baseDotSize + totalInfluence * 6 + Math.sin(timeRef.current + dot.phase) * 0.5;
      const opacity = Math.max(0.2, 0.4 + totalInfluence * 0.6 + Math.abs(Math.sin(timeRef.current * 0.5 + dot.phase)) * 0.1);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${opacity})`;
      ctx.fill();
    });

    if (!removeWaveLine) {
      ripples.current.forEach((ripple) => {
        const age = currentTime - ripple.time;
        const maxAge = 3000;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * 300;
          const alpha = (1 - progress) * 0.3 * ripple.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [animationSpeed, removeWaveLine]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto" />
    </div>
  );
};

export default InteractiveDots;
