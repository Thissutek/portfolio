"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styles } from "@/styles/theme";

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  // Handle route changes and trigger transitions
  useEffect(() => {
    // If path changes, start transition
    if (pathname !== displayPath && !isAnimating) {
      setIsAnimating(true);

      // Wait half the transition time, then update content
      const timer = setTimeout(() => {
        setDisplayPath(pathname);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath, isAnimating]);

  // Reset animation state after transition completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className={styles.content}>
      <div
        className={`${styles.pageContainer} ${isAnimating ? styles.fadeInHidden : styles.fadeInVisible}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
