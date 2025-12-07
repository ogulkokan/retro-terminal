import { applyTheme } from "../config/settings.js";
import {
	getBanner,
	getAbout,
	getEducation,
	getContact,
	getSkills,
	getHelp,
	getProjects,
	getLinkedInURL,
	getGitHubURL,
	getEmail
} from "../config/content.js";
import { scrollToBottom } from '../handlers/utils.js';

export async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = getBanner();
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);
	await animateText(newOutputLine, welcomeMessage);
	scrollToBottom();
}

export function processCommand(inputText) {
	const inputPrefix = document.getElementById("input-prefix");
	const terminalInput = document.getElementById("terminal-input");
	const userCommand = terminalInput.textContent;
	let response = '';

	switch (inputText.toLowerCase()) {
	  case "help":
		return userCommand + "\n" + getHelp();
	  case "date":
		return userCommand + "\n" + new Date().toLocaleString();
	  case "clear":
		document.getElementById("terminal-output").innerHTML = "";
		return "";
	  case "about":
		return userCommand + "\n" + getAbout();
	  case "skills":
		return userCommand + "\n" + getSkills();
	  case "experience":
		return userCommand + "\n" + getSkills();
	  case "education":
		return userCommand + "\n" + getEducation();
	  case "contact":
		return userCommand + "\n" + getContact();
	  case "projects":
		return userCommand + "\n" + getProjects();
	  case "contact linkedin":
		window.open(getLinkedInURL(), "_blank");
		break;
	  case "contact github":
		window.open(getGitHubURL(), "_blank");
		break;
	  case "contact email":
		window.open(`mailto:${getEmail()}`, "_blank");
		response = userCommand + "\n" + "Opening email client to send an email.";
		break;
	  case "theme green":
		applyTheme('Green');
		return userCommand + "\n" + "Theme changed to Green.";
	  case "theme orange":
		applyTheme('Orange');
		return userCommand + "\n" + "Theme changed to Orange.";
	  default:
		return userCommand + "\n" + `Unknown command: ${inputText}`;
	}
	return response;
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

	// Calculate speed factor based on character count
	const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
	const adjustedDelay = delay / speedFactor;

	for (const char of text) {
		element.textContent += char;
		scrollToBottom();

		await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
	}

	if (terminalInput) {
		terminalInput.contentEditable = "true";
		if (inputPrefix) inputPrefix.style.display = "inline";
	}
}
