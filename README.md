# 🎬 Auto Code Typer

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5.x-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**VS Code-style code typing animation tool dengan human-like realism**

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Architecture](#architecture) • [API Reference](#api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [File Reference](#file-reference)
- [State Management](#state-management)
- [Customization](#customization)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Auto Code Typer adalah aplikasi web yang mensimulasikan pengetikan kode secara real-time dengan tampilan VS Code. Cocok untuk:

- 📹 **Membuat video tutorial coding**
- 🎥 **Konten YouTube/TikTok programming**
- 🎨 **Presentasi live coding**
- 📚 **Demo aplikasi atau library**

---

## ✨ Features

### Core Features
- ⌨️ **Human-like Typing Animation** - Kecepatan bervariasi, jeda natural, dan typo realistis
- 💡 **IntelliSense Simulation** - Autocomplete popup seperti VS Code
- 🎨 **Syntax Highlighting** - Dukungan 20+ bahasa pemrograman
- 🔊 **Background Audio** - Upload MP3 untuk efek suara keyboard

### Editor Features
- 📁 **File Tree** - Tampilan project explorer
- 📍 **Line Numbers** - Nomor baris dinamis
- 🗺️ **Minimap** - Preview kode di sebelah kanan
- 📊 **Status Bar** - Informasi file dan progress

### Control Features
- ▶️ **Play/Pause/Stop** - Kontrol penuh atas animasi
- ⚡ **Adjustable Speed** - Atur kecepatan typing (10-200ms)
- ✏️ **Typo Rate** - Simulasi kesalahan ketik (0-20%)
- 🔄 **Auto-scroll Vertical** - Scroll otomatis ke bawah mengikuti cursor
- ↔️ **Auto-scroll Horizontal** - Scroll otomatis ke kanan untuk baris panjang
- ⬅️ **Smart Scroll Reset** - Otomatis kembali ke kiri saat baris baru

### Keyboard Shortcuts
- `Ctrl+Enter` - Start typing animation
- `Ctrl+P` - Pause/Resume typing
- `Escape` - Stop typing
- `Ctrl+B` - Toggle sidebar

---

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/auto-code-typer.git

# Navigate to directory
cd auto-code-typer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🏗️ Project Architecture

```
Feature-Based Architecture (Enterprise Scalable)
├── Separation of Concerns
├── Single Responsibility Principle
├── Zero Prop Drilling (Zustand)
├── Barrel Exports Pattern
└── Production Ready Structure
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **UI** | React 18 | Component library |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **State** | Zustand | Global state management |
| **Types** | TypeScript 5 | Type safety |
| **Build** | Vite | Fast bundling |

---

## 📁 Folder Structure

```
src/
├── 📂 app/                      # Application Layer
│   ├── 📄 App.tsx               # Root component (orchestrator)
│   └── 📂 layouts/              # Layout components
│       ├── 📄 index.ts          # Barrel export
│       ├── 📄 AppLayout.tsx     # Main app wrapper
│       └── 📄 MainEditorLayout.tsx # Editor area layout
│
├── 📂 features/                 # Feature Modules
│   ├── 📄 index.ts              # Features barrel export
│   │
│   ├── 📂 editor/               # 🖥️ Editor Feature
│   │   ├── 📄 index.ts          # Editor barrel export
│   │   ├── 📂 components/       # Editor UI components
│   │   ├── 📂 hooks/            # Editor-specific hooks
│   │   ├── 📂 utils/            # Editor utilities
│   │   └── 📂 types/            # Editor type definitions
│   │
│   ├── 📂 autocomplete/         # 💡 Autocomplete Feature
│   │   ├── 📄 index.ts          # Autocomplete barrel export
│   │   ├── 📂 components/       # Autocomplete popup
│   │   ├── 📂 hooks/            # Autocomplete logic
│   │   ├── 📂 constants/        # Suggestions database
│   │   └── 📂 utils/            # Suggestion helpers
│   │
│   └── 📂 sidebar/              # 📁 Sidebar Feature
│       ├── 📄 index.ts          # Sidebar barrel export
│       └── 📂 components/       # Sidebar UI components
│
├── 📂 shared/                   # Shared Resources
│   ├── 📄 index.ts              # Shared barrel export
│   ├── 📂 components/           # Reusable components
│   │   ├── 📂 icons/            # SVG icon components
│   │   └── 📄 ...               # Shared UI components
│   └── 📂 hooks/                # Shared custom hooks
│
├── 📂 store/                    # State Management
│   ├── 📄 index.ts              # Store barrel export
│   ├── 📄 editorStore.ts        # Editor settings state
│   ├── 📄 audioStore.ts         # Audio state & controls
│   └── 📄 typingStore.ts        # Typing animation state
│
├── 📂 lib/                      # Core Library
│   ├── 📄 index.ts              # Lib barrel export
│   ├── 📄 constants.ts          # App-wide constants
│   └── 📄 utils.ts              # Utility functions
│
├── 📂 types/                    # Global Types
│   └── 📄 index.ts              # Shared type definitions
│
├── 📄 main.tsx                  # Application entry point
└── 📄 index.css                 # Global styles (Tailwind)
```

---

## 📚 File Reference

### 🎯 Application Layer (`src/app/`)

#### `App.tsx`
**Purpose:** Root orchestrator component

```typescript
// Hanya 30 baris - tidak ada business logic
// Tugas: Compose semua feature components
function App() {
  return (
    <AppLayout>
      <AutocompletePopup />
      <ActivityBar />
      <Sidebar />
      <MainEditorLayout />
    </AppLayout>
  );
}
```

#### `layouts/AppLayout.tsx`
**Purpose:** Main application wrapper dengan TitleBar dan MenuBar

| Props | Type | Description |
|-------|------|-------------|
| `children` | `ReactNode` | Content to render |

#### `layouts/MainEditorLayout.tsx`
**Purpose:** Editor area layout dengan TabBar, Breadcrumb, CodeDisplay, Minimap, StatusBar

---

### 🖥️ Editor Feature (`src/features/editor/`)

#### `components/CodeDisplay.tsx`
**Purpose:** Area utama untuk menampilkan kode dengan syntax highlighting

| Features |
|----------|
| Syntax highlighting per line |
| Line numbers |
| Cursor blinking |
| Auto-scroll to bottom |
| Empty state message |

#### `components/StatusBar.tsx`
**Purpose:** Status bar dengan informasi file dan typing status

| Info Displayed |
|----------------|
| Typing status (Ready/Typing/Paused/Done) |
| Line & column position |
| File encoding (UTF-8) |
| Language name |
| IntelliSense status |
| Audio status |

#### `components/TabBar.tsx`
**Purpose:** Tab file seperti VS Code

#### `components/Breadcrumb.tsx`
**Purpose:** Path breadcrumb navigation

#### `components/Minimap.tsx`
**Purpose:** Preview kode di sisi kanan

---

#### `hooks/useTypingEngine.ts`
**Purpose:** Core engine untuk animasi typing

| Method | Description |
|--------|-------------|
| `startTyping()` | Mulai animasi typing |
| `pauseTyping()` | Pause/resume animasi |
| `stopTyping()` | Stop dan reset posisi |
| `resetAll()` | Reset semua state |

**Features:**
- Async typing loop dengan cancellation
- Variable speed untuk natural feel
- Typo simulation dengan nearby keys
- Autocomplete integration
- Audio synchronization

---

#### `utils/tokenizer.ts`
**Purpose:** Syntax highlighting tokenizer

| Token Types |
|-------------|
| `keyword` - Reserved words (const, function, etc) |
| `string` - String literals |
| `comment` - Comments |
| `number` - Numeric literals |
| `function` - Function names |
| `boolean` - true/false/null/undefined |
| `operator` - Operators |
| `tag` - JSX/HTML tags |
| `decorator` - @decorators |

#### `utils/typo.ts`
**Purpose:** Realistic typo generation

```typescript
// Menggunakan nearby keys pada keyboard
getRandomTypo('a') // Returns 's', 'q', 'w', or 'z'
```

#### `utils/editorStats.ts`
**Purpose:** Editor statistics calculation

```typescript
getEditorStats(code) // { lineCount, lastLineLength, lines }
getLanguageName(fileName) // 'TypeScript React'
```

---

#### `hooks/useEditorScroll.ts`
**Purpose:** Intelligent auto-scrolling for the code editor

| Feature | Description |
|---------|-------------|
| Vertical scroll | Follow cursor as it moves down |
| Horizontal scroll | Follow cursor on long lines |
| Smart reset | Scroll back to left on new line |
| Smooth animation | CSS smooth scroll behavior |

```typescript
const { getCursorInfo } = useEditorScroll({
  containerRef,    // Ref to scroll container
  displayedCode,   // Current displayed code
  isTyping,        // Whether typing is active
});

// Returns cursor position info
getCursorInfo() // { cursorX, cursorY, currentCol, currentLine }
```

---

### 💡 Autocomplete Feature (`src/features/autocomplete/`)

#### `components/AutocompletePopup.tsx`
**Purpose:** IntelliSense-style autocomplete popup

| Features |
|----------|
| Smart positioning (above/below cursor) |
| Suggestion list with icons |
| Detail panel |
| Keyboard-style selection animation |

#### `hooks/useAutocomplete.ts`
**Purpose:** Autocomplete logic dan positioning

| Method | Description |
|--------|-------------|
| `showAcPopup(text, code)` | Show autocomplete |
| `hideAcPopup()` | Hide autocomplete |

#### `constants/suggestions.ts`
**Purpose:** Database 100+ suggestions

| Categories |
|------------|
| JavaScript/TypeScript keywords |
| Built-in functions & methods |
| React hooks |
| Array/String methods |
| Common constants |

#### `utils/suggestionHelpers.ts`
**Purpose:** Suggestion filtering dan ranking

```typescript
getCurrentWord(text) // Extract word being typed
getSuggestions(word, code) // Get matching suggestions
```

---

### 📁 Sidebar Feature (`src/features/sidebar/`)

#### `components/Sidebar.tsx`
**Purpose:** Main sidebar container

#### `components/CodeInput.tsx`
**Purpose:** Textarea untuk paste kode

| Features |
|----------|
| Character count |
| Line count |
| Disabled saat typing |

#### `components/Controls.tsx`
**Purpose:** Playback dan settings controls

| Controls |
|----------|
| Play/Pause/Stop buttons |
| Progress bar |
| Speed slider (10-200ms) |
| Typo rate slider (0-20%) |
| IntelliSense toggle |
| File name input |

#### `components/AudioUpload.tsx`
**Purpose:** Audio file upload dan controls

| Features |
|----------|
| File upload (MP3, WAV, etc) |
| Volume slider |
| Loop toggle |
| Remove audio |

#### `components/FileTree.tsx`
**Purpose:** Decorative file tree display

---

### 🔧 Shared Resources (`src/shared/`)

#### `components/icons/index.tsx`
**Purpose:** SVG icon components

| Icons |
|-------|
| FileIcon, PlayIcon, StopIcon, PauseIcon |
| ExplorerIcon, SearchIcon |
| SourceControlIcon, ExtensionsIcon |
| MusicIcon |

#### `components/TitleBar.tsx`
**Purpose:** Window title bar dengan traffic light buttons

#### `components/MenuBar.tsx`
**Purpose:** Menu bar (File, Edit, View, etc)

#### `components/ActivityBar.tsx`
**Purpose:** Left icon sidebar dengan navigation

#### `components/HighlightedLine.tsx`
**Purpose:** Single line dengan syntax highlighting

#### `hooks/useCursorBlink.ts`
**Purpose:** Cursor blinking effect hook

---

### 📦 State Management (`src/store/`)

#### `editorStore.ts`
**Purpose:** Editor settings dengan localStorage persistence

| State | Type | Description |
|-------|------|-------------|
| `fileName` | `string` | Current file name |
| `sidebarOpen` | `boolean` | Sidebar visibility |
| `typingSpeed` | `number` | Typing delay (ms) |
| `typoFrequency` | `number` | Typo rate (%) |
| `showAutocomplete` | `boolean` | IntelliSense toggle |
| `inputCode` | `string` | Source code to type |

#### `audioStore.ts`
**Purpose:** Audio playback state

| State | Type | Description |
|-------|------|-------------|
| `audioFileName` | `string` | Uploaded file name |
| `audioUrl` | `string` | Blob URL |
| `audioVolume` | `number` | Volume (0-100) |
| `audioLoop` | `boolean` | Loop toggle |
| `audioElement` | `HTMLAudioElement` | Audio instance |

| Actions |
|---------|
| `playAudio()` |
| `pauseAudio()` |
| `resumeAudio()` |
| `stopAudio()` |
| `clearAudio()` |

#### `typingStore.ts`
**Purpose:** Typing animation state

| State | Type | Description |
|-------|------|-------------|
| `displayedCode` | `string` | Currently displayed code |
| `isTyping` | `boolean` | Typing in progress |
| `isPaused` | `boolean` | Animation paused |
| `progress` | `number` | Progress percentage |
| `currentIndex` | `number` | Current char position |
| `stopFlag` | `number` | Cancellation flag |
| `acVisible` | `boolean` | Autocomplete visible |
| `acSuggestions` | `Suggestion[]` | Current suggestions |
| `acPosition` | `{top, left}` | Popup position |

---

### 📚 Core Library (`src/lib/`)

#### `constants.ts`
**Purpose:** Application-wide constants

```typescript
APP_CONFIG        // App metadata
EDITOR_DEFAULTS   // Default settings
TYPING_CONFIG     // Typing animation config
AUDIO_DEFAULTS    // Audio defaults
UI_CONFIG         // UI dimensions
KEYBOARD_SHORTCUTS // Shortcut keys
FILE_EXTENSIONS   // Language mapping
DEFAULT_CODE      // Initial code template
```

#### `utils.ts`
**Purpose:** Utility functions

| Function | Description |
|----------|-------------|
| `sleep(ms)` | Async delay |
| `randomInRange(min, max)` | Random number |
| `checkProbability(p)` | Probability check |
| `clamp(val, min, max)` | Clamp number |
| `getLanguageFromFileName(name)` | Get language |
| `formatNumber(num)` | Format with locale |
| `debounce(fn, delay)` | Debounce function |
| `throttle(fn, limit)` | Throttle function |
| `deepFreeze(obj)` | Immutable object |
| `isCodeEmpty(code)` | Check empty code |
| `countLines(code)` | Count lines |
| `generateId()` | Unique ID |
| `cx(...classes)` | Class concatenation |

---

### 🔤 Global Types (`src/types/`)

#### `index.ts`
**Purpose:** Shared type definitions

```typescript
type TokenType = 'keyword' | 'string' | 'comment' | ...;

interface Token {
  type: TokenType;
  value: string;
}

interface Suggestion {
  word: string;
  kind: string;
  detail: string;
}

interface AutocompletePosition {
  top: number;
  left: number;
}

interface EditorStats {
  lineCount: number;
  lastLineLength: number;
  lines: string[];
}
```

---

## 🎮 State Management

### Zustand Store Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Components                          │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ editorStore │  │ audioStore  │  │ typingStore │
│ (persisted) │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Store Access Pattern

```typescript
// Di dalam component
const fileName = useEditorStore((s) => s.fileName);
const { playAudio, stopAudio } = useAudioStore();
const isTyping = useTypingStore((s) => s.isTyping);

// Di luar component (untuk async functions)
const state = useTypingStore.getState();
```

---

## 🎨 Customization

### Mengubah Warna Syntax

Edit `src/features/editor/utils/tokenizer.ts`:

```typescript
export const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: 'text-[#569cd6]',    // Ubah warna keyword
  string: 'text-[#ce9178]',     // Ubah warna string
  // ...
};
```

### Menambah Suggestions

Edit `src/features/autocomplete/constants/suggestions.ts`:

```typescript
export const SUGGESTION_DB: Suggestion[] = [
  // Tambah suggestion baru
  { word: 'myFunction', kind: 'function', detail: 'Custom function' },
];
```

### Mengubah Default Settings

Edit `src/lib/constants.ts`:

```typescript
export const EDITOR_DEFAULTS = {
  typingSpeed: 50,      // Default speed
  typoFrequency: 5,     // Default typo rate
  // ...
};
```

---

## 🔌 API Reference

### useTypingEngine Hook

```typescript
const {
  startTyping,   // () => void
  pauseTyping,   // () => void
  stopTyping,    // () => void
  resetAll,      // () => void
} = useTypingEngine();
```

### useAutocompleteEngine Hook

```typescript
const {
  showAcPopup,   // (text: string, fullCode: string) => void
  hideAcPopup,   // () => void
} = useAutocompleteEngine();
```

### Store Actions

```typescript
// Editor Store
useEditorStore.getState().setTypingSpeed(100);
useEditorStore.getState().setInputCode('const x = 1;');

// Audio Store
useAudioStore.getState().playAudio();
useAudioStore.getState().setAudioVolume(75);

// Typing Store
useTypingStore.getState().resetAll();
```

---

## 🧪 Development

### Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run ESLint
npm run typecheck # TypeScript check
```

### Adding New Features

1. Create folder di `src/features/[feature-name]/`
2. Buat struktur: `components/`, `hooks/`, `utils/`, `types/`
3. Export dari `index.ts`
4. Tambahkan ke `src/features/index.ts`

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Tailwind CSS**

</div>
