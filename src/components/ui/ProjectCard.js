"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { colors } from "@/styles/theme";
import TechTag from "./TechTag";

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
    <Link
      href={projectUrl}
      className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg flex"
      style={{
        backgroundColor: isHovered ? colors.surface : "transparent",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="w-24 h-24 bg-gray-700 flex items-center justify-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-700" />
        )}
      </div>

      {/* Project Content */}
      <div className="p-3 flex-1">
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: accentColor || colors.lavender }}
        >
          {title}
        </h3>

        <p className="text-sm mb-2" style={{ color: colors.subtext }}>
          {description}
        </p>

        {/* Tech Stack Tags */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
              <TechTag key={index} label={tech} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
