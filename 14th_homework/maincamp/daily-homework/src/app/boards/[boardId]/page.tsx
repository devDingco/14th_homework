'use client';

import Detail from '@/components/boards-detail/detail';
import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';
import { useParams } from 'next/navigation';

export default function BoardDetailPage() {
  const params = useParams();
  const boardId = String(params.boardId);

  return (
    <div>
      <Detail isEdit={false} ID={boardId} />
      <CommentWrite />
      <CommentList />
    </div>
  );
}
