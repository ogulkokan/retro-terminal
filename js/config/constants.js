/**
 * Global constants for RetroTerminal
 * Centralizes magic numbers and configuration values
 */

// Audio Configuration
export const AUDIO = {
  POOL_SIZE: 6,  // Number of audio instances to prevent sound cutoff
  DEFAULT_VOLUME: 0.3,
  MIN_VOLUME: 0,
  MAX_VOLUME: 1
};

// Font Configuration
export const FONT = {
  SIZE_MIN: 10,     // Minimum readable font size (px)
  SIZE_MAX: 25,     // Maximum comfortable font size (px)
  SIZE_DEFAULT: 16, // Default font size (px)
  SIZE_STEP: 0.5,   // Font size increment step
  FAMILIES: ['Courier New', 'Roboto Mono', 'Fira Code', 'monospace']
};

// Text Animation Configuration
export const ANIMATION = {
  DELAY_DEFAULT: 10,  // Default animation delay (ms)
  THRESHOLDS: {
    SHORT: 50,        // Characters threshold for short text
    MEDIUM: 100       // Characters threshold for medium text
  },
  SPEED_MULTIPLIERS: {
    SHORT: 1,         // 1x speed for short text
    MEDIUM: 10,       // 10x speed for medium text
    LONG: 20          // 20x speed for long text
  }
};

// Theme Configuration
export const THEMES = ['Green', 'Orange'];
export const DEFAULT_THEME = 'Orange';

// Storage Keys
export const STORAGE_KEY = 'retro-terminal-settings';

// DOM Element IDs
export const DOM_IDS = {
  TERMINAL_INPUT: 'terminal-input',
  TERMINAL_OUTPUT: 'terminal-output',
  INPUT_PREFIX: 'input-prefix'
};
