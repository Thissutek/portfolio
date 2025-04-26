"use client";

import { useRef, useState, useEffect } from "react";
import { colors } from "@/styles/theme";
import JourneySection from "@/components/about/JourneySection";
import VideoJourneyAnimation from "@/components/about/VideoJourneyAnimation";

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
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  // ADJUSTED THRESHOLDS - giving the second section more scroll time
  // First threshold (when to switch from section 1 to 2): decreased from 0.3 to 0.25
  // Second threshold (when to switch from section 2 to 3): increased from 0.7 to 0.85
  // This creates a much longer active period for the second section
  const thresholds = [0.25, 0.85];

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

      // Determine active section using the thresholds
      const normalizedScrollPosition = scrollPos / containerHeight;

      if (normalizedScrollPosition < thresholds[0]) {
        setActiveSection(0);
      } else if (normalizedScrollPosition < thresholds[1]) {
        setActiveSection(1);
      } else {
        setActiveSection(2);
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
