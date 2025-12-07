/**
 * Cursor Management Module
 * Handles keyboard-only cursor navigation with block cursor styling
 */

import { getTerminalInput } from '../utils/domCache.js';

let cursorPosition = 0;
let textContent = '';

/**
 * Clamp cursor position to valid range [0, textContent.length]
 * @param {number} pos - Position to clamp (defaults to current position)
 * @returns {number} Clamped position
 */
function clampCursor(pos = cursorPosition) {
  return Math.max(0, Math.min(pos, textContent.length));
}

/**
 * Initialize cursor with keyboard-only navigation
 * Disables mouse-based text selection for authentic retro terminal feel
 */
export function initCursor() {
  const terminalInput = getTerminalInput();
  if (!terminalInput) return;

  terminalInput.style.caretColor = 'transparent';
  terminalInput.style.userSelect = 'none';

  terminalInput.addEventListener('mousedown', (e) => {
    e.preventDefault();
    terminalInput.focus();
  });

  terminalInput.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });

  terminalInput.addEventListener('mousemove', (e) => {
    if (e.buttons > 0) {
      e.preventDefault();
    }
  });

  renderInputWithCursor();
}

/**
 * Get current cursor position
 * @returns {number} Current cursor position
 */
export function getCursorPosition() {
  return cursorPosition;
}

/**
 * Get current text content
 * @returns {string} Current text content
 */
export function getTextContent() {
  return textContent;
}

/**
 * Set text content and adjust cursor position if needed
 * @param {string} newText - New text content
 */
export function setTextContent(newText) {
  textContent = newText;
  cursorPosition = clampCursor();
  renderInputWithCursor();
}

/**
 * Set cursor position (will be clamped to valid range)
 * @param {number} pos - New cursor position
 */
export function setCursorPosition(pos) {
  cursorPosition = clampCursor(pos);
  renderInputWithCursor();
}

/**
 * Move cursor one position to the left
 */
export function moveCursorLeft() {
  if (cursorPosition > 0) {
    cursorPosition--;
    renderInputWithCursor();
  }
}

/**
 * Move cursor one position to the right
 */
export function moveCursorRight() {
  if (cursorPosition < textContent.length) {
    cursorPosition++;
    renderInputWithCursor();
  }
}

/**
 * Move cursor to start of text
 */
export function moveCursorToStart() {
  cursorPosition = 0;
  renderInputWithCursor();
}

/**
 * Move cursor to end of text
 */
export function moveCursorToEnd() {
  cursorPosition = textContent.length;
  renderInputWithCursor();
}

/**
 * Insert a character at cursor position
 * @param {string} char - Character to insert
 */
export function insertCharAtCursor(char) {
  textContent = textContent.slice(0, cursorPosition) + char + textContent.slice(cursorPosition);
  cursorPosition++;
  renderInputWithCursor();
}

/**
 * Delete character before cursor (backspace)
 */
export function deleteCharBeforeCursor() {
  if (cursorPosition > 0) {
    textContent = textContent.slice(0, cursorPosition - 1) + textContent.slice(cursorPosition);
    cursorPosition--;
    renderInputWithCursor();
  }
}

/**
 * Delete character at cursor (delete key)
 */
export function deleteCharAtCursor() {
  if (cursorPosition < textContent.length) {
    textContent = textContent.slice(0, cursorPosition) + textContent.slice(cursorPosition + 1);
    renderInputWithCursor();
  }
}

/**
 * Clear all input text and reset cursor
 */
export function clearInput() {
  textContent = '';
  cursorPosition = 0;
  renderInputWithCursor();
}

/**
 * Render input field with block cursor at current position
 * @private
 */
function renderInputWithCursor() {
  const terminalInput = getTerminalInput();
  if (!terminalInput) return;

  const beforeCursor = textContent.slice(0, cursorPosition);
  const atCursor = textContent.slice(cursorPosition, cursorPosition + 1) || ' ';
  const afterCursor = textContent.slice(cursorPosition + 1);

  terminalInput.innerHTML = '';

  if (beforeCursor) {
    const beforeSpan = document.createElement('span');
    beforeSpan.textContent = beforeCursor;
    terminalInput.appendChild(beforeSpan);
  }

  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor-block';
  cursorSpan.textContent = atCursor;
  terminalInput.appendChild(cursorSpan);

  if (afterCursor) {
    const afterSpan = document.createElement('span');
    afterSpan.textContent = afterCursor;
    terminalInput.appendChild(afterSpan);
  }
}
