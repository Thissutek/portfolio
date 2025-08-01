// Responsive breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Animation constants
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  typewriter: 80,
};

// Particle system constants
export const PARTICLE_CONFIG = {
  desktop: {
    count: 50,
    connectionDistance: 140,
    mouseRadius: 200,
  },
  mobile: {
    count: 25,
    connectionDistance: 100,
    mouseRadius: 150,
  },
};

// Z-index layers
export const Z_INDEX = {
  particles: -50,
  content: 10,
  navigation: 100,
  modal: 1000,
};