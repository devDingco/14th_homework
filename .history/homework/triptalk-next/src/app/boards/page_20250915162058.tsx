'use client';
//게시글 목록 페이지
import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';

export default function BoardsPage() {
  return (
    <>
      <BoardsList />
      <Pagination />
    </>
  );
}
