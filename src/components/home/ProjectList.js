"use client";

import { useState, useEffect, useRef } from "react";
import { colors, styles } from "@/styles/theme";
import ProjectCard from "../ui/ProjectCard";

// Project data
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A Next.js application with a custom design system.",
    imageSrc: "/api/placeholder/120/120",
    accentColor: colors.lavender,
    technologies: ["Next.js", "TypeScript"],
    projectUrl: "/projects/project-one",
  },
  {
    id: 2,
    title: "Project Two",
    description: "An e-commerce platform built with React and Node.js.",
    imageSrc: "/api/placeholder/120/120",
    accentColor: colors.blue,
    technologies: ["React", "Node.js"],
    projectUrl: "/projects/project-two",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A real-time dashboard using WebSockets and Chart.js.",
    imageSrc: "/api/placeholder/120/120",
    accentColor: colors.peach,
    technologies: ["React", "WebSockets"],
    projectUrl: "/projects/project-three",
  },
];

const ProjectList = () => {
  const [showProjects, setShowProjects] = useState(false);
  const initialLoadDone = useRef(false);

  // Fade in projects on first load
  useEffect(() => {
    if (!initialLoadDone.current) {
      setTimeout(() => setShowProjects(true), 1300);
      initialLoadDone.current = true;
    } else {
      setShowProjects(true);
    }
  }, []);

  return (
    <div
      className={`lg:w-3/5 ${styles.fadeIn} ${showProjects ? styles.fadeInVisible : styles.fadeInHidden}`}
      style={{ transitionDelay: "0.4s" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        Featured Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            accentColor={project.accentColor}
            technologies={project.technologies}
            projectUrl={project.projectUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
