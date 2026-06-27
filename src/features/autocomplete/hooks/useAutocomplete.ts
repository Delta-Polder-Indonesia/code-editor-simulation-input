import { useCallback, useRef } from 'react';
import { useTypingStore, useEditorStore } from '../../../store';
import { getCurrentWord, getSuggestions } from '../utils/suggestionHelpers';
import type { AutocompletePosition } from '../../../types';

// ============================================
// Autocomplete Engine Hook
// ============================================

export function useAutocompleteEngine() {
  const { showAutocomplete } = useEditorStore();
  const {
    setAcVisible,
    setAcSuggestions,
    setAcSelectedIndex,
    setAcPosition,
    hideAutocomplete,
  } = useTypingStore();

  const codeDisplayRef = useRef<HTMLDivElement | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback((
    codeRef: React.RefObject<HTMLDivElement>,
    editorRef: React.RefObject<HTMLDivElement>
  ) => {
    codeDisplayRef.current = codeRef.current;
    editorContainerRef.current = editorRef.current;
  }, []);

  // Calculate autocomplete popup position
  const calculateAcPosition = useCallback((text: string): AutocompletePosition => {
    const lines = text.split('\n');
    const lineIndex = lines.length - 1;
    const colIndex = lines[lineIndex].length;

    const lineHeight = 24;
    const charWidth = 8.4;

    const editorEl = codeDisplayRef.current;
    const containerEl = editorContainerRef.current;
    
    if (!editorEl || !containerEl) {
      return { top: 100, left: 100 };
    }

    const containerRect = containerEl.getBoundingClientRect();
    const scrollTop = editorEl.scrollTop;
    const scrollLeft = editorEl.scrollLeft;

    const lineNumbersWidth = 56;
    const paddingLeft = 16;

    const relativeTop = (lineIndex + 1) * lineHeight - scrollTop;
    const relativeLeft = lineNumbersWidth + paddingLeft + colIndex * charWidth - scrollLeft;

    const top = containerRect.top + relativeTop + lineHeight + 4;
    const left = containerRect.left + relativeLeft;

    return { 
      top: Math.max(top, containerRect.top + 20), 
      left: Math.max(left, containerRect.left + 60)
    };
  }, []);

  const showAcPopup = useCallback((text: string, fullCode: string) => {
    if (!showAutocomplete) return;

    const currentWord = getCurrentWord(text);
    const suggestions = getSuggestions(currentWord, fullCode);

    if (suggestions.length > 0) {
      const position = calculateAcPosition(text);
      setAcSuggestions(suggestions);
      setAcSelectedIndex(Math.floor(Math.random() * Math.min(3, suggestions.length)));
      setAcPosition(position);
      setAcVisible(true);
    } else {
      setAcVisible(false);
    }
  }, [showAutocomplete, calculateAcPosition, setAcSuggestions, setAcSelectedIndex, setAcPosition, setAcVisible]);

  const hideAcPopup = useCallback(() => {
    hideAutocomplete();
  }, [hideAutocomplete]);

  return {
    showAcPopup,
    hideAcPopup,
    setRefs,
  };
}
