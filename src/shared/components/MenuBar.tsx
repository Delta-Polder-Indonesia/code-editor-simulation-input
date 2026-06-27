import { memo } from 'react';

// ============================================
// Menu Bar Component
// ============================================

const MENU_ITEMS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'] as const;

export const MenuBar = memo(function MenuBar() {
  return (
    <div className="bg-[#3c3c3c] h-9 flex items-center px-4 text-[#cccccc] text-sm space-x-1 shrink-0">
      {MENU_ITEMS.map(item => (
        <span 
          key={item} 
          className="hover:bg-[#505050] px-2 py-1 rounded cursor-default text-xs"
        >
          {item}
        </span>
      ))}
    </div>
  );
});
