import { memo, useRef } from 'react';
import { TabBar, Breadcrumb, CodeDisplay, Minimap, StatusBar } from '../../features/editor';

// ============================================
// Main Editor Layout Component
// ============================================

export const MainEditorLayout = memo(function MainEditorLayout() {
  const codeDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0 relative overflow-hidden">
      <TabBar />
      <Breadcrumb />
      <CodeDisplay codeDisplayRef={codeDisplayRef} />
      <Minimap />
      <StatusBar />
    </div>
  );
});
