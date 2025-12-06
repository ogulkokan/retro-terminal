import { getConfig } from './configLoader.js';

// Personal Information Getters
export function getEmail() {
  const config = getConfig();
  return config?.personal?.email || '';
}

export function getLinkedInURL() {
  const config = getConfig();
  return config?.personal?.linkedin || '';
}

export function getGitHubURL() {
  const config = getConfig();
  return config?.personal?.github || '';
}

export function getName() {
  const config = getConfig();
  return config?.personal?.name || '';
}

// Content Getters
export function getBanner() {
  const config = getConfig();
  return config?.content?.banner || 'Welcome to Retro Terminal';
}

export function getAbout() {
  const config = getConfig();
  return config?.content?.about || 'About information not configured.';
}

export function getEducation() {
  const config = getConfig();
  return config?.content?.education || 'Education information not configured.';
}

export function getSkills() {
  const config = getConfig();
  return config?.content?.skills || 'Skills information not configured.';
}

export function getContact() {
  const config = getConfig();
  return config?.content?.contact || 'Contact information not configured.';
}

export function getHelp() {
  const config = getConfig();
  return config?.content?.help || 'Help information not configured.';
}

export function getTest() {
  const config = getConfig();
  return config?.content?.test || '';
}

// Backward compatibility exports for existing code
// These are deprecated - code should use getter functions instead
export const email = getEmail();
export const linkedinURL = getLinkedInURL();
export const githubURL = getGitHubURL();
export const banner = getBanner();
export const about = getAbout();
export const education = getEducation();
export const skills = getSkills();
export const contact = getContact();
export const help = getHelp();
export const test = getTest();
