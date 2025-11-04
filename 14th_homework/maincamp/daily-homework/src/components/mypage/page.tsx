'use client';

import { useState } from 'react';
import styles from './styles.module.css';

export default function MypageComponent() {
  const [selectedMenu, setSelectedMenu] = useState('내 게시글');

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* 좌측 사이드바 */}
        <aside className={styles.sidebar}>
          {/* 최상단 프로필 */}
          <div className={styles.profileCard}>
            <div className={styles.profileImage}>
              <img src="/profile.svg" alt="프로필" />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>홍길동</h2>
              <p className={styles.profileEmail}>hong@example.com</p>
            </div>
          </div>

          {/* 메뉴 리스트 */}
          <nav className={styles.menuList}>
            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>내 활동</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '내 게시글' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('내 게시글')}
                >
                  <span className={styles.menuIcon}>📝</span>
                  <span className={styles.menuLabel}>내 게시글</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '내 댓글' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('내 댓글')}
                >
                  <span className={styles.menuIcon}>💬</span>
                  <span className={styles.menuLabel}>내 댓글</span>
                </button>
                <button
                  className={`${styles.menuItem} ${selectedMenu === '좋아요' ? styles.active : ''}`}
                  onClick={() => setSelectedMenu('좋아요')}
                >
                  <span className={styles.menuIcon}>⭐</span>
                  <span className={styles.menuLabel}>좋아요</span>
                </button>
              </div>
            </div>

            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>예약/구매</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '포인트 충전 내역' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('포인트 충전 내역')}
                >
                  <span className={styles.menuIcon}>💰</span>
                  <span className={styles.menuLabel}>포인트 충전 내역</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '구매내역' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('구매내역')}
                >
                  <span className={styles.menuIcon}>🛒</span>
                  <span className={styles.menuLabel}>구매내역</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '나의 예약 확인' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('나의 예약 확인')}
                >
                  <span className={styles.menuIcon}>📅</span>
                  <span className={styles.menuLabel}>나의 예약 확인</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '찜 목록' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('찜 목록')}
                >
                  <span className={styles.menuIcon}>❤️</span>
                  <span className={styles.menuLabel}>찜 목록</span>
                </button>
              </div>
            </div>

            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>설정</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '프로필 수정' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('프로필 수정')}
                >
                  <span className={styles.menuIcon}>👤</span>
                  <span className={styles.menuLabel}>프로필 수정</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '비밀번호 변경' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('비밀번호 변경')}
                >
                  <span className={styles.menuIcon}>🔒</span>
                  <span className={styles.menuLabel}>비밀번호 변경</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '알림 설정' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('알림 설정')}
                >
                  <span className={styles.menuIcon}>🔔</span>
                  <span className={styles.menuLabel}>알림 설정</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '로그아웃' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('로그아웃')}
                >
                  <span className={styles.menuIcon}>🚪</span>
                  <span className={styles.menuLabel}>로그아웃</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <main className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>{selectedMenu}</h1>
          </div>
          <div className={styles.contentBody}>
            <p className={styles.emptyMessage}>{selectedMenu} 페이지는 준비 중입니다.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
