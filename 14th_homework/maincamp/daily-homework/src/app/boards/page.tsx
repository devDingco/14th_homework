'use client';

import CarouselPage from '@/components/boards-list/banner';
import NewBoardsPage from '@/components/boards-list/list';

export default function BoardsListPage() {
  return (
    <div>
      <CarouselPage />
      <NewBoardsPage />
    </div>
  );
}
