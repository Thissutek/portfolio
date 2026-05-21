"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  User,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Command,
} from "lucide-react";
import { tokens, fonts } from "@/styles/theme";
import CommandPalette from "./CommandPalette";

const navItems = [
  { id: "home", icon: Home, text: "home", path: "/", isInternal: true },
  { id: "about", icon: User, text: "about", path: "/about", isInternal: true },
  { id: "contact", icon: Mail, text: "contact", path: "/contact", isInternal: true },
];

const socialItems = [
  {
    id: "github",
    icon: Github,
    text: "github",
    path: "https://github.com/Thissutek",
    ariaLabel: "GitHub Profile",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    text: "linkedin",
    path: "https://www.linkedin.com/in/jonathan-yau-6a649a207/",
    ariaLabel: "LinkedIn Profile",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // detect ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // subtle navbar tint on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const dispatchDanceToggle = () => {
    window.dispatchEvent(new CustomEvent("portfolio:toggle-dance"));
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 70,
          background: scrolled
            ? "linear-gradient(180deg, rgba(17,17,27,0.85), rgba(17,17,27,0.65))"
            : "linear-gradient(180deg, rgba(17,17,27,0.55), rgba(17,17,27,0.1))",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderBottom: `1px solid ${scrolled ? "rgba(180,190,254,0.15)" : "rgba(180,190,254,0.06)"}`,
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand mark — terminal prompt style */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ fontFamily: fonts.mono }}
            aria-label="Home"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-md"
              style={{
                background: `linear-gradient(135deg, ${tokens.accent}, ${tokens.accentSoft})`,
                color: tokens.bg,
                fontWeight: 700,
                boxShadow: `0 6px 18px -4px ${tokens.accent}66`,
              }}
            >
              JY
            </span>
            <span
              className="hidden sm:flex items-baseline gap-1 text-sm tracking-tight"
              style={{ color: tokens.fg }}
            >
              <span style={{ color: tokens.accent }}>~</span>
              <span style={{ color: tokens.fgDim }}>/</span>
              <span className="font-semibold">jonathan-yau</span>
              <span className="animate-blink" style={{ color: tokens.accent }}>
                _
              </span>
            </span>
          </Link>

          {/* Center nav (desktop) */}
          <div
            className="hidden md:flex items-center gap-1"
            style={{ fontFamily: fonts.mono }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300"
                  style={{
                    color: active ? tokens.accent : tokens.fgMuted,
                    background: active
                      ? "rgba(180,190,254,0.10)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = tokens.fg;
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = tokens.fgMuted;
                  }}
                >
                  <Icon size={14} />
                  <span style={{ color: active ? tokens.accent : "inherit" }}>
                    {item.text}
                  </span>
                  {active && (
                    <span
                      className="absolute -bottom-px left-3 right-3 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tokens.accent}, transparent)`,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* ⌘K trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
              style={{
                background: "rgba(49,50,68,0.6)",
                border: `1px solid ${tokens.divider}`,
                color: tokens.fgMuted,
                fontFamily: fonts.mono,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tokens.accent;
                e.currentTarget.style.color = tokens.fg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = tokens.divider;
                e.currentTarget.style.color = tokens.fgMuted;
              }}
              aria-label="Open command palette"
            >
              <Command size={12} />
              <span>K</span>
              <span style={{ color: tokens.fgDim }}>·</span>
              <span>search</span>
            </button>

            {/* Socials */}
            <div className="hidden md:flex items-center gap-1">
              {socialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="p-2 rounded-lg transition-all duration-300"
                    style={{ color: tokens.fgMuted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = tokens.accent;
                      e.currentTarget.style.background = "rgba(180,190,254,0.10)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = tokens.fgMuted;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg"
              style={{
                background: "rgba(49,50,68,0.6)",
                color: tokens.fg,
                border: `1px solid ${tokens.divider}`,
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
          style={{
            background: "rgba(17,17,27,0.95)",
            backdropFilter: "blur(24px)",
            borderBottom: `1px solid ${tokens.divider}`,
          }}
        >
          <div className="px-4 py-4 space-y-1" style={{ fontFamily: fonts.mono }}>
            {[...navItems, ...socialItems].map((item) => {
              const Icon = item.icon;
              const external = !item.isInternal;
              const active = !external && isActive(item.path);
              const Tag = external ? "a" : Link;
              const props = external
                ? { href: item.path, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.path };
              return (
                <Tag
                  key={item.id}
                  {...props}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm"
                  style={{
                    color: active ? tokens.accent : tokens.fg,
                    background: active ? "rgba(180,190,254,0.10)" : "transparent",
                  }}
                >
                  <Icon size={16} />
                  <span>{item.text}</span>
                  {external && (
                    <span className="ml-auto text-xs" style={{ color: tokens.fgDim }}>
                      ↗
                    </span>
                  )}
                </Tag>
              );
            })}
            <button
              onClick={() => {
                setIsOpen(false);
                setPaletteOpen(true);
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm w-full"
              style={{
                color: tokens.fg,
                background: "rgba(180,190,254,0.06)",
                border: `1px solid ${tokens.divider}`,
              }}
            >
              <Command size={16} />
              <span>command palette</span>
              <span className="ml-auto text-xs" style={{ color: tokens.fgDim }}>
                ⌘K
              </span>
            </button>
          </div>
        </div>
      </nav>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleDanceMode={dispatchDanceToggle}
      />
    </>
  );
};

export default Navbar;
