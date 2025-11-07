// Utility to parse front matter from markdown files
// Supports YAML front matter in the format:
// ---
// key: value
// tags: [tag1, tag2]
// ---
// content here

function parseFrontMatter(markdown) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {}, content: markdown };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const metadata = {};

  // Simple YAML parser for basic key-value pairs
  yamlBlock.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(item => item);
      metadata[key] = value;
    }
    // Parse numbers
    else if (/^-?\d+(\.\d+)?$/.test(value)) {
      metadata[key] = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
    }
    // Parse booleans
    else if (value === 'true' || value === 'false') {
      metadata[key] = value === 'true';
    }
    // Regular string
    else {
      metadata[key] = value;
    }
  });

  return { metadata, content };
}

// Generate ID from filename
function generateId(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

