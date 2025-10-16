'use client';

import BoardsWriteAdvanced from '@/components/boards-write';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function BoardComponentNewPage() {
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    if (localStorage.getItem('accessToken') === null) {
      alert('로그인 후 이용 가능합니다');
      router.push('/');
    }
  }, []);

  return <BoardsWriteAdvanced isEdit={false} />;
}
