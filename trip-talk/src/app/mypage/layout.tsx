'use client';

import { MyPageSidebar } from '../../components/MyPageSidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.');
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50 !max-w-none w-screen -mx-4">
      <MyPageSidebar />
      <main className="flex-1">
        <div className="w-full px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
