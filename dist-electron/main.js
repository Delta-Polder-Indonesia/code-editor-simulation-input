"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// ============================================
// Electron Main Process
// Auto Code Typer Desktop Application
// ============================================
// NOTE:
// We intentionally avoid electron-squirrel-startup here so dev mode
// can run without adding extra installer-only dependency.
// Keep a global reference of the window object
let mainWindow = null;
// Check if running in development mode
const isDev = process.env.NODE_ENV === 'development' || !electron_1.app.isPackaged;
/**
 * Create the main application window
 */
function createWindow() {
    // Create the browser window
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        title: 'Auto Code Typer',
        icon: path.join(__dirname, '../public/icon.png'),
        backgroundColor: '#1e1e1e',
        // Window frame settings
        frame: true,
        titleBarStyle: 'default',
        // Web preferences
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            // Security settings
            webSecurity: true,
            allowRunningInsecureContent: false,
        },
        // Show window when ready
        show: false,
    });
    // Load the app
    if (isDev) {
        // In development, load from Vite dev server
        mainWindow.loadURL('http://localhost:5173');
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
    }
    else {
        // In production, load the built index.html
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    // Show window when ready to avoid visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
        mainWindow?.focus();
    });
    // Handle external links - open in default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        electron_1.shell.openExternal(url);
        return { action: 'deny' };
    });
    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Create application menu
    createMenu();
}
/**
 * Create application menu
 */
function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Session',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow?.webContents.send('menu-new-session');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Alt+F4',
                    click: () => {
                        electron_1.app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            label: 'Controls',
            submenu: [
                {
                    label: 'Start Typing',
                    accelerator: 'CmdOrCtrl+Enter',
                    click: () => {
                        mainWindow?.webContents.send('menu-start-typing');
                    },
                },
                {
                    label: 'Pause/Resume',
                    accelerator: 'CmdOrCtrl+P',
                    click: () => {
                        mainWindow?.webContents.send('menu-pause-typing');
                    },
                },
                {
                    label: 'Stop',
                    accelerator: 'Escape',
                    click: () => {
                        mainWindow?.webContents.send('menu-stop-typing');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Toggle Sidebar',
                    accelerator: 'CmdOrCtrl+B',
                    click: () => {
                        mainWindow?.webContents.send('menu-toggle-sidebar');
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About Auto Code Typer',
                    click: () => {
                        electron_1.dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About Auto Code Typer',
                            message: 'Auto Code Typer v1.0.0',
                            detail: 'VS Code-style code typing animation tool.\n\nBuilt with React, TypeScript, and Electron.',
                        });
                    },
                },
                { type: 'separator' },
                {
                    label: 'GitHub Repository',
                    click: () => {
                        electron_1.shell.openExternal('https://github.com/yourusername/auto-code-typer');
                    },
                },
            ],
        },
    ];
    // macOS specific menu adjustments
    if (process.platform === 'darwin') {
        template.unshift({
            label: electron_1.app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ],
        });
    }
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
// ============================================
// App Lifecycle Events
// ============================================
// This method will be called when Electron has finished initialization
electron_1.app.whenReady().then(() => {
    createWindow();
    // On macOS, re-create window when dock icon is clicked
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Quit when all windows are closed (except on macOS)
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// ============================================
// IPC Handlers
// ============================================
// Handle app version request
electron_1.ipcMain.handle('get-app-version', () => {
    return electron_1.app.getVersion();
});
// Handle platform info request
electron_1.ipcMain.handle('get-platform', () => {
    return process.platform;
});
// Handle open file dialog
electron_1.ipcMain.handle('open-audio-file', async () => {
    const result = await electron_1.dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'm4a', 'flac'] },
            { name: 'All Files', extensions: ['*'] },
        ],
    });
    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
    }
    return null;
});
// Handle save file dialog
electron_1.ipcMain.handle('save-code-file', async (_event, defaultName) => {
    const result = await electron_1.dialog.showSaveDialog(mainWindow, {
        defaultPath: defaultName,
        filters: [
            { name: 'TypeScript', extensions: ['ts', 'tsx'] },
            { name: 'JavaScript', extensions: ['js', 'jsx'] },
            { name: 'All Files', extensions: ['*'] },
        ],
    });
    if (!result.canceled && result.filePath) {
        return result.filePath;
    }
    return null;
});
// ============================================
// Security: Disable navigation to external URLs
// ============================================
electron_1.app.on('web-contents-created', (_event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        // Only allow navigation to localhost in dev or file:// in production
        if (isDev) {
            if (parsedUrl.origin !== 'http://localhost:5173') {
                event.preventDefault();
            }
        }
        else {
            if (parsedUrl.protocol !== 'file:') {
                event.preventDefault();
            }
        }
    });
});
//# sourceMappingURL=main.js.map