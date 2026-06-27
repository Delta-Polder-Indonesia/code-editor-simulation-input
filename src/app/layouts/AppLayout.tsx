import { ReactNode, memo } from 'react';
import { TitleBar, MenuBar } from '../../shared/components';

// ============================================
// App Layout Component
// ============================================

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = memo(function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen bg-[#1e1e1e] flex flex-col overflow-hidden select-none">
      <TitleBar />
      <MenuBar />
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
});
