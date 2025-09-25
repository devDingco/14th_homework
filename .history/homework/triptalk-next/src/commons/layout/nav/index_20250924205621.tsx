'use client';
import Image from 'next/image';
import styles from './nav.module.css';
import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const { accessToken } = useAccessTokenStore();
  const onClickLogin = () => {};

  return (
    <div className="container">
      {/* 상단 네비게이션 바 */}
      <nav className={styles.nav}>
        <div>
          <div>
            <Image
              src="/icons/logoArea.png"
              alt="로고"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.navItem}>
            <div>트립토크</div>
            <div>숙박권구매</div>
            <div>마이 페이지</div>
          </div>
          {accessToken ? (
            <Image
              src="/icons/profile.png"
              alt="프로필"
              width={30}
              height={30}
            />
          ) : (
            <button onClick={onClickLogin}>로그인</button>
          )}
        </div>
      </nav>
    </div>
  );
}
