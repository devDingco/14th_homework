'use client';

import { useState } from 'react';
import MyMenu from "./(mypage-layout)/my-menu";
import { MenuId } from '@lib/types/mypage';
import HistoryBookmarkComponent from "./(mypage-layout)/components/HistoryBookmarkComponent";
import PointComponent from "./(mypage-layout)/components/PointComponent";
import PasswordComponent from "./(mypage-layout)/components/PasswordComponent";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<MenuId>('history&bookmark');

  const renderContent = () => {
    switch (activeMenu) {
      case 'history&bookmark':
        return <HistoryBookmarkComponent />;
      case 'point':
        return <PointComponent />;
      case 'password':
        return <PasswordComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <MyMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      {renderContent()}
    </div>
  );
}