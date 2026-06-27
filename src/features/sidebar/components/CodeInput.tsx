import { memo } from 'react';
import { useEditorStore, useTypingStore } from '../../../store';

// ============================================
// Code Input Component
// ============================================

export const CodeInput = memo(function CodeInput() {
  const { inputCode, setInputCode } = useEditorStore();
  const isTyping = useTypingStore((s) => s.isTyping);

  return (
    <div className="p-2 border-b border-[#3c3c3c]">
      <div className="text-[#cccccc] text-[11px] mb-2 uppercase font-semibold tracking-wide">
        📋 Paste Code Here
      </div>
      
      <textarea
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        className="w-full h-44 bg-[#1e1e1e] text-[#d4d4d4] text-xs p-2 rounded border border-[#3c3c3c] focus:border-[#007acc] focus:outline-none resize-none font-mono"
        placeholder="Paste your code here... (unlimited length)"
        disabled={isTyping}
      />
      
      <div className="text-[#555] text-[9px] mt-1 flex justify-between">
        <span>{inputCode.length.toLocaleString()} chars</span>
        <span>{inputCode.split('\n').length} lines</span>
      </div>
    </div>
  );
});
