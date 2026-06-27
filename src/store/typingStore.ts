import { create } from 'zustand';
import type { Suggestion, AutocompletePosition } from '../types';

// ============================================
// Typing State Store
// ============================================

interface TypingState {
  // Typing state
  displayedCode: string;
  isTyping: boolean;
  isPaused: boolean;
  progress: number;
  currentIndex: number;
  
  // Autocomplete state
  acVisible: boolean;
  acSuggestions: Suggestion[];
  acSelectedIndex: number;
  acPosition: AutocompletePosition;
  
  // Control flags (used by typing engine)
  stopFlag: number;
  
  // Actions
  setDisplayedCode: (code: string) => void;
  appendCode: (char: string) => void;
  deleteLastChar: () => void;
  setIsTyping: (typing: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setProgress: (progress: number) => void;
  setCurrentIndex: (index: number) => void;
  incrementStopFlag: () => void;
  
  // Autocomplete actions
  setAcVisible: (visible: boolean) => void;
  setAcSuggestions: (suggestions: Suggestion[]) => void;
  setAcSelectedIndex: (index: number) => void;
  setAcPosition: (position: AutocompletePosition) => void;
  hideAutocomplete: () => void;
  
  // Reset actions
  resetTyping: () => void;
  resetAll: () => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  // Initial state
  displayedCode: '',
  isTyping: false,
  isPaused: false,
  progress: 0,
  currentIndex: 0,
  stopFlag: 0,
  
  // Autocomplete initial state
  acVisible: false,
  acSuggestions: [],
  acSelectedIndex: 0,
  acPosition: { top: 0, left: 0 },
  
  // Typing actions
  setDisplayedCode: (code) => set({ displayedCode: code }),
  appendCode: (char) => set((state) => ({ 
    displayedCode: state.displayedCode + char 
  })),
  deleteLastChar: () => set((state) => ({ 
    displayedCode: state.displayedCode.slice(0, -1) 
  })),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setProgress: (progress) => set({ progress }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  incrementStopFlag: () => set((state) => ({ 
    stopFlag: state.stopFlag + 1 
  })),
  
  // Autocomplete actions
  setAcVisible: (visible) => set({ acVisible: visible }),
  setAcSuggestions: (suggestions) => set({ acSuggestions: suggestions }),
  setAcSelectedIndex: (index) => set({ acSelectedIndex: index }),
  setAcPosition: (position) => set({ acPosition: position }),
  hideAutocomplete: () => set({ acVisible: false }),
  
  // Reset actions
  resetTyping: () => set({
    isTyping: false,
    isPaused: false,
    currentIndex: 0,
    acVisible: false,
  }),
  
  resetAll: () => set({
    displayedCode: '',
    isTyping: false,
    isPaused: false,
    progress: 0,
    currentIndex: 0,
    acVisible: false,
    acSuggestions: [],
    acSelectedIndex: 0,
  }),
}));
