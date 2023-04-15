# Retro-Terminal

A simple terminal emulator built with JavaScript.

## Project Structure
<pre>
js/
├─ handlers/
│   ├─ inputHandler.js
│   └─ globalHandlers.js
├─ terminal/
│   ├─ terminal.js
│   └─ cursor.js
├─ utils/
│   ├─ fullscreen.js - later
│   └─ theme.js - later
├─ main.js
└─ init.js
</pre>


### handlers

This folder contains event handlers for user input and global events.

- `inputHandler.js`: Handles user input in the terminal.
- `globalHandlers.js`: Handles global events like fullscreen toggling.

### terminal

This folder contains the main logic for the terminal emulator.

- `terminal.js`: Handles terminal-related functionality, such as processing commands and animating text.
- `cursor.js`: Manages the terminal cursor, including its position and appearance.

### utils

This folder contains utility functions for various features.

- `fullscreen.js`: Handles toggling the fullscreen mode.
- `theme.js`: Manages theme switching.

### main.js

Contains the main application logic and ties together different modules.

### init.js

Handles the initialization of the application, including adding event listeners and initializing the terminal.

## How to Use

1. Clone the repository to your local machine.
2. Open `index.html` in your browser.
3. Start typing commands in the terminal.

## Available Commands

- `help`: Displays a list of available commands.
- `date`: Displays the current date and time.
- `clear`: Clears the terminal output.



