import { memo } from 'react';

// ============================================
// Title Bar Component (Window Header)
// ============================================

export const TitleBar = memo(function TitleBar() {
  return (
    <div className="bg-[#323233] h-8 flex items-center px-4 text-[#cccccc] text-sm shrink-0">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
      </div>
      <span className="flex-1 text-center text-xs">
        Auto Code Typer — VS Code Style
      </span>
    </div>
  );
});
