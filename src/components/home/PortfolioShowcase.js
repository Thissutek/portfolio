"use client";
import { useState, useEffect, useRef } from "react";
import { colors } from "../../styles/theme";
import Image from "next/image";

const PortfolioShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDanceMode, setIsDanceMode] = useState(false);
  const sectionRef = useRef();

  // Dance mode colors
  const danceColors = {
    primary: "#ff6b9d",      // Hot pink
    secondary: "#c44569",    // Deep rose
    accent: "#f8b500",       // Golden yellow
    surface: "#2d1b69",      // Deep purple
    background: "#0c0c0c",   // Almost black
    text: "#ffffff",         // Pure white
    glow: "#ff6b9d"
  };

  const currentColors = isDanceMode ? danceColors : colors;

  const categoryLabels = {
    development: "Development",
    education: "Teaching", 
    projects: "Projects",
    dance: "Dance"
  };

  // Hero project - the cinematic centerpiece
  const heroProject = {
    id: "hero",
    category: "development",
    type: "project",
    title: "Neuro Match",
    subtitle: "Hackathon Winner - AI Mental Health Platform",
    description: "Award-winning web application that matches users with mental health professionals using AI-powered compatibility algorithms. Built in 48 hours, combining empathetic design with cutting-edge technology.",
    thumbnail: "/imgs/neuro-match.png",
    link: "https://neuro-match.com",
    tags: ["React", "AI", "Healthcare", "Hackathon Winner", "UX Design"],
    stats: { award: "1st Place", hours: "48h", users: "2K+" }
  };

  // Featured Projects Layout
  const featuredProjects = {
    // Second row - specific layout
    aiCourse: {
      id: "ai-course",
      category: "education",
      type: "video",
      title: "AI Engineer Course",
      description: "Comprehensive course series teaching AI development from fundamentals to advanced applications. Created for Aims2Learn platform with hands-on projects and real-world case studies.",
      thumbnail: "/imgs/ai-engineer-course.jpg",
      video: "/videos/ai-engineer-course.mp4",
      tags: ["AI", "Teaching", "Engineering", "Course Creation"]
    },
    savyr: {
      id: "savyr",
      category: "development",
      type: "project",
      title: "Savyr",
      description: "Financial wellness platform helping users save money through intelligent spending insights and automated savings features.",
      thumbnail: "/imgs/savyr.png",
      link: "https://savyr.app",
      tags: ["FinTech", "React", "Mobile", "AI"]
    },
    chromeExt: {
      id: "chrome-ext",
      category: "development",
      type: "project",
      title: "Study Buddy Extension",
      description: "Productivity Chrome extension with AI-powered content summarization and focus tracking for students and professionals.",
      thumbnail: "/imgs/study-buddy-extension.png",
      link: "https://github.com/yourhandle/study-buddy",
      tags: ["Chrome Extension", "AI", "Productivity"]
    }
  };

  // Bottom Projects - Small Cards
  const bottomProjects = [
    {
      id: "discord-bot",
      category: "projects",
      type: "project",
      title: "Discord Bot",
      description: "AI-powered community engagement with personality and custom commands",
      thumbnail: "/imgs/discord-bot.png",
      link: "https://github.com/yourhandle/discord-bot",
      tags: ["Python", "AI", "Bot"]
    },
    {
      id: "ecommerce",
      category: "development",
      type: "project",
      title: "E-Commerce Platform",
      description: "Modern shopping experience with dance-inspired animations and smooth UX",
      thumbnail: "/imgs/e-commerce.png",
      link: "https://github.com/yourhandle/ecommerce",
      tags: ["Next.js", "Animation", "E-commerce"]
    }
  ];

  // Dance Portfolio Projects
  const danceProjects = [
    {
      id: 1,
      category: "dance",
      type: "video",
      title: "Contemporary Solo",
      description: "Emotional storytelling through movement and expression",
      thumbnail: "/imgs/contemporary-solo.jpg",
      video: "/videos/contemporary-solo.mp4",
      tags: ["Contemporary", "Solo", "Storytelling"]
    },
    {
      id: 2,
      category: "dance",
      type: "video",
      title: "Hip-Hop Freestyle",
      description: "Raw energy and improvisation in urban dance culture",
      thumbnail: "/imgs/hiphop-freestyle.jpg",
      video: "/videos/hiphop-freestyle.mp4",
      tags: ["Hip-Hop", "Freestyle", "Urban"]
    },
    {
      id: 3,
      category: "dance",
      type: "video",
      title: "Jazz Competition",
      description: "High-energy performance showcasing technical precision",
      thumbnail: "/imgs/jazz-competition.jpg",
      video: "/videos/jazz-competition.mp4",
      tags: ["Jazz", "Competition", "Technical"]
    },
    {
      id: 4,
      category: "dance",
      type: "video",
      title: "Choreography Reel",
      description: "Original choreographic works spanning multiple styles",
      thumbnail: "/imgs/choreography-reel.jpg",
      video: "/videos/choreography-reel.mp4",
      tags: ["Choreography", "Original", "Multi-Style"]
    },
    {
      id: 5,
      category: "dance",
      type: "video",
      title: "Ballroom Partnership",
      description: "Elegant partnering in ballroom and Latin styles",
      thumbnail: "/imgs/ballroom-partnership.jpg",
      video: "/videos/ballroom-partnership.mp4",
      tags: ["Ballroom", "Partnership", "Elegant"]
    },
    {
      id: 6,
      category: "dance",
      type: "video",
      title: "Dance Battle",
      description: "Competitive freestyle showcasing versatility and style",
      thumbnail: "/imgs/dance-battle.jpg",
      video: "/videos/dance-battle.mp4",
      tags: ["Battle", "Competitive", "Versatile"]
    }
  ];

  // ProjectCard Component
  const ProjectCard = ({ 
    item, 
    isGlass, 
    isDanceMode, 
    currentColors, 
    colors, 
    categoryLabels, 
    handleItemClick, 
    customHeight = 'h-64',
    layout = 'vertical',
    index = 0,
    forceFullImage = false
  }) => (
    <div
      className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] mb-4"
      style={{ animationDelay: `${700 + index * 150}ms` }}
      onClick={() => handleItemClick(item)}
    >
      <div 
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${customHeight} ${
          isGlass ? 'backdrop-blur-lg' : ''
        }`}
        style={{
          backgroundColor: isGlass 
            ? `${isDanceMode ? currentColors.surface : colors.surface}33` 
            : (isDanceMode ? currentColors.surface : colors.surface),
          borderColor: isGlass 
            ? `${isDanceMode ? currentColors.primary : colors.lavender}22` 
            : `${isDanceMode ? currentColors.accent : colors.overlay}33`,
          transition: 'all 0.5s ease-in-out'
        }}
      >
        {layout === 'horizontal' ? (
          // Horizontal Layout
          <div className="flex h-full">
            <div className="relative w-1/2 overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Video Play Overlay */}
              {item.type === "video" && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${isDanceMode ? currentColors.primary : colors.lavender}88`,
                      boxShadow: isDanceMode ? `0 0 20px ${currentColors.glow}44` : 'none'
                    }}
                  >
                    <div className="w-0 h-0 border-l-4 border-r-0 border-t-3 border-b-3 border-l-white border-t-transparent border-b-transparent ml-1" />
                  </div>
                </div>
              )}
              
              {/* Category Badge */}
              <div 
                className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm transition-all duration-500"
                style={{
                  backgroundColor: isDanceMode ? `${currentColors.accent}88` : `${colors.peach}88`,
                  color: isDanceMode ? currentColors.background : colors.base
                }}
              >
                {categoryLabels[item.category] || item.category}
              </div>
            </div>
            
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h4 
                  className="font-bold text-lg mb-2 transition-colors duration-500"
                  style={{ color: isDanceMode ? currentColors.text : colors.text }}
                >
                  {item.title}
                </h4>
                <p 
                  className="text-sm transition-colors duration-500"
                  style={{ color: isDanceMode ? `${currentColors.text}cc` : colors.subtext }}
                >
                  {item.description}
                </p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs rounded-md transition-all duration-500"
                    style={{
                      backgroundColor: isDanceMode ? `${currentColors.secondary}33` : `${colors.blue}22`,
                      color: isDanceMode ? currentColors.primary : colors.blue
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Vertical Layout
          <div className="h-full flex flex-col">
            <div className={`relative overflow-hidden ${
              forceFullImage ? 'h-3/4' : 'h-2/3'
            }`}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Dynamic Spotlight Glow on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 60% 40%, ${isDanceMode ? currentColors.glow : colors.lavender}66, transparent 60%)`
                }}
              />

              {/* Enhanced Video Play Overlay */}
              {item.type === "video" && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${isDanceMode ? currentColors.primary : colors.lavender}88`,
                      boxShadow: isDanceMode ? `0 0 20px ${currentColors.glow}44` : 'none'
                    }}
                  >
                    <div className="w-0 h-0 border-l-6 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent ml-1" />
                  </div>
                </div>
              )}

              {/* Dynamic Category Badge */}
              <div 
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm transition-all duration-500"
                style={{
                  backgroundColor: isDanceMode ? `${currentColors.accent}88` : `${colors.peach}88`,
                  color: isDanceMode ? currentColors.background : colors.base
                }}
              >
                {categoryLabels[item.category] || item.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h4 
                  className="font-bold text-lg mb-2 line-clamp-2 transition-colors duration-500"
                  style={{ color: isDanceMode ? currentColors.text : colors.text }}
                >
                  {item.title}
                </h4>
                <p 
                  className="text-sm line-clamp-3 transition-colors duration-500"
                  style={{ color: isDanceMode ? `${currentColors.text}cc` : colors.subtext }}
                >
                  {item.description}
                </p>
              </div>
              
              {/* Dynamic Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs rounded-md transition-all duration-500"
                    style={{
                      backgroundColor: isDanceMode ? `${currentColors.secondary}33` : `${colors.blue}22`,
                      color: isDanceMode ? currentColors.primary : colors.blue
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Glow Border on Hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: isDanceMode 
              ? `inset 0 0 0 1px ${currentColors.primary}44, 0 0 25px ${currentColors.glow}33, 0 0 50px ${currentColors.glow}11`
              : `inset 0 0 0 1px ${colors.lavender}44, 0 0 20px ${colors.lavender}22`
          }}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleItemClick = (item) => {
    if (item.type === "video") {
      // Open video in modal or new tab
      window.open(item.video, '_blank');
    } else {
      window.open(item.link, '_blank');
    }
  };

  return (
    <section 
      id="portfolio-showcase" 
      ref={sectionRef}
      className="py-20 px-8"
      style={{ 
        backgroundColor: currentColors.background || currentColors.base,
        transition: 'background-color 0.8s ease-in-out'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 
              className="text-5xl font-bold"
              style={{ 
                color: isDanceMode ? currentColors.primary : colors.lavender,
                transition: 'color 0.8s ease-in-out'
              }}
            >
              {isDanceMode ? 'Dance Portfolio' : 'My Unique Journey'}
            </h2>
            
            {/* Easter Egg Toggle Button */}
            <button
              onClick={() => {
                setIsDanceMode(!isDanceMode);
              }}
              className="ml-4 w-12 h-12 rounded-full transition-all duration-500 hover:scale-110 group relative overflow-hidden"
              style={{
                backgroundColor: isDanceMode ? currentColors.primary : colors.lavender,
                boxShadow: isDanceMode 
                  ? `0 0 20px ${currentColors.glow}66, 0 0 40px ${currentColors.glow}33`
                  : `0 4px 15px ${colors.lavender}44`
              }}
              title={isDanceMode ? 'Switch to Developer Portfolio' : 'Discover my dance side'}
            >
              {/* Icon that morphs between code and dance */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`transition-all duration-500 ${
                    isDanceMode ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
                  }`}
                  style={{ color: colors.base }}
                >
                  {'</>'}
                </div>
                <div 
                  className={`absolute transition-all duration-500 ${
                    isDanceMode ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                  }`}
                  style={{ color: currentColors.background || colors.base }}
                >
                  {'♪'}
                </div>
              </div>
              
              {/* Pulsing glow effect for dance mode */}
              {isDanceMode && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: currentColors.glow }}
                />
              )}
            </button>
          </div>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-800"
            style={{ color: isDanceMode ? currentColors.text : colors.subtext }}
          >
            {isDanceMode 
              ? 'A decade of movement, expression, and artistry. Each performance tells a story of passion, dedication, and the pursuit of creative excellence.'
              : 'From stage to screen, from movement to code. Each piece tells a story of creativity, discipline, and innovation that makes me unlike any other developer.'
            }
          </p>
        </div>


        {/* Asymmetrical Cinematic Grid */}
        <div 
          className={`relative max-w-7xl mx-auto transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          
          {/* Hero Card - Large Cinematic Poster */}
          {!isDanceMode && (
            <div 
              className="relative mb-8 group cursor-pointer"
              onClick={() => handleItemClick(heroProject)}
              style={{ animationDelay: '600ms' }}
            >
              {/* Glassmorphism Container */}
              <div 
                className="relative overflow-hidden rounded-3xl backdrop-blur-xl border-2 transition-all duration-700 hover:scale-[1.02]"
                style={{
                  backgroundColor: `${colors.surface}22`,
                  borderColor: `${colors.lavender}33`,
                  boxShadow: `0 32px 64px -12px ${colors.base}77, 
                             0 0 0 1px ${colors.lavender}11,
                             inset 0 1px 0 ${colors.overlay}22`
                }}
              >
                {/* Hero Image with Cinematic Aspect Ratio */}
                <div className="relative h-96 lg:h-[28rem] overflow-hidden">
                  <Image
                    src={heroProject.thumbnail}
                    alt={heroProject.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Cinematic Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"
                  />
                  
                  {/* Spotlight Glow on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${colors.lavender}44, transparent 70%)`
                    }}
                  />

                  {/* Hero Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                    <div className="max-w-2xl">
                      {/* Category Badge */}
                      <div 
                        className="inline-block px-4 py-2 rounded-full text-xs font-bold mb-4 backdrop-blur-md border"
                        style={{
                          backgroundColor: `${colors.peach}33`,
                          color: colors.peach,
                          borderColor: `${colors.peach}44`
                        }}
                      >
                        FEATURED PROJECT
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="text-3xl lg:text-5xl font-black mb-2 leading-tight"
                        style={{ 
                          color: colors.text,
                          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                        }}
                      >
                        {heroProject.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <h4 
                        className="text-lg lg:text-xl font-light mb-3 italic"
                        style={{ 
                          color: colors.lavender,
                          textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                        }}
                      >
                        {heroProject.subtitle}
                      </h4>
                      
                      {/* Description */}
                      <p 
                        className="text-base leading-relaxed mb-5 max-w-xl"
                        style={{ 
                          color: colors.subtext,
                          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}
                      >
                        {heroProject.description}
                      </p>

                      {/* Stats */}
                      <div className="flex gap-4 mb-4">
                        <div className="text-center">
                          <div 
                            className="text-xl font-bold"
                            style={{ color: colors.lavender }}
                          >
                            {heroProject.stats.award}
                          </div>
                          <div 
                            className="text-xs uppercase tracking-wider"
                            style={{ color: colors.subtext }}
                          >
                            Award
                          </div>
                        </div>
                        <div className="text-center">
                          <div 
                            className="text-xl font-bold"
                            style={{ color: colors.blue }}
                          >
                            {heroProject.stats.hours}
                          </div>
                          <div 
                            className="text-xs uppercase tracking-wider"
                            style={{ color: colors.subtext }}
                          >
                            Built In
                          </div>
                        </div>
                        <div className="text-center">
                          <div 
                            className="text-xl font-bold"
                            style={{ color: colors.peach }}
                          >
                            {heroProject.stats.users}
                          </div>
                          <div 
                            className="text-xs uppercase tracking-wider"
                            style={{ color: colors.subtext }}
                          >
                            Users
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3">
                        {heroProject.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-4 py-2 text-sm rounded-full backdrop-blur-md border"
                            style={{
                              backgroundColor: `${colors.blue}22`,
                              color: colors.blue,
                              borderColor: `${colors.blue}33`
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Development Portfolio Layout */}
          {!isDanceMode && (
            <div className="space-y-8">
              
              {/* Featured Projects Row */}
              <div className="grid grid-cols-12 gap-6">
                {/* AI Engineer Course - Tall Vertical (Left) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <ProjectCard 
                    item={featuredProjects.aiCourse} 
                    isGlass={false}
                    isDanceMode={isDanceMode}
                    currentColors={currentColors}
                    colors={colors}
                    categoryLabels={categoryLabels}
                    handleItemClick={handleItemClick}
                    customHeight="h-96"
                    layout="vertical"
                    forceFullImage={true}
                  />
                </div>
                
                {/* Right Side - Savyr and Chrome Extension Split */}
                <div className="col-span-12 md:col-span-6 lg:col-span-8">
                  <div className="flex flex-col gap-3 h-96">
                    {/* Savyr - Top Half */}
                    <div className="h-[11rem]">
                      <ProjectCard 
                        item={featuredProjects.savyr} 
                        isGlass={true}
                        isDanceMode={isDanceMode}
                        currentColors={currentColors}
                        colors={colors}
                        categoryLabels={categoryLabels}
                        handleItemClick={handleItemClick}
                        customHeight="h-full"
                        layout="horizontal"
                      />
                    </div>
                    
                    {/* Chrome Extension - Bottom Half */}
                    <div className="h-[13rem]">
                      <ProjectCard 
                        item={featuredProjects.chromeExt} 
                        isGlass={false}
                        isDanceMode={isDanceMode}
                        currentColors={currentColors}
                        colors={colors}
                        categoryLabels={categoryLabels}
                        handleItemClick={handleItemClick}
                        customHeight="h-full"
                        layout="horizontal"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Row - Small Cards (Completely Separate) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {bottomProjects.map((item, index) => (
                  <ProjectCard 
                    key={item.id}
                    item={item}
                    isGlass={index % 2 === 0}
                    isDanceMode={isDanceMode}
                    currentColors={currentColors}
                    colors={colors}
                    categoryLabels={categoryLabels}
                    handleItemClick={handleItemClick}
                    customHeight="h-52"
                    layout="horizontal"
                    index={index + 3}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Dance Portfolio Layout */}
          {isDanceMode && (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {danceProjects.map((item, index) => {
                const isGlass = index % 3 === 0;
                
                // Pinterest-style random heights
                const heights = ['h-64', 'h-72', 'h-80', 'h-96', 'h-56', 'h-[20rem]'];
                const cardHeight = heights[index % heights.length];

                return (
                  <ProjectCard 
                    key={item.id}
                    item={item}
                    isGlass={isGlass}
                    isDanceMode={isDanceMode}
                    currentColors={currentColors}
                    colors={colors}
                    categoryLabels={categoryLabels}
                    handleItemClick={handleItemClick}
                    customHeight={cardHeight}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div 
            className="inline-block p-8 rounded-2xl backdrop-blur-lg border"
            style={{
              backgroundColor: `${colors.surface}44`,
              borderColor: `${colors.overlay}22`
            }}
          >
            <h3 
              className="text-2xl font-bold mb-4 transition-colors duration-500"
              style={{ color: isDanceMode ? currentColors.primary : colors.lavender }}
            >
              {isDanceMode ? 'Inspired by my artistry?' : 'Ready to bring creativity to your team?'}
            </h3>
            <p 
              className="text-lg mb-6 transition-colors duration-500"
              style={{ color: isDanceMode ? currentColors.text : colors.subtext }}
            >
              {isDanceMode 
                ? "Let's discuss how movement and creativity can inspire your next project."
                : "Let's discuss how my unique background can drive innovation in your projects."
              }
            </p>
            <button 
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: isDanceMode ? currentColors.primary : colors.blue,
                color: isDanceMode ? currentColors.background : colors.base,
                boxShadow: isDanceMode ? `0 0 20px ${currentColors.glow}44` : 'none'
              }}
              onClick={() => window.open('/contact', '_self')}
            >
              {isDanceMode ? 'Connect with the Artist' : 'Start the Conversation'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;