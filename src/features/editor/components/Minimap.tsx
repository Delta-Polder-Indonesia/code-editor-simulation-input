import { memo } from 'react';
import { useTypingStore } from '../../../store';

// ============================================
// Minimap Component
// ============================================

export const Minimap = memo(function Minimap() {
  const displayedCode = useTypingStore((s) => s.displayedCode);

  return (
    <div className="absolute right-0 top-[60px] bottom-[24px] w-[60px] opacity-40 pointer-events-none overflow-hidden hidden lg:block">
      <div className="p-1 text-[2px] leading-[3px] text-[#d4d4d4] font-mono break-all whitespace-pre-wrap">
        {displayedCode.slice(0, 5000)}
      </div>
    </div>
  );
});
