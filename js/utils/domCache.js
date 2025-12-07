/**
 * DOM Cache Utility
 * Caches frequently accessed DOM elements to improve performance
 * and reduce repeated querySelector/getElementById calls
 */

import { DOM_IDS } from '../config/constants.js';

let cache = {};

/**
 * Initialize the DOM cache with frequently accessed elements
 * Call this after DOM is ready
 * @returns {Object} The cached DOM elements
 */
export function initDOMCache() {
  cache = {
    terminalInput: document.getElementById(DOM_IDS.TERMINAL_INPUT),
    terminalOutput: document.getElementById(DOM_IDS.TERMINAL_OUTPUT),
    inputPrefix: document.getElementById(DOM_IDS.INPUT_PREFIX),
    terminal: document.querySelector('.terminal')
  };
  return cache;
}

/**
 * Get a cached DOM element by key
 * @param {string} key - The cache key
 * @returns {HTMLElement|null} The cached element or null
 */
export function getDOM(key) {
  return cache[key] || null;
}

/**
 * Get the terminal input element
 * @returns {HTMLElement|null}
 */
export function getTerminalInput() {
  return cache.terminalInput || document.getElementById(DOM_IDS.TERMINAL_INPUT);
}

/**
 * Get the terminal output element
 * @returns {HTMLElement|null}
 */
export function getTerminalOutput() {
  return cache.terminalOutput || document.getElementById(DOM_IDS.TERMINAL_OUTPUT);
}

/**
 * Get the input prefix element
 * @returns {HTMLElement|null}
 */
export function getInputPrefix() {
  return cache.inputPrefix || document.getElementById(DOM_IDS.INPUT_PREFIX);
}

/**
 * Get the terminal container element
 * @returns {HTMLElement|null}
 */
export function getTerminal() {
  return cache.terminal || document.querySelector('.terminal');
}

/**
 * Clear the DOM cache (useful for testing or dynamic DOM changes)
 */
export function clearCache() {
  cache = {};
}
