"use client";

import Introduction from "@/components/home/Introduction";
import ProjectList from "@/components/home/ProjectList";

export default function Home() {
  return (
    <div className="relative min-h-full">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        <Introduction />
      </section>
      
      {/* Projects Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-16 relative" style={{ zIndex: 50 }}>
        <ProjectList />
      </section>
    </div>
  );
}
