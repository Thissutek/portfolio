"use client";
import { useState, useEffect, useRef } from "react";
import { colors } from "../../styles/theme";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const mosaicRef = useRef();

  // Video mosaic data - replace with your actual videos
  const videoMosaic = [
    { 
      id: 1,
      src: "/videos/dance-4.mp4", 
      title: "Dance Performance 4",
      category: "Performance",
      size: "large",
      thumbnail: "/imgs/dance-contemporary.jpg"
    },
    { 
      id: 2,
      src: "/videos/coding-react.mp4", 
      title: "React Development",
      category: "Development",
      size: "medium",
      thumbnail: "/imgs/coding-react.jpg"
    },
    { 
      id: 3,
      src: "/videos/dance-1.mp4", 
      title: "Dance Performance 1",
      category: "Performance",
      size: "small",
      thumbnail: "/imgs/ai-course.jpg"
    },
    { 
      id: 4,
      src: "/videos/dance-3.mp4", 
      title: "Dance Performance 3",
      category: "Performance",
      size: "medium",
      thumbnail: "/imgs/dance-hiphop.jpg"
    },
    { 
      id: 5,
      src: "/videos/dance-contemporary.mp4", 
      title: "Contemporary Dance",
      category: "Performance",
      size: "large",
      thumbnail: "/imgs/animation-work.jpg"
    },
    { 
      id: 6,
      src: "/videos/live-coding.mp4", 
      title: "Live Coding Session",
      category: "Development",
      size: "small",
      thumbnail: "/imgs/live-coding.jpg"
    },
    { 
      id: 7,
      src: "/videos/dance-battle.mp4", 
      title: "Dance Battle",
      category: "Performance",
      size: "medium",
      thumbnail: "/imgs/dance-battle.jpg"
    },
    { 
      id: 8,
      src: "/videos/ux-design.mp4", 
      title: "UX Design Process",
      category: "Design",
      size: "small",
      thumbnail: "/imgs/ux-design.jpg"
    }
  ];

  const getSizeClasses = (size) => {
    switch(size) {
      case 'large': return 'row-span-2 col-span-2';
      case 'medium': return 'row-span-2 col-span-1';
      case 'small': return 'row-span-1 col-span-1';
      default: return 'row-span-1 col-span-1';
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Video Mosaic Background */}
      <div 
        ref={mosaicRef}
        className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-4 gap-4 p-6"
      >
        {videoMosaic.map((video, index) => (
          <div
            key={video.id}
            className={`relative overflow-hidden rounded-2xl ${getSizeClasses(video.size)} group cursor-pointer backdrop-blur-md border`}
            style={{
              animationDelay: `${index * 200}ms`,
              backgroundColor: `${colors.surface}33`,
              borderColor: `${colors.overlay}22`,
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 32px ${colors.base}44, inset 0 1px 0 ${colors.overlay}11`
            }}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Video Element */}
            <video
              className="absolute inset-2 w-full h-full rounded-xl object-cover transition-all duration-700 group-hover:scale-105"
              autoPlay
              muted
              playsInline
              onTimeUpdate={(e) => {
                if (e.target.currentTime >= 20) {
                  e.target.currentTime = 0;
                }
              }}
              onEnded={(e) => {
                e.target.currentTime = 0;
                e.target.play();
              }}
              style={{
                filter: hoveredVideo === video.id ? "brightness(1.1) contrast(1.05) saturate(1.1)" : "brightness(0.8) saturate(0.9)",
                left: "4px",
                right: "4px", 
                top: "4px",
                bottom: "4px"
              }}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            
            {/* Glassmorphism Overlay */}
            <div 
              className={`absolute inset-2 rounded-xl transition-all duration-500 ${
                hoveredVideo === video.id 
                ? "bg-gradient-to-t from-black/60 via-transparent to-transparent backdrop-blur-sm" 
                : "bg-gradient-to-br from-white/10 via-transparent to-black/20"
              }`}
              style={{
                backdropFilter: hoveredVideo === video.id ? "blur(2px)" : "blur(1px)",
                border: hoveredVideo === video.id ? `1px solid ${colors.lavender}44` : `1px solid ${colors.overlay}11`
              }}
            />
            
            {/* Tile Number Label */}
            <div 
              className="absolute top-2 left-2 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center z-20"
              style={{
                backgroundColor: `${colors.lavender}88`,
                borderColor: `${colors.lavender}aa`,
                backdropFilter: "blur(12px)"
              }}
            >
              <span 
                className="text-sm font-bold"
                style={{ color: colors.base }}
              >
                {video.id}
              </span>
            </div>

            {/* Video Info with Glassmorphism */}
            <div 
              className={`absolute bottom-2 left-2 right-2 p-3 rounded-lg backdrop-blur-md border transform transition-all duration-500 ${
                hoveredVideo === video.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{
                backgroundColor: `${colors.base}77`,
                borderColor: `${colors.overlay}33`,
                backdropFilter: "blur(16px)"
              }}
            >
              <div 
                className="text-xs font-medium mb-1"
                style={{ color: colors.peach }}
              >
                {video.category}
              </div>
              <div 
                className="text-sm font-bold"
                style={{ color: colors.text }}
              >
                {video.title}
              </div>
            </div>
          </div>
        ))}
        
        {/* Overall Glassmorphism Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              ${colors.base}33 0%, 
              transparent 30%, 
              transparent 70%, 
              ${colors.base}33 100%)`,
            backdropFilter: "blur(2px)"
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-8 max-w-5xl">
          
          {/* Main Brand Statement */}
          <div 
            className={`transform transition-all duration-1500 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1 
              className="text-7xl lg:text-9xl font-black mb-8 leading-none"
              style={{
                background: `linear-gradient(135deg, ${colors.lavender}, ${colors.blue}, ${colors.peach})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(180, 190, 254, 0.3)"
              }}
            >
              JONATHAN YAU
            </h1>
            
            <div className="h-24 mb-12 flex items-center justify-center">
              <h2 
                className="text-2xl lg:text-5xl font-light tracking-wider"
                style={{ 
                  color: colors.text,
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)"
                }}
              >
                Developer &bull; Dancer &bull; Creator
              </h2>
            </div>
          </div>

          {/* Unique Selling Points */}
          <div 
            className={`transform transition-all duration-1500 delay-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  title: "10+ Years", 
                  subtitle: "Professional Dance", 
                  description: "Stage performance &amp; choreography",
                  color: colors.peach,
                  bgColor: colors.peach
                },
                { 
                  title: "OCAD Graduate", 
                  subtitle: "Animation Degree", 
                  description: "Visual storytelling expertise",
                  color: colors.lavender,
                  bgColor: colors.lavender
                },
                { 
                  title: "Full-Stack", 
                  subtitle: "Software Developer", 
                  description: "Modern web technologies",
                  color: colors.green,
                  bgColor: colors.green
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative backdrop-blur-xl border border-opacity-20 rounded-2xl p-8 transition-all duration-500 hover:scale-105 group"
                  style={{
                    backgroundColor: `${item.bgColor}11`,
                    borderColor: `${item.color}44`,
                    animationDelay: `${1200 + index * 200}ms`
                  }}
                >
                  <div 
                    className="text-3xl lg:text-4xl font-bold mb-2"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </div>
                  <div 
                    className="text-lg font-semibold mb-3"
                    style={{ color: colors.text }}
                  >
                    {item.subtitle}
                  </div>
                  <div 
                    className="text-sm opacity-90"
                    style={{ color: colors.subtext }}
                  >
                    {item.description}
                  </div>
                  
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(45deg, ${item.color}33, ${item.color}55)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div 
            className={`transform transition-all duration-1500 delay-1400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                className="px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm border-2"
                style={{
                  backgroundColor: colors.lavender,
                  color: colors.base,
                  borderColor: colors.lavender,
                  boxShadow: `0 10px 30px ${colors.lavender}33`
                }}
                onClick={() => document.getElementById('portfolio-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore My Work
              </button>
              
              <button 
                className="px-10 py-5 rounded-full font-bold text-xl border-2 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                style={{
                  borderColor: colors.blue,
                  color: colors.blue,
                  backgroundColor: "transparent"
                }}
                onClick={() => window.open("/contact", "_self")}
              >
                Let&apos;s Create Together
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 delay-1600 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center">
          <span 
            className="text-sm mb-3 animate-pulse font-medium"
            style={{ color: colors.subtext }}
          >
            DISCOVER MORE
          </span>
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: colors.overlay }}
          >
            <div 
              className="w-1 h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: colors.lavender }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;