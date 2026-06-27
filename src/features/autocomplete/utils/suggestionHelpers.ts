import type { Suggestion } from '../../../types';
import { SUGGESTION_DB } from '../constants/suggestions';

// ============================================
// Suggestion Helper Functions
// ============================================

/**
 * Extract current word being typed (for autocomplete matching)
 */
export function getCurrentWord(text: string): string {
  let i = text.length - 1;
  while (i >= 0 && /[a-zA-Z0-9_$.]/.test(text[i])) {
    i--;
  }
  return text.slice(i + 1);
}

/**
 * Get suggestions based on current word + extract identifiers from code
 */
export function getSuggestions(currentWord: string, fullCode: string): Suggestion[] {
  if (currentWord.length < 2) return [];

  const lowerWord = currentWord.toLowerCase();

  // Extract identifiers from the code being typed for dynamic suggestions
  const identifiers = new Set<string>();
  const identRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]{2,})\b/g;
  let m;
  while ((m = identRegex.exec(fullCode)) !== null) {
    if (m[1] !== currentWord) {
      identifiers.add(m[1]);
    }
  }

  // Combine DB suggestions + code identifiers
  const allSuggestions: Suggestion[] = [...SUGGESTION_DB];

  identifiers.forEach(id => {
    if (!allSuggestions.find(s => s.word === id)) {
      allSuggestions.push({ word: id, kind: 'variable', detail: `(local) ${id}` });
    }
  });

  // Filter and sort by relevance
  const filtered = allSuggestions
    .filter(s => s.word.toLowerCase().startsWith(lowerWord) || s.word.toLowerCase().includes(lowerWord))
    .sort((a, b) => {
      const aStarts = a.word.toLowerCase().startsWith(lowerWord) ? 0 : 1;
      const bStarts = b.word.toLowerCase().startsWith(lowerWord) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.word.length - b.word.length;
    })
    .slice(0, 8);

  return filtered;
}
