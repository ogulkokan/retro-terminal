import { init } from './init.js';
import { initCursor } from './terminal/cursor.js';
import { showWelcomeMessage } from './terminal/terminal.js';
import { handleClick, theme, fullscreen, globalListener } from './handlers/globalHandlers.js';
import { initSettings } from "./config/settings.js";
import { initAudio } from './audio/audioManager.js';
import { loadConfig } from './config/configLoader.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Load config first - required for content and settings. If it fails,
  // continue booting with built-in defaults so the app still works.
  try {
    await loadConfig();
  } catch (error) {
    console.warn('Continuing with built-in defaults; config.json failed to load.', error);
  }

  init();
  initCursor();
  initAudio();
  showWelcomeMessage();
  initSettings();
});

document.addEventListener("keydown", globalListener);

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
  theme,
  handleClick,
  fullscreen
});
