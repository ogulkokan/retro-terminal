import { handleInput } from './handlers/inputHandler.js';

export function init() {
  console.log("Terminal initialized");

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
