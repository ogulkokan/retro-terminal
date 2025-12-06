import { saveSettings, loadSettings, clearSettings } from './storage.js';

let currentSettings = {
  theme: 'Orange',
  fontSize: 16,
  fontFamily: 'Courier New',
  soundEnabled: true,
  volume: 0.3,
  crtEffects: {
    chromatic: true,
    vignette: true
  }
};

export function initSettings() {
  // Load saved settings
  const savedSettings = loadSettings();
  if (savedSettings) {
    currentSettings = { ...currentSettings, ...savedSettings };
    applyLoadedSettings(currentSettings);
  }

  // Create settings button with retro style
  const settingsButton = document.createElement('button');
  settingsButton.textContent = '⚙ Settings';
  settingsButton.className = 'settings-button';
  document.body.appendChild(settingsButton);

  settingsButton.addEventListener('click', openSettingsPanel);
}

function applyLoadedSettings(settings) {
  applyTheme(settings.theme);

  const terminal = document.querySelector('.terminal');
  if (terminal) {
    terminal.style.fontSize = settings.fontSize + 'px';
    terminal.style.fontFamily = settings.fontFamily;
  }

  // Apply CRT effects
  if (settings.crtEffects) {
    applyCRTEffects();
  }

  // Audio settings will be applied by audioManager when it initializes
}

function openSettingsPanel() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'settings-overlay';

  // Create panel container
  const panel = document.createElement('div');
  panel.className = 'settings-panel';

  // Add scanline effect
  const scanline = document.createElement('div');
  scanline.className = 'scanline-effect';
  panel.appendChild(scanline);

  // Create content area
  const content = document.createElement('div');
  content.className = 'settings-content';

  // Add all option groups
  addThemeOption(content);
  addFontSizeOption(content);
  addFontFamilyOption(content);
  addSoundOption(content);

  // Add CRT Effects section
  addCRTEffectsSection(content);

  // Add button row
  const buttonRow = document.createElement('div');
  buttonRow.className = 'settings-buttons';

  const saveButton = createButton('Save & Close', 'primary', () => {
    saveSettings(currentSettings);
    closePanel();
  });

  const resetButton = createButton('Reset', 'secondary', () => {
    if (confirm('Reset all settings to defaults?')) {
      clearSettings();
      currentSettings = {
        theme: 'Orange',
        fontSize: 16,
        fontFamily: 'Courier New',
        soundEnabled: true,
        volume: 0.3,
        crtEffects: {
          chromatic: true,
          vignette: true
        }
      };
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

  // Close on overlay click
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closePanel();
    }
  });

  // Close on ESC key
  const escHandler = (event) => {
    if (event.key === 'Escape') {
      closePanel();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  function closePanel() {
    overlay.remove();
  }
}

function createButton(text, type, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `settings-button-action ${type}`;
  button.addEventListener('click', onClick);
  return button;
}

function createOptionGroup(container, labelText) {
  const optionGroup = document.createElement('div');
  optionGroup.className = 'settings-option';

  const label = document.createElement('label');
  label.textContent = labelText;

  optionGroup.appendChild(label);
  container.appendChild(optionGroup);

  return optionGroup;
}

function addFontSizeOption(container) {
  const optionGroup = createOptionGroup(container, 'Font Size:');

  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentSettings.fontSize;
  input.min = 10;
  input.max = 25;
  input.step = 0.5;

  input.addEventListener('input', (event) => {
    const newSize = parseFloat(event.target.value);
    const terminal = document.querySelector('.terminal');
    if (terminal) {
      terminal.style.fontSize = newSize + 'px';
    }
    currentSettings.fontSize = newSize;
  });

  optionGroup.appendChild(input);
}

function addFontFamilyOption(container) {
  const optionGroup = createOptionGroup(container, 'Font Family:');

  const select = document.createElement('select');
  const fontFamilies = ['Courier New', 'Consolas', 'Roboto Mono', 'Fira Code'];

  fontFamilies.forEach((fontFamily) => {
    const option = document.createElement('option');
    option.textContent = fontFamily;
    option.value = fontFamily;
    if (fontFamily === currentSettings.fontFamily) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    const newFont = event.target.value;
    const terminal = document.querySelector('.terminal');
    if (terminal) {
      terminal.style.fontFamily = newFont;
    }
    currentSettings.fontFamily = newFont;
  });

  optionGroup.appendChild(select);
}

function addThemeOption(container) {
  const optionGroup = createOptionGroup(container, 'Color Theme:');

  const select = document.createElement('select');
  const themes = ['Green', 'Orange'];

  themes.forEach((theme) => {
    const option = document.createElement('option');
    option.textContent = theme;
    option.value = theme;
    if (theme === currentSettings.theme) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    const newTheme = event.target.value;
    applyTheme(newTheme);
    currentSettings.theme = newTheme;
  });

  optionGroup.appendChild(select);
}

function addSoundOption(container) {
  const optionGroup = createOptionGroup(container, 'Typing Sounds:');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = currentSettings.soundEnabled;

  checkbox.addEventListener('change', (event) => {
    currentSettings.soundEnabled = event.target.checked;
    // Update audio manager if it exists
    if (window.audioManager && window.audioManager.setSoundEnabled) {
      window.audioManager.setSoundEnabled(event.target.checked);
    }
  });

  optionGroup.appendChild(checkbox);
}

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

function applyCRTEffects() {
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;

  // Toggle CSS classes based on settings
  terminal.classList.toggle('crt-chromatic', currentSettings.crtEffects.chromatic);
  terminal.classList.toggle('crt-vignette', currentSettings.crtEffects.vignette);
}

export function applyTheme(theme) {
  const terminal = document.querySelector('.terminal');
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  const inputPrefix = document.querySelector('#input-prefix');

  if (!terminal) return;

  if (theme === 'Green') {
    terminal.style.background = '#05321e';
    terminal.style.backgroundImage = 'radial-gradient(ellipse, #05321e 0%, #050505 90%)';
    if (terminalInput) terminalInput.style.color = 'rgb(62, 209, 46)';
    if (terminalOutput) terminalOutput.style.color = 'rgb(62, 209, 46)';
    if (inputPrefix) inputPrefix.style.color = 'rgb(62, 209, 46)';
    document.documentElement.style.setProperty('--cursor-color', 'rgb(62, 209, 46)');
  } else if (theme === 'Orange') {
    terminal.style.background = 'hsla(30, 57%, 14%, 1)';
    terminal.style.backgroundImage = 'radial-gradient(circle, hsla(30, 57%, 14%, 1) 0%, hsla(30, 67%, 5%, 1) 100%)';
    if (terminalInput) terminalInput.style.color = '#FFA128';
    if (terminalOutput) terminalOutput.style.color = '#FFA128';
    if (inputPrefix) inputPrefix.style.color = '#FFA128';
    document.documentElement.style.setProperty('--cursor-color', '#FFA128');
  }
}
