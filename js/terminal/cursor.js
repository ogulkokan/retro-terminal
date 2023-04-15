export function initCursor() {
    const terminalInput = document.getElementById("terminal-input");
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    terminalInput.parentElement.insertBefore(cursor, terminalInput.nextSibling);
  
    terminalInput.addEventListener("input", () => adjustCursorPosition(cursor));
    terminalInput.addEventListener("focus", () => cursor.classList.add("cursor"));
    terminalInput.addEventListener("blur", () => cursor.classList.remove("cursor"));
  }
  
  export function adjustCursorPosition(cursor) {
    const terminalInput = document.getElementById("terminal-input");
    const inputText = terminalInput.innerText.trim();
    const inputWidth = getTextWidth(inputText, getComputedStyle(terminalInput));
    cursor.style.marginLeft = inputWidth + "px";
  }
  
  export function getTextWidth(text, style) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = style.fontSize + " " + style.fontFamily;
    return context.measureText(text).width;
  }
  