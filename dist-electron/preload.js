"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// ============================================
// Electron Preload Script
// Exposes safe APIs to the renderer process
// ============================================
// Define the API that will be exposed to the renderer
const electronAPI = {
    // App info
    getAppVersion: () => electron_1.ipcRenderer.invoke('get-app-version'),
    getPlatform: () => electron_1.ipcRenderer.invoke('get-platform'),
    // File dialogs
    openAudioFile: () => electron_1.ipcRenderer.invoke('open-audio-file'),
    saveCodeFile: (defaultName) => electron_1.ipcRenderer.invoke('save-code-file', defaultName),
    // Menu event listeners
    onMenuNewSession: (callback) => {
        electron_1.ipcRenderer.on('menu-new-session', callback);
        return () => electron_1.ipcRenderer.removeListener('menu-new-session', callback);
    },
    onMenuStartTyping: (callback) => {
        electron_1.ipcRenderer.on('menu-start-typing', callback);
        return () => electron_1.ipcRenderer.removeListener('menu-start-typing', callback);
    },
    onMenuPauseTyping: (callback) => {
        electron_1.ipcRenderer.on('menu-pause-typing', callback);
        return () => electron_1.ipcRenderer.removeListener('menu-pause-typing', callback);
    },
    onMenuStopTyping: (callback) => {
        electron_1.ipcRenderer.on('menu-stop-typing', callback);
        return () => electron_1.ipcRenderer.removeListener('menu-stop-typing', callback);
    },
    onMenuToggleSidebar: (callback) => {
        electron_1.ipcRenderer.on('menu-toggle-sidebar', callback);
        return () => electron_1.ipcRenderer.removeListener('menu-toggle-sidebar', callback);
    },
};
// Expose the API to the renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', electronAPI);
//# sourceMappingURL=preload.js.map