"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Terminal, Sparkles, Film, GitBranch, ArrowUpRight } from "lucide-react";
import { tokens, fonts } from "../../styles/theme";
import IDECard from "../ui/IDECard";

const heroProject = {
  id: "neuro-match",
  category: "development",
  type: "project",
  title: "Neuro Match",
  subtitle: "// hackathon winner · AI talent matching",
  description:
    "Award-winning AI-powered talent matching platform that streamlines interviews. Ranks candidates from AI video interviews and resumes using intelligent matching — built end-to-end in a 48-hour sprint.",
  thumbnail: "/imgs/NeuroMatch.png",
  link: "https://ai-talent-match.vercel.app/",
  tags: ["next.js", "typescript", "supabase", "ai", "vercel"],
  stats: { award: "1st place", built: "48h", stack: "fullstack" },
  badge: "🏆 hackathon winner",
};

const projects = [
  {
    id: "ai-course",
    category: "education",
    type: "project",
    title: "AI Engineer Course",
    description:
      "Assisting instructor for BraveCareer's Fullstack AI Engineer course — produced educational tip videos on freelancing strategy and AI software navigation.",
    thumbnail: "/imgs/ai engineer course.png",
    link: "https://www.bravecareer.ai/courses/fullstack-ai-engineer",
    tags: ["ai", "freelancing", "video", "education"],
  },
  {
    id: "savyr",
    category: "client",
    type: "project",
    title: "Savyr",
    description:
      "AI-powered meal planner that parses images from flyers to generate affordable meal plans. Shipped to iOS App Store and Google Play.",
    thumbnail: "/imgs/appstore.png",
    link: "https://apps.apple.com/ca/app/savyr/id6748922640",
    tags: ["react-native", "expo", "supabase", "ai"],
    disclaimer: "Client project · IP belongs to client.",
    imageContain: true,
  },
  {
    id: "chrome-ext",
    category: "client",
    type: "project",
    title: "Note-Taking Chrome Extension",
    description:
      "AI-powered note-taking extension built with Deepgram for speech-to-text and text-to-speech capabilities.",
    thumbnail: "/imgs/Note-taking.png",
    link: "https://www.loom.com/share/ff4b6b8f39c74eb294babb0c19cfebc1",
    tags: ["react", "chrome-ext", "firebase", "deepgram"],
    disclaimer: "Client project · IP belongs to client.",
  },
  {
    id: "aims2learn",
    category: "client",
    type: "project",
    title: "Aims2Learn",
    description:
      "Business website + brand finalization + business model consulting — complete launch support beyond just code.",
    thumbnail: "/imgs/Aims2Learn.png",
    link: "https://www.aims2learn.com/",
    tags: ["react", "vite", "branding"],
    disclaimer: "Client project · IP belongs to client.",
  },
  {
    id: "discord-bot",
    category: "projects",
    type: "project",
    title: "Discord Bot",
    description:
      "Community engagement bot with custom commands and Google API integrations for enhanced server functionality.",
    thumbnail: "/imgs/discord-bot.png",
    link: "https://github.com/Thissutek",
    tags: ["node.js", "javascript", "google-apis"],
  },
  {
    id: "ecommerce",
    category: "projects",
    type: "project",
    title: "E-Commerce Platform",
    description:
      "Full-stack shopping platform with modern UX, dance-inspired motion, and complete database integration.",
    thumbnail: "/imgs/e-commerce.png",
    link: "https://github.com/Thissutek",
    tags: ["react", "node.js", "postgres"],
  },
];

const danceProjects = [
  {
    id: "studio-north",
    category: "dance",
    type: "video",
    title: "Studio North Class",
    description: "A class I taught at Studio North Toronto.",
    thumbnail: "/imgs/dance-reel-1.jpg",
    youtubeUrl: "https://youtu.be/4QGX-8akg1o",
    tags: ["teaching", "studio-north", "toronto"],
  },
  {
    id: "feel-no-ways",
    category: "dance",
    type: "video",
    title: "Feel No Ways",
    description:
      "Neo-renaissance concept video produced with lighting directors — a full day shoot.",
    thumbnail: "/imgs/addo-1.jpg",
    youtubeUrl: "https://youtu.be/Ertuk761_gw",
    tags: ["concept", "cinematic", "production"],
  },
  {
    id: "pillar",
    category: "dance",
    type: "video",
    title: "Pillar Anthology",
    description:
      "Four-part anthology depicting levels of connectivity: ignition, vulnerability, acceptance, gratitude. Co-choreographer and storyboard.",
    thumbnail: "/imgs/pillar.jpg",
    youtubeUrl: "https://youtu.be/2y98nKjEskk",
    tags: ["anthology", "choreographer", "narrative"],
  },
  {
    id: "patchwork",
    category: "dance",
    type: "video",
    title: "Patchwork",
    description:
      "Thematic performance weaving multiple narratives and movement styles into one cohesive theatrical experience.",
    thumbnail: "/imgs/patchwork.png",
    youtubeUrl: "https://youtu.be/thBSu-FzAy0",
    tags: ["theatrical", "multi-style", "conceptual"],
  },
  {
    id: "legacy-2023",
    category: "dance",
    type: "video",
    title: "Legacy 2023",
    description: "Competition performance showcasing technical skill and artistry.",
    thumbnail: "/imgs/onetwous.jpg",
    youtubeUrl: "https://youtu.be/yvk1S3XrFgk",
    tags: ["competition", "performance"],
    badge: "// 2023",
  },
  {
    id: "r2d-2019",
    category: "dance",
    type: "video",
    title: "R2D 2019 — 1st Place",
    description: "First place winning performance at R2D 2019.",
    thumbnail: "/imgs/memories.png",
    youtubeUrl: "https://youtu.be/wH_sSPY-Dh0",
    tags: ["competition", "winner"],
    badge: "🥇 1st place",
  },
  {
    id: "prelude-2018",
    category: "dance",
    type: "video",
    title: "Prelude 2018 — 3rd Place",
    description: "Third place performance at Prelude 2018.",
    thumbnail: "/imgs/memories-2.jpg",
    youtubeUrl: "https://youtu.be/1ziOzLILw74",
    tags: ["competition", "performance"],
    badge: "🥉 3rd place",
  },
];

const PortfolioShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [danceMode, setDanceMode] = useState(false);
  const sectionRef = useRef(null);

  // appear on scroll
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // listen for command palette toggle
  useEffect(() => {
    const handler = () => setDanceMode((v) => !v);
    window.addEventListener("portfolio:toggle-dance", handler);
    return () => window.removeEventListener("portfolio:toggle-dance", handler);
  }, []);

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative py-16 lg:py-24 px-4 md:px-8"
      style={{
        background: danceMode ? tokens.danceBg : tokens.bg,
        transition: "background 0.9s cubic-bezier(0.16,1,0.3,1)",
        fontFamily: fonts.mono,
      }}
    >
      {/* ambient backdrop */}
      <div
        className="absolute inset-0 grid-overlay pointer-events-none opacity-60"
        aria-hidden
      />
      <div
        className="absolute top-1/4 -left-32 w-[36rem] h-[36rem] rounded-full ambient-glow pointer-events-none"
        style={{
          background: danceMode
            ? "radial-gradient(circle, rgba(243,139,168,0.18), transparent 60%)"
            : "radial-gradient(circle, rgba(180,190,254,0.15), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <header
          className={`mb-10 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-xs mb-3" style={{ color: tokens.fgDim }}>
            <span style={{ color: tokens.accent }}>$</span>
            <span>ls ./portfolio --filter=</span>
            <span style={{ color: tokens.codeString }}>
              &quot;{danceMode ? "performance" : "code"}&quot;
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                className="font-display font-bold leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: tokens.fg,
                }}
              >
                {danceMode ? "Director's Cut" : "Selected Work"}
                <span className="ml-2 inline-block w-2 h-8 align-middle animate-blink"
                      style={{ background: danceMode ? tokens.danceGlow : tokens.accent }} />
              </h2>
              <p
                className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed"
                style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
              >
                {danceMode
                  ? "A decade of movement and choreography. Performance is the other half of how I think about software — composition, rhythm, attention."
                  : "Shipped products, awarded hackathons, client work, and personal experiments. Each project blends interaction, motion, and intent."}
              </p>
            </div>

            {/* Director's Cut toggle */}
            <button
              onClick={() => setDanceMode((v) => !v)}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition-all duration-300"
              style={{
                background: danceMode
                  ? `linear-gradient(120deg, ${tokens.dancePrimary}, ${tokens.danceAccent})`
                  : `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
                color: tokens.bg,
                fontFamily: fonts.mono,
                fontWeight: 600,
                boxShadow: danceMode
                  ? `0 16px 40px -10px ${tokens.danceGlow}aa`
                  : `0 16px 40px -10px ${tokens.accent}88`,
              }}
              aria-pressed={danceMode}
              aria-label="Toggle director's cut — switch between code portfolio and dance portfolio"
            >
              <Film size={14} />
              <span>
                {danceMode ? "exit director's cut" : "enter director's cut"}
              </span>
              <span style={{ color: tokens.bg, opacity: 0.6 }}>↗</span>
            </button>
          </div>

          {/* tab strip */}
          <div
            className="mt-6 flex items-center gap-1 text-[11px] overflow-x-auto"
            style={{ borderBottom: `1px solid ${tokens.divider}` }}
          >
            {[
              { k: "all", label: "all" },
              { k: "shipped", label: "shipped" },
              { k: "client", label: "client" },
              { k: "experiments", label: "experiments" },
            ].map((t, i) => (
              <span
                key={t.k}
                className="px-3 py-2"
                style={{
                  color: i === 0 ? (danceMode ? tokens.dancePrimary : tokens.accent) : tokens.fgDim,
                  borderBottom: `2px solid ${i === 0 ? (danceMode ? tokens.dancePrimary : tokens.accent) : "transparent"}`,
                }}
              >
                {t.label}
              </span>
            ))}
            <span
              className="ml-auto px-3 py-2 text-[11px]"
              style={{ color: tokens.fgDim }}
            >
              {danceMode ? danceProjects.length : projects.length + 1} items
            </span>
          </div>
        </header>

        {/* Content swap */}
        <div
          key={danceMode ? "dance" : "code"}
          className="animate-fadeIn"
        >
          {!danceMode ? (
            <>
              {/* Hero project — full-width cinematic IDE card */}
              <div
                className={`mb-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ minHeight: "400px" }}
              >
                <IDECard item={heroProject} variant="hero" />
              </div>

              {/* Bento grid */}
              <div className="grid grid-cols-12 auto-rows-[minmax(160px,auto)] gap-4 lg:gap-5">
                {/* AI Course — tall feature */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2">
                  <IDECard item={projects[0]} variant="feature" />
                </div>

                {/* Savyr — medium */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <IDECard item={projects[1]} variant="compact" imageContain />
                </div>

                {/* GitHub stats tile */}
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <GitHubTile />
                </div>

                {/* Chrome Extension */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <IDECard item={projects[2]} variant="compact" />
                </div>

                {/* Now building tile */}
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <NowBuildingTile />
                </div>

                {/* Aims2Learn */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <IDECard item={projects[3]} variant="compact" />
                </div>

                {/* Discord */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <IDECard item={projects[4]} variant="compact" />
                </div>

                {/* E-Commerce */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <IDECard item={projects[5]} variant="compact" />
                </div>
              </div>
            </>
          ) : (
            // Dance — Director's Cut grid
            <div className="grid grid-cols-12 auto-rows-[minmax(180px,auto)] gap-4 lg:gap-5">
              <div className="col-span-12 md:col-span-8 row-span-2">
                <IDECard
                  item={danceProjects[2]}
                  variant="feature"
                  accent={tokens.dancePrimary}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <IDECard item={danceProjects[5]} variant="compact" accent={tokens.danceAccent} />
              </div>
              <div className="col-span-12 md:col-span-4">
                <IDECard item={danceProjects[1]} variant="compact" accent={tokens.dancePrimary} />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <IDECard item={danceProjects[3]} variant="compact" accent={tokens.dancePrimary} />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <IDECard item={danceProjects[4]} variant="compact" accent={tokens.danceAccent} />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <IDECard item={danceProjects[0]} variant="compact" accent={tokens.dancePrimary} />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <IDECard item={danceProjects[6]} variant="compact" accent={tokens.danceAccent} />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 lg:mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="glass-panel-strong rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ fontFamily: fonts.mono }}
          >
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full ambient-glow pointer-events-none"
              style={{
                background: danceMode
                  ? "radial-gradient(circle, rgba(245,163,199,0.22), transparent 60%)"
                  : "radial-gradient(circle, rgba(180,190,254,0.22), transparent 60%)",
              }}
              aria-hidden
            />

            <div className="text-xs mb-3" style={{ color: tokens.codeComment }}>
              {"// contact"}
            </div>
            <h3
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: tokens.fg,
              }}
            >
              {danceMode
                ? "Inspired by the movement?"
                : "Let's build something cinematic."}
            </h3>
            <p
              className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed"
              style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
            >
              {danceMode
                ? "Open to choreography collabs, movement direction, and creative direction work."
                : "Open to full-stack opportunities, contract work, and creative software collaborations."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm"
                style={{
                  background: danceMode
                    ? `linear-gradient(120deg, ${tokens.dancePrimary}, ${tokens.danceAccent})`
                    : `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
                  color: tokens.bg,
                  boxShadow: danceMode
                    ? `0 16px 40px -10px ${tokens.danceGlow}aa`
                    : `0 16px 40px -10px ${tokens.accent}88`,
                }}
              >
                <Terminal size={15} />
                ./open-issue
                <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://github.com/Thissutek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm"
                style={{
                  background: "transparent",
                  color: tokens.fg,
                  border: `1px solid ${tokens.divider}`,
                }}
              >
                <GitBranch size={14} />
                view repos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Bento tiles — non-project cards
------------------------------------------------------------------ */
const GitHubTile = () => (
  <div
    className="glass-panel rounded-2xl p-5 h-full flex flex-col"
    style={{ fontFamily: fonts.mono }}
  >
    <div className="flex items-center gap-2 mb-3">
      <GitBranch size={14} style={{ color: tokens.accentSuccess }} />
      <span className="text-xs uppercase tracking-[0.2em]" style={{ color: tokens.fgDim }}>
        {"// activity"}
      </span>
      <span className="ml-auto text-[10px]" style={{ color: tokens.fgDim }}>
        last 30d
      </span>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span
        className="font-display font-bold text-3xl"
        style={{ color: tokens.accentSuccess }}
      >
        ↑ shipping
      </span>
    </div>
    {/* fake contribution heatmap */}
    <div className="grid grid-cols-12 gap-1 mb-3">
      {Array.from({ length: 84 }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const level = (seed / 233280) * 4;
        const opacity = 0.15 + level * 0.18;
        return (
          <span
            key={i}
            className="aspect-square rounded-sm"
            style={{
              background: `rgba(166,227,161,${opacity.toFixed(2)})`,
            }}
          />
        );
      })}
    </div>
    <p
      className="text-xs leading-relaxed mt-auto"
      style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
    >
      shipping consistently across product, client work, and experiments.
    </p>
    <a
      href="https://github.com/Thissutek"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 text-xs"
      style={{ color: tokens.accentSuccess }}
    >
      @Thissutek <ArrowUpRight size={12} />
    </a>
  </div>
);

const NowBuildingTile = () => (
  <div
    className="glass-panel rounded-2xl p-5 h-full flex flex-col relative overflow-hidden"
    style={{ fontFamily: fonts.mono }}
  >
    <div
      className="absolute -top-12 -right-12 w-40 h-40 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(250,179,135,0.25), transparent 60%)",
      }}
    />
    <div className="flex items-center gap-2 mb-3 relative">
      <Sparkles size={14} style={{ color: tokens.accentWarm }} />
      <span className="text-xs uppercase tracking-[0.2em]" style={{ color: tokens.fgDim }}>
        {"// now"}
      </span>
      <span className="ml-auto inline-flex items-center gap-1.5 text-[10px]" style={{ color: tokens.fgDim }}>
        <span className="relative inline-flex w-1.5 h-1.5">
          <span
            className="absolute inset-0 rounded-full animate-pulseRing"
            style={{ background: tokens.accentWarm }}
          />
          <span
            className="relative w-1.5 h-1.5 rounded-full"
            style={{ background: tokens.accentWarm }}
          />
        </span>
        live
      </span>
    </div>
    <h4
      className="font-display font-bold text-lg leading-tight mb-2"
      style={{ color: tokens.fg }}
    >
      Currently building
    </h4>
    <ul
      className="space-y-1.5 text-xs leading-relaxed mt-1"
      style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
    >
      <li className="flex items-start gap-2">
        <span style={{ color: tokens.accentWarm }}>›</span>
        <span>cinematic product experiences with motion + AI</span>
      </li>
      <li className="flex items-start gap-2">
        <span style={{ color: tokens.accentWarm }}>›</span>
        <span>iOS + cross-platform shipping (Expo / RN)</span>
      </li>
      <li className="flex items-start gap-2">
        <span style={{ color: tokens.accentWarm }}>›</span>
        <span>side: choreography pieces & motion studies</span>
      </li>
    </ul>
  </div>
);

export default PortfolioShowcase;
