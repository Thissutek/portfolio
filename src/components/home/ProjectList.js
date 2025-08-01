"use client";

import { useState, useEffect, useRef } from "react";
import { colors, styles } from "@/styles/theme";
import ProjectCard from "../ui/ProjectCard";

// Project data
const projects = [
  {
    id: 1,
    title: "Savyr",
    description:
      "An AI-powered meal planning mobile app that transforms grocery flyers into personalized weekly meal plans. Snap a photo of any flyer and watch as intelligent parsing creates tailored meal suggestions optimized for your preferences and budget.",
    imageSrc: "/imgs/savyr.png",
    accentColor: colors.yellow,
    technologies: ["React Native", "Expo", "Supabase", "Tailwind", "iOS", "Android"],
    projectUrl: "https://apps.apple.com/app/savyr",
  },
  {
    id: 2,
    title: "Nota",
    description:
      "An intelligent Chrome extension for seamless note-taking with AI-powered features. Highlight any webpage content and instantly add it to your notes with automatic source linking, enhanced by Deepgram's speech-to-text and text-to-speech capabilities.",
    imageSrc: "/imgs/nota.png",
    accentColor: colors.blue,
    technologies: ["React", "Vite", "Tailwind", "Firebase", "Chrome Extension", "Deepgram"],
    projectUrl: "https://chrome.google.com/webstore/detail/nota",
  },
  {
    id: 3,
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
    id: 4,
    title: "Aims2Learn",
    description:
      "A sleek, React-powered tutor portfolio built with Vite and Tailwind—showcasing services, rates, and offering a seamless way for students to get in touch.",
    imageSrc: "/imgs/Aims2Learn.png",
    accentColor: colors.maroon,
    technologies: ["React", "Vite", "Tailwind"],
    projectUrl: "https://www.aims2learn.com/",
  },
  {
    id: 5,
    title: "E-Commerce Modern Web Application",
    description:
      "A full-stack modern e-commerce store built for performance and scalability—featuring smooth UI, dynamic product management, and secure checkout",
    imageSrc: "/imgs/e-commerce.png",
    accentColor: colors.peach,
    technologies: ["React", "Node.js", "Express", "PostgreSQL"],
    projectUrl: "https://github.com/Thissutek/my-ecommerce-app",
  },
  {
    id: 6,
    title: "Alfred Assistant Discord Bot",
    description:
      "A versatile Discord bot built with Node.js and Express—featuring automated moderation, custom commands, and seamless server management capabilities",
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
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ${styles.fadeIn} ${showProjects ? styles.fadeInVisible : styles.fadeInHidden} relative`}
      style={{ transitionDelay: "0.4s", zIndex: 60 }}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ color: colors.text }}>
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="animate-fadeInUp h-full"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              accentColor={project.accentColor}
              technologies={project.technologies}
              projectUrl={project.projectUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
