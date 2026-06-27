// ============================================
// Editor Feature Types
// ============================================

import type { TokenType } from '../../../types';

export interface Token {
  type: TokenType;
  value: string;
}

export interface EditorStats {
  lineCount: number;
  lastLineLength: number;
  lines: string[];
}

export interface CodeDisplayProps {
  displayedCode: string;
  cursorVisible: boolean;
  isTyping: boolean;
  sidebarOpen: boolean;
  audioFileName?: string;
}

export interface StatusBarProps {
  isTyping: boolean;
  isPaused: boolean;
  progress: number;
  displayedCode: string;
  lineCount: number;
  lastLineLength: number;
  fileName: string;
  showAutocomplete: boolean;
  audioFileName?: string;
}
