"use client";

import { useEffect, useRef, useState } from "react";
import { colors } from "@/styles/theme";

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const PARTICLE_COUNT = 50;
  const CONNECTION_DISTANCE = 140;
  const MOUSE_RADIUS = 200;

  const particleColors = [
    colors.lavender,
    colors.blue,
    colors.peach,
    colors.teal,
    colors.green,
    colors.maroon,
  ];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 4 + 2;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.originalColor = this.color;
      this.opacity = Math.random() * 0.6 + 0.4;
      this.shape = Math.floor(Math.random() * 3); // 0: circle, 1: triangle, 2: square
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update(canvas, mouse) {
      // Mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.03;
        this.vy -= Math.sin(angle) * force * 0.03;
        this.size = Math.min(this.size + force * 1.5, 8);
        this.opacity = Math.min(this.opacity + force * 0.4, 1);
      } else {
        this.size *= 0.995;
        this.opacity *= 0.998;
        if (this.size < 2) this.size = 2;
        if (this.opacity < 0.4) this.opacity = 0.4;
      }

      // Movement
      this.x += this.vx;
      this.y += this.vy;

      // Rotation
      this.rotation += this.rotationSpeed;

      // Boundary collision
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      // Friction
      this.vx *= 0.985;
      this.vy *= 0.985;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;

      if (this.shape === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      } else if (this.shape === 1) {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(this.size, this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      } else {
        // Square
        ctx.beginPath();
        ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const initParticles = (canvas) => {
    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
  };

  const drawConnections = (ctx, particles) => {
    ctx.lineWidth = 1.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          const opacity = 1 - distance / CONNECTION_DISTANCE;
          ctx.globalAlpha = opacity * 0.5;
          
          // Create gradient line
          const gradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          gradient.addColorStop(0, particles[i].color + "80");
          gradient.addColorStop(1, particles[j].color + "80");
          
          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      particle.update(canvas, mouseRef.current);
      particle.draw(ctx);
    });

    // Draw connections
    drawConnections(ctx, particlesRef.current);

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use global mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width;
    canvas.height = height;
    setDimensions({ width, height });

    // Reinitialize particles with new dimensions
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const localInitParticles = (canvasElement) => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push(
          new Particle(
            Math.random() * canvasElement.width,
            Math.random() * canvasElement.height
          )
        );
      }
    };

    const localHandleResize = () => {
      const container = canvas.parentElement;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });

      localInitParticles(canvas);
    };

    const localAnimate = () => {
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update(canvas, mouseRef.current);
        particle.draw(ctx);
      });

      drawConnections(ctx, particlesRef.current);

      animationRef.current = requestAnimationFrame(localAnimate);
    };

    // Initial setup
    localHandleResize();
    
    // Start animation
    localAnimate();

    // Event listeners - use document for global mouse tracking
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", localHandleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", localHandleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "transparent",
        zIndex: -20,
        left: "80px", // Account for sidebar width (w-20 = 80px)
      }}
    />
  );
};

export default ParticleSystem;