'use client';

import BoardsWriteAdvanced from '@/components/boards-write';
import { FETCH_BOARD } from '@/components/boards-write/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function BoardComponentEditPage() {
  const myUrl = useParams();
  const router = useRouter();
  const hasChecked = useRef(false);

  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(myUrl.boardId),
    },
  });
  // console.log('수정 페이지 데이터:', data);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    if (localStorage.getItem('accessToken') === null) {
      alert('로그인 후 이용 가능합니다');
      router.push('/');
    }
  }, []);

  return <BoardsWriteAdvanced isEdit={true} data={data} />;
}