"use client";
import { useEffect, useRef, useState } from "react";
import { tokens, fonts } from "../../styles/theme";
import { ArrowDownRight, Code2, Send } from "lucide-react";

const videoMosaic = [
  { id: 1, src: "/videos/webm/dance-4.webm", size: "large", category: "performance" },
  { id: 2, src: "/videos/webm/dance-5.webm", size: "medium", category: "performance" },
  { id: 3, src: "/videos/webm/dance-1.webm", size: "small", category: "performance" },
  { id: 4, src: "/videos/webm/dance-3.webm", size: "medium", category: "performance" },
  { id: 5, src: "/videos/webm/dev-2.webm", size: "large", category: "development" },
  { id: 6, src: "/videos/webm/Project delivery.webm", size: "small", category: "development" },
  { id: 7, src: "/videos/webm/dev-1.webm", size: "medium", category: "development" },
  { id: 8, src: "/videos/webm/Course-video.webm", size: "small", category: "education" },
];

const sizeClasses = {
  large: "row-span-2 col-span-2",
  medium: "row-span-2 col-span-1",
  small: "row-span-1 col-span-1",
};

const heroLines = [
  { prompt: "$", text: "whoami" },
  { prompt: ">", text: "jonathan yau · developer · dancer · creator" },
  { prompt: "$", text: "cat ./mission.md" },
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
      style={{ background: tokens.bgDeep }}
    >
      {/* Video mosaic — atmospheric backdrop */}
      <div
        className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-4 gap-3 p-4 md:p-6 opacity-90"
        aria-hidden
      >
        {videoMosaic.map((v, i) => (
          <div
            key={v.id}
            className={`relative overflow-hidden rounded-xl ${sizeClasses[v.size]}`}
            style={{
              animation: `fadeIn 1.2s ease-out ${i * 110}ms both`,
              boxShadow: "inset 0 0 80px rgba(17,17,27,0.6)",
            }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ filter: "brightness(0.55) saturate(0.85)" }}
            >
              <source src={v.src} type="video/webm" />
            </video>
          </div>
        ))}
      </div>

      {/* Cinematic gradient + vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(17,17,27,0.35) 35%, rgba(17,17,27,0.85) 70%, rgba(17,17,27,0.96) 100%)`,
        }}
      />

      {/* Grid overlay + scanlines */}
      <div className="absolute inset-0 z-[2] grid-overlay scanlines pointer-events-none" />

      {/* Ambient color glow */}
      <div
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full ambient-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(180,190,254,0.20), transparent 60%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[44rem] h-[44rem] rounded-full ambient-glow pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(250,179,135,0.16), transparent 60%)",
          animationDelay: "3s",
        }}
      />

      {/* Foreground IDE panel */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left — terminal card */}
          <div
            className={`lg:col-span-7 ${mounted ? "animate-ideEnter" : "opacity-0"}`}
          >
            <div className="glass-panel-strong rounded-2xl overflow-hidden">
              {/* window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b"
                style={{
                  borderColor: "rgba(180,190,254,0.10)",
                  background: "rgba(17,17,27,0.6)",
                  fontFamily: fonts.mono,
                }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#f9e2af" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
                <span
                  className="ml-3 text-[11px] tracking-[0.18em] uppercase"
                  style={{ color: tokens.fgDim }}
                >
                  ~/about/jonathan-yau · zsh
                </span>
                <span className="ml-auto flex items-center gap-2 text-[11px]" style={{ color: tokens.fgDim }}>
                  <span className="relative inline-flex w-2 h-2">
                    <span
                      className="absolute inset-0 rounded-full animate-pulseRing"
                      style={{ background: tokens.accentSuccess }}
                    />
                    <span
                      className="relative rounded-full w-2 h-2"
                      style={{ background: tokens.accentSuccess }}
                    />
                  </span>
                  live · {time}
                </span>
              </div>

              <div className="p-6 md:p-8" style={{ fontFamily: fonts.mono }}>
                {heroLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-2 text-sm md:text-base mb-1.5"
                    style={{
                      color: tokens.fgMuted,
                      opacity: 0,
                      animation: `fadeInUp 0.45s ease-out ${250 + i * 220}ms both`,
                    }}
                  >
                    <span style={{ color: tokens.accent }}>{line.prompt}</span>
                    <span>{line.text}</span>
                  </div>
                ))}

                {/* Headline as variable declaration */}
                <div
                  className="mt-6"
                  style={{
                    fontFamily: fonts.mono,
                    opacity: 0,
                    animation: "fadeInUp 0.55s ease-out 950ms both",
                  }}
                >
                  <span style={{ color: tokens.codeKeyword }}>const </span>
                  <span style={{ color: tokens.codeFunction }}>portfolio </span>
                  <span style={{ color: tokens.codePunct }}>= </span>
                  <span style={{ color: tokens.codeString }}>{"{"}</span>
                </div>

                {/* Big display name */}
                <h1
                  className="my-3 font-display font-bold leading-[0.95] tracking-tight"
                  style={{
                    fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)",
                    background: `linear-gradient(120deg, ${tokens.accent} 0%, ${tokens.accentSoft} 45%, ${tokens.accentWarm} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 60px rgba(180,190,254,0.18)",
                    opacity: 0,
                    animation: "fadeInUp 0.7s ease-out 1100ms both",
                  }}
                >
                  Jonathan Yau
                </h1>

                {/* Subtitle as code property */}
                <div
                  className="text-sm md:text-base mb-1"
                  style={{
                    fontFamily: fonts.mono,
                    opacity: 0,
                    animation: "fadeInUp 0.5s ease-out 1280ms both",
                  }}
                >
                  <span style={{ color: tokens.codeComment }}>{"// role"}</span>
                </div>
                <div
                  className="text-base md:text-lg mb-5"
                  style={{
                    fontFamily: fonts.mono,
                    opacity: 0,
                    animation: "fadeInUp 0.5s ease-out 1340ms both",
                  }}
                >
                  <span style={{ color: tokens.fgMuted }}>  role: </span>
                  <span style={{ color: tokens.codeString }}>
                    &quot;full-stack developer · animator · choreographer&quot;
                  </span>
                  <span style={{ color: tokens.codePunct }}>,</span>
                </div>
                <div
                  className="text-base md:text-lg mb-5"
                  style={{
                    fontFamily: fonts.mono,
                    opacity: 0,
                    animation: "fadeInUp 0.5s ease-out 1420ms both",
                  }}
                >
                  <span style={{ color: tokens.fgMuted }}>  mission: </span>
                  <span style={{ color: tokens.codeString }}>
                    &quot;build software that feels alive&quot;
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: fonts.mono,
                    opacity: 0,
                    animation: "fadeInUp 0.5s ease-out 1500ms both",
                  }}
                >
                  <span style={{ color: tokens.codeString }}>{"}"}</span>
                  <span
                    className="ml-1 inline-block align-middle h-5 w-[2px] animate-blink"
                    style={{ background: tokens.accent }}
                  />
                </div>

                {/* CTAs */}
                <div
                  className="mt-8 flex flex-col sm:flex-row gap-3"
                  style={{
                    opacity: 0,
                    animation: "fadeInUp 0.6s ease-out 1700ms both",
                  }}
                >
                  <button
                    onClick={() =>
                      document
                        .getElementById("portfolio-showcase")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300"
                    style={{
                      background: `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
                      color: tokens.bg,
                      fontFamily: fonts.mono,
                      boxShadow: `0 16px 40px -12px ${tokens.accent}88`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 24px 50px -12px ${tokens.accent}aa`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 16px 40px -12px ${tokens.accent}88`;
                    }}
                  >
                    <Code2 size={15} />
                    <span>./view-projects</span>
                  </button>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: `1px solid ${tokens.divider}`,
                      color: tokens.fg,
                      fontFamily: fonts.mono,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tokens.accentWarm;
                      e.currentTarget.style.color = tokens.accentWarm;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = tokens.divider;
                      e.currentTarget.style.color = tokens.fg;
                    }}
                  >
                    <Send size={14} />
                    <span>./open-issue</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — stats stack */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {[
              {
                key: "experience",
                value: "10+ yrs",
                label: "professional dance",
                detail: "stage · choreography · teaching",
                accent: tokens.accentWarm,
              },
              {
                key: "education",
                value: "OCAD",
                label: "animation, BFA",
                detail: "visual storytelling · motion",
                accent: tokens.accent,
              },
              {
                key: "stack",
                value: "Full-Stack",
                label: "ts · react · next · supabase",
                detail: "ai-integrated product builds",
                accent: tokens.accentSuccess,
              },
            ].map((s, i) => (
              <div
                key={s.key}
                className="relative glass-panel rounded-xl px-5 py-4 hover-lift overflow-hidden"
                style={{
                  fontFamily: fonts.mono,
                  opacity: 0,
                  animation: `fadeInUp 0.55s ease-out ${1200 + i * 130}ms both`,
                }}
              >
                {/* accent rail */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: s.accent }}
                />
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: tokens.fgDim }}
                  >
                    {`// ${s.key}`}
                  </span>
                  <span className="text-[10px]" style={{ color: tokens.fgDim }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-bold text-2xl md:text-3xl"
                    style={{ color: s.accent }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs md:text-sm" style={{ color: tokens.fg }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: tokens.fgMuted }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() =>
            document
              .getElementById("portfolio-showcase")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-[11px]"
          style={{
            color: tokens.fgDim,
            fontFamily: fonts.mono,
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 2200ms both",
          }}
          aria-label="Scroll to projects"
        >
          <span className="tracking-[0.3em] uppercase">scroll · explore</span>
          <ArrowDownRight size={14} className="animate-float" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
