// 게시글상세 페이지

'use client';
import CommentWrite from '@/components/boards-detail/comment-write';
import styles from './styles.module.css';
import Detail from '@/components/boards-detail/detail';
import { useParams } from 'next/navigation';

export default function BoardComponentDetailPage() {
  const params = useParams();
  const boardId = params?.boardId as string;

  return (
    <div className={styles.D_layout}>
      <Detail isEdit={true} ID={boardId} />
      <CommentWrite />
    </div>
  );
}
