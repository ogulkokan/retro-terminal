export function initSettings() {
  const settingsButton = document.createElement('button');
  settingsButton.textContent = 'Settings';
  settingsButton.style.position = 'fixed';
  settingsButton.style.top = '10px';
  settingsButton.style.right = '10px';
  document.body.appendChild(settingsButton);

  settingsButton.addEventListener('click', () => {
    // Open the settings panel
    openSettingsPanel();
  });
}
  
function openSettingsPanel() {
  // Create a settings panel
  const settingsPanel = document.createElement('div');
  settingsPanel.style.position = 'fixed';
  settingsPanel.style.top = '0';
  settingsPanel.style.left = '0';
  settingsPanel.style.width = '100%';
  settingsPanel.style.height = '100%';
  settingsPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  settingsPanel.style.display = 'flex';
  settingsPanel.style.justifyContent = 'center';
  settingsPanel.style.alignItems = 'center';

  // Close the settings panel when clicked outside
  settingsPanel.addEventListener('click', (event) => {
    if (event.target === settingsPanel) {
      settingsPanel.remove();
    }
  });
  
  // Create a settings container
  const settingsContainer = document.createElement('div');
  settingsContainer.style.backgroundColor = 'white';
  settingsContainer.style.padding = '30px';
  settingsContainer.style.borderRadius = '10px';
  settingsContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  settingsContainer.style.width = '400px';
  settingsContainer.style.display = 'flex';
  settingsContainer.style.flexDirection = 'column';
  settingsContainer.style.gap = '20px';
  settingsPanel.appendChild(settingsContainer);

  // Add settings options
  addFontSizeOption(settingsContainer);
  addFontFamilyOption(settingsContainer);
  addThemeOption(settingsContainer);

  // Add the settings panel to the body
  document.body.appendChild(settingsPanel);
}

function createOptionGroup(container, labelText) {
  const optionGroup = document.createElement('div');
  optionGroup.style.display = 'flex';
  optionGroup.style.alignItems = 'center';
  optionGroup.style.justifyContent = 'space-between';
  optionGroup.style.marginBottom = '10px';

  const label = document.createElement('label');
  label.textContent = labelText;
  label.style.fontWeight = 'bold';

  optionGroup.appendChild(label);
  container.appendChild(optionGroup);

  return optionGroup;
}
  
function addFontSizeOption(container) {
  const optionGroup = createOptionGroup(container, 'Font Size: ');

  const input = document.createElement('input');
  input.type = 'number';
  input.value = parseInt(getComputedStyle(document.querySelector('.terminal')).fontSize);
  input.min = 10;
  input.max = 25;
  input.style.width = '60px';
  input.addEventListener('input', (event) => {
    document.querySelector('.terminal').style.fontSize = event.target.value + 'px';
  });

  optionGroup.appendChild(input);
}
  
function addFontFamilyOption(container) {
  const optionGroup = createOptionGroup(container, 'Font Family: ');

  const select = document.createElement('select');
  const fontFamilies = ['Courier New', 'Consolas', 'Roboto Mono', 'Fira Code'];
  fontFamilies.forEach((fontFamily) => {
    const option = document.createElement('option');
    option.textContent = fontFamily;
    option.value = fontFamily;
    select.appendChild(option);
  });

  // Get the current font family without quotes
  const currentFontFamily = getComputedStyle(document.querySelector('.terminal')).fontFamily.replace(/["']/g, "");
  
  // Find and set the correct option as selected
  select.querySelectorAll('option').forEach((option) => {
    if (option.value === currentFontFamily) {
      option.selected = true;
    }
  });

  select.addEventListener('change', (event) => {
    document.querySelector('.terminal').style.fontFamily = event.target.value;
  });

  optionGroup.appendChild(select);
  container.appendChild(document.createElement('br'));
}
  
    
  
function addThemeOption(container) {
  const optionGroup = createOptionGroup(container, 'Theme: ');

  const select = document.createElement('select');
  const themes = ['Green', 'Orange'];
  themes.forEach((theme) => {
    const option = document.createElement('option');
    option.textContent = theme;
    option.value = theme;
    select.appendChild(option);
  });

  // Set the default theme based on the current background color
  const currentBackgroundColor = getComputedStyle(document.querySelector('.terminal')).backgroundColor;
  select.value = currentBackgroundColor === 'rgba(5, 50, 30, 1)' ? 'Green' : 'Orange';

  select.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });

  optionGroup.appendChild(select);
}

export function applyTheme(theme) {
  const terminal = document.querySelector('.terminal');
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  const inputPrefix = document.querySelector('#input-prefix');

  if (theme === 'Green') {
    terminal.style.background = '#05321e';
    terminal.style.backgroundImage = 'radial-gradient(ellipse, #05321e 0%, #050505 90%)';
    terminalInput.style.color = 'rgb(62, 209, 46)';
    terminalOutput.style.color = 'rgb(62, 209, 46)';
    inputPrefix.style.color = 'rgb(62, 209, 46)';
    document.documentElement.style.setProperty('--cursor-color', 'rgb(62, 209, 46)');
  } else if (theme === 'Orange') {
    terminal.style.background = 'hsla(30, 57%, 14%, 1)';
    terminal.style.backgroundImage = 'radial-gradient(circle, hsla(30, 57%, 14%, 1) 0%, hsla(30, 67%, 5%, 1) 100%)';
    terminalInput.style.color = '#FFA128';
    terminalOutput.style.color = '#FFA128';
    inputPrefix.style.color = '#FFA128';
    document.documentElement.style.setProperty('--cursor-color', '#FFA128');
  }
}
