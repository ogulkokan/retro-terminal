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

export function getMobileBanner() {
  const config = getConfig();
  return config?.content?.mobileBanner || null;
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

export function getProjects() {
  const config = getConfig();
  return config?.content?.projects || 'No projects configured.';
}
