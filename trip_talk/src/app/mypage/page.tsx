'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MypagePage() {
  const router = useRouter();

  useEffect(() => {
    // mypage 접근 시 자동으로 products로 리다이렉트
    router.replace('/mypage/history');
  }, [router]);

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p className="r_16_24">페이지를 로딩 중입니다...</p>
    </div>
  );
}
