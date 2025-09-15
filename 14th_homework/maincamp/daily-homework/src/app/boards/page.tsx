'use client';

import NewBoardsPage from '@/components/boards-list/list';
import BannerCarousel from '@/commons/layout/banner';

export default function BoardsListPage() {
  return (
    <div>
      <BannerCarousel />
      <NewBoardsPage />
    </div>
  );
}
