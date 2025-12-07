const SOUND_SRC = 'sounds/single-key-stroke.mp3';
const POOL_SIZE = 6;

let audioPool = [];
let soundEnabled = true;
let volume = 0.3;

function createAudioInstance() {
  const audio = new Audio(SOUND_SRC);
  audio.volume = volume;
  audio.preload = 'auto';
  // Preload audio
  audio.load();
  return audio;
}

function ensurePool() {
  if (audioPool.length === 0) {
    audioPool = Array.from({ length: POOL_SIZE }, () => createAudioInstance());
  }
}

export function initAudio() {
  try {
    ensurePool();
  } catch (error) {
    console.warn('Failed to initialize audio:', error);
  }

  // Expose audio manager to window for settings integration
  window.audioManager = {
    setSoundEnabled,
    setVolume,
    getSoundSettings
  };
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function setVolume(newVolume) {
  volume = Math.max(0, Math.min(1, newVolume));
  audioPool.forEach(audio => {
    audio.volume = volume;
  });
}

export function playTypingSound() {
  if (!soundEnabled) return;
  ensurePool();

  // Find an available audio instance; if none free, skip to avoid choppy cutoffs
  const audio = audioPool.find(a => a.paused || a.ended);
  if (!audio) return;

  try {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently ignore autoplay policy errors; expected before user interaction
    });
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
}

export function getSoundSettings() {
  return { soundEnabled, volume };
}
