"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { colors } from "@/styles/theme";

const DynamicTypography = () => {
  const [nameText, setNameText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMainText, setShowMainText] = useState(false);
  const nameTimeoutRef = useRef();
  const roleTimeoutRef = useRef();
  const cursorTimeoutRef = useRef();

  const fullName = "Jonathan Yau";
  const roles = useMemo(() => [
    "Full Stack Engineer",
    "Animator"
  ], []);

  // Typewriter effect for name
  useEffect(() => {
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < fullName.length) {
        setNameText(fullName.slice(0, currentIndex + 1));
        currentIndex++;
        nameTimeoutRef.current = setTimeout(typeNextChar, 100);
      } else {
        setShowMainText(true);
        // Start role animation after name is complete
        setTimeout(() => {
          setShowCursor(false);
        }, 500);
      }
    };

    // Start typing after initial delay
    setTimeout(typeNextChar, 300);

    return () => {
      if (nameTimeoutRef.current) clearTimeout(nameTimeoutRef.current);
    };
  }, []);

  // Morphing text effect for roles
  useEffect(() => {
    if (!showMainText) return;

    const currentRole = roles[currentRoleIndex];
    
    const typeRole = () => {
      if (!isDeleting) {
        // Typing
        if (roleText.length < currentRole.length) {
          setRoleText(currentRole.slice(0, roleText.length + 1));
          roleTimeoutRef.current = setTimeout(typeRole, 80);
        } else {
          // Pause before deleting
          roleTimeoutRef.current = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (roleText.length > 0) {
          setRoleText(roleText.slice(0, -1));
          roleTimeoutRef.current = setTimeout(typeRole, 40);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    };

    roleTimeoutRef.current = setTimeout(typeRole, 200);

    return () => {
      if (roleTimeoutRef.current) clearTimeout(roleTimeoutRef.current);
    };
  }, [roleText, isDeleting, currentRoleIndex, showMainText, roles]);

  // Cursor blinking effect
  useEffect(() => {
    const blinkCursor = () => {
      setShowCursor(prev => !prev);
      cursorTimeoutRef.current = setTimeout(blinkCursor, 500);
    };

    if (showMainText) {
      blinkCursor();
    }

    return () => {
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    };
  }, [showMainText]);

  return (
    <div 
      className="relative" 
      style={{ 
        zIndex: 15,
        minHeight: '300px', // Further reduced total space
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      {/* Animated Name with Typewriter Effect */}
      <div className="relative mb-4">
        {/* Hidden placeholder to reserve space */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight invisible absolute inset-0"
          aria-hidden="true"
        >
          Jonathan Yau
        </h1>
        
        {/* Visible animated text */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight relative"
          style={{
            background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.lavender} 50%, ${colors.blue} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minHeight: '4rem', // Reserve minimum height
            cursor: 'default',
          }}
        >
          {nameText}
          {!showMainText && (
            <span 
              className="animate-pulse ml-1"
              style={{ color: colors.peach }}
            >
              |
            </span>
          )}
        </h1>
        
        {/* Magnetic hover effect */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.lavender} 0%, transparent 50%)`,
            filter: "blur(20px)",
            cursor: 'default',
          }}
        />
        
        {/* Invisible mouse tracking overlay */}
        <div 
          className="absolute inset-0 pointer-events-auto"
          style={{ 
            cursor: 'default',
            background: 'transparent'
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            const magneticDiv = e.currentTarget.previousElementSibling;
            if (magneticDiv) {
              magneticDiv.style.setProperty('--mouse-x', `${x}%`);
              magneticDiv.style.setProperty('--mouse-y', `${y}%`);
            }
          }}
        />
      </div>

      {/* Morphing Role Text */}
      <div className="relative mb-6 h-12">
        {/* Hidden placeholder to reserve space for longest role */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium invisible absolute inset-0"
          aria-hidden="true"
        >
          Full Stack Engineer|
        </h2>
        
        {/* Visible animated text */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium absolute inset-0"
          style={{ 
            color: colors.peach,
            textShadow: `0 0 20px ${colors.peach}40`,
            opacity: showMainText ? 1 : 0,
            transform: showMainText ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
          }}
        >
          {roleText}
          <span 
            className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
            style={{ color: colors.lavender }}
          >
            |
          </span>
        </h2>
        
        {/* Glowing underline that grows with text */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
          style={{
            width: `${(roleText.length / roles[currentRoleIndex]?.length || 1) * 100}%`,
            background: `linear-gradient(90deg, ${colors.peach} 0%, ${colors.lavender} 50%, ${colors.blue} 100%)`,
            boxShadow: `0 0 10px ${colors.peach}60`,
          }}
        />
      </div>

      {/* Animated Description with Letter Reveal */}
      <div 
        className="relative"
        style={{
          minHeight: '3rem', // Further reduced space for description
          opacity: showMainText ? 1 : 0,
          transform: showMainText ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 1s ease-out 1s, transform 1s ease-out 1s'
        }}
      >
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: colors.subtext }}
        >
          <span className="inline-block">
            {showMainText && "I'm a full-stack developer who specializes in ".split('').map((char, index) => (
              <span
                key={index}
                className="inline-block animate-fadeInUp"
                style={{
                  animationDelay: `${1.5 + index * 0.03}s`,
                  animationFillMode: 'both'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span 
            className="inline-block font-semibold px-2 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${colors.lavender}20 0%, ${colors.peach}20 100%)`,
              color: colors.lavender,
              border: `1px solid ${colors.lavender}30`,
            }}
          >
            animation
          </span>
          <span className="inline-block">
            {showMainText && ", creating intuitive digital experiences that feel as smooth as they function.".split('').map((char, index) => (
              <span
                key={index + 100}
                className="inline-block animate-fadeInUp"
                style={{
                  animationDelay: `${2.2 + index * 0.03}s`,
                  animationFillMode: 'both'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </p>
      </div>

      {/* Floating Elements - positioned absolutely to not affect layout */}
      <div 
        className="fixed pointer-events-none"
        style={{ 
          top: '10vh', 
          right: '10vw', 
          width: '80px', 
          height: '80px', 
          opacity: 0.2,
          zIndex: 101
        }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.blue} 0%, transparent 70%)`,
            animation: 'float 6s ease-in-out infinite',
          }}
        />
      </div>
      
      <div 
        className="fixed pointer-events-none"
        style={{ 
          bottom: '20vh', 
          left: '5vw', 
          width: '64px', 
          height: '64px', 
          opacity: 0.3,
          zIndex: 101
        }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.teal} 0%, transparent 70%)`,
            animation: 'float 4s ease-in-out infinite reverse',
          }}
        />
      </div>
    </div>
  );
};

export default DynamicTypography;