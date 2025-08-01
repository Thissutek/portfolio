"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { colors } from "@/styles/theme";
import TechTag from "./TechTag";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({
  title,
  description,
  imageSrc,
  accentColor,
  technologies = [],
  projectUrl = "#",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer flex flex-col h-full"
      style={{
        zIndex: 70,
        background: `linear-gradient(135deg, ${colors.surface}60 0%, ${colors.overlay}40 100%)`,
        backdropFilter: "blur(60px)",
        border: `1px solid ${colors.overlay}30`,
        boxShadow: `0 10px 25px -5px ${colors.base}40`,
        transform: 'translateZ(0)', // Force GPU acceleration
        willChange: 'transform, box-shadow',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = 'translateZ(0) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 25px 50px -12px ${colors.base}80, 0 0 0 1px ${accentColor}30`;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = 'translateZ(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 10px 25px -5px ${colors.base}40`;
      }}
    >
      {/* Background overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `${colors.base}15`,
          backdropFilter: "blur(20px)",
        }}
      />
      
      {/* Gradient overlay for extra depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Project Image with enhanced styling */}
      <div className="relative h-40 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={240}
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform'
            }}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.surface}80` }}
          >
            <div className="text-4xl opacity-20">📁</div>
          </div>
        )}
        
        {/* Image overlay gradient */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${colors.base}20 50%, ${colors.base}60 100%)`
          }}
        />
        
        {/* Floating action button */}
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          style={{
            background: `${colors.surface}90`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${colors.overlay}50`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={16} style={{ color: accentColor }} />
        </a>
      </div>

      {/* Project Content with enhanced spacing */}
      <div className="p-5 relative z-10 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-lg font-bold leading-tight"
            style={{ 
              color: isHovered ? accentColor : colors.text,
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'color 0.3s ease-out, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, color'
            }}
          >
            {title}
          </h3>
          
          {/* Accent line */}
          <div 
            className="h-0.5 mt-2"
            style={{ 
              width: isHovered ? '40px' : '24px',
              backgroundColor: accentColor,
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'width'
            }}
          />
        </div>

        {/* Tech Stack Tags underneath title */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.map((tech, index) => (
              <TechTag 
                key={index} 
                label={tech} 
                accentColor={accentColor}
                isHovered={isHovered}
              />
            ))}
          </div>
        )}

        <p 
          className="text-sm leading-relaxed flex-1"
          style={{ 
            color: isHovered ? colors.subtext : `${colors.subtext}CC`,
            transition: 'color 0.3s ease-out'
          }}
        >
          {description}
        </p>
        
        {/* Bottom accent border */}
        <div 
          className="absolute bottom-0 left-0 h-0.5"
          style={{ 
            width: isHovered ? "100%" : "25%",
            backgroundColor: accentColor,
            opacity: 0.6,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'width'
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
