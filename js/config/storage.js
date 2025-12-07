/**
 * LocalStorage Persistence Module
 * Handles saving and loading user settings with consistent error handling
 */

import { STORAGE_KEY } from './constants.js';

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object to save
 * @returns {{success: boolean, error?: string}} Result object
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return { success: true };
  } catch (error) {
    console.error('Failed to save settings:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Load settings from localStorage
 * @returns {{success: boolean, data?: Object, error?: string}} Result object with settings data
 */
export function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : null;
    return { success: true, data };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Clear all settings from localStorage
 * @returns {{success: boolean, error?: string}} Result object
 */
export function clearSettings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Failed to clear settings:', error);
    return { success: false, error: error.message };
  }
}
