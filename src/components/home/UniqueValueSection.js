"use client";
import { useState, useEffect, useRef } from "react";
import { colors } from "../../styles/theme";

const UniqueValueSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const sectionRef = useRef();

  const stories = [
    {
      title: "The Discipline of Dance",
      content: "10+ years of professional dance taught me precision, creativity under pressure, and the art of captivating an audience - skills that translate directly to creating compelling user experiences.",
      metrics: ["10+ Years Professional", "Multiple Disciplines", "Stage Performance"],
      color: colors.peach
    },
    {
      title: "Visual Storytelling",
      content: "My animation degree from OCAD University gave me a deep understanding of visual communication, timing, and creating emotional connections through digital media.",
      metrics: ["OCAD Graduate", "Animation Degree", "Visual Design"],
      color: colors.blue
    },
    {
      title: "Problem-Solving Mindset",
      content: "From UX/UI design to full-stack development, I've learned to see problems from multiple angles and create solutions that are both beautiful and functional.",
      metrics: ["UX/UI Background", "Full-Stack Skills", "User-Centered Design"],
      color: colors.green
    },
    {
      title: "Teaching & Leadership",
      content: "Creating AI development courses has honed my ability to break down complex concepts and guide teams through challenging technical implementations.",
      metrics: ["Course Creator", "AI Expertise", "Technical Leadership"],
      color: colors.lavender
    }
  ];

  const testimonials = [
    {
      text: "Jonathan brings a unique perspective that you won't find in traditional developers. His creativity and attention to detail are exceptional.",
      author: "Sarah Chen",
      role: "Product Manager, TechCorp"
    },
    {
      text: "The way Jonathan approaches problems is unlike anyone I've worked with. He sees solutions others miss.",
      author: "Michael Rodriguez", 
      role: "Lead Developer, StartupX"
    },
    {
      text: "His teaching style made complex AI concepts accessible to our entire team. A rare combination of technical depth and communication skills.",
      author: "Dr. Lisa Park",
      role: "CTO, AI Solutions Inc"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Auto-rotate stories
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-8 relative overflow-hidden"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.lavender} 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, ${colors.blue} 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            Why I'm <span style={{ color: colors.lavender }}>Different</span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.subtext }}
          >
            Every developer can code. But can they choreograph user experiences with the same artistry they bring to the stage?
          </p>
        </div>

        {/* Interactive Story Cards */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Story Navigation */}
          <div className="space-y-4">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${
                  activeStory === index ? "scale-105 shadow-xl" : "hover:scale-102"
                }`}
                style={{
                  backgroundColor: activeStory === index ? `${story.color}22` : `${colors.base}aa`,
                  borderColor: activeStory === index ? story.color : `${colors.overlay}33`
                }}
                onClick={() => setActiveStory(index)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: story.color }}
                  />
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: activeStory === index ? story.color : colors.text }}
                  >
                    {story.title}
                  </h3>
                </div>
                
                {activeStory === index && (
                  <div className="animate-fadeIn">
                    <p 
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: colors.subtext }}
                    >
                      {story.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {story.metrics.map((metric, metricIndex) => (
                        <span
                          key={metricIndex}
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: `${story.color}33`,
                            color: story.color
                          }}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Showcase */}
          <div className="relative">
            <div 
              className="h-full rounded-2xl p-8 flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundColor: `${stories[activeStory].color}11`,
                border: `2px solid ${stories[activeStory].color}33`
              }}
            >
              {/* Animated Background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, ${stories[activeStory].color}00, ${stories[activeStory].color}77, ${stories[activeStory].color}00)`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div 
                  className="w-32 h-32 mx-auto mb-6 rounded-full border-4 flex items-center justify-center"
                  style={{ borderColor: stories[activeStory].color }}
                >
                  <div 
                    className="w-24 h-24 rounded-full opacity-30 animate-pulse"
                    style={{ backgroundColor: stories[activeStory].color }}
                  />
                </div>
                <h4 
                  className="text-2xl font-bold mb-4"
                  style={{ color: stories[activeStory].color }}
                >
                  {stories[activeStory].title}
                </h4>
                <div className="flex justify-center space-x-2">
                  {stories.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeStory ? "scale-150" : ""
                      }`}
                      style={{
                        backgroundColor: index === activeStory ? stories[activeStory].color : colors.overlay
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div 
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 
            className="text-3xl font-bold text-center mb-8"
            style={{ color: colors.lavender }}
          >
            What People Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${colors.base}aa`,
                  borderColor: `${colors.overlay}33`,
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: colors.lavender }}
                >
                  <div 
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: colors.lavender, opacity: 0.2 }}
                  />
                </div>
                <p 
                  className="text-sm leading-relaxed mb-4 italic"
                  style={{ color: colors.text }}
                >
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <div 
                    className="font-bold"
                    style={{ color: colors.lavender }}
                  >
                    {testimonial.author}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: colors.subtext }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueValueSection;