// import { setVolume } from "./util/speak.js";
// import { click } from "./sound/index.js";
// import { on, off } from "./util/power.js";
// import { toggleFullscreen } from "./util/screens.js";
// import { type } from "./util/io.js";

function init() {
	// Add initialization code here
	console.log("Terminal initialized");

	const terminalInput = document.getElementById("terminal-input");
	if (terminalInput) {
	  terminalInput.addEventListener("keydown", handleInput);
	}
  }
  
document.addEventListener("DOMContentLoaded", init);
showWelcomeMessage();

// Add this code after the existing event listeners in the `init()` function
const terminalInput = document.getElementById("terminal-input");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
terminalInput.parentElement.insertBefore(cursor, terminalInput.nextSibling);

terminalInput.addEventListener("input", adjustCursorPosition);
terminalInput.addEventListener("focus", () => cursor.classList.add("cursor"));
terminalInput.addEventListener("blur", () => cursor.classList.remove("cursor"));

function adjustCursorPosition() {
  const inputText = terminalInput.innerText.trim();
  const inputWidth = getTextWidth(inputText, getComputedStyle(terminalInput));
  cursor.style.marginLeft = inputWidth + "px";
}

function getTextWidth(text, style) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = style.fontSize + " " + style.fontFamily;
  return context.measureText(text).width;
}

async function handleInput(event) {
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
  

  async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = "Available commands: help, date, clear";
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);
	await animateText(newOutputLine, welcomeMessage);
  }

function processCommand(inputText) {
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

async function animateText(element, text, delay = 50) {
	for (const char of text) {
	  element.textContent += char;
	  await new Promise((resolve) => setTimeout(resolve, delay));
	}
  }

// Check if the element with the id "dial" exists before adding an event listener
const dialElement = document.getElementById("dial");
if (dialElement) {
  dialElement.addEventListener("input", (event) => {
    let value = event.target.value;
    setVolume(value);
  });
}

// Check if query param is set and load that command
async function onload() {
	const urlParams = new URLSearchParams(window.location.search);
	const command = urlParams.get("command");

	if (command) {
		const { power } = await import("./util/power.js");
		const { parse } = await import("./util/io.js");
		power();
		await type("> " + command, { initialWait: 3000, finalWait: 1500 });
		await parse(command);

		const { main } = await import("./util/screens.js");
		main();
	}
}

// Change the command passed to the parse function in order to directly load that command.
// Then visit /debug.html which calls this function in <body> onLoad().
async function debug() {
	const { power } = await import("./util/power.js");
	const { main } = await import("./util/screens.js");
	const { parse } = await import("./util/io.js");
	power();
	main();
	parse("fallout");
}

function togglePower() {
	let isOff = document.getElementById("crt").classList.contains("off");
	if (isOff) {
		on();
	} else {
		off();
	}
}

function handleClick(event) {
	if (event) {
		event.preventDefault();
	}
	let input = document.querySelector("[contenteditable='true']");
	if (input) {
		input.focus();
	}
}

function fly(event) {
	event.target.classList.toggle("fly");
}

function theme(event) {
	click();
	let theme = event.target.dataset.theme;
	[...document.getElementsByClassName("theme")].forEach(b =>
		b.classList.toggle("active", false)
	);
	event.target.classList.add("active");
	document.body.classList = "theme-" + theme;
	handleClick();
}

function fullscreen(event) {
	toggleFullscreen();
	event.target.blur();
}

function globalListener({ keyCode }) {
	if (keyCode === 122) {
		// F11
		toggleFullscreen();
	} else if (keyCode === 27) {
		// ESC
		toggleFullscreen(false);
	}
}
document.addEventListener("keydown", globalListener);


// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
	debug,
	onload,
	togglePower,
	theme,
	fly,
	handleClick,
	fullscreen
});
