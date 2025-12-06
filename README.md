# Retro-Terminal

A simple terminal emulator built with JavaScript.


![Main screen](./assets/terminal.gif)

## Demo
https://ogulkokan.github.io/retro-terminal/

## How to Use

1. Clone the repository to your local machine.
2. Open `index.html` in your browser.
3. Start typing commands in the terminal.

## Available Commands

- `help`: Displays a list of available commands.
- `date`: Displays the current date and time.
- `clear`: Clears the terminal output.
- `theme green`: Changes the terminal theme to green.
- `theme orange`: Changes the terminal theme to orange.
- `contact`: Displays contact information of the developer.
- `about`: Displays information of the developer.
- `skills`:  Displays a list of skills and technologies related to the developer.
- `education`: Displays information about the developer's education background. project

## Features
* **Autocomplete:** Suggests possible commands as users start typing, similar to real terminals.
* **Command history:** Users can navigate through their previously entered commands using the arrow keys.
* **Customizable appearance:** Allows users to customize the terminal's appearance, such as changing the font size, font family, background color, and text color.
* **Settings persistence:** Your preferences are saved automatically to browser localStorage.
* **Typing sound effects:** Optional keyboard typing sounds for enhanced immersion.
* **Configuration file support:** Easy customization via config.json for GitHub template usage.
* **Mobile-friendly:** Fully responsive design that works well on mobile devices.

## Settings

Click the **⚙ Settings** button in the top-right to customize:
- **Color Theme:** Green or Orange
- **Font Family:** Courier New, Consolas, Roboto Mono, Fira Code
- **Font Size:** 10-25px
- **Typing Sounds:** Enable/disable keyboard sound effects

All settings are automatically saved to your browser and persist across sessions.

## Customization

### For GitHub Template Users

1. Fork this repository
2. Edit `config.json` to customize your content:
   - Update personal information (name, email, LinkedIn, GitHub)
   - Modify terminal content (about, education, skills)
   - Customize banner ASCII art
3. Commit and push changes
4. Enable GitHub Pages in repository settings
5. Visit your personalized terminal at `https://yourusername.github.io/retro-terminal/`

### Configuration File

All personal content is configured in `config.json`. The file includes:
- **personal:** Contact information (name, email, social links)
- **terminal:** Terminal settings (title, prompt, default theme)
- **content:** All command responses (banner, about, education, skills, help)
- **settings:** Default settings (sound, fonts, themes)

Edit this file to make the terminal your own!

### References
* Idea: https://github.com/andersevenrud/retro-css-shell-demo
* Grain effect: https://css-tricks.com/snippets/css/animated-grainy-texture/
* Scanline effect: https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh
