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
- `about`: Displays information of the developer.
- `skills`: Displays a list of skills and technologies related to the developer.
- `education`: Displays information about the developer's education background.
- `projects`: Displays a list of your portfolio projects.
- `contact`: Displays contact information of the developer.
- `theme green`: Changes the terminal theme to green.
- `theme orange`: Changes the terminal theme to orange.

## Features
* **Autocomplete:** Suggests possible commands as users start typing, similar to real terminals.
* **Command history:** Users can navigate through their previously entered commands using the arrow keys.
* **Customizable appearance:** Allows users to customize the terminal's appearance, such as changing the font size, font family, background color, and text color.
* **Settings persistence:** Your preferences are saved automatically to browser localStorage.
* **Typing sound effects:** Optional keyboard typing sounds for enhanced immersion.
* **Configuration file support:** Easy customization via config.json for GitHub template usage.
* **Fully mobile responsive:** Automatically adapts to any screen size from mobile phones to 4K displays.
* **Smart mobile banner:** Shows simplified banner on mobile devices for better readability.

## Settings

Click the **⚙ Settings** button in the top-right to customize:
- **Color Theme:** Green or Orange
- **Font Family:** Courier New, Consolas, Roboto Mono, Fira Code
- **Font Size:** 10-25px
- **Typing Sounds:** Enable/disable keyboard sound effects

All settings are automatically saved to your browser and persist across sessions.

## Customization

### For Forkers & Template Users

This project is designed to be easily customizable! Follow these steps to make it your own:

1. **Fork this repository** on GitHub
2. **Edit `config.json`** - this is the only file you need to change!
3. **Commit and push** your changes
4. **Enable GitHub Pages** in repository settings (Settings → Pages → Source: main branch)
5. **Visit your terminal** at `https://yourusername.github.io/retro-terminal/`

### Configuration Guide

All personal content is configured in `config.json`. The file uses arrays for multiline content to keep it readable and easy to edit.

#### Structure:

```json
{
  "personal": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "linkedin": "https://www.linkedin.com/in/yourprofile/",
    "github": "https://github.com/yourusername"
  },
  "content": {
    "banner": ["Line 1", "Line 2", "..."],
    "mobileBanner": ["Mobile-friendly", "shorter banner", "..."],
    "about": ["Your bio", "..."],
    "education": ["Your degrees", "..."],
    "skills": ["Your skills", "..."]
  }
}
```

**Note:** The `mobileBanner` field is optional. If not provided, a simple text banner is auto-generated for mobile devices.

#### Quick Tips:

- **Arrays = Multiple lines:** Each item in an array becomes a line in the terminal
- **Template variables:** Use `{email}`, `{linkedin}`, `{github}`, `{name}` in content - they'll be auto-replaced
- **Banner ASCII art:** Use a tool like [patorjk.com](http://patorjk.com/software/taag/) to generate ASCII art
- **Open `config.json`** to see the complete structure with all available options

#### What You Can Customize:

- ✏️ **Personal Info:** Name, email, social links
- 🎨 **Banner:** Welcome message and ASCII art
- 📝 **Content:** About, education, skills, contact info
- ⚙️ **Settings:** Default theme, fonts, sound settings
- 🎯 **Terminal:** Title, prompt style

No JavaScript knowledge required - just edit JSON and you're done!

### References
* Idea: https://github.com/andersevenrud/retro-css-shell-demo
* Grain effect: https://css-tricks.com/snippets/css/animated-grainy-texture/
* Scanline effect: https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh
