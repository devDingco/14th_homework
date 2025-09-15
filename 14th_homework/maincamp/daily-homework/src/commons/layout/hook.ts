import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // 페이지별 배너 표시 여부 결정
  const shouldShowBanner = () => {
    const bannerRoutes = ['/', '/boards'];
    return bannerRoutes.includes(pathname) || pathname === '/boards';
  };

  // 페이지 전환 시 로딩 상태 관리
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return {
    isLoading,
    showBanner: shouldShowBanner(),
    pathname,
  };
}
