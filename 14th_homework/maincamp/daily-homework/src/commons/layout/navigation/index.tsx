'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { NavigationProps } from './types';
import useNavigation from './hook';

export default function Navigation(props: NavigationProps) {
  const pathname = usePathname();
  const { user, handleProfileClick } = useNavigation();

  const navigationItems = [
    { href: '/boards', label: '트립토크', exact: false },
    { href: '/accommodation', label: '숙박권 구매', exact: false },
    { href: '/mypage', label: '마이 페이지', exact: false },
  ];

  const isActiveRoute = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.nav_container}>
        <div className={styles.header}>
          {/* 로고 */}
          <div className={styles.logo_area}>
            <Link href="/" className={styles.logo_link}>
              <Image
                src="/logo.png"
                alt="로고"
                width={52}
                height={32}
                className={styles.logo_image}
              />
            </Link>
          </div>

          {/* 탭 */}
          <div className={styles.tab_area}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.tab_item} ${
                  isActiveRoute(item.href, item.exact) ? styles.tab_active : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 프로필 */}
          <div className={styles.profile_area}>
            <div className={styles.profile_container} onClick={handleProfileClick}>
              <Image
                src="/profile.png"
                alt="프로필"
                width={40}
                height={40}
                className={styles.profile_image}
              />
              <span className={styles.profile_name}>{user?.name || '홍길동'}</span>
              <Image
                src="/down_arrow.png"
                alt="드롭다운"
                width={24}
                height={24}
                className={styles.dropdown_arrow}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
