import { memo } from 'react';
import { useEditorStore, useTypingStore, useAudioStore } from '../../../store';
import { getEditorStats, getLanguageName } from '../utils/editorStats';

// ============================================
// Status Bar Component
// ============================================

export const StatusBar = memo(function StatusBar() {
  const { fileName, showAutocomplete } = useEditorStore();
  const { isTyping, isPaused, progress, displayedCode } = useTypingStore();
  const audioFileName = useAudioStore((s) => s.audioFileName);

  const { lineCount, lastLineLength } = getEditorStats(displayedCode);

  const getStatus = () => {
    if (isTyping) {
      return isPaused ? '⏸ Paused' : '⌨️ Typing...';
    }
    if (displayedCode.length > 0) {
      return progress === 100 ? '✅ Done' : '⏹ Stopped';
    }
    return '✓ Ready';
  };

  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-4 text-white text-xs shrink-0">
      <div className="flex items-center space-x-4">
        <span>{getStatus()}</span>
        <span>Ln {lineCount}, Col {lastLineLength + 1}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {audioFileName && (
          <span className="flex items-center gap-1">
            {isTyping && !isPaused ? '🔊' : '🔇'}
            <span className="max-w-[80px] truncate text-[10px]">
              {audioFileName}
            </span>
          </span>
        )}
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{getLanguageName(fileName)}</span>
        {showAutocomplete && <span>💡 IntelliSense</span>}
      </div>
    </div>
  );
});
