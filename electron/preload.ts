import { contextBridge, ipcRenderer } from 'electron';

// ============================================
// Electron Preload Script
// Exposes safe APIs to the renderer process
// ============================================

// Define the API that will be exposed to the renderer
const electronAPI = {
  // App info
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('get-app-version'),
  getPlatform: (): Promise<string> => ipcRenderer.invoke('get-platform'),
  
  // File dialogs
  openAudioFile: (): Promise<string | null> => ipcRenderer.invoke('open-audio-file'),
  saveCodeFile: (defaultName: string): Promise<string | null> => 
    ipcRenderer.invoke('save-code-file', defaultName),
  
  // Menu event listeners
  onMenuNewSession: (callback: () => void) => {
    ipcRenderer.on('menu-new-session', callback);
    return () => ipcRenderer.removeListener('menu-new-session', callback);
  },
  onMenuStartTyping: (callback: () => void) => {
    ipcRenderer.on('menu-start-typing', callback);
    return () => ipcRenderer.removeListener('menu-start-typing', callback);
  },
  onMenuPauseTyping: (callback: () => void) => {
    ipcRenderer.on('menu-pause-typing', callback);
    return () => ipcRenderer.removeListener('menu-pause-typing', callback);
  },
  onMenuStopTyping: (callback: () => void) => {
    ipcRenderer.on('menu-stop-typing', callback);
    return () => ipcRenderer.removeListener('menu-stop-typing', callback);
  },
  onMenuToggleSidebar: (callback: () => void) => {
    ipcRenderer.on('menu-toggle-sidebar', callback);
    return () => ipcRenderer.removeListener('menu-toggle-sidebar', callback);
  },
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type declaration for TypeScript
export type ElectronAPI = typeof electronAPI;
