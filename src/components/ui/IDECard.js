"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { tokens, fonts } from "@/styles/theme";

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const langExt = {
  development: "tsx",
  education: "md",
  client: "tsx",
  projects: "ts",
  dance: "mov",
};

/**
 * Cinematic IDE-styled project card.
 *
 * @typedef {Object} IDECardItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} thumbnail
 * @property {string} [link]
 * @property {string} [youtubeUrl]
 * @property {string} [video]
 * @property {string} [type]                  "video" | "project"
 * @property {string} [category]              development | education | client | projects | dance
 * @property {string[]} [tags]
 * @property {string} [badge]                 free-form badge text e.g. "1st place"
 * @property {string} [disclaimer]
 *
 * @param {Object} props
 * @param {IDECardItem} props.item
 * @param {"compact"|"feature"|"hero"} [props.variant]
 * @param {boolean} [props.imageContain]
 * @param {string} [props.accent]             override accent color
 * @param {boolean} [props.flat]              if true, use solid surface instead of glass
 */
const IDECard = ({
  item,
  variant = "compact",
  imageContain = false,
  accent,
  flat = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const isHero = variant === "hero";
  const isFeature = variant === "feature";
  const isVideo = item.type === "video" || !!item.youtubeUrl;

  const accentColor =
    accent ||
    (item.category === "education"
      ? tokens.accentWarm
      : item.category === "client"
        ? tokens.accentInfo
        : item.category === "dance"
          ? "#f5a3c7"
          : tokens.accent);

  const ext = langExt[item.category] || "tsx";
  const filename = `${slugify(item.title)}.${ext}`;

  const handleOpen = () => {
    if (item.youtubeUrl)
      window.open(item.youtubeUrl, "_blank", "noopener,noreferrer");
    else if (isVideo && item.video) window.open(item.video, "_blank");
    else if (item.link) window.open(item.link, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      aria-label={`${item.title} — ${item.description?.slice(0, 80) || ""}`}
      className={`group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer flex flex-col ${
        flat ? "" : "glass-panel"
      } hover-lift`}
      style={{
        fontFamily: fonts.mono,
        background: flat
          ? "linear-gradient(180deg, rgba(24,24,37,0.95), rgba(17,17,27,0.95))"
          : undefined,
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b shrink-0"
        style={{
          borderColor: "rgba(180,190,254,0.10)",
          background: "rgba(17,17,27,0.55)",
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f38ba8" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f9e2af" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#a6e3a1" }} />
        <span
          className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px]"
          style={{
            background: "rgba(49,50,68,0.7)",
            color: tokens.fgMuted,
            border: `1px solid ${hovered ? accentColor : "rgba(180,190,254,0.08)"}`,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-sm"
            style={{ background: accentColor }}
          />
          {filename}
        </span>
        <span
          className="ml-auto text-[10px] truncate"
          style={{ color: tokens.fgDim }}
        >
          {item.badge || (item.category ? `// ${item.category}` : "")}
        </span>
      </div>

      {/* Media */}
      <div
        className={`relative w-full overflow-hidden shrink-0 ${
          isHero ? "h-72 md:h-80" : isFeature ? "h-52" : "h-40"
        }`}
        style={{ background: "rgba(17,17,27,0.85)" }}
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes={
              isHero
                ? "(min-width: 1024px) 800px, 100vw"
                : "(min-width: 1024px) 400px, 100vw"
            }
            className="transition-transform duration-700 group-hover:scale-105"
            style={{
              objectFit: imageContain ? "contain" : "cover",
              padding: imageContain ? "0.75rem" : 0,
            }}
            priority={isHero}
          />
        ) : null}

        {/* gradient bottom shade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(17,17,27,0.75) 100%)",
          }}
        />
        {/* hover spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at 60% 40%, ${accentColor}33, transparent 70%)`,
          }}
        />

        {/* play badge for video items */}
        {isVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-md"
              style={{
                background: `${accentColor}cc`,
                boxShadow: `0 0 40px ${accentColor}88`,
              }}
            >
              <Play size={20} fill={tokens.bg} style={{ color: tokens.bg }} />
            </div>
          </div>
        )}

        {/* open icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-md backdrop-blur-md transition-all"
          style={{
            background: "rgba(17,17,27,0.7)",
            border: `1px solid ${accentColor}66`,
            color: accentColor,
            opacity: hovered ? 1 : 0.6,
          }}
          aria-label={`Open ${item.title}`}
        >
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        {/* line-number rail + title */}
        <div className="flex items-start gap-3 mb-2">
          <span
            className="select-none text-[10px] pt-1"
            style={{ color: tokens.fgDim, lineHeight: 1.2 }}
          >
            01
            <br />
            02
            <br />
            03
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] mb-0.5" style={{ color: tokens.codeComment }}>
              {`// ${item.category || "project"}`}
            </div>
            <h3
              className="font-display font-bold leading-tight transition-colors"
              style={{
                color: hovered ? accentColor : tokens.fg,
                fontSize: isHero ? "1.875rem" : isFeature ? "1.25rem" : "1.05rem",
              }}
            >
              {item.title}
            </h3>
            {item.subtitle && (
              <p
                className="text-sm mt-1"
                style={{ color: tokens.accent, fontFamily: fonts.mono }}
              >
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* description */}
        {item.description && (
          <p
            className={`text-xs md:text-sm leading-relaxed mb-3 ${
              isHero ? "" : "line-clamp-3"
            }`}
            style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
          >
            {item.description}
          </p>
        )}

        {/* stats (hero only) */}
        {isHero && item.stats && (
          <div className="flex gap-4 mb-3">
            {Object.entries(item.stats).map(([k, v]) => (
              <div key={k}>
                <div
                  className="text-lg font-bold"
                  style={{ color: accentColor, fontFamily: fonts.mono }}
                >
                  {v}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: tokens.fgDim }}
                >
                  {k}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* tags as import statement */}
        {item.tags?.length > 0 && (
          <div className="mt-auto">
            <div
              className="text-[10px] mb-1.5"
              style={{ color: tokens.codeComment }}
            >
              <span style={{ color: tokens.codeKeyword }}>import</span>{" "}
              <span style={{ color: tokens.codePunct }}>{"{"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {item.tags.slice(0, isHero ? 6 : 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[10px]"
                  style={{
                    background: hovered
                      ? `${accentColor}1f`
                      : "rgba(49,50,68,0.7)",
                    border: `1px solid ${hovered ? `${accentColor}55` : "rgba(180,190,254,0.08)"}`,
                    color: hovered ? accentColor : tokens.fgMuted,
                    fontFamily: fonts.mono,
                    transition: "all 0.2s ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-[10px]" style={{ color: tokens.codeComment }}>
              <span style={{ color: tokens.codePunct }}>{"} "}</span>
              <span style={{ color: tokens.codeKeyword }}>from</span>{" "}
              <span style={{ color: tokens.codeString }}>
                &quot;{slugify(item.title)}&quot;
              </span>
              <span style={{ color: tokens.codePunct }}>;</span>
            </div>
          </div>
        )}

        {item.disclaimer && (
          <p
            className="text-[10px] italic mt-2 opacity-70"
            style={{ color: tokens.fgDim }}
          >
            {item.disclaimer}
          </p>
        )}
      </div>

      {/* bottom accent rail */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />
    </article>
  );
};

export default IDECard;
