import { useEffect, useCallback } from 'react';
import { useEditorStore, useTypingStore } from '../../../store';
import { useTypingEngine } from './useTypingEngine';

// ============================================
// Keyboard Shortcuts Hook
// Handles global keyboard shortcuts for the app
// ============================================

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const { toggleSidebar } = useEditorStore();
  const isTyping = useTypingStore((s) => s.isTyping);
  const { startTyping, pauseTyping, stopTyping } = useTypingEngine();

  const shortcuts: ShortcutConfig[] = [
    {
      key: 'Enter',
      ctrl: true,
      action: () => {
        if (!isTyping) {
          startTyping();
        }
      },
      description: 'Start typing animation',
    },
    {
      key: 'p',
      ctrl: true,
      action: () => {
        if (isTyping) {
          pauseTyping();
        }
      },
      description: 'Pause/Resume typing',
    },
    {
      key: 'Escape',
      action: () => {
        if (isTyping) {
          stopTyping();
        }
      },
      description: 'Stop typing animation',
    },
    {
      key: 'b',
      ctrl: true,
      action: () => {
        toggleSidebar();
      },
      description: 'Toggle sidebar',
    },
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if user is typing in an input/textarea
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }

    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        event.preventDefault();
        shortcut.action();
        return;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { shortcuts };
}
