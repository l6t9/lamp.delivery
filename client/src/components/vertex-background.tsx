import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  startTime: number;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: randomInRange(0, canvasWidth),
    y: randomInRange(0, canvasHeight),
    angle: randomInRange(0, 365),
    speed: randomInRange(0.1, 0.15),
    size: 0.5 + Math.random() * 1.3,
  };
}

function requiredParticleCount(canvasWidth: number): number {
  return Math.trunc(Math.sqrt(canvasWidth) * 1.5);
}

function requiredLineLength(canvasWidth: number): number {
  return canvasWidth / 20 + 100;
}

function createStars(canvasWidth: number, canvasHeight: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleDuration: Math.random() * 3000 + 2000,
      startTime: Math.random() * 2000,
    });
  }
  return stars;
}

function drawStar(ctx: CanvasRenderingContext2D, star: Star, currentTime: number, color: string) {
  const elapsed = ((currentTime - star.startTime) % star.twinkleDuration) / star.twinkleDuration;
  const twinkle = Math.sin(elapsed * Math.PI * 2) * 0.5 + 0.5;
  const opacity = star.opacity * twinkle;

  ctx.fillStyle = color.replace('1)', `${opacity})`);
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  ctx.fill();
}

export function VertexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, colorScheme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, pressed: false });
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());
  const colorCacheRef = useRef<{ lineColor: string; bgColor1: string; bgColor2: string; bgColor3: string; nebulaColor1: string; nebulaColor2: string; starColor: string; theme: string; colorScheme: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const newParticleCount = requiredParticleCount(canvas.width);
      while (particlesRef.current.length > newParticleCount) {
        particlesRef.current.pop();
      }
      while (particlesRef.current.length < newParticleCount) {
        particlesRef.current.push(
          createParticle(canvas.width, canvas.height)
        );
      }

      // Create stars
      const starCount = Math.max(100, Math.floor(canvas.width / 8));
      if (starsRef.current.length === 0) {
        starsRef.current = createStars(canvas.width, canvas.height, starCount);
      }
    };

    resizeCanvas();
    startTimeRef.current = Date.now();

    // Initialize particles
    if (particlesRef.current.length === 0) {
      const count = requiredParticleCount(canvas.width);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height));
      }
    }

    // Get cached colors or compute them
    const getColors = () => {
      const cache = colorCacheRef.current;
      if (cache && cache.theme === theme && cache.colorScheme === colorScheme) {
        return cache;
      }

      let lineColor = "rgba(100, 100, 100, 0.5)";
      if (theme === "dark") {
        if (colorScheme === "pyon") {
          lineColor = "rgba(255, 100, 180, 0.6)";
        } else if (colorScheme === "rain") {
          lineColor = "rgba(100, 200, 255, 0.6)";
        } else {
          lineColor = "rgba(150, 150, 255, 0.6)";
        }
      } else {
        if (colorScheme === "pyon") {
          lineColor = "rgba(220, 80, 150, 0.5)";
        } else if (colorScheme === "rain") {
          lineColor = "rgba(50, 120, 200, 0.5)";
        } else {
          lineColor = "rgba(80, 80, 180, 0.5)";
        }
      }

      let bgColor1, bgColor2, bgColor3, nebulaColor1, nebulaColor2, starColor;
      const isDark = theme === 'dark';

      if (!isDark) {
        if (colorScheme === 'pyon') {
          bgColor1 = 'rgba(240, 220, 235, 1)';
          bgColor2 = 'rgba(230, 200, 220, 1)';
          bgColor3 = 'rgba(210, 180, 205, 1)';
          nebulaColor1 = 'rgba(220, 150, 190, 0.08)';
          nebulaColor2 = 'rgba(200, 160, 180, 0.06)';
          starColor = 'rgba(150, 80, 120, 1)';
        } else if (colorScheme === 'rain') {
          bgColor1 = 'rgba(220, 230, 245, 1)';
          bgColor2 = 'rgba(200, 220, 240, 1)';
          bgColor3 = 'rgba(180, 210, 235, 1)';
          nebulaColor1 = 'rgba(150, 190, 230, 0.08)';
          nebulaColor2 = 'rgba(160, 200, 220, 0.06)';
          starColor = 'rgba(80, 120, 180, 1)';
        } else {
          bgColor1 = 'rgba(220, 200, 240, 1)';
          bgColor2 = 'rgba(200, 170, 230, 1)';
          bgColor3 = 'rgba(180, 150, 210, 1)';
          nebulaColor1 = 'rgba(200, 150, 220, 0.08)';
          nebulaColor2 = 'rgba(180, 160, 200, 0.06)';
          starColor = 'rgba(100, 80, 150, 1)';
        }
      } else if (colorScheme === 'pyon') {
        bgColor1 = 'rgba(40, 15, 30, 1)';
        bgColor2 = 'rgba(25, 8, 18, 1)';
        bgColor3 = 'rgba(15, 4, 10, 1)';
        nebulaColor1 = 'rgba(200, 60, 120, 0.15)';
        nebulaColor2 = 'rgba(180, 80, 140, 0.12)';
        starColor = 'rgba(255, 150, 200, 1)';
      } else if (colorScheme === 'rain') {
        bgColor1 = 'rgba(10, 20, 40, 1)';
        bgColor2 = 'rgba(5, 12, 25, 1)';
        bgColor3 = 'rgba(2, 6, 15, 1)';
        nebulaColor1 = 'rgba(60, 120, 180, 0.15)';
        nebulaColor2 = 'rgba(80, 140, 200, 0.12)';
        starColor = 'rgba(150, 200, 255, 1)';
      } else {
        bgColor1 = 'rgba(20, 10, 40, 1)';
        bgColor2 = 'rgba(10, 5, 30, 1)';
        bgColor3 = 'rgba(5, 2, 15, 1)';
        nebulaColor1 = 'rgba(100, 50, 150, 0.15)';
        nebulaColor2 = 'rgba(80, 100, 180, 0.12)';
        starColor = 'rgba(200, 180, 255, 1)';
      }

      const newColors = { lineColor, bgColor1, bgColor2, bgColor3, nebulaColor1, nebulaColor2, starColor, theme, colorScheme };
      colorCacheRef.current = newColors;
      return newColors;
    };

    const colors = getColors();

    const drawParticle = (
      p: Particle,
      isMouse: boolean,
      maxDistance: number,
      particles: Particle[]
    ) => {
      let connectingLines = 0;
      const maxConnections = 6; // Limit connections per particle

      // Connect vertices - optimize by breaking early
      for (let i = 0; i < particles.length && connectingLines < maxConnections; i++) {
        const p2 = particles[i];
        if (p.x > p2.x && !isMouse) continue;

        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (!distance || distance > maxDistance) continue;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = colors.lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        connectingLines++;
      }

      // Move particle
      const nearParticlesBoost = connectingLines * 0.2 + 1;
      p.x += p.speed * Math.sin(p.angle) * nearParticlesBoost;
      p.y += p.speed * Math.cos(p.angle) * nearParticlesBoost;

      if (p.y > canvas.height) p.y = 1;
      if (p.x > canvas.width) p.x = 1;
      if (p.x < 1) p.x = canvas.width;
      if (p.y < 1) p.y = canvas.height;
    };

    const animate = () => {
      const currentTime = Date.now() - startTimeRef.current;
      const { bgColor1, bgColor2, bgColor3, nebulaColor1, nebulaColor2, starColor } = colors;

      // Draw galaxy background gradient
      const gradientBg = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height));
      gradientBg.addColorStop(0, bgColor1);
      gradientBg.addColorStop(0.5, bgColor2);
      gradientBg.addColorStop(1, bgColor3);
      ctx.fillStyle = gradientBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle nebula clouds - scattered galaxy effects
      ctx.fillStyle = nebulaColor1;
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.15, canvas.height * 0.2, 200, 150, 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = nebulaColor2;
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.85, canvas.height * 0.75, 180, 140, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Add more subtle nebula spots for galaxy depth
      ctx.fillStyle = nebulaColor1.replace('0.15)', '0.06)');
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.6, canvas.height * 0.4, 250, 200, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = nebulaColor2.replace('0.12)', '0.05)');
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.3, canvas.height * 0.7, 220, 160, -0.8, 0, Math.PI * 2);
      ctx.fill();

      // Draw stars with twinkling
      for (const star of starsRef.current) {
        drawStar(ctx, star, currentTime, starColor);
      }

      const particles = particlesRef.current;
      const maxLineLength = requiredLineLength(canvas.width);

      // Move points closer to mouse when pressed
      if (mouseRef.current.pressed) {
        const speed = 0.15;

        for (const p of particles) {
          const slope =
            (mouseRef.current.y - p.y) / (mouseRef.current.x - p.x);
          const delta = Math.sqrt(speed * speed / (slope * slope + 1));
          p.x +=
            delta * (mouseRef.current.x >= p.x ? 1 : -1);
          p.y +=
            delta * (mouseRef.current.y >= p.y ? 1 : -1);
        }
      }

      // Draw all particles
      for (const p1 of particles) {
        drawParticle(p1, false, maxLineLength, particles);
      }

      // Draw mouse as particle
      if (mouseRef.current.x && mouseRef.current.y) {
        drawParticle(
          {
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            angle: 0,
            speed: 0,
            size: 0,
          },
          true,
          maxLineLength,
          particles
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
      mouseRef.current.pressed = (e.buttons & 1) === 1;
    };

    const handleResize = () => resizeCanvas();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseMove);
    window.addEventListener("mousedown", handleMouseMove);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, colorScheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
