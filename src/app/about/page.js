"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { colors } from "@/styles/theme";
import JourneySection from "@/components/about/JourneySection";
import VideoJourneyAnimation from "@/components/about/VideoJourneyAnimation";

// Text content for the journey sections
const journeySections = [
  {
    title: "The Creative Foundation",
    content:
      "I began my journey as an Animator, graduating from OCAD University with a strong foundation in visual storytelling and motion design. Animation taught me how to guide attention, evoke emotion, and bring ideas to life — all through movement and intention.",
    accentColor: colors.lavender,
  },
  {
    title: "The Shift to Tech",
    content:
      "Curious about how animation could enhance user experiences, I dove into UX/UI design. I quickly realized that blending motion with usability had huge potential—so I took it further. I started learning programming and found joy in building the very experiences I used to imagine. What started as curiosity became a passion for creating interactive, functional design.",
    accentColor: colors.blue,
  },
  {
    title: "Full Stack, Fully Integrated",
    content:
      "Today, I’m a full-stack developer who merges animation, design, and code to build seamless, engaging digital experiences. From frontend interfaces to backend logic, I use my multidisciplinary background to create products that not only work beautifully—but feel alive.",
    accentColor: colors.peach,
  },
];

export default function About() {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  // Simple scroll thresholds for section switching
  const thresholds = useMemo(() => [0.33, 0.66], []); // Switch at 33% and 66% scroll

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollPos = container.scrollTop;
      const containerHeight = container.clientHeight;
      const maxScroll = container.scrollHeight - containerHeight;

      // Calculate scroll percentage (0-100)
      const scrollPercentage = Math.min(
        100,
        (scrollPos / maxScroll) * 100 || 0,
      );
      setScrollPosition(scrollPercentage);

      // Calculate normalized scroll position (0-1)
      const normalizedScrollPosition = scrollPercentage / 100;

      // Determine which section should be active
      if (normalizedScrollPosition < thresholds[0]) {
        setActiveSection(0); // First section
      } else if (normalizedScrollPosition < thresholds[1]) {
        setActiveSection(1); // Second section  
      } else {
        setActiveSection(2); // Third section
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Initial calculation
      handleScroll();

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [thresholds]);

  return (
    <div ref={containerRef} className="overflow-y-auto h-full relative">
      {/* Video background animation */}
      <VideoJourneyAnimation scrollPosition={scrollPosition} />

      {/* Page content - increased vertical spacing between sections */}
      <div className="relative z-10 min-h-screen py-32 px-8">
        <h1
          className="text-3xl font-bold mb-16 text-center"
          style={{ color: colors.text }}
        >
          About My Journey
        </h1>

        {/* Text sections with fade effect - increased spacing with space-y-96 */}
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

        {/* Scroll indicator */}
        <div className="text-center mt-12 animate-bounce">
          <p className="text-sm" style={{ color: colors.subtext }}>
            Scroll to explore the journey
          </p>
        </div>
      </div>
    </div>
  );
}
