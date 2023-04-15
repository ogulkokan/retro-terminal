import { processCommand, animateText } from '../terminal/terminal.js';

export async function handleInput(event) {
  const terminalOutput = document.getElementById("terminal-output");
  if (event.key === "Enter") {
    event.preventDefault();
    const inputText = event.target.innerText.trim();

    // Process the command and get the output
    const outputText = processCommand(inputText);

    if (outputText) {
      const newOutputLine = document.createElement("div");
      terminalOutput.appendChild(newOutputLine);
      const userInput = event.target.textContent.trim();
      if (userInput.length > 0) {
        // Clear the input
        event.target.textContent = "";

        terminalOutput.appendChild(newOutputLine);
        await animateText(newOutputLine, "> ");
        await processCommand(userInput);
      }
      await animateText(newOutputLine, outputText);
    }

    // Clear the input field
    event.target.innerText = "";
  } else if (event.key === "Escape") {
    event.preventDefault();
    // Clear the input field
    event.target.innerText = "";
  }
}
