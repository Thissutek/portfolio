"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { tokens, fonts } from "@/styles/theme";
import JourneySection from "@/components/about/JourneySection";
import VideoJourneyAnimation from "@/components/about/VideoJourneyAnimation";
import { ArrowDownRight, Sparkles } from "lucide-react";

const journeySections = [
  {
    year: "2014–2019",
    tag: "creative foundation",
    title: "The Creative Foundation",
    content:
      "I began my journey as an animator, graduating from OCAD University with a strong foundation in visual storytelling and motion design. Animation taught me how to guide attention, evoke emotion, and bring ideas to life — all through movement and intention.",
    accentColor: tokens.accent,
    highlights: [
      "OCAD University · Bachelor of Animation",
      "Storyboarding · timing · principles of motion",
      "Learned how composition directs the eye",
    ],
  },
  {
    year: "2019–2022",
    tag: "shift to tech",
    title: "The Shift to Tech",
    content:
      "Curious about how animation could enhance user experiences, I dove into UX/UI design. I quickly realized blending motion with usability had huge potential — so I took it further. I started learning programming and found joy in building the very experiences I used to imagine.",
    accentColor: tokens.accentSoft,
    highlights: [
      "UX/UI fundamentals · prototyping · design systems",
      "First lines of code — found a new craft",
      "Bridged motion design and product thinking",
    ],
  },
  {
    year: "2022 → now",
    tag: "full stack",
    title: "Full Stack, Fully Integrated",
    content:
      "Today, I'm a full-stack developer who merges animation, design, and code to build seamless, engaging digital experiences. From frontend interfaces to backend logic, I use my multidisciplinary background to create products that not only work beautifully — but feel alive.",
    accentColor: tokens.accentWarm,
    highlights: [
      "TypeScript · Next.js · Supabase · React Native",
      "Hackathon winner — Neuro Match (AI talent matching)",
      "Shipped client work to App Store & Play Store",
    ],
  },
];

export default function About() {
  const containerRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const thresholds = useMemo(() => [0.33, 0.66], []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onScroll = () => {
      const scrollPos = node.scrollTop;
      const max = node.scrollHeight - node.clientHeight;
      const pct = max > 0 ? Math.min(100, (scrollPos / max) * 100) : 0;
      setScrollPct(pct);
      const n = pct / 100;
      if (n < thresholds[0]) setActiveIdx(0);
      else if (n < thresholds[1]) setActiveIdx(1);
      else setActiveIdx(2);
    };
    node.addEventListener("scroll", onScroll);
    onScroll();
    return () => node.removeEventListener("scroll", onScroll);
  }, [thresholds]);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-70px)] overflow-y-auto"
      style={{ background: tokens.bg }}
    >
      <VideoJourneyAnimation scrollPosition={scrollPct} />

      {/* Page content */}
      <div className="relative z-10 px-4 md:px-8 py-16 lg:py-24">
        {/* Header */}
        <header
          className="max-w-5xl mx-auto mb-16 lg:mb-24 text-center"
          style={{ fontFamily: fonts.mono }}
        >
          <div
            className="inline-flex items-center gap-2 text-xs mb-4"
            style={{ color: tokens.fgDim }}
          >
            <span style={{ color: tokens.accent }}>$</span>
            <span>cat ./about/journey.md</span>
          </div>
          <h1
            className="font-display font-bold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
              background: `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft}, ${tokens.accentWarm})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Journey
          </h1>
          <p
            className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
            style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
          >
            Three chapters across a decade — animation, design, and code converging
            into a single craft.
          </p>

          <div
            className="inline-flex items-center gap-1.5 mt-6 text-[11px]"
            style={{ color: tokens.fgDim }}
          >
            <span>scroll to read</span>
            <ArrowDownRight size={12} className="animate-float" />
          </div>
        </header>

        {/* Timeline + chapters */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
          {/* Timeline rail — sticky on desktop */}
          <aside
            className="hidden lg:block sticky top-32 self-start"
            style={{ fontFamily: fonts.mono }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: tokens.fgDim }}>
              {"// timeline"}
            </div>
            <ol className="relative pl-4">
              {/* vertical rail */}
              <div
                className="absolute left-1 top-1 bottom-1 w-px"
                style={{ background: `linear-gradient(180deg, ${tokens.accent}55, ${tokens.accentSoft}55, ${tokens.accentWarm}55)` }}
              />
              {journeySections.map((s, i) => {
                const active = activeIdx === i;
                return (
                  <li key={i} className="relative pb-8">
                    <span
                      className="absolute -left-[6px] top-1 w-3 h-3 rounded-full"
                      style={{
                        background: active ? s.accentColor : tokens.surface,
                        border: `2px solid ${s.accentColor}`,
                        boxShadow: active
                          ? `0 0 0 4px ${s.accentColor}33, 0 0 20px ${s.accentColor}88`
                          : "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <div
                      className="text-[10px] mb-0.5"
                      style={{ color: tokens.fgDim }}
                    >
                      {s.year}
                    </div>
                    <div
                      className="text-xs leading-tight transition-colors"
                      style={{
                        color: active ? s.accentColor : tokens.fgMuted,
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {s.title}
                    </div>
                  </li>
                );
              })}
            </ol>

            <div
              className="mt-2 text-[10px]"
              style={{ color: tokens.fgDim }}
            >
              {Math.round(scrollPct)}% read
            </div>
          </aside>

          {/* Chapters */}
          <div className="space-y-20 lg:space-y-32">
            {journeySections.map((s, i) => (
              <JourneySection
                key={i}
                index={i}
                totalCount={journeySections.length}
                isActive={activeIdx === i}
                year={s.year}
                tag={s.tag}
                title={s.title}
                content={s.content}
                accentColor={s.accentColor}
                highlights={s.highlights}
              />
            ))}

            {/* Outro */}
            <div
              className="glass-panel rounded-2xl p-8 md:p-10 text-center"
              style={{ fontFamily: fonts.mono }}
            >
              <Sparkles
                size={24}
                className="mx-auto mb-3"
                style={{ color: tokens.accentWarm }}
              />
              <h3
                className="font-display font-bold text-2xl md:text-3xl mb-3"
                style={{ color: tokens.fg }}
              >
                Next chapter — built together?
              </h3>
              <p
                className="text-sm md:text-base mb-6 max-w-md mx-auto"
                style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
              >
                If this story resonates and you have something cinematic to build,
                let&apos;s talk.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium"
                style={{
                  background: `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
                  color: tokens.bg,
                  boxShadow: `0 16px 40px -10px ${tokens.accent}66`,
                  fontFamily: fonts.mono,
                }}
              >
                ./open-issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
