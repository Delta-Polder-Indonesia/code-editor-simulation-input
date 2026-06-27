import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { EDITOR_DEFAULTS, DEFAULT_CODE } from '../lib/constants';

// ============================================
// Editor Settings Store
// Persisted to localStorage for user preferences
// ============================================

interface EditorState {
  // Settings
  fileName: string;
  sidebarOpen: boolean;
  typingSpeed: number;
  typoFrequency: number;
  showAutocomplete: boolean;
  
  // Input code
  inputCode: string;
  
  // Actions
  setFileName: (name: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTypingSpeed: (speed: number) => void;
  setTypoFrequency: (frequency: number) => void;
  setShowAutocomplete: (show: boolean) => void;
  setInputCode: (code: string) => void;
  
  // Reset
  resetSettings: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      // Initial state from defaults
      fileName: EDITOR_DEFAULTS.fileName,
      sidebarOpen: EDITOR_DEFAULTS.sidebarOpen,
      typingSpeed: EDITOR_DEFAULTS.typingSpeed,
      typoFrequency: EDITOR_DEFAULTS.typoFrequency,
      showAutocomplete: EDITOR_DEFAULTS.showAutocomplete,
      inputCode: DEFAULT_CODE,
      
      // Actions
      setFileName: (name) => set({ fileName: name }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTypingSpeed: (speed) => set({ typingSpeed: speed }),
      setTypoFrequency: (frequency) => set({ typoFrequency: frequency }),
      setShowAutocomplete: (show) => set({ showAutocomplete: show }),
      setInputCode: (code) => set({ inputCode: code }),
      
      // Reset to defaults
      resetSettings: () => set({
        fileName: EDITOR_DEFAULTS.fileName,
        typingSpeed: EDITOR_DEFAULTS.typingSpeed,
        typoFrequency: EDITOR_DEFAULTS.typoFrequency,
        showAutocomplete: EDITOR_DEFAULTS.showAutocomplete,
      }),
    }),
    {
      name: 'auto-code-typer-editor',
      storage: createJSONStorage(() => localStorage),
      // Only persist settings, not inputCode
      partialize: (state) => ({
        fileName: state.fileName,
        typingSpeed: state.typingSpeed,
        typoFrequency: state.typoFrequency,
        showAutocomplete: state.showAutocomplete,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
