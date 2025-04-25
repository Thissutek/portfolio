"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook that tracks scroll position and determines active section
 * @param {number} sectionCount - Number of text sections
 * @param {Array<number>} thresholds - Scroll thresholds for section changes (0-1)
 * @returns {Object} - Scroll data and active section
 */
export const useScrollAnimation = (
  sectionCount = 3,
  thresholds = [0.3, 0.7],
) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const containerHeight = container.clientHeight;
      const maxScroll = container.scrollHeight - containerHeight;

      // Set normalized scroll position (0-100)
      const normalizedPos = (scrollPos / maxScroll) * 100;
      setScrollPosition(normalizedPos);

      // Determine active section based on thresholds
      if (scrollPos < containerHeight * thresholds[0]) {
        setActiveSection(0);
      } else if (scrollPos < containerHeight * thresholds[1]) {
        setActiveSection(1);
      } else {
        setActiveSection(2);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [thresholds]);

  return {
    containerRef,
    scrollPosition,
    activeSection,
  };
};
