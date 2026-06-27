import { memo } from 'react';
import { useEditorStore } from '../../../store';

// ============================================
// Breadcrumb Component
// ============================================

export const Breadcrumb = memo(function Breadcrumb() {
  const fileName = useEditorStore((s) => s.fileName);

  return (
    <div className="h-6 bg-[#1e1e1e] flex items-center px-4 text-[#858585] text-xs border-b border-[#3c3c3c] shrink-0">
      <span>src</span>
      <span className="mx-1.5 text-[#555]">›</span>
      <span className="truncate text-[#cccccc]">{fileName}</span>
    </div>
  );
});
