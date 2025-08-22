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
      src: "/videos/dance-5.mp4", 
      title: "Dance Performance 5",
      category: "Performance",
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
      src: "/videos/dev-2.mov", 
      title: "Development Project 2",
      category: "Development",
      size: "large",
      thumbnail: "/imgs/animation-work.jpg"
    },
    { 
      id: 6,
      src: "/videos/Project delivery.mp4", 
      title: "Project Delivery",
      category: "Development",
      size: "small",
      thumbnail: "/imgs/live-coding.jpg"
    },
    { 
      id: 7,
      src: "/videos/dev-1.mp4", 
      title: "Development Project 1",
      category: "Development",
      size: "medium",
      thumbnail: "/imgs/dance-battle.jpg"
    },
    { 
      id: 8,
      src: "/videos/Course-video.mp4", 
      title: "Course Content",
      category: "Education",
      size: "small",
      thumbnail: "/imgs/ai-course.jpg"
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
    <div className="relative h-screen lg:h-[120vh] xl:h-screen w-full overflow-hidden">
      
      {/* Video Mosaic Background */}
      <div 
        ref={mosaicRef}
        className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-4 gap-4 p-6 mx-8 lg:mx-16 xl:mx-24"
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
            {/* Video Element or Placeholder */}
            {video.src ? (
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
            ) : (
              // Placeholder for tiles without videos
              <div 
                className="absolute inset-2 w-full h-full rounded-xl flex items-center justify-center transition-all duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}80 0%, ${colors.overlay}40 100%)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${colors.overlay}30`
                }}
              >
                <div className="text-center">
                  <div 
                    className="text-4xl mb-2 opacity-60"
                    style={{ color: colors.lavender }}
                  >
                    📹
                  </div>
                  <div 
                    className="text-sm font-medium opacity-80"
                    style={{ color: colors.text }}
                  >
                    Coming Soon
                  </div>
                </div>
              </div>
            )}
            
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
              className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black mb-3 lg:mb-4 xl:mb-6 leading-none"
              style={{
                background: `linear-gradient(135deg, ${colors.lavender}, ${colors.blue}, ${colors.peach})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(180, 190, 254, 0.3)"
              }}
            >
              JONATHAN YAU
            </h1>
            
            <div className="h-8 lg:h-12 xl:h-16 mb-4 lg:mb-6 xl:mb-8 flex items-center justify-center">
              <h2 
                className="text-base md:text-lg lg:text-xl xl:text-3xl font-light tracking-wider"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 xl:gap-6 mb-6 lg:mb-8 xl:mb-12">
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
                  className="relative backdrop-blur-xl border border-opacity-20 rounded-xl p-3 lg:p-4 xl:p-6 transition-all duration-500 hover:scale-105 group"
                  style={{
                    backgroundColor: `${item.bgColor}11`,
                    borderColor: `${item.color}44`,
                    animationDelay: `${1200 + index * 200}ms`
                  }}
                >
                  <div 
                    className="text-lg lg:text-xl xl:text-2xl font-bold mb-1 lg:mb-2"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </div>
                  <div 
                    className="text-xs lg:text-sm xl:text-base font-semibold mb-1 lg:mb-2"
                    style={{ color: colors.text }}
                  >
                    {item.subtitle}
                  </div>
                  <div 
                    className="text-xs opacity-90"
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
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 xl:gap-6 justify-center items-center">
              <button 
                className="px-6 lg:px-8 xl:px-10 py-3 lg:py-4 xl:py-5 rounded-full font-bold text-base lg:text-lg xl:text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm border-2"
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
                className="px-6 lg:px-8 xl:px-10 py-3 lg:py-4 xl:py-5 rounded-full font-bold text-base lg:text-lg xl:text-xl border-2 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
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