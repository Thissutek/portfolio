"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/theme";
import DynamicTypography from "./DynamicTypography";

const Introduction = () => {
  const containerRef = useRef(null);
  const router = useRouter();

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
      className="w-full relative min-h-screen flex items-center justify-center"
    >
      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-8 py-16" style={{ zIndex: 10 }}>
        <DynamicTypography />
        
        {/* Call to Action Buttons */}
        <div className="flex gap-4 mt-0 opacity-0 animate-fadeInUp relative" style={{ animationDelay: '3.5s', animationFillMode: 'both', zIndex: 20 }}>
          <button
            onClick={scrollToProjects}
            className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
            style={{
              background: `linear-gradient(135deg, ${colors.lavender} 0%, ${colors.blue} 100%)`,
              color: colors.base,
              boxShadow: `0 10px 25px -5px ${colors.lavender}40`,
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = `0 20px 40px -10px ${colors.lavender}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = `0 10px 25px -5px ${colors.lavender}40`;
            }}
          >
            <span className="flex items-center gap-2">
              View My Work
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
          
          <button
            onClick={goToContact}
            className="px-6 py-3 rounded-full font-medium border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
            style={{
              border: `2px solid ${colors.peach}60`,
              color: colors.peach,
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `${colors.peach}10`;
              e.target.style.borderColor = colors.peach;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = `${colors.peach}60`;
            }}
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <span className="group-hover:scale-110 transition-transform duration-300">✨</span>
            </span>
          </button>
        </div>
        
        {/* Scroll Indicator - positioned below CTAs */}
        <div className="flex flex-col items-center gap-2 mt-12 opacity-0 animate-fadeInUp relative" 
             style={{ animationDelay: '4s', animationFillMode: 'both', zIndex: 15 }}>
          <span className="text-sm" style={{ color: colors.subtext }}>Scroll to explore</span>
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
            style={{ borderColor: `${colors.overlay}60` }}
          >
            <div 
              className="w-1 h-3 rounded-full animate-bounce"
              style={{ 
                background: `linear-gradient(180deg, ${colors.lavender} 0%, transparent 100%)`,
                animationDelay: '0.5s'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Ambient Lighting Effects */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.lavender}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'glowPulse 8s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.peach}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'glowPulse 6s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
};

export default Introduction;
