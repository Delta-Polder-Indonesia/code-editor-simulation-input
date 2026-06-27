import { memo } from 'react';
import { useEditorStore, useTypingStore } from '../../../store';
import { useTypingEngine } from '../../editor/hooks/useTypingEngine';
import { PlayIcon, PauseIcon, StopIcon } from '../../../shared/components/icons';

// ============================================
// Controls Component
// ============================================

export const Controls = memo(function Controls() {
  const {
    typingSpeed,
    typoFrequency,
    showAutocomplete,
    fileName,
    setTypingSpeed,
    setTypoFrequency,
    setShowAutocomplete,
    setFileName,
  } = useEditorStore();

  const { isTyping, isPaused, progress } = useTypingStore();
  const { startTyping, pauseTyping, stopTyping, resetAll } = useTypingEngine();

  return (
    <div className="p-2 space-y-3 border-b border-[#3c3c3c]">
      <div className="text-[#cccccc] text-[11px] uppercase font-semibold tracking-wide">
        🎮 Controls
      </div>

      {/* Play/Pause/Stop buttons */}
      <div className="flex space-x-1.5">
        <button
          onClick={startTyping}
          disabled={isTyping && !isPaused}
          className="flex-1 flex items-center justify-center space-x-1 bg-[#0e639c] hover:bg-[#1177bb] disabled:bg-[#3c3c3c] disabled:text-[#6c6c6c] disabled:cursor-not-allowed text-white px-2 py-1.5 rounded text-xs transition-colors"
        >
          <PlayIcon />
          <span>{isPaused ? 'Resume' : 'Start'}</span>
        </button>

        {isTyping && (
          <button
            onClick={pauseTyping}
            className="flex items-center justify-center bg-[#6c6c6c] hover:bg-[#808080] text-white px-2 py-1.5 rounded text-xs transition-colors"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}

        <button
          onClick={stopTyping}
          disabled={!isTyping}
          className="flex items-center justify-center bg-[#c42b1c] hover:bg-[#d43c2d] disabled:bg-[#3c3c3c] disabled:text-[#6c6c6c] disabled:cursor-not-allowed text-white px-2 py-1.5 rounded text-xs transition-colors"
          title="Stop"
        >
          <StopIcon />
        </button>
      </div>

      {/* Reset button */}
      <button
        onClick={resetAll}
        className="w-full bg-[#3c3c3c] hover:bg-[#505050] text-[#cccccc] px-3 py-1.5 rounded text-xs transition-colors"
      >
        ↺ Reset
      </button>

      {/* Progress Bar */}
      {(isTyping || progress === 100) && (
        <div className="space-y-1">
          <div className="flex justify-between text-[#858585] text-[10px]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#3c3c3c] rounded overflow-hidden">
            <div
              className={`h-full transition-all duration-200 rounded ${
                progress === 100 ? 'bg-[#27ca40]' : 'bg-[#007acc]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Speed Control */}
      <div className="space-y-1">
        <div className="flex justify-between text-[#858585] text-[10px]">
          <span>⚡ Speed</span>
          <span>{typingSpeed}ms</span>
        </div>
        <input
          type="range"
          min="10"
          max="200"
          value={typingSpeed}
          onChange={(e) => setTypingSpeed(Number(e.target.value))}
          className="w-full h-1 bg-[#3c3c3c] rounded appearance-none cursor-pointer accent-[#007acc]"
        />
        <div className="flex justify-between text-[#555] text-[9px]">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Typo Frequency */}
      <div className="space-y-1">
        <div className="flex justify-between text-[#858585] text-[10px]">
          <span>🖊 Typo Rate</span>
          <span>{typoFrequency}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          value={typoFrequency}
          onChange={(e) => setTypoFrequency(Number(e.target.value))}
          className="w-full h-1 bg-[#3c3c3c] rounded appearance-none cursor-pointer accent-[#007acc]"
        />
        <div className="flex justify-between text-[#555] text-[9px]">
          <span>None</span>
          <span>Many</span>
        </div>
      </div>

      {/* Autocomplete Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[#858585] text-[10px]">💡 IntelliSense</span>
        <button
          onClick={() => setShowAutocomplete(!showAutocomplete)}
          className={`relative w-9 h-5 rounded-full transition-colors ${
            showAutocomplete ? 'bg-[#007acc]' : 'bg-[#3c3c3c]'
          }`}
        >
          <div 
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              showAutocomplete ? 'left-[18px]' : 'left-0.5'
            }`} 
          />
        </button>
      </div>

      {/* File Name */}
      <div className="space-y-1">
        <div className="text-[#858585] text-[10px]">📄 File Name</div>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full bg-[#1e1e1e] text-[#d4d4d4] text-xs p-1.5 rounded border border-[#3c3c3c] focus:border-[#007acc] focus:outline-none font-mono"
        />
      </div>
    </div>
  );
});
