import { memo } from 'react';
import { useEditorStore } from '../../../store';
import { FileIcon } from '../../../shared/components/icons';

// ============================================
// Tab Bar Component
// ============================================

export const TabBar = memo(function TabBar() {
  const fileName = useEditorStore((s) => s.fileName);

  return (
    <div className="h-9 bg-[#252526] flex items-center border-b border-[#3c3c3c] shrink-0">
      <div className="flex items-center space-x-2 px-4 py-2 bg-[#1e1e1e] text-[#ffffff] text-xs border-t-2 border-t-[#007acc] max-w-[200px]">
        <FileIcon />
        <span className="truncate">{fileName}</span>
        <span className="text-[#858585] hover:text-white cursor-default ml-auto">
          ×
        </span>
      </div>
    </div>
  );
});
