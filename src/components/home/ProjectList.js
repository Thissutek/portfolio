"use client";

import { useState, useEffect, useRef } from "react";
import { colors, styles } from "@/styles/theme";
import ProjectCard from "../ui/ProjectCard";

// Project data
const projects = [
  {
    id: 1,
    title: "NeuroMatch AI-powered talent matching",
    description:
      "An AI-powered talent matching MVP built with Next.js and Supabase—parsing resumes and interview responses to intelligently rank candidates in real time",
    imageSrc: "/imgs/NeuroMatch.png",
    accentColor: colors.green,
    technologies: [
      "Next.js",
      "Supabase",
      "Vercel",
      "Javascript",
      "SQL",
      "Tailwind",
    ],
    projectUrl: "https://ai-talent-match.vercel.app/",
  },
  {
    id: 2,
    title: "Aims2Learn",
    description:
      "A sleek, React-powered tutor portfolio built with Vite and Tailwind—showcasing services, rates, and offering a seamless way for students to get in touch.",
    imageSrc: "/imgs/Aims2Learn.png",
    accentColor: colors.maroon,
    technologies: ["React", "Vite", "Tailwind"],
    projectUrl: "https://www.aims2learn.com/",
  },
  {
    id: 3,
    title: "E-Commerce Modern Web Application",
    description:
      "A full-stack modern e-commerce store built for performance and scalability—featuring smooth UI, dynamic product management, and secure checkout",
    imageSrc: "/imgs/e-commerce.png",
    accentColor: colors.peach,
    technologies: ["React", "Node.js", "Express", "PostgreSQL"],
    projectUrl: "https://github.com/Thissutek/my-ecommerce-app",
  },
  {
    id: 3,
    title: "Alfred Assistant Discord Bot",
    description:
      "A full-stack modern e-commerce store built for performance and scalability—featuring smooth UI, dynamic product management, and secure checkout",
    imageSrc: "/imgs/discord-bot.png",
    accentColor: colors.teal,
    technologies: ["Node.js", "Express", "Javascript"],
    projectUrl: "https://github.com/Thissutek/discord-bot",
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
