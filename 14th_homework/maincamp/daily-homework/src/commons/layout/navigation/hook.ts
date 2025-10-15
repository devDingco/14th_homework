import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import { UserInfo } from './types';

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

export default function useNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // fetchUserLoggedIn으로 사용자 정보 가져오기
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const user = data?.fetchUserLoggedIn || null;

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

  const handleLoginClick = () => {
    router.push('/login');
  };

  return {
    isMenuOpen,
    isScrolled,
    user,
    toggleMenu,
    closeMenu,
    handleProfileClick,
    handleLoginClick,
  };
}
