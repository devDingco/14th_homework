'use client';
//게시글 목록 페이지
import BoardsList from '@/components/boards-list/list';
import Banner from '@/components/boards-list/banner';
import TooltipLocation from './tooltip';

export default function BoardsPage() {
  return (
    <>
      <Banner />
      <BoardsList />
    </>
  );
}
