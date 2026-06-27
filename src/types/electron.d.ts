// ============================================
// Electron API Type Declarations
// ============================================

export interface ElectronAPI {
  // App info
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  
  // File dialogs
  openAudioFile: () => Promise<string | null>;
  saveCodeFile: (defaultName: string) => Promise<string | null>;
  
  // Menu event listeners (return cleanup function)
  onMenuNewSession: (callback: () => void) => () => void;
  onMenuStartTyping: (callback: () => void) => () => void;
  onMenuPauseTyping: (callback: () => void) => () => void;
  onMenuStopTyping: (callback: () => void) => () => void;
  onMenuToggleSidebar: (callback: () => void) => () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
