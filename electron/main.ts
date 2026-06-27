import { app, BrowserWindow, ipcMain, shell, Menu, dialog } from 'electron';
import * as path from 'path';

// ============================================
// Electron Main Process
// Auto Code Typer Desktop Application
// ============================================

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

// Check if running in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

/**
 * Create the main application window
 */
function createWindow(): void {
  // Create the browser window
  mainWindow = new BrowserWindow({
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
  } else {
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
    shell.openExternal(url);
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
function createMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
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
            app.quit();
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
            dialog.showMessageBox(mainWindow!, {
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
            shell.openExternal('https://github.com/yourusername/auto-code-typer');
          },
        },
      ],
    },
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ============================================
// App Lifecycle Events
// ============================================

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ============================================
// IPC Handlers
// ============================================

// Handle app version request
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Handle platform info request
ipcMain.handle('get-platform', () => {
  return process.platform;
});

// Handle open file dialog
ipcMain.handle('open-audio-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
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
ipcMain.handle('save-code-file', async (_event, defaultName: string) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
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

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Only allow navigation to localhost in dev or file:// in production
    if (isDev) {
      if (parsedUrl.origin !== 'http://localhost:5173') {
        event.preventDefault();
      }
    } else {
      if (parsedUrl.protocol !== 'file:') {
        event.preventDefault();
      }
    }
  });
});
