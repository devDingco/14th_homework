import HistoryBookmarkLayout from '@/commons/mypage/layouts/history-bookmark/history-bookmark-layout';
import { ReactNode } from 'react';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div>
      <HistoryBookmarkLayout />
      {children}
    </div>
  );
}
