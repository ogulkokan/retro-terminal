/**
 * Audio Manager Module
 * Manages typing sound effects with audio pooling to prevent cutoff
 */

import { AUDIO } from '../config/constants.js';

const SOUND_SRC = 'sounds/single-key-stroke.mp3';

let audioPool = [];
let soundEnabled = true;
let volume = AUDIO.DEFAULT_VOLUME;

/**
 * Create a single audio instance with proper configuration
 * @returns {HTMLAudioElement} Configured audio element
 */
function createAudioInstance() {
  const audio = new Audio(SOUND_SRC);
  audio.volume = volume;
  audio.preload = 'auto';
  audio.load();
  return audio;
}

/**
 * Ensure audio pool is initialized with configured pool size
 */
function ensurePool() {
  if (audioPool.length === 0) {
    audioPool = Array.from({ length: AUDIO.POOL_SIZE }, () => createAudioInstance());
  }
}

/**
 * Initialize audio system and expose API to window
 */
export function initAudio() {
  try {
    ensurePool();
  } catch (error) {
    console.warn('Failed to initialize audio:', error);
  }

  window.audioManager = {
    setSoundEnabled,
    setVolume,
    getSoundSettings
  };
}

/**
 * Enable or disable typing sounds
 * @param {boolean} enabled - Whether sounds should be enabled
 */
export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

/**
 * Set volume level (clamped to valid range)
 * @param {number} newVolume - Volume level (0.0 to 1.0)
 */
export function setVolume(newVolume) {
  volume = Math.max(AUDIO.MIN_VOLUME, Math.min(AUDIO.MAX_VOLUME, newVolume));
  audioPool.forEach(audio => {
    audio.volume = volume;
  });
}

/**
 * Play typing sound using next available audio instance from pool
 * Uses pooling to prevent sound cutoff on rapid keystrokes
 */
export function playTypingSound() {
  if (!soundEnabled) return;
  ensurePool();

  const audio = audioPool.find(a => a.paused || a.ended);
  if (!audio) return;

  try {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently ignore autoplay policy errors before user interaction
    });
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
}

/**
 * Get current sound settings
 * @returns {{soundEnabled: boolean, volume: number}} Current settings
 */
export function getSoundSettings() {
  return { soundEnabled, volume };
}
