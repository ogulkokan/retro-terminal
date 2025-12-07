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
