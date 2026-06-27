import { memo } from 'react';
import { useEditorStore, useTypingStore, useAudioStore } from '../../../store';
import { useCursorBlink } from '../../../shared/hooks';
import { HighlightedLine } from '../../../shared/components';
import { useEditorScroll } from '../hooks/useEditorScroll';

// ============================================
// Code Display Component
// Features:
// - Syntax highlighting per line
// - Line numbers (sticky)
// - Cursor blinking animation
// - Auto-scroll vertical (follow cursor down)
// - Auto-scroll horizontal (follow long lines)
// - Smart scroll-back to left on new line
// ============================================

interface CodeDisplayProps {
  codeDisplayRef: React.RefObject<HTMLDivElement | null>;
}

export const CodeDisplay = memo(function CodeDisplay({ codeDisplayRef }: CodeDisplayProps) {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);
  const { displayedCode, isTyping } = useTypingStore();
  const audioFileName = useAudioStore((s) => s.audioFileName);
  const cursorVisible = useCursorBlink();

  // Use the scroll hook for auto-scrolling
  useEditorScroll({
    containerRef: codeDisplayRef,
    displayedCode,
    isTyping,
  });

  const lines = displayedCode.split('\n');
  const lineCount = Math.max(lines.length, 1);
  const currentLine = lines[lines.length - 1] || '';
  const currentCol = currentLine.length;

  return (
    <div
      ref={codeDisplayRef}
      className="flex-1 overflow-auto font-mono text-sm select-text relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="flex min-h-full">
        {/* Line Numbers - Sticky left, stays visible during horizontal scroll */}
        <div className="sticky left-0 bg-[#1e1e1e] text-[#858585] text-right pr-4 pl-4 select-none z-10 min-w-[3.5rem] border-r border-[#1e1e1e]">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6 text-xs">{i + 1}</div>
          ))}
        </div>

        {/* Code Content - Scrollable horizontally */}
        <div className="pl-4 pr-16 text-[#d4d4d4] min-w-max">
          {lines.map((line, index) => (
            <div key={index} className="leading-6 whitespace-pre">
              <HighlightedLine line={line} />
              {/* Cursor at end of last line */}
              {index === lines.length - 1 && (
                <span
                  className={`inline-block w-[2px] h-[16px] bg-[#aeafad] ml-[1px] align-middle transition-opacity duration-100 ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          ))}
          
          {/* Extra padding at the end for smooth scrolling */}
          <div className="h-8" />
        </div>
      </div>

      {/* Empty state */}
      {displayedCode === '' && !isTyping && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-[#555] space-y-2">
            <div className="text-4xl">⌨️</div>
            <div className="text-sm">
              {sidebarOpen 
                ? 'Paste code in the sidebar and click Start' 
                : 'Click the file icon to open sidebar'
              }
            </div>
            <div className="text-xs text-[#444]">
              The code will be typed with human-like realism
            </div>
            <div className="text-xs text-[#444] mt-2 space-x-2">
              <span><kbd className="px-1.5 py-0.5 bg-[#3c3c3c] rounded text-[#9cdcfe]">Ctrl+Enter</kbd> start</span>
              <span><kbd className="px-1.5 py-0.5 bg-[#3c3c3c] rounded text-[#9cdcfe]">Ctrl+P</kbd> pause</span>
              <span><kbd className="px-1.5 py-0.5 bg-[#3c3c3c] rounded text-[#9cdcfe]">Esc</kbd> stop</span>
            </div>
            {audioFileName && (
              <div className="text-xs text-[#4a7a4a] mt-2">
                🎵 Sound: {audioFileName} ready
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current position indicator (shows when line is long) */}
      {isTyping && currentCol > 60 && (
        <div className="absolute bottom-8 right-4 text-[10px] text-[#555] bg-[#1e1e1e] px-2 py-1 rounded opacity-70">
          Col {currentCol}
        </div>
      )}
    </div>
  );
});
