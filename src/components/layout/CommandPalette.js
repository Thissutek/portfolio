"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  User,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { tokens, fonts } from "@/styles/theme";

const baseCommands = [
  {
    id: "home",
    label: "Go to Home",
    hint: "/",
    icon: Home,
    group: "Navigate",
    action: { type: "internal", to: "/" },
  },
  {
    id: "about",
    label: "Read About / Journey",
    hint: "/about",
    icon: User,
    group: "Navigate",
    action: { type: "internal", to: "/about" },
  },
  {
    id: "contact",
    label: "Open Contact / Submit Issue",
    hint: "/contact",
    icon: Mail,
    group: "Navigate",
    action: { type: "internal", to: "/contact" },
  },
  {
    id: "github",
    label: "Open GitHub",
    hint: "github.com/Thissutek",
    icon: Github,
    group: "Links",
    action: { type: "external", to: "https://github.com/Thissutek" },
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    hint: "linkedin.com/in/jonathan-yau",
    icon: Linkedin,
    group: "Links",
    action: {
      type: "external",
      to: "https://www.linkedin.com/in/jonathan-yau-6a649a207/",
    },
  },
];

const projectCommands = [
  {
    id: "p-neuro",
    label: "Open: Neuro Match",
    hint: "Hackathon winner · AI talent matching",
    group: "Projects",
    action: { type: "external", to: "https://ai-talent-match.vercel.app/" },
  },
  {
    id: "p-savyr",
    label: "Open: Savyr",
    hint: "iOS app · React Native + AI",
    group: "Projects",
    action: {
      type: "external",
      to: "https://apps.apple.com/ca/app/savyr/id6748922640",
    },
  },
  {
    id: "p-aims",
    label: "Open: Aims2Learn",
    hint: "Client site · React + Vite",
    group: "Projects",
    action: { type: "external", to: "https://www.aims2learn.com/" },
  },
  {
    id: "p-course",
    label: "Open: AI Engineer Course",
    hint: "BraveCareer · Educational",
    group: "Projects",
    action: {
      type: "external",
      to: "https://www.bravecareer.ai/courses/fullstack-ai-engineer",
    },
  },
];

export default function CommandPalette({ open, onClose, onToggleDanceMode }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const dynamic = [
      {
        id: "dance",
        label: "Toggle: Director's Cut (Dance Mode)",
        hint: "Switch portfolio to performance lens",
        group: "Actions",
        action: { type: "callback", run: () => onToggleDanceMode?.() },
      },
    ];
    return [...baseCommands, ...projectCommands, ...dynamic];
  }, [onToggleDanceMode]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => setActiveIdx(0), [query, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ensure active item stays in view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const runCommand = (cmd) => {
    if (!cmd) return;
    const { action } = cmd;
    if (action.type === "internal") router.push(action.to);
    else if (action.type === "external")
      window.open(action.to, "_blank", "noopener,noreferrer");
    else if (action.type === "callback") action.run();
    onClose?.();
    setQuery("");
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(filtered[activeIdx]);
    }
  };

  if (!open) return null;

  // group results
  const groups = filtered.reduce((acc, item, i) => {
    (acc[item.group] = acc[item.group] || []).push({ ...item, _i: i });
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(180,190,254,0.08), rgba(17,17,27,0.86) 60%)",
          backdropFilter: "blur(14px)",
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass-panel-strong rounded-2xl overflow-hidden animate-ideEnter"
        style={{ fontFamily: fonts.mono }}
      >
        {/* IDE-style chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ borderColor: "rgba(180,190,254,0.12)", background: "rgba(17,17,27,0.55)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#f9e2af" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
          <span
            className="ml-3 text-[11px] tracking-widest uppercase"
            style={{ color: tokens.fgDim }}
          >
            ~/portfolio · command palette
          </span>
          <span className="ml-auto text-[11px]" style={{ color: tokens.fgDim }}>
            ESC to close
          </span>
        </div>

        {/* Search input */}
        <label className="flex items-center gap-3 px-5 py-4 border-b"
               style={{ borderColor: "rgba(180,190,254,0.08)" }}>
          <Search size={18} style={{ color: tokens.accent }} />
          <span style={{ color: tokens.accent }} aria-hidden>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: tokens.fg, fontFamily: fonts.mono }}
            aria-label="Search commands"
          />
        </label>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto py-2"
          style={{ background: "rgba(17,17,27,0.45)" }}
        >
          {filtered.length === 0 ? (
            <div className="px-6 py-10 text-center" style={{ color: tokens.fgDim }}>
              <div className="text-sm mb-1">{"// no matches"}</div>
              <div className="text-xs">try: home, contact, github, dance</div>
            </div>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group} className="px-2 pb-1">
                <div
                  className="px-4 py-1.5 text-[10px] tracking-widest uppercase"
                  style={{ color: tokens.fgDim }}
                >
                  {`// ${group}`}
                </div>
                {items.map((cmd) => {
                  const Icon = cmd.icon;
                  const isActive = cmd._i === activeIdx;
                  return (
                    <button
                      key={cmd.id}
                      data-idx={cmd._i}
                      onMouseEnter={() => setActiveIdx(cmd._i)}
                      onClick={() => runCommand(cmd)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors"
                      style={{
                        background: isActive ? "rgba(180,190,254,0.10)" : "transparent",
                        borderLeft: `2px solid ${isActive ? tokens.accent : "transparent"}`,
                      }}
                    >
                      {Icon ? (
                        <Icon size={15} style={{ color: tokens.accent }} />
                      ) : (
                        <ExternalLink size={15} style={{ color: tokens.accentSoft }} />
                      )}
                      <span className="text-sm" style={{ color: tokens.fg }}>
                        {cmd.label}
                      </span>
                      <span
                        className="ml-auto text-xs truncate max-w-[40%]"
                        style={{ color: tokens.fgDim }}
                      >
                        {cmd.hint}
                      </span>
                      {isActive && (
                        <CornerDownLeft size={13} style={{ color: tokens.accent }} />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint bar */}
        <div
          className="flex items-center gap-4 px-5 py-2.5 text-[11px] border-t"
          style={{
            borderColor: "rgba(180,190,254,0.08)",
            background: "rgba(17,17,27,0.7)",
            color: tokens.fgDim,
          }}
        >
          <span className="flex items-center gap-1.5">
            <ArrowUp size={11} />
            <ArrowDown size={11} /> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <CornerDownLeft size={11} /> select
          </span>
          <span>esc · close</span>
          <span className="ml-auto" style={{ color: tokens.accent }}>
            ⌘K
          </span>
        </div>
      </div>
    </div>
  );
}
