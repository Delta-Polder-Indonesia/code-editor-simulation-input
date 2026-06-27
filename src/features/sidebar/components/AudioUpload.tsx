import { memo, useRef, useEffect } from 'react';
import { useAudioStore } from '../../../store';
import { MusicIcon } from '../../../shared/components/icons';

// ============================================
// Audio Upload Component
// ============================================

export const AudioUpload = memo(function AudioUpload() {
  const {
    audioFileName,
    audioUrl,
    audioVolume,
    audioLoop,
    setAudioFileName,
    setAudioUrl,
    setAudioVolume,
    setAudioLoop,
    setAudioElement,
    clearAudio,
  } = useAudioStore();

  const audioFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize audio element when URL changes
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.loop = audioLoop;
      audio.volume = audioVolume / 100;
      setAudioElement(audio);

      return () => {
        audio.pause();
        audio.src = '';
        setAudioElement(null);
      };
    }
  }, [audioUrl, audioLoop, audioVolume, setAudioElement]);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioFileName(file.name);
    }
  };

  const handleRemoveAudio = () => {
    clearAudio();
    if (audioFileInputRef.current) {
      audioFileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-2 border-b border-[#3c3c3c]">
      <div className="text-[#cccccc] text-[11px] mb-2 uppercase font-semibold tracking-wide">
        🔊 Typing Sound
      </div>
      
      <input
        ref={audioFileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="hidden"
        id="audio-upload"
      />

      {!audioFileName ? (
        <label
          htmlFor="audio-upload"
          className="flex items-center justify-center gap-2 w-full bg-[#1e1e1e] hover:bg-[#2a2d2e] text-[#858585] hover:text-[#cccccc] border border-dashed border-[#555] hover:border-[#007acc] rounded py-3 px-3 cursor-pointer transition-all text-xs"
        >
          <MusicIcon />
          <span>Upload MP3 / Audio</span>
        </label>
      ) : (
        <div className="space-y-2">
          {/* File info */}
          <div className="flex items-center gap-2 bg-[#1e1e1e] rounded px-2 py-1.5 border border-[#3c3c3c]">
            <span className="text-green-400 text-sm">🎵</span>
            <span 
              className="text-[#cccccc] text-[10px] truncate flex-1" 
              title={audioFileName}
            >
              {audioFileName}
            </span>
            <button
              onClick={handleRemoveAudio}
              className="text-[#858585] hover:text-[#ff5f56] text-sm transition-colors shrink-0"
              title="Remove audio"
            >
              ✕
            </button>
          </div>

          {/* Volume control */}
          <div className="space-y-1">
            <div className="flex justify-between text-[#858585] text-[10px]">
              <span>🔉 Volume</span>
              <span>{audioVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={audioVolume}
              onChange={(e) => setAudioVolume(Number(e.target.value))}
              className="w-full h-1 bg-[#3c3c3c] rounded appearance-none cursor-pointer accent-[#007acc]"
            />
            <div className="flex justify-between text-[#555] text-[9px]">
              <span>🔇 Mute</span>
              <span>🔊 Max</span>
            </div>
          </div>

          {/* Loop toggle */}
          <div className="flex items-center justify-between">
            <span className="text-[#858585] text-[10px]">🔁 Loop Audio</span>
            <button
              onClick={() => setAudioLoop(!audioLoop)}
              className={`relative w-9 h-5 rounded-full transition-colors ${
                audioLoop ? 'bg-[#007acc]' : 'bg-[#3c3c3c]'
              }`}
            >
              <div 
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  audioLoop ? 'left-[18px]' : 'left-0.5'
                }`} 
              />
            </button>
          </div>

          {/* Change file button */}
          <label
            htmlFor="audio-upload"
            className="flex items-center justify-center gap-1 w-full bg-[#3c3c3c] hover:bg-[#505050] text-[#cccccc] rounded py-1 px-2 cursor-pointer transition-colors text-[10px]"
          >
            📂 Change Audio File
          </label>
        </div>
      )}
    </div>
  );
});
