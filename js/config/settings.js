/**
 * Settings Management Module
 * Handles user preferences, persistence, and settings UI
 */

import { saveSettings, loadSettings, clearSettings } from './storage.js';
import { getConfig } from './configLoader.js';
import { getTerminal } from '../utils/domCache.js';
import { FONT, THEMES, DEFAULT_THEME, AUDIO } from './constants.js';

const baseDefaults = {
  theme: DEFAULT_THEME,
  fontSize: FONT.SIZE_DEFAULT,
  fontFamily: FONT.FAMILIES[0],
  soundEnabled: true,
  volume: AUDIO.DEFAULT_VOLUME,
  crtEffects: {
    chromatic: true,
    vignette: true
  }
};

/**
 * Normalize theme name to proper case
 * @param {string} theme - Theme name to normalize
 * @returns {string} Normalized theme name
 */
function normalizeTheme(theme) {
  if (!theme) return baseDefaults.theme;
  const lower = theme.toString().toLowerCase();
  if (lower === 'green') return 'Green';
  if (lower === 'orange') return 'Orange';
  return baseDefaults.theme;
}

/**
 * Get default settings from config or fallback to base defaults
 * @returns {Object} Default settings object
 */
function getDefaultSettings() {
  const config = getConfig();
  const configSettings = config?.settings || {};

  return {
    theme: normalizeTheme(config?.terminal?.defaultTheme),
    fontSize: configSettings.defaultFontSize ?? baseDefaults.fontSize,
    fontFamily: configSettings.defaultFontFamily ?? baseDefaults.fontFamily,
    soundEnabled: configSettings.enableSound ?? baseDefaults.soundEnabled,
    volume: configSettings.soundVolume ?? baseDefaults.volume,
    crtEffects: { ...baseDefaults.crtEffects }
  };
}

let currentSettings = { ...baseDefaults };

/**
 * Initialize settings system
 * Loads saved settings and creates settings button
 */
export function initSettings() {
  currentSettings = { ...baseDefaults, ...getDefaultSettings() };

  const result = loadSettings();
  if (result.success && result.data) {
    currentSettings = { ...currentSettings, ...result.data };
  }

  applyLoadedSettings(currentSettings);

  const settingsButton = document.createElement('button');
  settingsButton.textContent = '⚙ Settings';
  settingsButton.className = 'settings-button';
  document.body.appendChild(settingsButton);

  settingsButton.addEventListener('click', openSettingsPanel);
}

/**
 * Apply settings to the terminal UI
 * @param {Object} settings - Settings object to apply
 */
function applyLoadedSettings(settings) {
  const normalizedTheme = normalizeTheme(settings.theme);
  currentSettings.theme = normalizedTheme;
  applyTheme(normalizedTheme);

  const terminal = getTerminal();
  if (terminal) {
    terminal.style.fontSize = settings.fontSize + 'px';
    terminal.style.fontFamily = settings.fontFamily;
  }

  if (settings.crtEffects) {
    applyCRTEffects();
  }

  if (window.audioManager) {
    if (window.audioManager.setSoundEnabled) {
      window.audioManager.setSoundEnabled(!!settings.soundEnabled);
    }
    if (window.audioManager.setVolume && typeof settings.volume === 'number') {
      window.audioManager.setVolume(settings.volume);
    }
  }
}

/**
 * Open the settings panel modal
 */
function openSettingsPanel() {
  const overlay = document.createElement('div');
  overlay.className = 'settings-overlay';

  const panel = document.createElement('div');
  panel.className = 'settings-panel';

  const scanline = document.createElement('div');
  scanline.className = 'scanline-effect';
  panel.appendChild(scanline);

  const content = document.createElement('div');
  content.className = 'settings-content';

  // Add all settings controls
  addSelectControl(content, {
    label: 'Color Theme:',
    settingKey: 'theme',
    options: THEMES,
    onChange: (value) => applyTheme(value)
  });

  addNumberControl(content, {
    label: 'Font Size:',
    settingKey: 'fontSize',
    min: FONT.SIZE_MIN,
    max: FONT.SIZE_MAX,
    step: FONT.SIZE_STEP,
    onChange: (value) => {
      const terminal = getTerminal();
      if (terminal) terminal.style.fontSize = value + 'px';
    }
  });

  addSelectControl(content, {
    label: 'Font Family:',
    settingKey: 'fontFamily',
    options: FONT.FAMILIES,
    onChange: (value) => {
      const terminal = getTerminal();
      if (terminal) terminal.style.fontFamily = value;
    }
  });

  addCheckboxControl(content, {
    label: 'Typing Sounds:',
    settingKey: 'soundEnabled',
    onChange: (value) => {
      if (window.audioManager?.setSoundEnabled) {
        window.audioManager.setSoundEnabled(value);
      }
    }
  });

  addCRTEffectsSection(content);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'settings-buttons';

  const saveButton = createButton('Save & Close', 'primary', () => {
    saveSettings(currentSettings);
    closePanel();
  });

  const resetButton = createButton('Reset', 'secondary', () => {
    if (confirm('Reset all settings to defaults?')) {
      clearSettings();
      currentSettings = { ...baseDefaults, ...getDefaultSettings() };
      applyLoadedSettings(currentSettings);
      closePanel();
    }
  });

  const cancelButton = createButton('Cancel', 'secondary', closePanel);

  buttonRow.appendChild(saveButton);
  buttonRow.appendChild(resetButton);
  buttonRow.appendChild(cancelButton);

  content.appendChild(buttonRow);
  panel.appendChild(content);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closePanel();
    }
  });

  const escHandler = (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  };
  document.addEventListener('keydown', escHandler);

  function closePanel() {
    overlay.remove();
    document.removeEventListener('keydown', escHandler);
  }
}

/**
 * Create a button element
 * @param {string} text - Button text
 * @param {string} type - Button type ('primary' or 'secondary')
 * @param {Function} onClick - Click handler
 * @returns {HTMLButtonElement} Button element
 */
function createButton(text, type, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `settings-button-action ${type}`;
  button.addEventListener('click', onClick);
  return button;
}

/**
 * Create an option group container
 * @param {HTMLElement} container - Parent container
 * @param {string} labelText - Label text
 * @returns {HTMLElement} Option group element
 */
function createOptionGroup(container, labelText) {
  const optionGroup = document.createElement('div');
  optionGroup.className = 'settings-option';

  const label = document.createElement('label');
  label.textContent = labelText;

  optionGroup.appendChild(label);
  container.appendChild(optionGroup);

  return optionGroup;
}

/**
 * Add a number input control
 * @param {HTMLElement} container - Parent container
 * @param {Object} config - Control configuration
 */
function addNumberControl(container, config) {
  const { label, settingKey, min, max, step, onChange } = config;
  const optionGroup = createOptionGroup(container, label);

  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentSettings[settingKey];
  input.min = min;
  input.max = max;
  input.step = step;

  input.addEventListener('input', (event) => {
    const value = parseFloat(event.target.value);

    // Validate input
    if (isNaN(value) || value < min || value > max) return;

    currentSettings[settingKey] = value;
    if (onChange) onChange(value);
  });

  optionGroup.appendChild(input);
}

/**
 * Add a select dropdown control
 * @param {HTMLElement} container - Parent container
 * @param {Object} config - Control configuration
 */
function addSelectControl(container, config) {
  const { label, settingKey, options, onChange } = config;
  const optionGroup = createOptionGroup(container, label);

  const select = document.createElement('select');

  options.forEach((option) => {
    const optionEl = document.createElement('option');
    optionEl.textContent = option;
    optionEl.value = option;
    if (option === currentSettings[settingKey]) {
      optionEl.selected = true;
    }
    select.appendChild(optionEl);
  });

  select.addEventListener('change', (event) => {
    const value = event.target.value;
    currentSettings[settingKey] = value;
    if (onChange) onChange(value);
  });

  optionGroup.appendChild(select);
}

/**
 * Add a checkbox control
 * @param {HTMLElement} container - Parent container
 * @param {Object} config - Control configuration
 */
function addCheckboxControl(container, config) {
  const { label, settingKey, onChange } = config;
  const optionGroup = createOptionGroup(container, label);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = currentSettings[settingKey];

  checkbox.addEventListener('change', (event) => {
    const value = event.target.checked;
    currentSettings[settingKey] = value;
    if (onChange) onChange(value);
  });

  optionGroup.appendChild(checkbox);
}

/**
 * Add CRT effects section with multiple checkboxes
 * @param {HTMLElement} container - Parent container
 */
function addCRTEffectsSection(container) {
  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'settings-section-title';
  sectionTitle.textContent = '── CRT EFFECTS ──';
  container.appendChild(sectionTitle);

  const effects = [
    { key: 'chromatic', label: 'Chromatic Aberration' },
    { key: 'vignette', label: 'Vignette Effect' }
  ];

  effects.forEach(effect => {
    const optionGroup = createOptionGroup(container, effect.label + ':');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = currentSettings.crtEffects[effect.key];

    checkbox.addEventListener('change', (event) => {
      currentSettings.crtEffects[effect.key] = event.target.checked;
      applyCRTEffects();
    });

    optionGroup.appendChild(checkbox);
  });
}

/**
 * Apply CRT effect CSS classes to terminal
 */
function applyCRTEffects() {
  const terminal = getTerminal();
  if (!terminal) return;

  terminal.classList.toggle('crt-chromatic', currentSettings.crtEffects.chromatic);
  terminal.classList.toggle('crt-vignette', currentSettings.crtEffects.vignette);
}

/**
 * Apply a color theme to the terminal
 * @param {string} theme - Theme name ('Green' or 'Orange')
 */
export function applyTheme(theme) {
  const normalized = normalizeTheme(theme);
  const terminal = getTerminal();
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  const inputPrefix = document.querySelector('#input-prefix');

  if (!terminal) return;

  if (normalized === 'Green') {
    terminal.style.background = '#05321e';
    terminal.style.backgroundImage = 'radial-gradient(ellipse, #05321e 0%, #050505 90%)';
    if (terminalInput) terminalInput.style.color = 'rgb(62, 209, 46)';
    if (terminalOutput) terminalOutput.style.color = 'rgb(62, 209, 46)';
    if (inputPrefix) inputPrefix.style.color = 'rgb(62, 209, 46)';
    document.documentElement.style.setProperty('--cursor-color', 'rgb(62, 209, 46)');
  } else if (normalized === 'Orange') {
    terminal.style.background = 'hsla(30, 57%, 14%, 1)';
    terminal.style.backgroundImage = 'radial-gradient(circle, hsla(30, 57%, 14%, 1) 0%, hsla(30, 67%, 5%, 1) 100%)';
    if (terminalInput) terminalInput.style.color = '#FFA128';
    if (terminalOutput) terminalOutput.style.color = '#FFA128';
    if (inputPrefix) inputPrefix.style.color = '#FFA128';
    document.documentElement.style.setProperty('--cursor-color', '#FFA128');
  }
}
