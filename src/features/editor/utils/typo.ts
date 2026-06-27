// ============================================
// Typo Generation Utilities
// ============================================

// Nearby keys mapping for realistic typos
const NEARBY_KEYS: Record<string, string[]> = {
  'a': ['s', 'q', 'w', 'z'],
  'b': ['v', 'g', 'h', 'n'],
  'c': ['x', 'd', 'f', 'v'],
  'd': ['s', 'e', 'r', 'f', 'c', 'x'],
  'e': ['w', 'r', 'd', 's', '3', '4'],
  'f': ['d', 'r', 't', 'g', 'v', 'c'],
  'g': ['f', 't', 'y', 'h', 'b', 'v'],
  'h': ['g', 'y', 'u', 'j', 'n', 'b'],
  'i': ['u', 'o', 'k', 'j', '8', '9'],
  'j': ['h', 'u', 'i', 'k', 'm', 'n'],
  'k': ['j', 'i', 'o', 'l', 'm'],
  'l': ['k', 'o', 'p', ';'],
  'm': ['n', 'j', 'k', ','],
  'n': ['b', 'h', 'j', 'm'],
  'o': ['i', 'p', 'l', 'k', '9', '0'],
  'p': ['o', '[', ';', 'l'],
  'q': ['w', 'a', '1', '2'],
  'r': ['e', 't', 'f', 'd', '4', '5'],
  's': ['a', 'w', 'e', 'd', 'x', 'z'],
  't': ['r', 'y', 'g', 'f', '5', '6'],
  'u': ['y', 'i', 'j', 'h', '7', '8'],
  'v': ['c', 'f', 'g', 'b'],
  'w': ['q', 'e', 's', 'a', '2', '3'],
  'x': ['z', 's', 'd', 'c'],
  'y': ['t', 'u', 'h', 'g', '6', '7'],
  'z': ['a', 's', 'x'],
};

/**
 * Generate a random typo for a character based on nearby keys
 */
export function getRandomTypo(char: string): string {
  const lowerChar = char.toLowerCase();
  
  if (NEARBY_KEYS[lowerChar]) {
    const nearbyKeys = NEARBY_KEYS[lowerChar];
    const typo = nearbyKeys[Math.floor(Math.random() * nearbyKeys.length)];
    return char === char.toUpperCase() ? typo.toUpperCase() : typo;
  }
  
  return char;
}

/**
 * Check if a character is a letter
 */
export function isLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

/**
 * Check if a character is alphanumeric or underscore/dollar
 */
export function isWordChar(char: string): boolean {
  return /[a-zA-Z0-9_$]/.test(char);
}

/**
 * Check if a character is alphanumeric, underscore, dollar, or dot
 */
export function isIdentifierChar(char: string): boolean {
  return /[a-zA-Z0-9_$.]/.test(char);
}
