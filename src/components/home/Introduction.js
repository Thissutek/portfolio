"use client";

/*
 * CINEMATIC VIDEO HERO EXPERIENCE
 * 
 * This is a full-screen, immersive video experience showcasing your journey.
 * Each stage plays a specific video of you in action:
 * 
 * TO ADD YOUR VIDEOS:
 * 1. Create /public/videos/ folder
 * 2. Add these specific video files:
 *    - dance-performance.mp4 - YOU dancing (performance footage)
 *    - animation-showcase.mp4 - YOUR animation work (screen recordings/reels)
 *    - coding-session.mp4 - YOU coding (over-shoulder coding footage)
 *    - design-process.mp4 - YOUR UX/UI design process (screen recordings)
 * 3. Update the video paths in journeyStages below
 * 
 * EXPERIENCE:
 * - Full-screen cinematic background videos
 * - Dynamic overlays with dramatic typography
 * - Seamless transitions between your actual work
 * - Auto-playing showcase of your skills in action
 */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/theme";

const Introduction = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef({});
  const containerRef = useRef(null);
  const router = useRouter();

  // Your cinematic journey stages - each represents YOU in action
  const journeyStages = [
    {
      id: "dance",
      title: "Movement Artist",
      subtitle: "10+ Years of Performance Excellence",
      description: "Where precision meets passion. Every step choreographed with purpose.",
      video: {
        src: "/videos/dance-performance.mp4", // YOU dancing - performance footage
        fallback: `linear-gradient(135deg, ${colors.maroon}40 0%, ${colors.maroon}20 50%, transparent 100%)`,
        alt: "Jonathan performing professional dance"
      },
      color: colors.maroon,
      accent: colors.peach,
      stats: ["10+ Years", "Professional Training", "Performance Discipline"],
      tagline: "Every line of code moves with purpose"
    },
    {
      id: "animation",
      title: "Visual Storyteller", 
      subtitle: "OCAD University Graduate",
      description: "Bringing ideas to life through motion. Every frame tells a story.",
      video: {
        src: "/videos/animation-showcase.mp4", // YOUR animation work - reels/screen recordings
        fallback: `linear-gradient(135deg, ${colors.lavender}40 0%, ${colors.lavender}20 50%, transparent 100%)`,
        alt: "Jonathan's animation work and creative process"
      },
      color: colors.lavender,
      accent: colors.blue,
      stats: ["OCAD Graduate", "Motion Graphics", "Visual Narrative"],
      tagline: "Interfaces that flow like living stories"
    },
    {
      id: "design",
      title: "Experience Architect",
      subtitle: "User-Centered Design Thinking", 
      description: "Understanding humans to build experiences that resonate deeply.",
      video: {
        src: "/videos/design-process.mp4", // YOUR UX/UI process - screen recordings
        fallback: `linear-gradient(135deg, ${colors.peach}40 0%, ${colors.peach}20 50%, transparent 100%)`,
        alt: "Jonathan's UX/UI design process and user research"
      },
      color: colors.peach,
      accent: colors.yellow,
      stats: ["User Research", "Interface Design", "Human Psychology"],
      tagline: "Technology that understands people"
    },
    {
      id: "development",
      title: "Code Choreographer",
      subtitle: "Full Stack Developer",
      description: "Where all disciplines unite. Building the future with artistry and precision.",
      video: {
        src: "/videos/coding-session.mp4", // YOU coding - over-shoulder footage
        fallback: `linear-gradient(135deg, ${colors.blue}40 0%, ${colors.blue}20 50%, transparent 100%)`,
        alt: "Jonathan coding and building applications"
      },
      color: colors.blue,
      accent: colors.teal,
      stats: ["Full Stack", "React/Next.js", "Node.js"],
      tagline: "This is where movement becomes code"
    }
  ];

  // Auto-progress with smooth transitions
  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStage(prev => (prev + 1) % journeyStages.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000); // Longer duration for cinematic effect

    return () => clearInterval(interval);
  }, [journeyStages.length]);

  // Handle video loading and transitions
  const handleStageChange = (newIndex) => {
    if (newIndex === currentStage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const currentJourney = journeyStages[currentStage];

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToContact = () => {
    router.push('/contact');
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        {journeyStages.map((stage, index) => (
          <div
            key={stage.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentStage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Video Background */}
            {stage.video.src ? (
              <video
                ref={el => videoRefs.current[stage.id] = el}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={currentStage === index}
                muted
                loop
                playsInline
                onLoadedData={() => {
                  setVideoLoaded(prev => ({ ...prev, [stage.id]: true }));
                }}
              >
                <source src={stage.video.src} type="video/mp4" />
              </video>
            ) : (
              // Fallback gradient background
              <div 
                className="absolute inset-0"
                style={{
                  background: stage.video.fallback
                }}
              />
            )}
            
            {/* Video Overlay for better text readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.base}60 0%, transparent 30%, transparent 70%, ${colors.base}40 100%)`
              }}
            />
            
            {/* Dynamic color overlay that matches the stage */}
            <div 
              className="absolute inset-0 mix-blend-multiply opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${stage.color} 0%, transparent 70%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 h-full flex flex-col">
        
        {/* Header - Stage Navigation */}
        <div 
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-20px)',
            transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s'
          }}
        >
          <div className="flex gap-3">
            {journeyStages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => handleStageChange(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  currentStage === index ? 'w-16' : 'w-8'
                }`}
                style={{
                  background: currentStage === index 
                    ? stage.color 
                    : `${colors.overlay}40`,
                  boxShadow: currentStage === index 
                    ? `0 0 20px ${stage.color}60` 
                    : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div 
            className="max-w-4xl mx-auto text-center"
            style={{
              opacity: isLoaded && !isTransitioning ? 1 : 0,
              transform: isLoaded && !isTransitioning ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            {/* Name */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.text} 0%, ${currentJourney.color} 50%, ${currentJourney.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 60px ${currentJourney.color}30`,
                filter: `drop-shadow(0 0 30px ${currentJourney.color}40)`
              }}
            >
              Jonathan Yau
            </h1>

            {/* Stage Title */}
            <div className="mb-4">
              <h2 
                className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2"
                style={{ 
                  color: currentJourney.color,
                  textShadow: `0 0 30px ${currentJourney.color}50`
                }}
              >
                {currentJourney.title}
              </h2>
              <h3 
                className="text-lg md:text-xl font-medium"
                style={{ color: colors.subtext }}
              >
                {currentJourney.subtitle}
              </h3>
            </div>

            {/* Description */}
            <p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.text }}
            >
              {currentJourney.description}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {currentJourney.stats.map((stat, index) => (
                <div
                  key={index}
                  className="px-6 py-3 rounded-full backdrop-blur-md border"
                  style={{
                    background: `linear-gradient(135deg, ${currentJourney.color}20 0%, ${currentJourney.color}10 100%)`,
                    border: `1px solid ${currentJourney.color}40`,
                    color: currentJourney.color,
                    boxShadow: `0 8px 25px ${currentJourney.color}30`
                  }}
                >
                  <span className="font-semibold">{stat}</span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <p 
              className="text-lg md:text-xl font-medium mb-12 italic"
              style={{ 
                color: currentJourney.accent,
                textShadow: `0 0 20px ${currentJourney.accent}40`
              }}
            >
              {currentJourney.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Section - CTAs */}
        <div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
            transition: 'opacity 0.8s ease-out 1.2s, transform 0.8s ease-out 1.2s'
          }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              onClick={scrollToProjects}
              className="group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              style={{
                background: `linear-gradient(135deg, ${currentJourney.color} 0%, ${currentJourney.accent} 100%)`,
                color: colors.base,
                boxShadow: `0 20px 40px -10px ${currentJourney.color}60`,
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 30px 60px -15px ${currentJourney.color}80`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 20px 40px -10px ${currentJourney.color}60`;
              }}
            >
              <span className="flex items-center gap-3">
                Experience My Work
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </button>
            
            <button
              onClick={goToContact}
              className="group px-8 py-4 rounded-full font-bold text-lg border-2 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              style={{
                border: `2px solid ${currentJourney.color}60`,
                color: currentJourney.color,
                background: `${colors.base}20`
              }}
              onMouseEnter={(e) => {
                e.target.style.background = `${currentJourney.color}15`;
                e.target.style.borderColor = currentJourney.color;
                e.target.style.boxShadow = `0 20px 40px -10px ${currentJourney.color}50`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = `${colors.base}20`;
                e.target.style.borderColor = `${currentJourney.color}60`;
                e.target.style.boxShadow = 'none';
              }}
            >
              <span className="flex items-center gap-3">
                Let&apos;s Create Together
                <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <span 
              className="text-sm font-medium"
              style={{ color: colors.overlay }}
            >
              Scroll to discover more
            </span>
            <div 
              className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
              style={{ borderColor: `${currentJourney.color}40` }}
            >
              <div 
                className="w-1 h-3 rounded-full animate-bounce"
                style={{ 
                  background: currentJourney.color,
                  animationDelay: '0.5s'
                }}
              />
            </div>
          </div>
        </div>

        {/* Stage Indicators - Side Navigation */}
        <div 
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-out 1s'
          }}
        >
          {journeyStages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => handleStageChange(index)}
              className="group relative block"
            >
              {/* Active indicator line */}
              <div 
                className={`w-12 h-0.5 rounded-full transition-all duration-300 ${
                  currentStage === index ? 'bg-opacity-100' : 'bg-opacity-40'
                }`}
                style={{
                  backgroundColor: stage.color,
                  boxShadow: currentStage === index 
                    ? `0 0 15px ${stage.color}60` 
                    : 'none'
                }}
              />
              
              {/* Label */}
              <span 
                className={`absolute right-14 top-1/2 transform -translate-y-1/2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  currentStage === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ color: stage.color }}
              >
                {stage.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, ${colors.base}20 100%)`
        }}
      />
    </div>
  );
};

export default Introduction;