"use client";

import Introduction from "@/components/home/Introduction";
import ProjectList from "@/components/home/ProjectList";
import ParticleSystem from "@/components/home/ParticleSystem";

export default function Home() {
  return (
    <div className="relative min-h-full">
      {/* Particle System Background - Only for Home Page */}
      <div className="fixed inset-0" style={{ zIndex: -50 }}>
        <ParticleSystem />
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen relative">
        <Introduction />
      </section>
      
      {/* Projects Section */}
      <section id="projects-section" className="min-h-screen flex items-center justify-center px-8 py-16 relative" style={{ zIndex: 50 }}>
        <ProjectList />
      </section>
    </div>
  );
}
