'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import './user-logged-button.css';

export default function UserLoggedButton() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      setShowUserMenu(false);
      router.push('/');
    }
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  if (!user) return null;

  return (
    <div ref={userMenuRef} className="header-user-info" onClick={() => setShowUserMenu(!showUserMenu)}>
      <div className="header-user-info-button">
        <Image
          src={user.picture ? user.picture : '/icons/profile_none.png'}
          alt="프로필"
          width={40}
          height={40}
          className="header-user-info-profile-image"
        />
        <Image src="/icons/down_arrow.png" alt="down_arrow" width={24} height={24} />
      </div>

      {showUserMenu && (
        <div className="header-user-info-dropdown">
          {/* 사용자 기본 정보 */}
          <div className="header-user-info-user-section">
            <div className="header-user-info-user-section-left">
              {user.picture ? (
                <Image src={user.picture} alt="프로필" width={40} height={40} />
              ) : (
                <Image src="/icons/profile_none.png" alt="프로필" width={40} height={40} />
              )}
              <div className="header-user-info-user-name me_16_20">{user.name}</div>
            </div>
            <Image src="/icons/up_arrow.png" alt="up_arrow" width={24} height={24} />
          </div>
          <hr className="header-user-info-dropdown-divider" />

          {/* 포인트 정보 */}
          {user.userPoint && (
            <div className="header-user-info-points">
              <Image src="/icons/point.png" alt="point" width={24} height={24} />
              <span className="me_16_24">{user.userPoint.amount.toLocaleString()}P</span>
            </div>
          )}

          <hr className="header-user-info-dropdown-divider" />

          {/* 메뉴 아이템들 */}
          <div className="header-user-info-menu-item-container">
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push('/mypage');
                setShowUserMenu(false);
              }}
              className="header-user-info-menu-item"
            >
              <Image src="/icons/charge.png" alt="mypage" width={24} height={24} />
              <span className="r_16_24">포인트 충전</span>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="header-user-info-menu-item logout"
            >
              <Image src="/icons/logout.png" alt="logout" width={24} height={24} />
              <span className="r_16_24">로그아웃</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
