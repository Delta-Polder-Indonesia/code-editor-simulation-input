import { AppLayout, MainEditorLayout } from './layouts';
import { ActivityBar } from '../shared/components';
import { Sidebar } from '../features/sidebar';
import { AutocompletePopup } from '../features/autocomplete';
import { useKeyboardShortcuts } from '../features/editor';

// ============================================
// App Component
// Root orchestrator - no business logic
// ============================================

function App() {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

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
