import { memo } from 'react';
import { useEditorStore } from '../../../store';
import { CodeInput } from './CodeInput';
import { AudioUpload } from './AudioUpload';
import { Controls } from './Controls';
import { FileTree } from './FileTree';

// ============================================
// Sidebar Component
// ============================================

export const Sidebar = memo(function Sidebar() {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);

  return (
    <div 
      className={`bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 border-r-0'
      }`}
    >
      <div 
        className={`flex flex-col h-full overflow-y-auto overflow-x-hidden min-w-[288px] ${
          sidebarOpen ? '' : 'invisible'
        }`}
      >
        <div className="p-3 text-[#bbbbbb] text-[11px] uppercase tracking-wider font-semibold">
          Explorer
        </div>

        <CodeInput />
        <AudioUpload />
        <Controls />
        <FileTree />
      </div>
    </div>
  );
});
