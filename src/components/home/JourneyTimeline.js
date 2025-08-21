"use client";

import { useState, useEffect, useRef } from "react";
import { colors } from "@/styles/theme";

const JourneyTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const journey = [
    {
      stage: "Dance",
      years: "10+ Years",
      skill: "Precision & Performance",
      icon: "🎭",
      description: "Professional performance discipline",
      color: colors.maroon
    },
    {
      stage: "Animation",
      years: "OCAD Graduate",
      skill: "Motion & Storytelling", 
      icon: "🎨",
      description: "Visual narrative expertise",
      color: colors.lavender
    },
    {
      stage: "UX/UI Design",
      years: "Industry Experience",
      skill: "User Psychology",
      icon: "✨",
      description: "Human-centered design thinking",
      color: colors.peach
    },
    {
      stage: "Development",
      years: "Current Focus",
      skill: "Technical Implementation",
      icon: "⚡",
      description: "Building experiences that move people",
      color: colors.blue
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-progress through timeline
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % journey.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, journey.length]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-6xl mx-auto px-8 py-20"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ 
            color: colors.text,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          A Unique Path to Development
        </h2>
        <p 
          className="text-base md:text-lg max-w-2xl mx-auto"
          style={{ 
            color: colors.subtext,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
          }}
        >
          Each stage builds the foundation for creating exceptional digital experiences
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? '100%' : '0%',
            background: `linear-gradient(90deg, ${colors.maroon} 0%, ${colors.lavender} 33%, ${colors.peach} 66%, ${colors.blue} 100%)`,
            transform: 'translateY(-50%)',
            transitionDelay: '0.5s'
          }}
        />

        {/* Journey Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {journey.map((item, index) => (
            <div
              key={item.stage}
              className="relative group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.6s ease-out ${index * 0.2 + 0.5}s, transform 0.6s ease-out ${index * 0.2 + 0.5}s`
              }}
              onMouseEnter={() => setActiveStage(index)}
            >
              {/* Stage Card */}
              <div 
                className="p-6 rounded-xl backdrop-blur-md border transition-all duration-500 hover:scale-105 text-center"
                style={{
                  background: activeStage === index 
                    ? `linear-gradient(135deg, ${item.color}15 0%, ${colors.surface}90 100%)`
                    : `${colors.surface}60`,
                  border: activeStage === index 
                    ? `2px solid ${item.color}60`
                    : `1px solid ${colors.overlay}30`,
                  boxShadow: activeStage === index 
                    ? `0 25px 50px -15px ${item.color}40`
                    : `0 10px 25px -10px ${colors.base}20`
                }}
              >
                {/* Icon */}
                <div 
                  className="text-4xl mb-4 transition-transform duration-300"
                  style={{
                    transform: activeStage === index ? 'scale(1.2)' : 'scale(1)',
                    filter: activeStage === index ? 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none'
                  }}
                >
                  {item.icon}
                </div>

                {/* Stage Name */}
                <h3 
                  className="text-lg font-bold mb-2 transition-colors duration-300"
                  style={{ 
                    color: activeStage === index ? item.color : colors.text 
                  }}
                >
                  {item.stage}
                </h3>

                {/* Years */}
                <p 
                  className="text-sm font-medium mb-3 transition-colors duration-300"
                  style={{ 
                    color: activeStage === index ? colors.text : colors.subtext 
                  }}
                >
                  {item.years}
                </p>

                {/* Skill */}
                <div 
                  className="text-xs font-medium px-3 py-1 rounded-full mb-3 transition-all duration-300"
                  style={{
                    background: activeStage === index 
                      ? `${item.color}20` 
                      : `${colors.overlay}20`,
                    color: activeStage === index ? item.color : colors.subtext,
                    border: `1px solid ${activeStage === index ? item.color + '40' : colors.overlay + '40'}`
                  }}
                >
                  {item.skill}
                </div>

                {/* Description */}
                <p 
                  className="text-xs leading-relaxed transition-colors duration-300"
                  style={{ 
                    color: activeStage === index ? colors.subtext : colors.overlay 
                  }}
                >
                  {item.description}
                </p>

                {/* Timeline Dot */}
                <div 
                  className="absolute -bottom-8 left-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 hidden md:block"
                  style={{
                    backgroundColor: activeStage === index ? item.color : colors.surface,
                    borderColor: activeStage === index ? item.color : colors.overlay,
                    transform: `translateX(-50%) scale(${activeStage === index ? 1.3 : 1})`,
                    boxShadow: activeStage === index ? `0 0 20px ${item.color}60` : 'none'
                  }}
                />
              </div>

              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
                  filter: 'blur(30px)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div 
        className="text-center mt-16"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 1.5s, transform 0.8s ease-out 1.5s'
        }}
      >
        <p 
          className="text-sm font-medium"
          style={{ 
            color: colors.lavender,
            textShadow: `0 0 10px ${colors.lavender}40`
          }}
        >
          This unique combination makes me a developer who truly understands users
        </p>
      </div>
    </div>
  );
};

export default JourneyTimeline;