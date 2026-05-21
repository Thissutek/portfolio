"use client";

import { tokens, fonts } from "@/styles/theme";

const JourneySection = ({
  title,
  content,
  isActive,
  accentColor = tokens.accent,
  index,
  totalCount,
  year,
  tag,
  highlights = [],
}) => {
  return (
    <article
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isActive ? 1 : 0.25,
        filter: isActive ? "blur(0)" : "blur(2px)",
        transform: isActive ? "translateY(0)" : "translateY(8px)",
      }}
      aria-current={isActive ? "step" : undefined}
    >
      <div
        className="glass-panel-strong rounded-2xl overflow-hidden"
        style={{ fontFamily: fonts.mono }}
      >
        {/* chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{
            borderColor: "rgba(180,190,254,0.08)",
            background: "rgba(17,17,27,0.7)",
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f38ba8" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f9e2af" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#a6e3a1" }} />
          <span
            className="ml-2 inline-flex items-center gap-2 px-2 py-0.5 rounded-md text-[10px]"
            style={{
              background: "rgba(49,50,68,0.65)",
              border: `1px solid ${isActive ? accentColor : "rgba(180,190,254,0.10)"}`,
              color: tokens.fgMuted,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-sm"
              style={{ background: accentColor }}
            />
            chapter-{String(index + 1).padStart(2, "0")}.md
          </span>
          <span className="ml-auto text-[10px]" style={{ color: tokens.fgDim }}>
            {index + 1} / {totalCount}
          </span>
        </div>

        <div className="p-6 md:p-8">
          {/* meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: accentColor, fontFamily: fonts.mono }}
            >
              {`// ${tag}`}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: `${accentColor}1a`,
                color: accentColor,
                border: `1px solid ${accentColor}44`,
                fontFamily: fonts.mono,
              }}
            >
              {year}
            </span>
            {isActive && (
              <span
                className="inline-flex items-center gap-1.5 text-[10px]"
                style={{ color: tokens.fgDim, fontFamily: fonts.mono }}
              >
                <span className="relative inline-flex w-1.5 h-1.5">
                  <span
                    className="absolute inset-0 rounded-full animate-pulseRing"
                    style={{ background: accentColor }}
                  />
                  <span
                    className="relative w-1.5 h-1.5 rounded-full"
                    style={{ background: accentColor }}
                  />
                </span>
                now reading
              </span>
            )}
          </div>

          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              background: `linear-gradient(120deg, ${accentColor}, ${tokens.fg})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>

          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: tokens.fg, fontFamily: fonts.body }}
          >
            {content}
          </p>

          {highlights.length > 0 && (
            <ul
              className="mt-5 space-y-2 text-sm"
              style={{ color: tokens.fgMuted, fontFamily: fonts.mono }}
            >
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: accentColor }}>›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
};

export default JourneySection;
