'use client';
import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';
// 상세페이지
import BoardsDetail from '@/components/boards-detail/detail'; // 분리한 컴포넌트 import

// 게시글 상세보기 페이지 컴포넌트
export default function BoardsDetailPage() {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
      <CommentList boardId={PathParamsContext.boardId} />
    </>
  );
}
