import { handleInput } from './handlers/inputHandler.js';

export function init() {
  console.log("Terminal initialized");

  // Add boot animation class
  const terminalWrapper = document.querySelector('.terminal-wrapper');
  if (terminalWrapper) {
    terminalWrapper.classList.add('booting');

    // Remove boot class after animation completes
    setTimeout(() => {
      terminalWrapper.classList.remove('booting');
    }, 2000);
  }

  const terminalInput = document.getElementById("terminal-input");

  // Add touch event listeners for terminal input
  terminalInput.addEventListener("click", handleClick);
  terminalInput.addEventListener("touchstart", handleClick);

  terminalInput.addEventListener("focus", () => {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = terminalInput.offsetTop;
    }, 500);
  });
  if (terminalInput) {
    terminalInput.addEventListener("keydown", handleInput);
  }
}
