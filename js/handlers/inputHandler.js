import { processCommand, animateText } from '../terminal/terminal.js';

let commandHistory = [];
let commandIndex = -1;

export async function handleInput(event) {
  const terminalOutput = document.getElementById("terminal-output");
  const terminalInput = event.target;

  if (event.key === "Enter") {
    event.preventDefault();
    const inputText = terminalInput.innerText.trim();

    // Process the command and get the output
    const outputText = processCommand(inputText);

    if (outputText) {
      const newOutputLine = document.createElement("div");
      terminalOutput.appendChild(newOutputLine);

      commandHistory.push(inputText);
      commandIndex = commandHistory.length;

      if (inputText.length > 0) {
        // Clear the input
        terminalInput.textContent = "";

        terminalOutput.appendChild(newOutputLine);
        await animateText(newOutputLine, "> ", 10, terminalInput);
        await processCommand(inputText);
      }
      await animateText(newOutputLine, outputText, 10, terminalInput);
    }

    // Clear the input field
    terminalInput.innerText = "";
    // Set focus back to the terminal input
    terminalInput.focus();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (commandIndex > 0) {
      commandIndex--;
      terminalInput.innerText = commandHistory[commandIndex];
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (commandIndex < commandHistory.length - 1) {
      commandIndex++;
      terminalInput.innerText = commandHistory[commandIndex];
    } else if (commandIndex === commandHistory.length - 1) {
      commandIndex++;
      terminalInput.innerText = "";
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    // Clear the input field
    terminalInput.innerText = "";
  }
}
