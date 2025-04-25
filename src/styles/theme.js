// Catppuccin color palette (Mocha variant)
export const colors = {
  base: "#1e1e2e", // Dark background
  surface: "#313244", // Slightly lighter background
  overlay: "#6c7086", // Muted foreground
  text: "#cdd6f4", // Main text
  subtext: "#a6adc8", // Secondary text
  lavender: "#b4befe", // Primary accent
  blue: "#89b4fa", // Secondary accent
  peach: "#fab387", // Tertiary accent
  green: "#a6e3a1", // Success color
  maroon: "#eba0ac", // Alternative accent
  red: "#f38ba8", // Error/danger
  yellow: "#f9e2af", // Warning
  teal: "#94e2d5", // Info
};

// Reusable styles
export const styles = {
  // Layout styles
  container: "flex h-screen w-full",
  content: "flex-1 p-8 overflow-y-auto relative",
  pageContainer:
    "w-full transition-opacity duration-300 absolute top-0 left-0 p-8",

  // Sidebar styles
  sidebar: "w-20 py-6 flex flex-col items-center",
  sidebarTitle: "text-xl font-bold mb-12",
  nav: "flex flex-col space-y-8 items-center mt-auto mb-auto",
  navItem:
    "p-3 rounded-lg transition-colors duration-200 flex flex-col items-center",
  navItemActive: "font-bold",
  navIcon: "mb-1",
  navText: "text-xs",

  // Typography
  pageTitle: "text-3xl font-bold mb-6",
  sectionTitle: "text-2xl font-bold mb-4",
  sectionSubtitle: "text-xl font-bold mb-2",

  // Cards and containers
  card: "p-6 rounded",
  projectCard:
    "rounded-lg overflow-hidden shadow-md transition-all duration-300",

  // Forms
  contactForm: "max-w-md space-y-4",
  input: "w-full p-2 rounded",
  button: "px-4 py-2 rounded text-center",

  // Animations
  fadeIn: "transition-opacity duration-500 ease-in-out",
  fadeInHidden: "opacity-0",
  fadeInVisible: "opacity-100",
  slideUp: "transition-all duration-500 ease-in-out",
  slideUpHidden: "opacity-0 transform translate-y-4",
  slideUpVisible: "opacity-100 transform translate-y-0",

  // Misc
  footer: "mt-auto pt-6 text-center text-xs",
};

// Default styles applied to different elements
export const applyTheme = (element, customStyles = {}) => {
  switch (element) {
    case "body":
      return {
        backgroundColor: colors.base,
        color: colors.text,
        ...customStyles,
      };
    case "card":
      return { backgroundColor: colors.surface, ...customStyles };
    case "heading":
      return { color: colors.lavender, ...customStyles };
    case "button":
      return {
        backgroundColor: colors.lavender,
        color: colors.base,
        ...customStyles,
      };
    case "link":
      return { color: colors.blue, ...customStyles };
    case "input":
      return {
        backgroundColor: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.overlay}`,
        ...customStyles,
      };
    default:
      return customStyles;
  }
};
