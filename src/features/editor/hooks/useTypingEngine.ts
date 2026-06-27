import { useRef, useCallback } from 'react';
import { useEditorStore, useTypingStore, useAudioStore } from '../../../store';
import { getRandomTypo, isLetter, isWordChar, isIdentifierChar } from '../utils/typo';
import { useAutocompleteEngine } from '../../autocomplete/hooks/useAutocomplete';

// ============================================
// Typing Engine Hook
// Handles the core typing animation logic
// ============================================

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useTypingEngine() {
  const { inputCode, typingSpeed, typoFrequency, showAutocomplete } = useEditorStore();
  const { 
    setDisplayedCode, 
    setIsTyping, 
    setIsPaused, 
    setProgress,
    setCurrentIndex,
    incrementStopFlag,
    hideAutocomplete,
    stopFlag,
  } = useTypingStore();
  const { playAudio, stopAudio, pauseAudio, resumeAudio } = useAudioStore();
  const { showAcPopup, hideAcPopup } = useAutocompleteEngine();

  // Refs for async typing control
  const typingRef = useRef(false);
  const pausedRef = useRef(false);
  const displayedCodeRef = useRef('');
  const currentIndexRef = useRef(0);

  // Refs for real-time settings
  const typingSpeedRef = useRef(typingSpeed);
  const typoFrequencyRef = useRef(typoFrequency);
  const inputCodeRef = useRef(inputCode);
  const showAutocompleteRef = useRef(showAutocomplete);
  const stopFlagRef = useRef(stopFlag);

  // Update refs when values change
  typingSpeedRef.current = typingSpeed;
  typoFrequencyRef.current = typoFrequency;
  inputCodeRef.current = inputCode;
  showAutocompleteRef.current = showAutocomplete;
  stopFlagRef.current = stopFlag;

  const appendCode = useCallback((text: string) => {
    displayedCodeRef.current = text;
    setDisplayedCode(text);
  }, [setDisplayedCode]);

  const typeCode = useCallback(async () => {
    const myStopFlag = stopFlagRef.current;
    typingRef.current = true;
    pausedRef.current = false;
    setIsTyping(true);
    setIsPaused(false);

    playAudio();

    const code = inputCodeRef.current;
    const startIndex = currentIndexRef.current;
    let lastAcShow = 0;
    let acIsShowing = false;
    let wordCharCount = 0;

    for (let i = startIndex; i < code.length; i++) {
      if (!typingRef.current || stopFlagRef.current !== myStopFlag) {
        hideAcPopup();
        stopAudio();
        return;
      }

      while (pausedRef.current) {
        await sleep(100);
        if (!typingRef.current || stopFlagRef.current !== myStopFlag) {
          hideAcPopup();
          stopAudio();
          return;
        }
      }

      const char = code[i];
      const speed = typingSpeedRef.current;
      const typoRate = typoFrequencyRef.current;

      // Track if we're in a word
      if (isWordChar(char)) {
        wordCharCount++;
      } else {
        wordCharCount = 0;
      }

      // Autocomplete logic
      if (showAutocompleteRef.current) {
        if (wordCharCount >= 2 && isLetter(char) && i - lastAcShow > 3) {
          if (Math.random() < 0.6 || wordCharCount === 2) {
            showAcPopup(displayedCodeRef.current + char, code);
            acIsShowing = true;
            lastAcShow = i;
          }
        }

        if (!isIdentifierChar(char) && acIsShowing) {
          hideAcPopup();
          acIsShowing = false;
        }
      }

      // Random typo logic
      const shouldTypo = Math.random() * 100 < typoRate && isLetter(char);

      if (shouldTypo) {
        if (acIsShowing) {
          hideAcPopup();
          acIsShowing = false;
        }

        const typoCount = Math.random() < 0.3 ? (Math.random() < 0.5 ? 3 : 2) : 1;
        const actualTypoCount = Math.min(typoCount, code.length - i);

        let wrongChars = '';
        for (let t = 0; t < actualTypoCount; t++) {
          const targetChar = code[i + t] || char;
          const typoChar = isLetter(targetChar) ? getRandomTypo(targetChar) : targetChar;
          wrongChars += typoChar;
          appendCode(displayedCodeRef.current + typoChar);
          await sleep(speed + Math.random() * 30);
          if (!typingRef.current || stopFlagRef.current !== myStopFlag) return;
        }

        await sleep(200 + Math.random() * 400);
        if (!typingRef.current || stopFlagRef.current !== myStopFlag) return;

        for (let t = 0; t < wrongChars.length; t++) {
          appendCode(displayedCodeRef.current.slice(0, -1));
          await sleep(40 + Math.random() * 40);
          if (!typingRef.current || stopFlagRef.current !== myStopFlag) return;
        }

        await sleep(50 + Math.random() * 100);
        if (!typingRef.current || stopFlagRef.current !== myStopFlag) return;

        appendCode(displayedCodeRef.current + char);
      } else {
        appendCode(displayedCodeRef.current + char);
      }

      // Variable typing speed
      let delay = speed + (Math.random() * 40 - 20);

      if (['.', ',', ';', ':', '{', '}', '(', ')'].includes(char)) {
        delay += 50 + Math.random() * 120;
      }

      if (char === '\n') {
        delay += 100 + Math.random() * 300;
        if (acIsShowing) {
          hideAcPopup();
          acIsShowing = false;
        }
      }

      if (Math.random() < 0.015) {
        delay += 300 + Math.random() * 700;
      }

      if (char === ' ' && i > 0 && code[i - 1] === ' ') {
        delay = speed * 0.3;
      }

      await sleep(delay);
      currentIndexRef.current = i + 1;
      setCurrentIndex(i + 1);
      setProgress(Math.round(((i + 1) / code.length) * 100));
    }

    hideAcPopup();
    typingRef.current = false;
    setIsTyping(false);
    setProgress(100);
    stopAudio();
  }, [appendCode, hideAcPopup, showAcPopup, playAudio, stopAudio, setIsTyping, setIsPaused, setProgress, setCurrentIndex]);

  const startTyping = useCallback(() => {
    const typingState = useTypingStore.getState();

    if (typingState.isTyping && typingState.isPaused) {
      pausedRef.current = false;
      setIsPaused(false);
      resumeAudio();
      return;
    }
    
    if (!typingState.isTyping) {
      displayedCodeRef.current = '';
      setDisplayedCode('');
      currentIndexRef.current = 0;
      setCurrentIndex(0);
      setProgress(0);
      hideAutocomplete();
      typeCode();
    }
  }, [typeCode, setDisplayedCode, setIsPaused, setCurrentIndex, setProgress, hideAutocomplete, resumeAudio]);

  const pauseTyping = useCallback(() => {
    const typingState = useTypingStore.getState();

    if (typingState.isTyping && !typingState.isPaused) {
      pausedRef.current = true;
      setIsPaused(true);
      pauseAudio();
    } else if (typingState.isTyping && typingState.isPaused) {
      pausedRef.current = false;
      setIsPaused(false);
      resumeAudio();
    }
  }, [setIsPaused, pauseAudio, resumeAudio]);

  const stopTyping = useCallback(() => {
    incrementStopFlag();
    typingRef.current = false;
    pausedRef.current = false;
    setIsTyping(false);
    setIsPaused(false);
    currentIndexRef.current = 0;
    setCurrentIndex(0);
    hideAutocomplete();
    stopAudio();
  }, [incrementStopFlag, setIsTyping, setIsPaused, setCurrentIndex, hideAutocomplete, stopAudio]);

  const resetAll = useCallback(() => {
    stopTyping();
    displayedCodeRef.current = '';
    setDisplayedCode('');
    setProgress(0);
  }, [stopTyping, setDisplayedCode, setProgress]);

  return {
    startTyping,
    pauseTyping,
    stopTyping,
    resetAll,
  };
}
