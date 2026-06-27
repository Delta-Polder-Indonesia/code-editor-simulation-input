// ============================================
// Application Constants
// Centralized configuration for the entire app
// ============================================

/**
 * Application metadata
 */
export const APP_CONFIG = {
  name: 'Auto Code Typer',
  version: '1.0.0',
  description: 'VS Code-style code typing animation tool',
  author: 'Your Name',
} as const;

/**
 * Editor default settings
 */
export const EDITOR_DEFAULTS = {
  fileName: 'script.tsx',
  typingSpeed: 50,
  typoFrequency: 5,
  showAutocomplete: true,
  sidebarOpen: true,
} as const;

/**
 * Typing animation configuration
 */
export const TYPING_CONFIG = {
  // Cursor blink interval in milliseconds
  cursorBlinkInterval: 530,
  
  // Pause check interval when typing is paused
  pauseCheckInterval: 100,
  
  // Delay ranges for natural typing feel
  delays: {
    punctuation: { min: 50, max: 170 },
    newline: { min: 100, max: 400 },
    thinking: { min: 300, max: 1000 },
    typoNotice: { min: 200, max: 600 },
    typoDelete: { min: 40, max: 80 },
    typoRecover: { min: 50, max: 150 },
    baseVariation: { min: -20, max: 20 },
  },
  
  // Probability settings
  probabilities: {
    thinkingPause: 0.015,
    showAutocomplete: 0.6,
    multipleTypos: 0.3,
    tripleTypo: 0.5,
  },
  
  // Autocomplete settings
  autocomplete: {
    minWordLength: 2,
    showInterval: 3,
    maxSuggestions: 8,
  },
} as const;

/**
 * Audio default settings
 */
export const AUDIO_DEFAULTS = {
  volume: 50,
  loop: true,
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  // Editor dimensions (in pixels)
  lineHeight: 24,
  charWidth: 8.4,           // Approximate width of monospace character
  lineNumbersWidth: 56,     // Width of line numbers gutter
  paddingLeft: 16,          // Left padding of code content
  
  // Sidebar width
  sidebarWidth: 288,
  
  // Minimap
  minimapMaxChars: 5000,
  
  // Scroll settings
  scroll: {
    horizontalMargin: 100,  // Keep cursor this far from right edge
    leftMargin: 60,         // Margin from left edge
    verticalPadding: 20,    // Padding below cursor
    smoothBehavior: true,   // Use smooth scrolling
  },
  
  // Autocomplete popup
  autocompletePopup: {
    maxWidth: 400,
    minWidth: 320,
    maxHeight: 220,
    itemHeight: 24,
    detailPanelHeight: 50,
  },
} as const;

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  startTyping: { key: 'Enter', ctrl: true, description: 'Start typing' },
  pauseTyping: { key: 'p', ctrl: true, description: 'Pause/Resume' },
  stopTyping: { key: 'Escape', description: 'Stop typing' },
  toggleSidebar: { key: 'b', ctrl: true, description: 'Toggle sidebar' },
  toggleAutocomplete: { key: 'Space', ctrl: true, description: 'Toggle IntelliSense' },
} as const;

/**
 * Supported file extensions and their language names
 */
export const FILE_EXTENSIONS: Record<string, string> = {
  '.tsx': 'TypeScript React',
  '.ts': 'TypeScript',
  '.jsx': 'JavaScript React',
  '.js': 'JavaScript',
  '.py': 'Python',
  '.css': 'CSS',
  '.scss': 'SCSS',
  '.html': 'HTML',
  '.json': 'JSON',
  '.md': 'Markdown',
  '.yaml': 'YAML',
  '.yml': 'YAML',
  '.xml': 'XML',
  '.sql': 'SQL',
  '.go': 'Go',
  '.rs': 'Rust',
  '.java': 'Java',
  '.cpp': 'C++',
  '.c': 'C',
  '.php': 'PHP',
  '.rb': 'Ruby',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
} as const;

/**
 * Default code template
 */
export const DEFAULT_CODE = `// Paste your code here and click "Start Typing"
function helloWorld() {
  console.log("Hello, World!");
  return true;
}

const greeting = "Welcome to Auto Code Typer!";
console.log(greeting);`;

/**
 * Long line example for testing horizontal scroll
 */
export const LONG_LINE_EXAMPLE = `// This is a very long line to test horizontal scrolling behavior - the editor should automatically scroll right as you type and scroll back left when starting a new line
const veryLongVariableName = { property1: "value1", property2: "value2", property3: "value3", property4: "value4", property5: "value5" };
function anotherFunction() {
  return true;
}`;
