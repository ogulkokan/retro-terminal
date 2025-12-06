let config = null;

// Default fallback configuration
const DEFAULT_CONFIG = {
  personal: {
    name: "Onur Gülkokan",
    email: "onurgulkokan@gmail.com",
    linkedin: "https://www.linkedin.com/in/onurgulkokan/",
    github: "https://github.com/ogulkokan"
  },
  terminal: {
    title: "RETRO TERMINAL v0.01-alpha",
    prompt: "$ / > ",
    defaultTheme: "orange"
  },
  content: {
    banner: `    Initializing RetroShell 2000 v0.1
    Copyright (c) 2023 Onur Gulkokan <onurgulkokan@gmail.com>
    .............................................................................

    ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
    ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
    ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗
    ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝
    ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
     ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝

    .............................................................................

    Type 'help' for a list of available commands.`,
    about: `
    * About Me:
        Hello, I'm Onur Gülkokan! After several years of studying and working in
        a variety of fields, decided to pursue my career in the data science and software
        development area. I successfully finished the medical systems engineering master's
        program and specialized in medical computer science.

        I am a versatile person and always eager to learn new skills regardless
        of a specific area.
    .......................................................................................`,
    education: `    - Master's degree: Medical Systems Engineering
        University: Otto-von-Guericke-Universität - Magdeburg
        Specialization: Medical Computer Science
        2018 - 2020

    - Master's degree: Energy Department
        University: Muğla Sıtkı Koçman University - Muğla
        Specialization: Focused on Renewable Energies especially wind and solar hybrid systems
        2012 - 2017

    - Bachelor's degree: Physics
        University: Anadolu University - Eskişehir
        2007 - 2012

    - Bachelor's degree: Business Administration
        University: Anadolu University - Eskişehir
        Open Education
        2008 - 2013

    - Pedagogical Proficiency
        University: Anadolu University - Eskişehir
        2010 - 2012
    .......................................................................................`,
    skills: `    * Technical Skills:
        - Python, JavaScript,
        - Vue.js, Quasar Framework
    .......................................................................................`,
    help: `    * Available Commands:
      - help: Display a list of available commands.
      - date: Show the current date and time.
      - clear: Clear the terminal output.
      - theme green: Change the terminal theme to green.
      - theme orange: Change the terminal theme to orange.
      - contact: Show my contact information.
      - about: Learn more about me.
      - skills: Explore my skills and technologies.
      - education: Discover my educational background.
    .......................................................................................`,
    test: `-------------------------------------------
            .mmMMMMMMMMMmm.
         .mmMMMMMMMMMMMMMMMMMmm.
      .mmMMMMMMMMMMMMMMMMMMMMMMMMm.
    ......    .............    ......
   .......                     .......
  ........                     ........
 ........                       .......
 .......                         .......
 ........                       ........
  ........                     ........
   .........                ..........
    ....  ......         ............
     .....               ..........
        ........         ........
            ....         ....

-------------------------------------------`
  },
  settings: {
    enableSound: true,
    soundVolume: 0.3,
    defaultFontSize: 16,
    defaultFontFamily: "Courier New",
    availableFonts: ["Courier New", "Consolas", "Roboto Mono", "Fira Code"],
    themes: ["green", "orange"]
  }
};

export async function loadConfig() {
  try {
    const response = await fetch('./config.json');
    if (response.ok) {
      config = await response.json();
      console.log('Configuration loaded from config.json');
    } else {
      config = DEFAULT_CONFIG;
      console.warn('config.json not found, using defaults');
    }
  } catch (error) {
    config = DEFAULT_CONFIG;
    console.warn('Error loading config.json, using defaults:', error);
  }
  return config;
}

export function getConfig() {
  return config || DEFAULT_CONFIG;
}
