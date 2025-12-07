let config = null;

/**
 * Processes the loaded config:
 * - Converts array content to strings (joined with newlines)
 * - Substitutes template variables like {email}, {linkedin}, {github}
 */
function processConfig(rawConfig) {
  const processed = JSON.parse(JSON.stringify(rawConfig)); // Deep clone

  // Process content arrays - convert to strings
  if (processed.content) {
    Object.keys(processed.content).forEach(key => {
      if (Array.isArray(processed.content[key])) {
        processed.content[key] = processed.content[key].join('\n');
      }
    });

    // Substitute template variables in content
    if (processed.personal) {
      Object.keys(processed.content).forEach(key => {
        if (typeof processed.content[key] === 'string') {
          processed.content[key] = processed.content[key]
            .replace(/\{email\}/g, processed.personal.email || '')
            .replace(/\{linkedin\}/g, processed.personal.linkedin || '')
            .replace(/\{github\}/g, processed.personal.github || '')
            .replace(/\{name\}/g, processed.personal.name || '');
        }
      });
    }
  }

  return processed;
}

export async function loadConfig() {
  try {
    const response = await fetch('./config.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawConfig = await response.json();
    config = processConfig(rawConfig);
    console.log('✓ Configuration loaded successfully from config.json');
    return config;
  } catch (error) {
    console.error('✗ Error loading config.json:', error);
    console.error('Please ensure config.json exists in the root directory.');
    throw error;
  }
}

export function getConfig() {
  if (!config) {
    console.warn('Config not loaded yet. Call loadConfig() first.');
  }
  return config;
}
