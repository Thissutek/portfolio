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
    dance: "Dance",
    client: "Client Project"
  };

  // Hero project - the cinematic centerpiece
  const heroProject = {
    id: "hero",
    category: "development",
    type: "project",
    title: "Neuro Match",
    subtitle: "Hackathon Winner - AI Talent Matching Platform",
    description: "Award-winning AI-powered talent matching web app that streamlines the interview process. Ranks candidates based on their interviews and resumes through AI video interviews, revolutionizing recruitment with intelligent matching algorithms.",
    thumbnail: "/imgs/NeuroMatch.png",
    link: "https://ai-talent-match.vercel.app/",
    tags: ["Next.js", "TypeScript", "Supabase", "AI", "Hackathon Winner"],
    stats: { award: "1st Place", hours: "48h" }
  };

  // Featured Projects Layout
  const featuredProjects = {
    // Second row - specific layout
    aiCourse: {
      id: "ai-course",
      category: "education",
      type: "project",
      title: "AI Engineer Course",
      description: "Assisting instructor for BraveCareer's Fullstack AI Engineer course. Created educational tip videos covering freelancing strategies and navigation advice for aspiring AI software developers entering the freelance market.",
      thumbnail: "/imgs/ai engineer course.png",
      video: "/videos/ai-engineer-course.mp4",
      link: "https://www.bravecareer.ai/courses/fullstack-ai-engineer",
      tags: ["AI", "Freelancing", "Video Creation", "Education"]
    },
    savyr: {
      id: "savyr",
      category: "client",
      type: "project",
      title: "Savyr",
      description: "AI-powered meal planner that parses images from flyers to create affordable meal plans. Available on iOS and Google Play Store.",
      thumbnail: "/imgs/appstore.png",
      link: "https://apps.apple.com/ca/app/savyr/id6748922640",
      tags: ["React Native", "Expo", "Supabase", "AI"],
      disclaimer: "Client project completed under NDA. All intellectual property rights belong to the client."
    },
    chromeExt: {
      id: "chrome-ext",
      category: "client",
      type: "project",
      title: "Note Taking Chrome Extension",
      description: "AI-powered note-taking Chrome extension featuring Deepgram AI for speech-to-text and text-to-speech capabilities.",
      thumbnail: "/imgs/Note-taking.png",
      link: "https://www.loom.com/share/ff4b6b8f39c74eb294babb0c19cfebc1?sid=5b64a8b8-6b2a-406a-9b85-6b6eabe0b1f5",
      tags: ["React", "Chrome Extension", "Firebase", "Deepgram AI"],
      disclaimer: "Client project completed under NDA. All intellectual property rights belong to the client."
    }
  };

  // Bottom Projects - Small Cards
  const bottomProjects = [
    {
      id: "aims2learn",
      category: "client",
      type: "project",
      title: "Aims2Learn",
      description: "Business website development including brand finalization, business model consultation, and customer attraction strategy. Complete business launch support beyond just coding.",
      thumbnail: "/imgs/Aims2Learn.png",
      link: "https://www.aims2learn.com/",
      tags: ["React", "Vite", "Branding"],
      disclaimer: "Client project completed under NDA. All intellectual property rights belong to the client."
    },
    {
      id: "discord-bot",
      category: "projects",
      type: "project",
      title: "Discord Bot",
      description: "Community engagement bot with custom commands and Google API integrations for enhanced server functionality",
      thumbnail: "/imgs/discord-bot.png",
      link: "https://github.com/yourhandle/discord-bot",
      tags: ["Node.js", "JavaScript", "Google APIs"]
    },
    {
      id: "ecommerce",
      category: "projects",
      type: "project",
      title: "E-Commerce Platform",
      description: "Full-stack shopping platform with modern UX, dance-inspired animations, and complete database integration",
      thumbnail: "/imgs/e-commerce.png",
      link: "https://github.com/yourhandle/ecommerce",
      tags: ["React", "Node.js", "PostgreSQL"]
    }
  ];

  // Dance Portfolio Projects
  const danceProjects = [
    {
      id: 1,
      category: "dance",
      type: "video",
      title: "Studio North Class",
      description: "A class I taught at Studio North Toronto",
      thumbnail: "/imgs/dance-reel-1.jpg",
      video: "/videos/choreography-reel.mp4",
      youtubeUrl: "https://youtu.be/4QGX-8akg1o?si=LfgteQLA9zcZuzKL",
      tags: ["Teaching", "Studio North", "Toronto", "Class"]
    },
    {
      id: 2,
      category: "dance",
      type: "video",
      title: "Feel No Ways",
      description: "Neo renaissance theme concept video with production lighting directors - full day shoot",
      thumbnail: "/imgs/addo-1.jpg",
      video: "/videos/feel-no-ways.mp4",
      youtubeUrl: "https://youtu.be/Ertuk761_gw?si=RcOGpoL1xNDrrHW8",
      tags: ["Neo Renaissance", "Concept Video", "Production", "Cinematic"]
    },
    {
      id: 3,
      category: "dance",
      type: "video",
      title: "Pillar Anthology Series",
      description: "A four part anthology series depicting the levels of connectivity. Beginning from the initial feeling of igniting the flame, the anxiousness of dropping barriers, the feelings of acceptance, and the reflection of gratitude. Each Pillar project can be enjoyed and understood as its own standalone story, but together comprise one overarching narrative. I was one of the choreographers and I am one of the people who helped storyboard the idea",
      thumbnail: "/imgs/pillar.jpg",
      video: "/videos/pillar.mp4",
      youtubeUrl: "https://youtu.be/2y98nKjEskk?si=S-Ra4QeWOPvIjrFw",
      tags: ["Anthology", "Choreographer", "Storyboard", "Narrative", "Connectivity"]
    },
    {
      id: 4,
      category: "dance",
      type: "video",
      title: "Patchwork",
      description: "A thematically driven performance exploring the concept of patchwork - where diverse fabric pieces unite to create a singular masterpiece. This show weaves together multiple narratives and movement styles, demonstrating how different stories and artistic elements can harmoniously converge into one cohesive theatrical experience.",
      thumbnail: "/imgs/patchwork.png",
      video: "/videos/patchwork.mp4",
      youtubeUrl: "https://youtu.be/thBSu-FzAy0?si=XZPZxKGD4q6lcpq9",
      tags: ["Theatrical", "Narrative Fusion", "Conceptual", "Multi-Style", "Thematic"]
    },
    {
      id: 5,
      category: "dance",
      type: "video",
      title: "Legacy Dance Competition 2023",
      description: "Dance competition performance showcasing technical skill and artistry",
      thumbnail: "/imgs/onetwous.jpg",
      video: "/videos/legacy-competition.mp4",
      youtubeUrl: "https://youtu.be/yvk1S3XrFgk?si=N4lHItCqaaGxVgOz",
      tags: ["Competition", "2023", "Legacy", "Performance"]
    },
    {
      id: 6,
      category: "dance",
      type: "video",
      title: "R2D 2019 First Place",
      description: "First place winning performance at R2D competition 2019",
      thumbnail: "/imgs/memories.png",
      video: "/videos/r2d-2019.mp4",
      youtubeUrl: "https://youtu.be/wH_sSPY-Dh0?si=xnLuUhNf7LyMF5BR",
      tags: ["Competition", "First Place", "R2D", "2019", "Winner"]
    },
    {
      id: 7,
      category: "dance",
      type: "video",
      title: "Prelude 2018 3rd Place",
      description: "Third place performance at Prelude competition 2018",
      thumbnail: "/imgs/memories-2.jpg",
      video: "/videos/prelude-2018.mp4",
      youtubeUrl: "https://youtu.be/1ziOzLILw74?si=LNkMNf_EUUj9Ue-W",
      tags: ["Competition", "3rd Place", "Prelude", "2018"]
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
                className={`transition-transform duration-500 group-hover:scale-110 ${
                  item.id === 'savyr' ? 'object-contain' : 'object-cover'
                }`}
                style={item.id === 'savyr' ? { padding: '1rem' } : {}}
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
                  className="font-bold text-base lg:text-lg mb-2 transition-colors duration-500"
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
                {item.tags.slice(0, 4).map((tag, tagIndex) => (
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
              
              {/* Disclaimer for client projects */}
              {item.disclaimer && (
                <div className="mt-2">
                  <p 
                    className="text-xs italic opacity-70"
                    style={{ color: isDanceMode ? currentColors.text : colors.subtext }}
                  >
                    {item.disclaimer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Vertical Layout
          <div className="h-full flex flex-col">
            <div className={`relative overflow-hidden ${
              isDanceMode ? 'aspect-[4/3]' : (forceFullImage ? 'h-3/4' : 'h-2/3')
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
                  className="font-bold text-base lg:text-lg mb-2 line-clamp-2 transition-colors duration-500"
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
                {item.tags.slice(0, 4).map((tag, tagIndex) => (
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
              
              {/* Disclaimer for client projects */}
              {item.disclaimer && (
                <div className="mt-2">
                  <p 
                    className="text-xs italic opacity-70"
                    style={{ color: isDanceMode ? currentColors.text : colors.subtext }}
                  >
                    {item.disclaimer}
                  </p>
                </div>
              )}
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
    if (item.youtubeUrl) {
      // Open YouTube link in new tab
      window.open(item.youtubeUrl, '_blank');
    } else if (item.type === "video") {
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
      className="py-16 lg:py-20 px-6 lg:px-8"
      style={{ 
        backgroundColor: currentColors.background || currentColors.base,
        transition: 'background-color 0.8s ease-in-out'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-12 lg:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 
              className="text-2xl lg:text-3xl xl:text-5xl font-bold"
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
            className="text-base lg:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-800"
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
                <div className="relative h-80 lg:h-96 xl:h-[28rem] overflow-hidden">
                  <Image
                    src={heroProject.thumbnail}
                    alt={heroProject.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Cinematic Gradient Overlay with blur */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60"
                    style={{ backdropFilter: "blur(1px)" }}
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
                        className="text-2xl lg:text-3xl xl:text-5xl font-black mb-2 leading-tight"
                        style={{ 
                          color: colors.text,
                          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                        }}
                      >
                        {heroProject.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <h4 
                        className="text-base lg:text-lg xl:text-xl font-light mb-3 italic"
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
                      <div className="flex gap-6 mb-4">
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
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
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
                  <div className="flex flex-col gap-6 h-80 lg:h-96">
                    {/* Savyr - Top Half */}
                    <div className="h-[10rem] lg:h-[12rem]">
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
                    <div className="h-[10rem] lg:h-[12rem]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-4">
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
                    customHeight="h-56 lg:h-60"
                    layout="horizontal"
                    index={index + 3}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Dance Portfolio Layout */}
          {isDanceMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {danceProjects.map((item, index) => {
                const isGlass = index % 3 === 0;
                
                // Auto height based on content
                const cardHeight = 'h-auto';

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
          className={`text-center mt-12 lg:mt-16 transform transition-all duration-1000 delay-700 ${
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
              className="text-xl lg:text-2xl font-bold mb-4 transition-colors duration-500"
              style={{ color: isDanceMode ? currentColors.primary : colors.lavender }}
            >
              {isDanceMode ? 'Inspired by my artistry?' : 'Ready to bring creativity to your team?'}
            </h3>
            <p 
              className="text-base lg:text-lg mb-6 transition-colors duration-500"
              style={{ color: isDanceMode ? currentColors.text : colors.subtext }}
            >
              {isDanceMode 
                ? "Let's discuss how movement and creativity can inspire your next project."
                : "Let's discuss how my unique background can drive innovation in your projects."
              }
            </p>
            <button 
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
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