"use client";

import { useRef, useEffect, useState } from "react";

const VideoJourneyAnimation = ({ scrollPosition }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoSrc = "/videos/journey-animation.mp4";

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
    };

    const handleError = (e) => {
      console.error("Video loading error:", e);
    };

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Check if video is already loaded
    if (video.readyState >= 3) {
      console.log("Video already loaded");
      setVideoLoaded(true);
    }

    // Cleanup function
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  // Control video playback based on scroll position
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    try {
      // Get video duration (or use a fallback)
      const videoDuration = video.duration || 10;

      // Calculate the target time based on scroll position (0-100%)
      const targetTime = (scrollPosition / 100) * videoDuration;

      // Update the current time if it differs significantly
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }
    } catch (error) {
      console.error("Error controlling video playback:", error);
    }
  }, [scrollPosition, videoLoaded]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        top: "70px", // Account for top navbar height
        overflow: "hidden",
      }}
    >
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white bg-black bg-opacity-50 p-4 rounded">
            Loading animation...
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover opacity-40"
        muted
        playsInline
        preload="auto"
        src={videoSrc}
      />
    </div>
  );
};

export default VideoJourneyAnimation;
