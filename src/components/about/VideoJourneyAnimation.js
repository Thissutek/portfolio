"use client";

import { useEffect, useRef, useState } from "react";

const VideoJourneyAnimation = ({ scrollPosition }) => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setLoaded(true);
    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 3) setLoaded(true);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;
    try {
      const duration = video.duration || 10;
      const target = (scrollPosition / 100) * duration;
      if (Math.abs(video.currentTime - target) > 0.01) {
        video.currentTime = target;
      }
    } catch {}
  }, [scrollPosition, loaded]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ top: 70 }}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        src="/videos/journey-animation.mp4"
        style={{ opacity: 0.28, filter: "saturate(0.9) contrast(1.05)" }}
      />
      {/* cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(17,17,27,0.85) 80%, rgba(17,17,27,0.96) 100%)",
        }}
      />
      <div className="absolute inset-0 grid-overlay scanlines opacity-70" />
    </div>
  );
};

export default VideoJourneyAnimation;
