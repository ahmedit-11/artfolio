import { useEffect } from 'react';

/**
 * Utility function to scroll to the top of the page
 * @param {Object} options - Scroll behavior options
 * @param {string} options.behavior - Scroll behavior ('smooth' or 'auto')
 * @param {number} options.top - Top position to scroll to (default: 0)
 * @param {number} options.left - Left position to scroll to (default: 0)
 */
export const scrollToTop = (options = {}) => {
  const {
    behavior = 'auto',
    top = 0,
    left = 0
  } = options;

  window.scrollTo({
    top,
    left,
    behavior
  });
};

/**
 * React hook to automatically scroll to top when component mounts
 * Usage: useScrollToTop() in your component
 */

export const useScrollToTop = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
};

// For non-React usage or direct calls
export default scrollToTop;
