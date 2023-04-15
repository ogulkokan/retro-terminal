import { handleInput } from './js/handlers/inputHandler.js';

export function init() {
  console.log("Terminal initialized");

  const terminalInput = document.getElementById("terminal-input");
  if (terminalInput) {
    terminalInput.addEventListener("keydown", handleInput);
  }
}
