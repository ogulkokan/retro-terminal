/**
 * Terminal Core Module
 * Handles command processing, text animation, and welcome message
 */

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
import { getTerminalOutput, getTerminalInput, getInputPrefix } from '../utils/domCache.js';
import { ANIMATION } from '../config/constants.js';

/**
 * Display welcome banner on terminal initialization
 */
export async function showWelcomeMessage() {
	const terminalOutput = getTerminalOutput();
	const welcomeMessage = getBanner();

	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);

	await animateText(newOutputLine, welcomeMessage);
	scrollToBottom();
}

/**
 * Process a command and return the response text
 * @param {string} inputText - Command text entered by user
 * @returns {string} Response text to display
 */
export function processCommand(inputText) {
	const terminalInput = getTerminalInput();
	const userCommand = terminalInput.textContent;
	let response = '';

	switch (inputText.toLowerCase()) {
	  case "help":
		return userCommand + "\n" + getHelp();
	  case "date":
		return userCommand + "\n" + new Date().toLocaleString();
	  case "clear":
		getTerminalOutput().innerHTML = "";
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

/**
 * Calculate animation speed multiplier based on text length
 * Longer text animates faster to improve UX
 * @param {number} textLength - Length of text to animate
 * @returns {number} Speed multiplier
 */
function getSpeedMultiplier(textLength) {
	if (textLength <= ANIMATION.THRESHOLDS.SHORT) {
		return ANIMATION.SPEED_MULTIPLIERS.SHORT;
	} else if (textLength <= ANIMATION.THRESHOLDS.MEDIUM) {
		return ANIMATION.SPEED_MULTIPLIERS.MEDIUM;
	}
	return ANIMATION.SPEED_MULTIPLIERS.LONG;
}

/**
 * Animate text character by character with adaptive speed
 * @param {HTMLElement} element - Element to display text in
 * @param {string} text - Text to animate
 * @param {number} delay - Base delay in milliseconds (default from constants)
 * @param {HTMLElement} terminalInput - Optional input element to disable during animation
 * @param {HTMLElement} inputPrefix - Optional prefix element to hide during animation
 */
export async function animateText(element, text, delay = ANIMATION.DELAY_DEFAULT, terminalInput, inputPrefix) {
	if (terminalInput) {
		terminalInput.contentEditable = "false";
		if (inputPrefix) inputPrefix.style.display = "none";
	}

	const speedFactor = getSpeedMultiplier(text.length);
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
