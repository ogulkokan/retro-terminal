// Cursor position state - this tracks where in the text the cursor is
let cursorPosition = 0;
let textContent = '';

export function initCursor() {
  const terminalInput = document.getElementById("terminal-input");
  if (!terminalInput) return;

  // Disable native text selection and caret
  terminalInput.style.caretColor = 'transparent';
  terminalInput.style.userSelect = 'none';
  
  // Prevent mouse from changing cursor position - old terminal style
  terminalInput.addEventListener('mousedown', (e) => {
    e.preventDefault();
    terminalInput.focus();
  });
  
  // Prevent text selection via mouse
  terminalInput.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });
  
  // Prevent drag selection
  terminalInput.addEventListener('mousemove', (e) => {
    if (e.buttons > 0) {
      e.preventDefault();
    }
  });
  
  // Initial render
  renderInputWithCursor();
}

export function getCursorPosition() {
  return cursorPosition;
}

export function getTextContent() {
  return textContent;
}

export function setTextContent(newText) {
  textContent = newText;
  // Ensure cursor doesn't go beyond text length
  cursorPosition = Math.min(cursorPosition, textContent.length);
  renderInputWithCursor();
}

export function setCursorPosition(pos) {
  cursorPosition = Math.max(0, Math.min(pos, textContent.length));
  renderInputWithCursor();
}

export function moveCursorLeft() {
  if (cursorPosition > 0) {
    cursorPosition--;
    renderInputWithCursor();
  }
}

export function moveCursorRight() {
  if (cursorPosition < textContent.length) {
    cursorPosition++;
    renderInputWithCursor();
  }
}

export function moveCursorToStart() {
  cursorPosition = 0;
  renderInputWithCursor();
}

export function moveCursorToEnd() {
  cursorPosition = textContent.length;
  renderInputWithCursor();
}

export function insertCharAtCursor(char) {
  textContent = textContent.slice(0, cursorPosition) + char + textContent.slice(cursorPosition);
  cursorPosition++;
  renderInputWithCursor();
}

export function deleteCharBeforeCursor() {
  if (cursorPosition > 0) {
    textContent = textContent.slice(0, cursorPosition - 1) + textContent.slice(cursorPosition);
    cursorPosition--;
    renderInputWithCursor();
  }
}

export function deleteCharAtCursor() {
  if (cursorPosition < textContent.length) {
    textContent = textContent.slice(0, cursorPosition) + textContent.slice(cursorPosition + 1);
    renderInputWithCursor();
  }
}

export function clearInput() {
  textContent = '';
  cursorPosition = 0;
  renderInputWithCursor();
}

function renderInputWithCursor() {
  const terminalInput = document.getElementById("terminal-input");
  if (!terminalInput) return;

  const beforeCursor = textContent.slice(0, cursorPosition);
  const atCursor = textContent.slice(cursorPosition, cursorPosition + 1) || ' ';
  const afterCursor = textContent.slice(cursorPosition + 1);

  // Build the display with cursor
  terminalInput.innerHTML = '';
  
  // Text before cursor
  if (beforeCursor) {
    const beforeSpan = document.createElement('span');
    beforeSpan.textContent = beforeCursor;
    terminalInput.appendChild(beforeSpan);
  }
  
  // Cursor character (highlighted)
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor-block';
  cursorSpan.textContent = atCursor;
  terminalInput.appendChild(cursorSpan);
  
  // Text after cursor
  if (afterCursor) {
    const afterSpan = document.createElement('span');
    afterSpan.textContent = afterCursor;
    terminalInput.appendChild(afterSpan);
  }
}
