"use client";

import { useState, useEffect, useRef } from "react";
import { colors } from "@/styles/theme";

const TechStack = () => {
  const [showStack, setShowStack] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const techStack = [
    { name: "React", level: 95, category: "Frontend", color: colors.blue },
    { name: "Next.js", level: 90, category: "Framework", color: colors.lavender },
    { name: "Node.js", level: 85, category: "Backend", color: colors.green },
    { name: "TypeScript", level: 88, category: "Language", color: colors.peach },
    { name: "PostgreSQL", level: 80, category: "Database", color: colors.teal },
    { name: "Tailwind", level: 92, category: "Styling", color: colors.maroon }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStack(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through skills to show animation mastery
  useEffect(() => {
    if (showStack) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % techStack.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showStack, techStack.length]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto px-8 py-16 mt-16"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ 
            color: colors.text,
            opacity: showStack ? 1 : 0,
            transform: showStack ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          Technical Excellence
        </h2>
        <p 
          className="text-base md:text-lg"
          style={{ 
            color: colors.subtext,
            opacity: showStack ? 1 : 0,
            transform: showStack ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
          }}
        >
          Where precision meets creativity
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className="relative group cursor-pointer"
            style={{
              opacity: showStack ? 1 : 0,
              transform: showStack ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {/* Card Background */}
            <div 
              className="p-6 rounded-xl backdrop-blur-md border transition-all duration-500 hover:scale-105"
              style={{
                background: activeIndex === index 
                  ? `linear-gradient(135deg, ${tech.color}10 0%, ${colors.surface}80 100%)`
                  : `${colors.surface}40`,
                border: activeIndex === index 
                  ? `1px solid ${tech.color}60`
                  : `1px solid ${colors.overlay}20`,
                boxShadow: activeIndex === index 
                  ? `0 20px 40px -10px ${tech.color}30`
                  : 'none'
              }}
            >
              {/* Tech Name */}
              <h3 
                className="text-lg font-semibold mb-2 transition-colors duration-300"
                style={{ 
                  color: activeIndex === index ? tech.color : colors.text 
                }}
              >
                {tech.name}
              </h3>

              {/* Category */}
              <p 
                className="text-sm mb-4 transition-colors duration-300"
                style={{ 
                  color: activeIndex === index ? colors.text : colors.subtext 
                }}
              >
                {tech.category}
              </p>

              {/* Skill Level Bar */}
              <div className="relative">
                <div 
                  className="h-2 rounded-full bg-opacity-20"
                  style={{ backgroundColor: colors.overlay }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: showStack ? `${tech.level}%` : '0%',
                      background: `linear-gradient(90deg, ${tech.color} 0%, ${colors.lavender} 100%)`,
                      transitionDelay: `${index * 0.1 + 0.5}s`
                    }}
                  />
                </div>
                
                {/* Percentage Label */}
                <span 
                  className="absolute -top-6 right-0 text-xs font-medium transition-all duration-300"
                  style={{ 
                    color: activeIndex === index ? tech.color : colors.subtext,
                    opacity: activeIndex === index ? 1 : 0.7
                  }}
                >
                  {tech.level}%
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      <div 
        className="text-center mt-12"
        style={{
          opacity: showStack ? 1 : 0,
          transform: showStack ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out 1s, transform 0.6s ease-out 1s'
        }}
      >
        <p 
          className="text-sm italic"
          style={{ color: colors.subtext }}
        >
          Every interaction is choreographed with purpose
        </p>
      </div>
    </div>
  );
};

export default TechStack;