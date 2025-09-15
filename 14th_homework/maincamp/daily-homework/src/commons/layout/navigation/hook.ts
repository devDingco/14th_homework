import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { UserInfo } from './types';

export default function useNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const pathname = usePathname();

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 사용자 정보 설정 (임시 데이터)
  useEffect(() => {
    setUser({
      _id: '1',
      email: 'hong@example.com',
      name: '홍길동',
      picture: '/profile.svg',
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    console.log('프로필 클릭됨');
    // 프로필 드롭다운 토글 또는 프로필 페이지로 이동
  };

  return {
    isMenuOpen,
    isScrolled,
    user,
    toggleMenu,
    closeMenu,
    handleProfileClick,
  };
}
