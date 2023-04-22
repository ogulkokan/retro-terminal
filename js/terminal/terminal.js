import { applyTheme } from "../config/settings.js";
import { banner, about, education, contact, skills, help, test } from "../config/content.js";
import { scrollToBottom } from '../handlers/utils.js';

export async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = banner;
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);
	await animateText(newOutputLine, welcomeMessage);
	scrollToBottom();
}

export function processCommand(inputText) {
	switch (inputText.toLowerCase()) {
	  case "help":
		return help;
	  case "date":
		return new Date().toLocaleString();
	  case "clear":
		document.getElementById("terminal-output").innerHTML = "";
		return "";
	  case "about":
		return about;
	  case "skills":
		return skills;
	  case "experience":
		return skills;
	  case "education":
		return education;
	  case "contact":
		return contact;
	  case "theme green":
		applyTheme('Green');
		return "Theme changed to Green.";
	  case "theme orange":
		applyTheme('Orange');
		return "Theme changed to Orange.";
	  case "test":
		return test;
	  default:
		return `Unknown command: ${inputText}`;
	}
}
  

let userInteracted = false;
document.addEventListener("click", () => {
	userInteracted = true;
});
  
export async function animateText(element, text, delay = 10, terminalInput, inputPrefix) {
	if (terminalInput) {
		terminalInput.contentEditable = "false";
		if (inputPrefix) inputPrefix.style.display = "none";
	}

	// const typingSound = new Audio("sounds/typing.mp3");

	// Calculate speed factor based on character count
	const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
	const adjustedDelay = delay / speedFactor;

	for (const char of text) {
		element.textContent += char;
		scrollToBottom();

		if (userInteracted) {
		// Play typing sound
		// typingSound.currentTime = 0;
		// typingSound.play().catch((error) => {
		//   console.error("Error playing typing sound:", error);
		// });

		}

		await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
	}

	if (terminalInput) {
		terminalInput.contentEditable = "true";
		if (inputPrefix) inputPrefix.style.display = "inline";
	}
}
