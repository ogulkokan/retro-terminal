export async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = "Available commands: help, date, clear";
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);
	await animateText(newOutputLine, welcomeMessage);
  }
  
  export function processCommand(inputText) {
	switch (inputText.toLowerCase()) {
	  case "help":
		return "Available commands: help, date, clear";
	  case "date":
		return new Date().toLocaleString();
	  case "clear":
		document.getElementById("terminal-output").innerHTML = "";
		return "";
	  default:
		return `Unknown command: ${inputText}`;
	}
  }
  
  export async function animateText(element, text, delay = 50) {
	for (const char of text) {
	  element.textContent += char;
	  await new Promise((resolve) => setTimeout(resolve, delay));
	}
  }
  