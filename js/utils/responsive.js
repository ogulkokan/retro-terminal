/**
 * Responsive Utilities
 * Handles mobile detection and responsive behavior
 */

/**
 * Check if current device is mobile/small screen
 * @returns {boolean} True if mobile device (phones, small tablets)
 */
export function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Check if current device is tablet (medium tablet)
 * @returns {boolean} True if tablet device (iPad, iPad Air)
 */
export function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

/**
 * Check if device is any small/medium screen (should use mobile banner)
 * ASCII art displays well until ~670px thanks to responsive font sizing
 * @returns {boolean} True if screen should show mobile-optimized content
 */
export function shouldUseMobileBanner() {
  return window.innerWidth < 670;
}

/**
 * Get responsive banner based on screen size
 * Returns mobile banner if available and on mobile, otherwise returns default
 * @param {string} defaultBanner - Default banner text
 * @param {string} mobileBanner - Optional mobile-friendly banner
 * @returns {string} Appropriate banner for current screen size
 */
export function getResponsiveBanner(defaultBanner, mobileBanner = null) {
  if (isMobile() && mobileBanner) {
    return mobileBanner;
  }
  return defaultBanner;
}

/**
 * Truncate long lines in text for mobile display
 * Useful for ASCII art that might be too wide
 * @param {string} text - Text to process
 * @param {number} maxLength - Maximum line length (default: 40 for mobile)
 * @returns {string} Processed text
 */
export function truncateForMobile(text, maxLength = 40) {
  if (!isMobile()) return text;

  const lines = text.split('\n');
  return lines.map(line => {
    if (line.length > maxLength) {
      return line.substring(0, maxLength - 3) + '...';
    }
    return line;
  }).join('\n');
}
