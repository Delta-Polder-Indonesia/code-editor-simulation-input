import { useCallback } from 'react';
import { AppLayout, MainEditorLayout } from './layouts';
import { ActivityBar } from '../shared/components';
import { useElectronMenuEvents } from '../shared/hooks';
import { Sidebar } from '../features/sidebar';
import { AutocompletePopup } from '../features/autocomplete';
import { useKeyboardShortcuts, useTypingEngine } from '../features/editor';
import { useEditorStore, useTypingStore } from '../store';

// ============================================
// App Component
// Root orchestrator - no business logic
// Handles both web and Electron environments
// ============================================

function App() {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  // Get store actions
  const { toggleSidebar } = useEditorStore();
  const resetAll = useTypingStore((s) => s.resetAll);
  
  // Get typing engine actions
  const { startTyping, pauseTyping, stopTyping } = useTypingEngine();

  // Handlers for Electron menu events
  const handleNewSession = useCallback(() => {
    resetAll();
  }, [resetAll]);

  // Subscribe to Electron menu events (no-op if not in Electron)
  useElectronMenuEvents({
    onNewSession: handleNewSession,
    onStartTyping: startTyping,
    onPauseTyping: pauseTyping,
    onStopTyping: stopTyping,
    onToggleSidebar: toggleSidebar,
  });

  return (
    <AppLayout>
      {/* Autocomplete Popup - Fixed positioned overlay */}
      <AutocompletePopup />

      {/* Activity Bar - Left icon sidebar */}
      <ActivityBar />

      {/* Explorer Sidebar */}
      <Sidebar />

      {/* Main Editor Area */}
      <MainEditorLayout />
    </AppLayout>
  );
}

export default App;
