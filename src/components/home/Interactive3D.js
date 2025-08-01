"use client";

import { useState, useEffect, useRef } from "react";
import { colors } from "@/styles/theme";

const Interactive3D = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const skillCards = [
    { 
      name: "React", 
      level: 95, 
      color: colors.blue,
      icon: "⚛️",
      delay: 0
    },
    { 
      name: "Node.js", 
      level: 90, 
      color: colors.green,
      icon: "🟢",
      delay: 0.2
    },
    { 
      name: "Animation", 
      level: 98, 
      color: colors.peach,
      icon: "🎬",
      delay: 0.4
    },
    { 
      name: "TypeScript", 
      level: 85, 
      color: colors.lavender,
      icon: "🔷",
      delay: 0.6
    },
    { 
      name: "Three.js", 
      level: 80, 
      color: colors.teal,
      icon: "🎯",
      delay: 0.8
    },
    { 
      name: "Design", 
      level: 92, 
      color: colors.maroon,
      icon: "🎨",
      delay: 1.0
    }
  ];

  const FloatingCard = ({ skill, index, mousePos }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate 3D position based on mouse and index
    const baseX = (index % 3) * 120 - 120;
    const baseY = Math.floor(index / 3) * 100 - 50;
    const parallaxX = (mousePos.x - 0.5) * (30 + index * 5);
    const parallaxY = (mousePos.y - 0.5) * (20 + index * 3);
    
    const transform = `
      translate3d(${baseX + parallaxX}px, ${baseY + parallaxY}px, ${isHovered ? 50 : 0}px)
      rotateX(${(mousePos.y - 0.5) * 15}deg)
      rotateY(${(mousePos.x - 0.5) * 15}deg)
      ${isHovered ? 'scale(1.1)' : 'scale(1)'}
    `;

    return (
      <div
        className={`absolute w-24 h-28 cursor-pointer transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          animationDelay: `${skill.delay}s`,
          animation: isVisible ? 'fadeInFloat 0.8s ease-out forwards' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Front */}
        <div
          className="absolute inset-0 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300"
          style={{
            background: isHovered 
              ? `linear-gradient(135deg, ${skill.color}40 0%, ${colors.surface}80 100%)`
              : `linear-gradient(135deg, ${skill.color}20 0%, ${colors.surface}60 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isHovered ? skill.color + '60' : skill.color + '30'}`,
            boxShadow: isHovered 
              ? `0 20px 40px -10px ${skill.color}40, 0 0 0 1px ${skill.color}20`
              : `0 10px 20px -5px ${colors.base}40`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Icon */}
          <div 
            className="text-2xl mb-1 transition-transform duration-300"
            style={{ 
              transform: isHovered ? 'scale(1.2) translateZ(10px)' : 'scale(1)',
              filter: `drop-shadow(0 0 8px ${skill.color}60)`
            }}
          >
            {skill.icon}
          </div>
          
          {/* Skill Name */}
          <div 
            className="text-xs font-bold mb-2 transition-colors duration-300"
            style={{ 
              color: isHovered ? skill.color : colors.text,
              transform: 'translateZ(5px)'
            }}
          >
            {skill.name}
          </div>
          
          {/* Skill Level Bar */}
          <div 
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ 
              background: `${colors.overlay}40`,
              transform: 'translateZ(3px)'
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: isVisible ? `${skill.level}%` : '0%',
                background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}CC 100%)`,
                boxShadow: `0 0 10px ${skill.color}60`,
                transitionDelay: `${skill.delay + 0.5}s`
              }}
            />
          </div>
          
          {/* Percentage */}
          <div 
            className="text-xs mt-1 font-medium transition-colors duration-300"
            style={{ 
              color: isHovered ? skill.color : colors.subtext,
              transform: 'translateZ(2px)'
            }}
          >
            {skill.level}%
          </div>
        </div>

        {/* Card Glow Effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(-1px) scale(1.2)',
          }}
        />
      </div>
    );
  };

  const WireframeGeometry = ({ mousePos }) => {
    const rotation = {
      x: (mousePos.y - 0.5) * 30,
      y: (mousePos.x - 0.5) * 30,
      z: Date.now() * 0.001 * 10
    };

    return (
      <div className="absolute top-10 right-10 w-32 h-32 opacity-30">
        <div
          className="w-full h-full"
          style={{
            transform: `perspective(400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Wireframe Cube */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: i < 4 ? '100%' : i < 8 ? '2px' : '2px',
                height: i < 4 ? '2px' : i < 8 ? '100%' : '100%',
                background: `linear-gradient(45deg, ${colors.lavender}60, ${colors.blue}60)`,
                transform: 
                  i < 4 
                    ? `translateY(${i % 2 === 0 ? '0' : '100%'}) translateZ(${Math.floor(i / 2) === 0 ? '0' : '100%'})`
                    : i < 8
                    ? `translateX(${(i - 4) % 2 === 0 ? '0' : '100%'}) translateZ(${Math.floor((i - 4) / 2) === 0 ? '0' : '100%'})`
                    : `translateY(${(i - 8) % 2 === 0 ? '0' : '100%'}) translateX(${Math.floor((i - 8) / 2) === 0 ? '0' : '100%'})`,
                boxShadow: `0 0 10px ${colors.lavender}40`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  useEffect(() => {
    // Delay showing cards for better entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto"
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Skill Cards */}
      <div 
        className="absolute top-1/2 left-1/2 w-96 h-64"
        style={{
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {skillCards.map((skill, index) => (
          <FloatingCard
            key={skill.name}
            skill={skill}
            index={index}
            mousePos={mousePosition}
          />
        ))}
      </div>

      {/* Animated Wireframe Geometry */}
      <WireframeGeometry mousePos={mousePosition} />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-4 h-4 rounded-full opacity-60 animate-pulse"
           style={{ 
             background: `radial-gradient(circle, ${colors.peach} 0%, transparent 70%)`,
             animation: 'float 8s ease-in-out infinite'
           }} />
      
      <div className="absolute bottom-32 right-32 w-6 h-6 rounded-full opacity-40 animate-pulse"
           style={{ 
             background: `radial-gradient(circle, ${colors.teal} 0%, transparent 70%)`,
             animation: 'float 6s ease-in-out infinite reverse'
           }} />
      
      <div className="absolute top-1/3 left-10 w-3 h-3 rounded-full opacity-50 animate-pulse"
           style={{ 
             background: `radial-gradient(circle, ${colors.lavender} 0%, transparent 70%)`,
             animation: 'float 10s ease-in-out infinite'
           }} />
    </div>
  );
};

export default Interactive3D;