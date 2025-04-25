"use client";

import { colors } from "@/styles/theme";
import JourneySection from "@/components/about/JourneySection";
import JourneyAnimation from "@/components/about/JourneyAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Text content for the journey sections
const journeySections = [
  {
    title: "The Beginning",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus vel nibh convallis, ac commodo dui vehicula. Proin a tortor ac sapien ultricies faucibus vel in nulla. In hac habitasse platea dictumst.",
    accentColor: colors.lavender,
  },
  {
    title: "The Journey",
    content:
      "Fusce ut placerat orci nulla pellentesque. Aliquam erat volutpat. Nulla facilisi. Nulla porttitor massa id neque aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus error.",
    accentColor: colors.blue,
  },
  {
    title: "The Destination",
    content:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    accentColor: colors.peach,
  },
];

export default function About() {
  // Use our custom hook to track scroll and determine active section
  const { containerRef, scrollPosition, activeSection } = useScrollAnimation();

  return (
    <div ref={containerRef} className="overflow-y-auto h-full">
      {/* Background animation that responds to scroll */}
      <JourneyAnimation scrollPosition={scrollPosition} />

      {/* Content container with padding for scrolling */}
      <div className="relative z-10 min-h-screen py-32 px-8">
        <h1
          className="text-3xl font-bold mb-16 text-center"
          style={{ color: colors.text }}
        >
          About My Journey
        </h1>

        {/* Three sections of content that fade in/out based on scroll */}
        <div className="max-w-2xl mx-auto space-y-64">
          {journeySections.map((section, index) => (
            <JourneySection
              key={index}
              title={section.title}
              content={section.content}
              isActive={activeSection === index}
              accentColor={section.accentColor}
            />
          ))}
        </div>

        {/* Scroll indicator at bottom */}
        <div className="text-center mt-12 animate-bounce">
          <p className="text-sm" style={{ color: colors.subtext }}>
            Scroll to explore the journey
          </p>
        </div>
      </div>
    </div>
  );
}
