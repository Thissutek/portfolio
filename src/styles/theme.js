// Catppuccin Mocha palette + cinematic IDE semantic tokens
export const colors = {
  // Base surfaces
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
  surface: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  overlay: "#6c7086",
  overlay1: "#7f849c",

  // Text
  text: "#cdd6f4",
  subtext: "#a6adc8",
  subtext1: "#bac2de",

  // Catppuccin accents
  lavender: "#b4befe",
  blue: "#89b4fa",
  sapphire: "#74c7ec",
  sky: "#89dceb",
  teal: "#94e2d5",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  peach: "#fab387",
  maroon: "#eba0ac",
  red: "#f38ba8",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
};

// Semantic tokens — use these in components for hierarchy + theming
export const tokens = {
  // surfaces & atmosphere
  bg: colors.base,
  bgDeep: colors.crust,
  bgPanel: colors.mantle,
  surface: colors.surface,
  surfaceRaised: colors.surface1,
  divider: colors.surface2,

  // text
  fg: colors.text,
  fgMuted: colors.subtext,
  fgDim: colors.overlay,
  fgFaint: colors.overlay1,

  // brand accents — primary signature for CTAs and active state
  accent: colors.lavender,
  accentSoft: colors.blue,
  accentWarm: colors.peach,
  accentSuccess: colors.green,
  accentDanger: colors.red,
  accentInfo: colors.sapphire,

  // syntax-highlight roles (used for IDE-styled chrome and tech tags)
  codeKeyword: colors.mauve,
  codeString: colors.green,
  codeFunction: colors.blue,
  codeVariable: colors.text,
  codeNumber: colors.peach,
  codeComment: colors.overlay1,
  codePunct: colors.subtext,

  // Director's cut (dance mode) palette — cinematic warm performance vibes
  danceBg: "#1a0b1f",
  danceSurface: "#2d1b3d",
  dancePrimary: "#f5a3c7",
  danceAccent: "#fab387",
  danceGlow: "#f38ba8",
  danceText: "#ffe9f3",
};

// Typography stacks — wired by next/font in layout.js
export const fonts = {
  display: "var(--font-display, 'Space Grotesk'), 'Inter', system-ui, sans-serif",
  body: "var(--font-body, 'Inter'), system-ui, sans-serif",
  mono: "var(--font-mono, 'JetBrains Mono'), ui-monospace, 'SF Mono', Menlo, monospace",
};

// Reusable styles (kept for backwards-compat with the contact form)
export const styles = {
  container: "flex h-screen w-full",
  content: "flex-1 p-8 overflow-y-auto relative",
  pageContainer:
    "w-full transition-opacity duration-300 absolute top-0 left-0 p-8",

  pageTitle: "text-3xl font-bold mb-6",
  sectionTitle: "text-2xl font-bold mb-4",
  sectionSubtitle: "text-xl font-bold mb-2",

  card: "p-6 rounded",
  projectCard: "rounded-lg overflow-hidden shadow-md transition-all duration-300",

  contactForm: "space-y-4",
  input: "w-full p-3 rounded-lg",
  button: "px-4 py-2 rounded text-center",

  fadeIn: "transition-opacity duration-500 ease-in-out",
  fadeInHidden: "opacity-0",
  fadeInVisible: "opacity-100",
  slideUp: "transition-all duration-500 ease-in-out",
  slideUpHidden: "opacity-0 transform translate-y-4",
  slideUpVisible: "opacity-100 transform translate-y-0",

  footer: "mt-auto pt-6 text-center text-xs",
};

export const applyTheme = (element, customStyles = {}) => {
  switch (element) {
    case "body":
      return { backgroundColor: tokens.bg, color: tokens.fg, ...customStyles };
    case "card":
      return { backgroundColor: tokens.surface, ...customStyles };
    case "heading":
      return { color: tokens.accent, ...customStyles };
    case "button":
      return { backgroundColor: tokens.accent, color: tokens.bg, ...customStyles };
    case "link":
      return { color: tokens.accentSoft, ...customStyles };
    case "input":
      return {
        backgroundColor: tokens.bgDeep,
        color: tokens.fg,
        border: `1px solid ${tokens.divider}`,
        fontFamily: fonts.mono,
        ...customStyles,
      };
    default:
      return customStyles;
  }
};
