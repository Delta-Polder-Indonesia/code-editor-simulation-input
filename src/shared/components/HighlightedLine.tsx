import { memo } from 'react';
import { tokenizeLine, TOKEN_COLORS } from '../../features/editor/utils/tokenizer';

// ============================================
// Highlighted Line Component
// ============================================

interface HighlightedLineProps {
  line: string;
}

export const HighlightedLine = memo(function HighlightedLine({ line }: HighlightedLineProps) {
  const tokens = tokenizeLine(line);
  
  return (
    <>
      {tokens.map((token, idx) => (
        <span key={idx} className={TOKEN_COLORS[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
});
