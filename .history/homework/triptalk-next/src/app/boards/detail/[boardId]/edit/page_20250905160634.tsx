'use client';
//수정페이지
import BoardsWrite from '@/components/boards-write';

export default function BoardsEdit() {
  return (
    <div>
      <BoardsWrite isEdit{true} />
    </div>
  );
}
