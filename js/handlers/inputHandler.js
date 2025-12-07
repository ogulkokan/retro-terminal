import { processCommand, animateText } from '../terminal/terminal.js';
import { scrollToBottom } from './utils.js';
import { playTypingSound } from '../audio/audioManager.js';
import { 
  getTextContent, 
  setTextContent,
  clearInput,
  insertCharAtCursor,
  deleteCharBeforeCursor,
  deleteCharAtCursor,
  moveCursorLeft,
  moveCursorRight,
  moveCursorToStart,
  moveCursorToEnd
} from '../terminal/cursor.js';

let commandHistory = [];
let commandIndex = -1;

export async function handleInput(event) {
  const terminalOutput = document.getElementById("terminal-output");
  const terminalInput = event.target;

  // Prevent default for all keys to stop native contenteditable behavior
  event.preventDefault();

  if (event.key === "Enter") {
    handleEnterKey(terminalOutput, terminalInput);
  } else if (event.key === "ArrowUp") {
    handleArrowUp();
  } else if (event.key === "ArrowDown") {
    handleArrowDown();
  } else if (event.key === "ArrowLeft") {
    if (event.ctrlKey || event.metaKey) {
      moveCursorToStart();
    } else {
      moveCursorLeft();
    }
  } else if (event.key === "ArrowRight") {
    if (event.ctrlKey || event.metaKey) {
      moveCursorToEnd();
    } else {
      moveCursorRight();
    }
  } else if (event.key === "Home") {
    moveCursorToStart();
  } else if (event.key === "End") {
    moveCursorToEnd();
  } else if (event.key === "Backspace") {
    deleteCharBeforeCursor();
    playTypingSound();
  } else if (event.key === "Delete") {
    deleteCharAtCursor();
    playTypingSound();
  } else if (event.key === "Escape") {
    handleEscape();
  } else if (event.key === "Tab") {
    handleTab();
  } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    // Single printable character
    insertCharAtCursor(event.key);
    playTypingSound();
  }
}

async function handleEnterKey(terminalOutput, terminalInput) {
  const inputText = getTextContent().trim();
  const outputText = processCommand(inputText);

  if (outputText) {
    const newOutputLine = document.createElement("div");
    terminalOutput.appendChild(newOutputLine);

    commandHistory.push(inputText);
    commandIndex = commandHistory.length;

    if (inputText.length > 0) {
      clearInput();
      terminalOutput.appendChild(newOutputLine);

      const inputPrefix = document.getElementById("input-prefix");
      await animateText(newOutputLine, inputPrefix.textContent, 10, terminalInput, inputPrefix);
    }
    await animateText(newOutputLine, outputText, 10, terminalInput);
    scrollToBottom();
  }

  clearInput();
  terminalInput.focus();
}

function handleArrowUp() {
  if (commandIndex > 0) {
    commandIndex--;
    setTextContent(commandHistory[commandIndex]);
    moveCursorToEnd();
  }
}

function handleArrowDown() {
  if (commandIndex < commandHistory.length - 1) {
    commandIndex++;
    setTextContent(commandHistory[commandIndex]);
    moveCursorToEnd();
  } else if (commandIndex === commandHistory.length - 1) {
    commandIndex++;
    clearInput();
  }
}

function handleEscape() {
  clearInput();
}

function handleTab() {
  const inputText = getTextContent().trim();
  const suggestions = getAutocompleteSuggestions(inputText);

  if (suggestions.length === 1) {
    setTextContent(suggestions[0]);
    moveCursorToEnd();
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
    "theme green",
    "theme orange",
  ];

  return availableCommands.filter((command) => {
    return command.startsWith(inputText.toLowerCase());
  });
}
