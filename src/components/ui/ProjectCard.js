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
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${colors.surface}40 0%, ${colors.overlay}20 100%)`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${colors.overlay}30`,
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${colors.base}80, 0 0 0 1px ${accentColor}30`
          : `0 10px 25px -5px ${colors.base}40`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for extra depth */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`
        }}
      />
      
      {/* Project Image with enhanced styling */}
      <div className="relative h-32 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={240}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-lg font-bold leading-tight transition-colors duration-300 group-hover:translate-x-1"
            style={{ color: isHovered ? accentColor : colors.text }}
          >
            {title}
          </h3>
          
          {/* Accent line */}
          <div 
            className="w-6 h-0.5 mt-2 transition-all duration-500 group-hover:w-10"
            style={{ backgroundColor: accentColor }}
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
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{ color: isHovered ? colors.subtext : `${colors.subtext}CC` }}
        >
          {description}
        </p>
        
        {/* Bottom accent border */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-700 group-hover:w-full"
          style={{ 
            width: isHovered ? "100%" : "25%",
            backgroundColor: accentColor,
            opacity: 0.6
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
