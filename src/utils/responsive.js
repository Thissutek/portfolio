import { BREAKPOINTS } from './constants';

/**
 * Hook to detect if screen is mobile size
 * @returns {boolean} true if screen width is below md breakpoint
 */
export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Get responsive particle configuration based on screen size
 * @param {boolean} isMobile - whether the screen is mobile size
 * @returns {object} particle configuration object
 */
export const getParticleConfig = (isMobile) => {
  return isMobile 
    ? {
        count: 25,
        connectionDistance: 100,
        mouseRadius: 150,
      }
    : {
        count: 50,
        connectionDistance: 140,
        mouseRadius: 200,
      };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - function to throttle
 * @param {number} limit - throttle limit in ms
 * @returns {Function} throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};