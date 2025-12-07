import { handleInput } from './handlers/inputHandler.js';

export function init() {
  console.log("Terminal initialized");

  const terminalInput = document.getElementById("terminal-input");
  if (!terminalInput) return;

  terminalInput.addEventListener("keydown", handleInput);
  
  terminalInput.addEventListener("focus", () => {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = terminalInput.offsetTop;
    }, 500);
  });
}
