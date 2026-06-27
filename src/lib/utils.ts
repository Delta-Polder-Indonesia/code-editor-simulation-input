// ============================================
// Utility Functions
// Reusable helper functions across the app
// ============================================

import { FILE_EXTENSIONS } from './constants';

/**
 * Sleep utility for async delays
 * @param ms - Milliseconds to sleep
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate random number within range
 * @param min - Minimum value
 * @param max - Maximum value
 */
export const randomInRange = (min: number, max: number): number => 
  Math.random() * (max - min) + min;

/**
 * Generate random integer within range (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 */
export const randomIntInRange = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Check probability (returns true with given probability)
 * @param probability - Value between 0 and 1
 */
export const checkProbability = (probability: number): boolean => 
  Math.random() < probability;

/**
 * Clamp a number between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 */
export const clamp = (value: number, min: number, max: number): number => 
  Math.min(Math.max(value, min), max);

/**
 * Get language name from file name
 * @param fileName - File name with extension
 */
export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.slice(fileName.lastIndexOf('.'));
  return FILE_EXTENSIONS[extension] || 'Plain Text';
};

/**
 * Format number with locale string
 * @param num - Number to format
 */
export const formatNumber = (num: number): string => 
  num.toLocaleString();

/**
 * Debounce function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 */
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep freeze an object (make it immutable)
 * @param obj - Object to freeze
 */
export const deepFreeze = <T extends object>(obj: T): Readonly<T> => {
  Object.keys(obj).forEach(prop => {
    const value = (obj as Record<string, unknown>)[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value as object);
    }
  });
  return Object.freeze(obj);
};

/**
 * Check if code is empty or only whitespace
 * @param code - Code string to check
 */
export const isCodeEmpty = (code: string): boolean => 
  !code || code.trim().length === 0;

/**
 * Count lines in code
 * @param code - Code string
 */
export const countLines = (code: string): number => 
  code.split('\n').length;

/**
 * Get character count
 * @param code - Code string
 */
export const countChars = (code: string): number => 
  code.length;

/**
 * Generate unique ID
 */
export const generateId = (): string => 
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Safe JSON parse with fallback
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Check if running in browser
 */
export const isBrowser = (): boolean => 
  typeof window !== 'undefined';

/**
 * Check if running in development mode
 */
export const isDev = (): boolean => 
  process.env.NODE_ENV === 'development';

/**
 * Log only in development mode
 * @param args - Arguments to log
 */
export const devLog = (...args: unknown[]): void => {
  if (isDev()) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Create CSS class string from conditions
 * @param classes - Object with class names as keys and conditions as values
 */
export const cx = (
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string => {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      if (typeof cls === 'string') return [cls];
      return Object.entries(cls)
        .filter(([, condition]) => condition)
        .map(([className]) => className);
    })
    .join(' ');
};
