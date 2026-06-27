import type { TokenType } from '../../../types';
import type { Token } from '../types/editor';

// ============================================
// Syntax Tokenizer
// ============================================

// Keywords set
const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try',
  'catch', 'new', 'this', 'typeof', 'interface', 'type', 'extends',
  'implements', 'public', 'private', 'protected', 'static', 'readonly',
  'enum', 'namespace', 'module', 'declare', 'as', 'is', 'in', 'of',
  'switch', 'case', 'break', 'continue', 'throw', 'finally', 'void',
  'never', 'any', 'string', 'number', 'boolean', 'object', 'symbol',
  'unknown', 'do', 'instanceof', 'delete', 'with', 'yield', 'super',
]);

// Booleans set
const BOOLEANS = new Set(['true', 'false', 'null', 'undefined']);

// Token color mapping
export const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: 'text-[#569cd6]',
  string: 'text-[#ce9178]',
  comment: 'text-[#6a9955]',
  number: 'text-[#b5cea8]',
  function: 'text-[#dcdcaa]',
  boolean: 'text-[#569cd6]',
  operator: 'text-[#d4d4d4]',
  plain: 'text-[#d4d4d4]',
  tag: 'text-[#569cd6]',
  attribute: 'text-[#92c5f7]',
  decorator: 'text-[#dcdcaa]',
};

// Tokenize a single line for syntax highlighting
export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Single-line comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // Decorator (e.g., @Component)
    if (line[i] === '@' && i + 1 < line.length && /[a-zA-Z]/.test(line[i + 1])) {
      let j = i + 1;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      tokens.push({ type: 'decorator', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Strings (single, double, backtick)
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      j++;
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.xXa-fA-F]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // JSX/HTML tags
    if (line[i] === '<' && i + 1 < line.length && /[a-zA-Z/]/.test(line[i + 1])) {
      let j = i + 1;
      if (line[j] === '/') j++;
      while (j < line.length && /[a-zA-Z0-9._-]/.test(line[j])) j++;
      tokens.push({ type: 'tag', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      let k = j;
      while (k < line.length && line[k] === ' ') k++;
      const isFunction = line[k] === '(';

      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (BOOLEANS.has(word)) {
        tokens.push({ type: 'boolean', value: word });
      } else if (isFunction) {
        tokens.push({ type: 'function', value: word });
      } else {
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }

    // Operators
    if (/[=+\-*/<>!&|?:^%~]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[=+\-*/<>!&|?:^%~]/.test(line[j])) j++;
      tokens.push({ type: 'operator', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Plain character
    tokens.push({ type: 'plain', value: line[i] });
    i++;
  }

  return tokens;
}
