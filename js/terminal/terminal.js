export async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = "Available commands: help, date, clear, about, projects, skills, experience, education, contact";
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);
	await animateText(newOutputLine, welcomeMessage);
  }
  
  export function processCommand(inputText) {
	switch (inputText.toLowerCase()) {
	  case "help":
		return "Available commands: help, date, clear, about, projects, skills, experience, education, contact";
	  case "date":
		return new Date().toLocaleString();
	  case "clear":
		document.getElementById("terminal-output").innerHTML = "";
		return "";
	  case "about":
		return "Hello, I'm [Your Name]! I'm a [Your Profession/Role] with a passion for [Your Interests].";
	  case "projects":
		return `Here are some of my projects:
		  - Project 1: A brief description (GitHub: https://github.com/username/project1)
		  - Project 2: A brief description (GitHub: https://github.com/username/project2)
		  - Project 3: A brief description (GitHub: https://github.com/username/project3)`;
	  case "skills":
		return `Technical Skills:
		  - JavaScript, Python, Java, etc.
		  Soft Skills:
		  - Communication, problem-solving, teamwork, etc.`;
	  case "experience":
		return `Work Experience:
		  - Company 1: Role, Duration, Responsibilities
		  - Company 2: Role, Duration, Responsibilities`;
	  case "education":
		return `Education:
		  - Degree 1: Institution, Duration, Major
		  - Degree 2: Institution, Duration, Major`;
	  case "contact":
		return `Contact Information:
		  - Email: your.email@example.com
		  - Phone: +1-123-456-7890
		  - LinkedIn: https://www.linkedin.com/in/yourusername
		  - GitHub: https://github.com/yourusername`;
	  default:
		return `Unknown command: ${inputText}`;
	}
  }
  
  
  let userInteracted = false;
  document.addEventListener("click", () => {
	userInteracted = true;
  });
  
  export async function animateText(element, text, delay = 10, terminalInput) {
	if (terminalInput) {
	  terminalInput.contentEditable = "false";
	}
  
	const typingSound = new Audio("sounds/typing.mp3");
  
	for (const char of text) {
	  element.textContent += char;
  
	  if (userInteracted) {
		// Play typing sound
		typingSound.currentTime = 0;
		typingSound.play().catch((error) => {
		  console.error("Error playing typing sound:", error);
		});

	  }
  
	  await new Promise((resolve) => setTimeout(resolve, delay));
	}
  
	if (terminalInput) {
	  terminalInput.contentEditable = "true";
	}
  }
  
  
  
  