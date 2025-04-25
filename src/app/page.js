"use client";

import Introduction from "@/components/home/Introduction";
import ProjectList from "@/components/home/ProjectList";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-full gap-8 px-4">
      <Introduction />
      <ProjectList />
    </div>
  );
}
