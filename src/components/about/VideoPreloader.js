"use client";

import { useState, useEffect } from "react";
import { colors } from "@/styles/theme";

const VideoPreloader = ({ videoSrc, onLoaded }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");

    // Set up event listeners for tracking loading progress
    video.addEventListener("loadedmetadata", () => {
      setLoadingProgress(20);
    });

    video.addEventListener("loadeddata", () => {
      setLoadingProgress(50);
    });

    video.addEventListener("canplay", () => {
      setLoadingProgress(80);
    });

    video.addEventListener("canplaythrough", () => {
      setLoadingProgress(100);
      setIsLoaded(true);
      if (onLoaded) onLoaded(video);
    });

    // Handle errors
    video.addEventListener("error", () => {
      console.error("Error loading video");
    });

    // Start loading the video
    video.src = videoSrc;
    video.preload = "auto";
    video.muted = true;
    video.style.display = "none";

    // Cleanup
    return () => {
      video.src = "";
      video.remove();
    };
  }, [videoSrc, onLoaded]);

  if (isLoaded) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90"
      style={{ backgroundColor: colors.base }}
    >
      <div className="text-center">
        <h2 className="text-xl mb-4" style={{ color: colors.text }}>
          Loading Journey Animation
        </h2>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${loadingProgress}%`,
              backgroundColor: colors.lavender,
            }}
          ></div>
        </div>
        <p className="mt-2 text-sm" style={{ color: colors.subtext }}>
          {loadingProgress}% loaded
        </p>
      </div>
    </div>
  );
};

export default VideoPreloader;
