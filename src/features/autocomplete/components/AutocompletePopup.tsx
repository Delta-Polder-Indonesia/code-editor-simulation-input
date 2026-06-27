import { memo } from 'react';
import { useTypingStore } from '../../../store';
import { SUGGESTION_ICONS } from '../constants/suggestions';

// ============================================
// Autocomplete Popup Component
// ============================================

export const AutocompletePopup = memo(function AutocompletePopup() {
  const { acVisible, acSuggestions, acSelectedIndex, acPosition } = useTypingStore();

  if (!acVisible || acSuggestions.length === 0) return null;

  // Calculate if popup should appear above or below cursor
  const viewportHeight = window.innerHeight;
  const popupHeight = Math.min(acSuggestions.length * 24 + 50, 270);
  const shouldShowAbove = acPosition.top + popupHeight > viewportHeight - 50;

  const adjustedTop = shouldShowAbove 
    ? acPosition.top - popupHeight - 10 
    : acPosition.top;

  // Ensure popup doesn't go off-screen horizontally
  const viewportWidth = window.innerWidth;
  const popupWidth = 400;
  const adjustedLeft = Math.min(acPosition.left, viewportWidth - popupWidth - 20);

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{ 
        top: `${Math.max(adjustedTop, 10)}px`, 
        left: `${Math.max(adjustedLeft, 10)}px`,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Main suggestions list */}
      <div className="bg-[#252526] border border-[#454545] rounded shadow-2xl min-w-[320px] max-w-[400px] max-h-[220px] overflow-hidden pointer-events-auto">
        <div className="overflow-y-auto max-h-[200px] py-0.5">
          {acSuggestions.map((item, idx) => {
            const iconInfo = SUGGESTION_ICONS[item.kind] || SUGGESTION_ICONS['variable'];
            const isSelected = idx === acSelectedIndex;
            return (
              <div
                key={idx}
                className={`flex items-center px-2 py-[2px] text-xs cursor-default ${
                  isSelected 
                    ? 'bg-[#04395e] text-white' 
                    : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center mr-1.5 text-[10px] shrink-0">
                  {iconInfo.icon}
                </span>
                <span className={`truncate ${isSelected ? 'text-white font-medium' : iconInfo.color}`}>
                  {item.word}
                </span>
                <span className="ml-auto pl-4 text-[10px] text-[#808080] truncate max-w-[150px]">
                  {item.detail}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel for selected item */}
      {acSuggestions[acSelectedIndex] && (
        <div className="bg-[#252526] border border-[#454545] border-t-0 rounded-b px-3 py-2 min-w-[320px] max-w-[400px] pointer-events-auto">
          <div className="text-[11px] text-[#cccccc] font-mono break-all">
            {acSuggestions[acSelectedIndex].detail}
          </div>
        </div>
      )}
    </div>
  );
});
