'use client';

import { useParams } from 'next/navigation';
import Board from '@/commons/writing-board/board';

export default function EditBoardPage() {
  const params = useParams();
  const boardId = params.id as string;

  return <Board type="edit" boardId={boardId} />;
}
