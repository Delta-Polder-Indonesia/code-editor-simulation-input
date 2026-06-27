import { create } from 'zustand';
import { AUDIO_DEFAULTS } from '../lib/constants';

// ============================================
// Audio State Store
// Manages audio playback for typing sounds
// ============================================

interface AudioState {
  // State
  audioFileName: string;
  audioUrl: string;
  audioVolume: number;
  audioLoop: boolean;
  audioElement: HTMLAudioElement | null;
  isAudioPlaying: boolean;
  
  // Actions
  setAudioFileName: (name: string) => void;
  setAudioUrl: (url: string) => void;
  setAudioVolume: (volume: number) => void;
  setAudioLoop: (loop: boolean) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
  
  // Audio control actions
  playAudio: () => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  
  // File management
  clearAudio: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  audioFileName: '',
  audioUrl: '',
  audioVolume: AUDIO_DEFAULTS.volume,
  audioLoop: AUDIO_DEFAULTS.loop,
  audioElement: null,
  isAudioPlaying: false,
  
  // Setters
  setAudioFileName: (name) => set({ audioFileName: name }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  setAudioVolume: (volume) => {
    set({ audioVolume: volume });
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  },
  setAudioLoop: (loop) => {
    set({ audioLoop: loop });
    const { audioElement } = get();
    if (audioElement) {
      audioElement.loop = loop;
    }
  },
  setAudioElement: (element) => set({ audioElement: element }),
  
  // Audio controls
  playAudio: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play()
        .then(() => set({ isAudioPlaying: true }))
        .catch(() => set({ isAudioPlaying: false }));
    }
  },
  
  pauseAudio: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      set({ isAudioPlaying: false });
    }
  },
  
  resumeAudio: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.play()
        .then(() => set({ isAudioPlaying: true }))
        .catch(() => set({ isAudioPlaying: false }));
    }
  },
  
  stopAudio: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      set({ isAudioPlaying: false });
    }
  },
  
  clearAudio: () => {
    const { audioElement, audioUrl } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    set({
      audioFileName: '',
      audioUrl: '',
      audioElement: null,
      isAudioPlaying: false,
    });
  },
}));
