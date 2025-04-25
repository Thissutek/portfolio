"use client";

import { useState, useEffect, useRef } from "react";
import { styles, colors } from "@/styles/theme";

const Introduction = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const initialLoadDone = useRef(false);

  // Sequential animation on first load only
  useEffect(() => {
    if (!initialLoadDone.current) {
      // Start sequential animations
      setShowTitle(false);
      setShowSubtitle(false);
      setShowParagraph(false);

      // Title appears first
      setTimeout(() => setShowTitle(true), 300);

      // Subtitle appears next
      setTimeout(() => setShowSubtitle(true), 600);

      // Paragraph appears last
      setTimeout(() => setShowParagraph(true), 900);

      // Mark initial load as complete
      initialLoadDone.current = true;
    } else {
      // If returning to home page after initial load, show everything immediately
      setShowTitle(true);
      setShowSubtitle(true);
      setShowParagraph(true);
    }
  }, []);

  return (
    <div className="lg:w-2/5">
      <div className="sticky top-8">
        <h1
          className={`${styles.slideUp} ${showTitle ? styles.slideUpVisible : styles.slideUpHidden}`}
          style={{
            color: colors.text,
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.25rem",
          }}
        >
          Jonathan Yau
        </h1>

        <h2
          className={`text-xl ${styles.slideUp} ${showSubtitle ? styles.slideUpVisible : styles.slideUpHidden} mb-6`}
          style={{
            color: colors.peach,
            fontWeight: 500,
            transitionDelay: "0.1s",
          }}
        >
          Fullstack Developer / Animation Specialist
        </h2>

        <p
          className={`${styles.slideUp} ${showParagraph ? styles.slideUpVisible : styles.slideUpHidden}`}
          style={{
            color: colors.subtext,
            transitionDelay: "0.2s",
          }}
        >
          I&apos;m a web developer specializing in modern JavaScript frameworks,
          creating responsive and user-friendly applications. I focus on
          building performant and accessible web experiences with engaging
          animations and intuitive interfaces.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
