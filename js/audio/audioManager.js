let typingSound = null;
let soundEnabled = true;
let volume = 0.3;

export function initAudio() {
  try {
    typingSound = new Audio('sounds/typing.mp3');
    typingSound.volume = volume;
    // Preload audio
    typingSound.load();
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
  if (typingSound) {
    typingSound.volume = volume;
  }
}

export function playTypingSound() {
  if (!soundEnabled || !typingSound) return;

  try {
    typingSound.currentTime = 0;
    typingSound.play().catch(error => {
      // Silently ignore autoplay policy errors
      // These are expected before user interaction
    });
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
}

export function getSoundSettings() {
  return { soundEnabled, volume };
}
