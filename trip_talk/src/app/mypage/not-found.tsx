'use client';

import { useRouter } from 'next/navigation';

export default function MypageNotFound() {
  const router = useRouter();
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        // minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2 className="sb_24_32" style={{ marginBottom: '1rem' }}>
        페이지를 찾을 수 없습니다
      </h2>
      <p className="r_16_24" style={{ color: '#666', marginBottom: '2rem' }}>
        요청하신 마이페이지 내 페이지가 존재하지 않습니다.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          className="sb_16_24"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => router.back()}
        >
          이전 페이지
        </button>
        <button
          className="sb_16_24"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8f9fa',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/mypage/history')}
        >
          거래내역으로 이동
        </button>
      </div>
    </div>
  );
}
