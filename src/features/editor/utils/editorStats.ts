import type { EditorStats } from '../types/editor';
import { getLanguageFromFileName } from '../../../lib/utils';

// ============================================
// Editor Statistics Utilities
// ============================================

/**
 * Calculate editor statistics from displayed code
 * @param code - The displayed code string
 */
export function getEditorStats(code: string): EditorStats {
  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 1);
  const lastLineLength = lines[lines.length - 1]?.length ?? 0;

  return {
    lines,
    lineCount,
    lastLineLength,
  };
}

/**
 * Get language name based on file extension
 * @param fileName - The file name with extension
 */
export function getLanguageName(fileName: string): string {
  return getLanguageFromFileName(fileName);
}

/**
 * Calculate typing statistics
 * @param totalChars - Total characters in source code
 * @param typedChars - Characters typed so far
 * @param startTime - Typing start timestamp
 */
export function getTypingStats(
  totalChars: number,
  typedChars: number,
  startTime?: number
): {
  progress: number;
  remaining: number;
  wpm: number;
  estimatedTime: string;
} {
  const progress = totalChars > 0 
    ? Math.round((typedChars / totalChars) * 100) 
    : 0;
  
  const remaining = totalChars - typedChars;
  
  let wpm = 0;
  let estimatedTime = '--:--';
  
  if (startTime && typedChars > 0) {
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const words = typedChars / 5; // Average word length
    wpm = Math.round(words / elapsedMinutes);
    
    if (wpm > 0) {
      const remainingWords = remaining / 5;
      const remainingMinutes = remainingWords / wpm;
      const mins = Math.floor(remainingMinutes);
      const secs = Math.round((remainingMinutes - mins) * 60);
      estimatedTime = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }
  
  return { progress, remaining, wpm, estimatedTime };
}
