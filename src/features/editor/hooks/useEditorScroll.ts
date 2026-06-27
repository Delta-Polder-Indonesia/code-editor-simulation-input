import { useCallback, useRef, useEffect } from 'react';
import { UI_CONFIG } from '../../../lib/constants';

// ============================================
// Editor Scroll Hook
// Handles intelligent auto-scrolling for code editor
// Features:
// - Vertical scroll to follow cursor
// - Horizontal scroll to follow long lines
// - Auto-reset to left on new line
// - Smooth scrolling animation
// ============================================

interface ScrollState {
  prevCol: number;
  prevLine: number;
  isScrolling: boolean;
}

interface UseEditorScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  displayedCode: string;
  isTyping: boolean;
}

interface ScrollPosition {
  cursorX: number;
  cursorY: number;
  currentCol: number;
  currentLine: number;
}

export function useEditorScroll({
  containerRef,
  displayedCode,
  isTyping,
}: UseEditorScrollProps) {
  const scrollState = useRef<ScrollState>({
    prevCol: 0,
    prevLine: 0,
    isScrolling: false,
  });

  // Calculate current cursor position
  const calculateCursorPosition = useCallback((): ScrollPosition | null => {
    const lines = displayedCode.split('\n');
    const currentLine = lines.length - 1;
    const currentCol = lines[currentLine]?.length ?? 0;

    const { charWidth, lineHeight, lineNumbersWidth, paddingLeft } = UI_CONFIG;

    const cursorX = lineNumbersWidth + paddingLeft + (currentCol * charWidth);
    const cursorY = currentLine * lineHeight;

    return { cursorX, cursorY, currentCol, currentLine };
  }, [displayedCode]);

  // Perform scroll to position
  const scrollTo = useCallback((
    container: HTMLDivElement,
    targetX: number,
    targetY: number,
    smooth: boolean = true
  ) => {
    if (scrollState.current.isScrolling) return;

    scrollState.current.isScrolling = true;

    container.scrollTo({
      left: Math.max(0, targetX),
      top: Math.max(0, targetY),
      behavior: smooth ? 'smooth' : 'instant',
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
      scrollState.current.isScrolling = false;
    }, smooth ? 150 : 0);
  }, []);

  // Main scroll effect
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || !isTyping) return;

    const pos = calculateCursorPosition();
    if (!pos) return;

    const { cursorX, cursorY, currentCol, currentLine } = pos;
    const { lineHeight, scroll } = UI_CONFIG;
    const { horizontalMargin, leftMargin, verticalPadding } = scroll;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    let targetScrollLeft = scrollLeft;
    let targetScrollTop = scrollTop;
    let needsScroll = false;

    // === VERTICAL SCROLL ===
    const maxVisibleY = scrollTop + containerHeight - lineHeight - verticalPadding;
    if (cursorY > maxVisibleY) {
      targetScrollTop = cursorY - containerHeight + lineHeight + verticalPadding;
      needsScroll = true;
    }

    // === HORIZONTAL SCROLL ===
    const { prevLine } = scrollState.current;
    
    // Detect new line (column reset)
    const movedToNewLine = currentLine > prevLine && currentCol < 10;
    
    if (movedToNewLine) {
      // Reset to left on new line
      if (scrollLeft > 0) {
        targetScrollLeft = 0;
        needsScroll = true;
      }
    } else {
      // Check if cursor is beyond visible area (right)
      const visibleRight = scrollLeft + containerWidth - horizontalMargin;
      if (cursorX > visibleRight) {
        targetScrollLeft = cursorX - containerWidth + horizontalMargin + 50;
        needsScroll = true;
      }
      
      // Check if cursor is beyond visible area (left)
      const visibleLeft = scrollLeft + leftMargin;
      if (cursorX < visibleLeft && scrollLeft > 0) {
        targetScrollLeft = Math.max(0, cursorX - leftMargin);
        needsScroll = true;
      }
    }

    // Perform scroll if needed
    if (needsScroll) {
      scrollTo(container, targetScrollLeft, targetScrollTop, true);
    }

    // Update state for next comparison
    scrollState.current.prevCol = currentCol;
    scrollState.current.prevLine = currentLine;

  }, [displayedCode, isTyping, containerRef, calculateCursorPosition, scrollTo]);

  // Reset scroll state when typing stops
  useEffect(() => {
    if (!isTyping) {
      scrollState.current = {
        prevCol: 0,
        prevLine: 0,
        isScrolling: false,
      };
    }
  }, [isTyping]);

  // Get current cursor info (for external use)
  const getCursorInfo = useCallback(() => {
    return calculateCursorPosition();
  }, [calculateCursorPosition]);

  return {
    getCursorInfo,
  };
}
