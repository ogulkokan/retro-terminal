import { processCommand, animateText } from '../terminal/terminal.js';
import { scrollToBottom } from './utils.js';

let commandHistory = [];
let commandIndex = -1;

export async function handleInput(event) {
  const terminalOutput = document.getElementById("terminal-output");
  const terminalInput = event.target;

  if (event.key === "Enter") {
    event.preventDefault();
    handleEnterKey(terminalOutput, terminalInput);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    handleArrowUp(terminalInput);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    handleArrowDown(terminalInput);
  } else if (event.key === "Escape") {
    event.preventDefault();
    handleEscape(terminalInput);
  } else if (event.key === "Tab") {
    event.preventDefault();
    handleTab(terminalInput);
  }
}

async function handleEnterKey(terminalOutput, terminalInput) {
  const inputText = terminalInput.innerText.trim();
  const outputText = processCommand(inputText);

  if (outputText) {
    const newOutputLine = document.createElement("div");
    terminalOutput.appendChild(newOutputLine);

    commandHistory.push(inputText);
    commandIndex = commandHistory.length;

    if (inputText.length > 0) {
      terminalInput.innerText = "";
      terminalOutput.appendChild(newOutputLine);

      const inputPrefix = document.getElementById("input-prefix");
      await animateText(newOutputLine, inputPrefix.textContent, 10, terminalInput, inputPrefix);
    }
    await animateText(newOutputLine, outputText, 10, terminalInput);
    scrollToBottom();
    terminalInput.innerText = "";
    terminalInput.focus();
  }

  terminalInput.innerText = "";
  terminalInput.focus();
}

function handleArrowUp(terminalInput) {
  if (commandIndex > 0) {
    commandIndex--;
    terminalInput.innerText = commandHistory[commandIndex];
  }
}

function handleArrowDown(terminalInput) {
  if (commandIndex < commandHistory.length - 1) {
    commandIndex++;
    terminalInput.innerText = commandHistory[commandIndex];
  } else if (commandIndex === commandHistory.length - 1) {
    commandIndex++;
    terminalInput.innerText = "";
  }
}

function handleEscape(terminalInput) {
  terminalInput.innerText = "";
}

function handleTab(terminalInput) {
  const inputText = terminalInput.innerText.trim();
  const suggestions = getAutocompleteSuggestions(inputText);

  if (suggestions.length === 1) {
    terminalInput.innerText = suggestions[0];
  } else if (suggestions.length > 1) {
    console.log("Suggestions:", suggestions.join(", "));
  }
}

function getAutocompleteSuggestions(inputText) {
  const availableCommands = [
    "help",
    "date",
    "clear",
    "about",
    "projects",
    "skills",
    "experience",
    "education",
    "contact",
  ];

  return availableCommands.filter((command) => {
    return command.startsWith(inputText.toLowerCase());
  });
}
