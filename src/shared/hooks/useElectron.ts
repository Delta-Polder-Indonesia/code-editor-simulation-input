import { useEffect, useState, useCallback } from 'react';

// ============================================
// Electron Integration Hook
// Provides access to Electron APIs when running in Electron
// Falls back gracefully when running in browser
// ============================================

interface UseElectronReturn {
  // State
  isElectron: boolean;
  appVersion: string | null;
  platform: string | null;
  
  // Methods
  openAudioFile: () => Promise<string | null>;
  saveCodeFile: (defaultName: string) => Promise<string | null>;
}

/**
 * Check if running in Electron environment
 */
export function isElectronEnvironment(): boolean {
  return typeof window !== 'undefined' && !!window.electronAPI;
}

/**
 * Hook for Electron integration
 * Provides Electron APIs with browser fallbacks
 */
export function useElectron(): UseElectronReturn {
  const [isElectron] = useState(() => isElectronEnvironment());
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);

  // Fetch app info on mount
  useEffect(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.getAppVersion().then(setAppVersion);
      window.electronAPI.getPlatform().then(setPlatform);
    }
  }, [isElectron]);

  // Open audio file dialog
  const openAudioFile = useCallback(async (): Promise<string | null> => {
    if (isElectron && window.electronAPI) {
      return window.electronAPI.openAudioFile();
    }
    // Browser fallback - trigger file input click
    return null;
  }, [isElectron]);

  // Save code file dialog
  const saveCodeFile = useCallback(async (defaultName: string): Promise<string | null> => {
    if (isElectron && window.electronAPI) {
      return window.electronAPI.saveCodeFile(defaultName);
    }
    // Browser fallback
    return null;
  }, [isElectron]);

  return {
    isElectron,
    appVersion,
    platform,
    openAudioFile,
    saveCodeFile,
  };
}

/**
 * Hook for Electron menu events
 * Subscribes to menu actions from main process
 */
export function useElectronMenuEvents(handlers: {
  onNewSession?: () => void;
  onStartTyping?: () => void;
  onPauseTyping?: () => void;
  onStopTyping?: () => void;
  onToggleSidebar?: () => void;
}) {
  useEffect(() => {
    if (!isElectronEnvironment() || !window.electronAPI) return;

    const cleanups: (() => void)[] = [];

    if (handlers.onNewSession) {
      cleanups.push(window.electronAPI.onMenuNewSession(handlers.onNewSession));
    }
    if (handlers.onStartTyping) {
      cleanups.push(window.electronAPI.onMenuStartTyping(handlers.onStartTyping));
    }
    if (handlers.onPauseTyping) {
      cleanups.push(window.electronAPI.onMenuPauseTyping(handlers.onPauseTyping));
    }
    if (handlers.onStopTyping) {
      cleanups.push(window.electronAPI.onMenuStopTyping(handlers.onStopTyping));
    }
    if (handlers.onToggleSidebar) {
      cleanups.push(window.electronAPI.onMenuToggleSidebar(handlers.onToggleSidebar));
    }

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [handlers]);
}
