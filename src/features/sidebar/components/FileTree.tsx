import { memo } from 'react';
import { useEditorStore } from '../../../store';
import { FileIcon } from '../../../shared/components/icons';

// ============================================
// File Tree Component
// ============================================

export const FileTree = memo(function FileTree() {
  const fileName = useEditorStore((s) => s.fileName);

  return (
    <div className="p-2">
      <div className="text-[#cccccc] text-[11px] uppercase mb-2 font-semibold tracking-wide">
        Open Editors
      </div>
      
      <div className="flex items-center space-x-2 text-[#d4d4d4] text-xs py-1 px-2 bg-[#37373d] rounded">
        <FileIcon />
        <span className="truncate">{fileName}</span>
      </div>
      
      <div className="mt-3">
        <div className="text-[#cccccc] text-[11px] uppercase mb-2 font-semibold tracking-wide">
          📂 Project
        </div>
        
        <div className="space-y-0.5 text-[10px] text-[#cccccc]">
          <div className="flex items-center space-x-1.5 py-0.5 px-1 hover:bg-[#37373d] rounded cursor-default">
            <span className="text-[#e8ab53]">▾</span>
            <span>📁 src</span>
          </div>
          
          <div className="flex items-center space-x-1.5 py-0.5 px-1 pl-5 bg-[#37373d] rounded cursor-default">
            <FileIcon />
            <span>{fileName}</span>
          </div>
          
          <div className="flex items-center space-x-1.5 py-0.5 px-1 pl-5 hover:bg-[#37373d] rounded cursor-default text-[#858585]">
            <FileIcon />
            <span>index.html</span>
          </div>
          
          <div className="flex items-center space-x-1.5 py-0.5 px-1 hover:bg-[#37373d] rounded cursor-default text-[#858585]">
            <span className="text-[#e8ab53]">▸</span>
            <span>📁 node_modules</span>
          </div>
          
          <div className="flex items-center space-x-1.5 py-0.5 px-1 hover:bg-[#37373d] rounded cursor-default text-[#858585]">
            <FileIcon />
            <span>package.json</span>
          </div>
          
          <div className="flex items-center space-x-1.5 py-0.5 px-1 hover:bg-[#37373d] rounded cursor-default text-[#858585]">
            <FileIcon />
            <span>README.md</span>
          </div>
        </div>
      </div>
    </div>
  );
});
