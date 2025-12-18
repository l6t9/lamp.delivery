import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
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

export function VertexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, colorScheme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, pressed: false });
  const animationRef = useRef<number | undefined>(undefined);

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
    };

    resizeCanvas();

    // Initialize particles
    if (particlesRef.current.length === 0) {
      const count = requiredParticleCount(canvas.width);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height));
      }
    }

    // Get line color based on theme
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

    const drawParticle = (
      p: Particle,
      isMouse: boolean,
      maxDistance: number,
      particles: Particle[]
    ) => {
      let connectingLines = 0;

      // Connect vertices
      for (const p2 of particles) {
        if (p.x > p2.x && !isMouse) continue;

        const distance = Math.hypot(p2.x - p.x, p2.y - p.y);
        if (!distance || distance > maxDistance) continue;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lineColor;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
