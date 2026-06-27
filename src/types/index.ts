// ============================================
// Global Type Definitions
// ============================================

// Token types for syntax highlighting
export type TokenType = 
  | 'keyword' 
  | 'string' 
  | 'comment' 
  | 'number' 
  | 'function' 
  | 'boolean' 
  | 'operator' 
  | 'plain' 
  | 'tag' 
  | 'attribute' 
  | 'decorator';

export interface Token {
  type: TokenType;
  value: string;
}

export interface Suggestion {
  word: string;
  kind: string;
  detail: string;
}

export interface SuggestionIcon {
  icon: string;
  color: string;
}

export interface AutocompletePosition {
  top: number;
  left: number;
}

export interface EditorStats {
  lineCount: number;
  lastLineLength: number;
  lines: string[];
}
