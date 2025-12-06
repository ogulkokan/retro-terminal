import { getConfig } from './configLoader.js';

// Getter functions that read from config
export function getEmail() {
  const config = getConfig();
  return config?.personal?.email || "onurgulkokan@gmail.com";
}

export function getLinkedInURL() {
  const config = getConfig();
  return config?.personal?.linkedin || "https://www.linkedin.com/in/onurgulkokan/";
}

export function getGitHubURL() {
  const config = getConfig();
  return config?.personal?.github || "https://github.com/ogulkokan";
}

export function getBanner() {
  const config = getConfig();
  return config?.content?.banner || defaultBanner;
}

export function getAbout() {
  const config = getConfig();
  return config?.content?.about || defaultAbout;
}

export function getEducation() {
  const config = getConfig();
  return config?.content?.education || defaultEducation;
}

export function getSkills() {
  const config = getConfig();
  return config?.content?.skills || defaultSkills;
}

export function getHelp() {
  const config = getConfig();
  return config?.content?.help || defaultHelp;
}

export function getTest() {
  const config = getConfig();
  return config?.content?.test || defaultTest;
}

// Backward compatibility - direct exports
export const email = "onurgulkokan@gmail.com";
export const linkedinURL = "https://www.linkedin.com/in/onurgulkokan/";
export const githubURL = "https://github.com/ogulkokan";

// Default values
const defaultBanner = `
    Initializing RetroShell 2000 v0.1
    Copyright (c) 2023 Onur Gulkokan <onurgulkokan@gmail.com>
    .............................................................................

    ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
    ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
    ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
    ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
    ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
     ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
                                                                  
    .............................................................................

    Type 'help' for a list of available commands.
`;

// Expose defaults as named exports for backward compatibility
export const banner = defaultBanner;

const defaultAbout = `

    * About Me:
        Hello, I'm Onur Gülkokan! After several years of studying and working in 
        a variety of fields, decided to pursue my career in the data science and software 
        development area. I successfully finished the medical systems engineering master's 
        program and specialized in medical computer science. 
        
        I am a versatile person and always eager to learn new skills regardless 
        of a specific area.
    .......................................................................................
`;

export const about = defaultAbout;

const defaultEducation = `
    - Master's degree: Medical Systems Engineering
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
    .......................................................................................
`;

export const education = defaultEducation;

const defaultContact = `
    * Contact Information:
        - Email: ${email}
        - LinkedIn: ${linkedinURL}
        - GitHub: ${githubURL}

    * Available Commands for contact information:
        - contact email: Compose a new email to my address using your default email client.
        - contact linkedin: Open my LinkedIn profile in a new window.
        - contact github: Open my GitHub profile in a new window.
    .......................................................................................
`;

export const contact = defaultContact;

const defaultSkills = `
    * Technical Skills:
        - Python, JavaScript,
        - Vue.js, Quasar Framework
    .......................................................................................
`;

export const skills = defaultSkills;

const defaultHelp = `
    * Available Commands:
      - help: Display a list of available commands.
      - date: Show the current date and time.
      - clear: Clear the terminal output.
      - theme green: Change the terminal theme to green.
      - theme orange: Change the terminal theme to orange.
      - contact: Show my contact information.
      - about: Learn more about me.
      - skills: Explore my skills and technologies.
      - education: Discover my educational background.
    .......................................................................................
`;

export const help = defaultHelp;

const defaultTest = `
-------------------------------------------
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

-------------------------------------------
`;

export const test = defaultTest;