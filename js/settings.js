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
    settingsContainer.style.padding = '20px';
    settingsContainer.style.borderRadius = '5px';
    settingsPanel.appendChild(settingsContainer);
  
    // Add settings options
    addFontSizeOption(settingsContainer);
    addFontFamilyOption(settingsContainer);
    addBackgroundColorOption(settingsContainer);
    addTextColorOption(settingsContainer);
  
    // Add the settings panel to the body
    document.body.appendChild(settingsPanel);
  }
  
  function addFontSizeOption(container) {
    const label = document.createElement('label');
    label.textContent = 'Font Size: ';
    container.appendChild(label);
  
    const input = document.createElement('input');
    input.type = 'number';
    input.value = getComputedStyle(document.querySelector('.terminal')).fontSize.slice(0, -2);
    input.min = 10;
    input.max = 30;
    input.addEventListener('input', (event) => {
      document.querySelector('.terminal').style.fontSize = event.target.value + 'px';
    });
  
    container.appendChild(input);
    container.appendChild(document.createElement('br'));
  }
  
  function addFontFamilyOption(container) {
    const label = document.createElement('label');
    label.textContent = 'Font Family: ';
    container.appendChild(label);
  
    const select = document.createElement('select');
    const fontFamilies = ['Courier New', 'Consolas', 'Roboto Mono', 'Fira Code'];
    fontFamilies.forEach((fontFamily) => {
      const option = document.createElement('option');
      option.textContent = fontFamily;
      option.value = fontFamily;
      select.appendChild(option);
    });
  
    select.value = getComputedStyle(document.querySelector('.terminal')).fontFamily;
    select.addEventListener('change', (event) => {
      document.querySelector('.terminal').style.fontFamily = event.target.value;
    });
  
    container.appendChild(select);
    container.appendChild(document.createElement('br'));
  }
  
  function addBackgroundColorOption(container) {
    const label = document.createElement('label');
    label.textContent = 'Background Color: ';
    container.appendChild(label);
  
    const input = document.createElement('input');
    input.type = 'color';
    input.value = rgbToHex(getComputedStyle(document.querySelector('.terminal')).backgroundColor);
    input.addEventListener('input', (event) => {
      document.querySelector('.terminal').style.backgroundColor = event.target.value;
    });
  
    container.appendChild(input);
    container.appendChild(document.createElement('br'));
  }
  
  function addTextColorOption(container) {
    const label = document.createElement('label');
    label.textContent = 'Text Color: ';
    container.appendChild(label);
  
    const input = document.createElement('input');
    input.type = 'color';
    input.value = rgbToHex(getComputedStyle(document.querySelector('.terminal')).color);
    input.addEventListener('input', (event) => {
      document.querySelector('.terminal').style.color = event.target.value;
    });
  
    container.appendChild(input);
    container.appendChild(document.createElement('br'));
  }
  
  function rgbToHex(rgb) {
    const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+(?:\.\d+)?)?\)$/;
    const matches = rgb.match(regex);
    if (!matches) return null;
  
    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);
  
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  