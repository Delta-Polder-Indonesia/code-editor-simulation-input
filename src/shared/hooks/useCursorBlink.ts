import { useState, useEffect } from 'react';
import { TYPING_CONFIG } from '../../lib/constants';

// ============================================
// Cursor Blink Hook
// ============================================

/**
 * Custom hook for cursor blinking effect
 * @returns boolean indicating if cursor is currently visible
 */
export function useCursorBlink(): boolean {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, TYPING_CONFIG.cursorBlinkInterval);

    return () => clearInterval(interval);
  }, []);

  return cursorVisible;
}
