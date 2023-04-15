import { init } from './init.js';
import { initCursor } from './js/terminal/cursor.js';
import { showWelcomeMessage, processCommand, animateText } from './js/terminal/terminal.js';
import { handleClick, theme, fullscreen, globalListener } from './js/handlers/globalHandlers.js';

document.addEventListener("DOMContentLoaded", init);
initCursor();
showWelcomeMessage();

document.addEventListener("keydown", globalListener);

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
  theme,
  handleClick,
  fullscreen
});
