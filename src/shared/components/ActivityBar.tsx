import { memo } from 'react';
import { useEditorStore } from '../../store';
import { ExplorerIcon, SearchIcon, SourceControlIcon, ExtensionsIcon } from './icons';

// ============================================
// Activity Bar Component (Left Icon Sidebar)
// ============================================

export const ActivityBar = memo(function ActivityBar() {
  const { sidebarOpen, toggleSidebar } = useEditorStore();

  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2 space-y-1 shrink-0 border-r border-[#252526]">
      <button
        onClick={toggleSidebar}
        className={`p-2 cursor-pointer transition-colors relative group ${
          sidebarOpen ? 'text-white' : 'text-[#858585] hover:text-white'
        }`}
        title="Explorer (Ctrl+Shift+E)"
      >
        {sidebarOpen && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
        )}
        <ExplorerIcon />
      </button>
      
      <button 
        className="p-2 text-[#858585] hover:text-white cursor-pointer transition-colors" 
        title="Search (Ctrl+Shift+F)"
      >
        <SearchIcon />
      </button>
      
      <button 
        className="p-2 text-[#858585] hover:text-white cursor-pointer transition-colors" 
        title="Source Control (Ctrl+Shift+G)"
      >
        <SourceControlIcon />
      </button>
      
      <button 
        className="p-2 text-[#858585] hover:text-white cursor-pointer transition-colors" 
        title="Extensions (Ctrl+Shift+X)"
      >
        <ExtensionsIcon />
      </button>
    </div>
  );
});
