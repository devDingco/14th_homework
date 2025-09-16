'use client';
import Image from 'next/image';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <div className="container">
      {/* 상단 네비게이션 바 */}
      <nav className={styles.nav}>
        <div>
          <Image src="/icons/logoArea.png" alt="로고" width={50} height={50} />
        </div>
        <div className={styles.네비}>
          <div>트립토크</div>
          <div>숙박권구매</div>
          <div>마이 페이지</div>
        </div>
      </nav>
    </div>
  );
}
